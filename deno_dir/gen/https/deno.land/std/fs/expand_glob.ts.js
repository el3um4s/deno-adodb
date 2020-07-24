import { SEP_PATTERN, globToRegExp, isAbsolute, isGlob, joinGlobs, normalize, } from "../path/mod.ts";
import { createWalkEntry, createWalkEntrySync, walk, walkSync, } from "./walk.ts";
import { assert } from "../_util/assert.ts";
const isWindows = Deno.build.os == "windows";
// TODO: Maybe make this public somewhere.
function split(path) {
    const s = SEP_PATTERN.source;
    const segments = path
        .replace(new RegExp(`^${s}|${s}$`, "g"), "")
        .split(SEP_PATTERN);
    const isAbsolute_ = isAbsolute(path);
    return {
        segments,
        isAbsolute: isAbsolute_,
        hasTrailingSep: !!path.match(new RegExp(`${s}$`)),
        winRoot: isWindows && isAbsolute_ ? segments.shift() : undefined,
    };
}
function throwUnlessNotFound(error) {
    if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
    }
}
function comparePath(a, b) {
    if (a.path < b.path)
        return -1;
    if (a.path > b.path)
        return 1;
    return 0;
}
/**
 * Expand the glob string from the specified `root` directory and yield each
 * result as a `WalkEntry` object.
 *
 * Examples:
 *
 *     for await (const file of expandGlob("**\/*.ts")) {
 *       console.log(file);
 *     }
 */
export async function* expandGlob(glob, { root = Deno.cwd(), exclude = [], includeDirs = true, extended = false, globstar = false, } = {}) {
    const globOptions = { extended, globstar };
    const absRoot = isAbsolute(root)
        ? normalize(root)
        : joinGlobs([Deno.cwd(), root], globOptions);
    const resolveFromRoot = (path) => isAbsolute(path)
        ? normalize(path)
        : joinGlobs([absRoot, path], globOptions);
    const excludePatterns = exclude
        .map(resolveFromRoot)
        .map((s) => globToRegExp(s, globOptions));
    const shouldInclude = (path) => !excludePatterns.some((p) => !!path.match(p));
    const { segments, hasTrailingSep, winRoot } = split(resolveFromRoot(glob));
    let fixedRoot = winRoot != undefined ? winRoot : "/";
    while (segments.length > 0 && !isGlob(segments[0])) {
        const seg = segments.shift();
        assert(seg != null);
        fixedRoot = joinGlobs([fixedRoot, seg], globOptions);
    }
    let fixedRootInfo;
    try {
        fixedRootInfo = await createWalkEntry(fixedRoot);
    }
    catch (error) {
        return throwUnlessNotFound(error);
    }
    async function* advanceMatch(walkInfo, globSegment) {
        if (!walkInfo.isDirectory) {
            return;
        }
        else if (globSegment == "..") {
            const parentPath = joinGlobs([walkInfo.path, ".."], globOptions);
            try {
                if (shouldInclude(parentPath)) {
                    return yield await createWalkEntry(parentPath);
                }
            }
            catch (error) {
                throwUnlessNotFound(error);
            }
            return;
        }
        else if (globSegment == "**") {
            return yield* walk(walkInfo.path, {
                includeFiles: false,
                skip: excludePatterns,
            });
        }
        yield* walk(walkInfo.path, {
            maxDepth: 1,
            match: [
                globToRegExp(joinGlobs([walkInfo.path, globSegment], globOptions), globOptions),
            ],
            skip: excludePatterns,
        });
    }
    let currentMatches = [fixedRootInfo];
    for (const segment of segments) {
        // Advancing the list of current matches may introduce duplicates, so we
        // pass everything through this Map.
        const nextMatchMap = new Map();
        for (const currentMatch of currentMatches) {
            for await (const nextMatch of advanceMatch(currentMatch, segment)) {
                nextMatchMap.set(nextMatch.path, nextMatch);
            }
        }
        currentMatches = [...nextMatchMap.values()].sort(comparePath);
    }
    if (hasTrailingSep) {
        currentMatches = currentMatches.filter((entry) => entry.isDirectory);
    }
    if (!includeDirs) {
        currentMatches = currentMatches.filter((entry) => !entry.isDirectory);
    }
    yield* currentMatches;
}
/**
 * Synchronous version of `expandGlob()`.
 *
 * Examples:
 *
 *     for (const file of expandGlobSync("**\/*.ts")) {
 *       console.log(file);
 *     }
 */
export function* expandGlobSync(glob, { root = Deno.cwd(), exclude = [], includeDirs = true, extended = false, globstar = false, } = {}) {
    const globOptions = { extended, globstar };
    const absRoot = isAbsolute(root)
        ? normalize(root)
        : joinGlobs([Deno.cwd(), root], globOptions);
    const resolveFromRoot = (path) => isAbsolute(path)
        ? normalize(path)
        : joinGlobs([absRoot, path], globOptions);
    const excludePatterns = exclude
        .map(resolveFromRoot)
        .map((s) => globToRegExp(s, globOptions));
    const shouldInclude = (path) => !excludePatterns.some((p) => !!path.match(p));
    const { segments, hasTrailingSep, winRoot } = split(resolveFromRoot(glob));
    let fixedRoot = winRoot != undefined ? winRoot : "/";
    while (segments.length > 0 && !isGlob(segments[0])) {
        const seg = segments.shift();
        assert(seg != null);
        fixedRoot = joinGlobs([fixedRoot, seg], globOptions);
    }
    let fixedRootInfo;
    try {
        fixedRootInfo = createWalkEntrySync(fixedRoot);
    }
    catch (error) {
        return throwUnlessNotFound(error);
    }
    function* advanceMatch(walkInfo, globSegment) {
        if (!walkInfo.isDirectory) {
            return;
        }
        else if (globSegment == "..") {
            const parentPath = joinGlobs([walkInfo.path, ".."], globOptions);
            try {
                if (shouldInclude(parentPath)) {
                    return yield createWalkEntrySync(parentPath);
                }
            }
            catch (error) {
                throwUnlessNotFound(error);
            }
            return;
        }
        else if (globSegment == "**") {
            return yield* walkSync(walkInfo.path, {
                includeFiles: false,
                skip: excludePatterns,
            });
        }
        yield* walkSync(walkInfo.path, {
            maxDepth: 1,
            match: [
                globToRegExp(joinGlobs([walkInfo.path, globSegment], globOptions), globOptions),
            ],
            skip: excludePatterns,
        });
    }
    let currentMatches = [fixedRootInfo];
    for (const segment of segments) {
        // Advancing the list of current matches may introduce duplicates, so we
        // pass everything through this Map.
        const nextMatchMap = new Map();
        for (const currentMatch of currentMatches) {
            for (const nextMatch of advanceMatch(currentMatch, segment)) {
                nextMatchMap.set(nextMatch.path, nextMatch);
            }
        }
        currentMatches = [...nextMatchMap.values()].sort(comparePath);
    }
    if (hasTrailingSep) {
        currentMatches = currentMatches.filter((entry) => entry.isDirectory);
    }
    if (!includeDirs) {
        currentMatches = currentMatches.filter((entry) => !entry.isDirectory);
    }
    yield* currentMatches;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kX2dsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBhbmRfZ2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsV0FBVyxFQUNYLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBRUwsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixJQUFJLEVBQ0osUUFBUSxHQUNULE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUM7QUFnQjdDLDBDQUEwQztBQUMxQyxTQUFTLEtBQUssQ0FBQyxJQUFZO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSTtTQUNsQixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQzNDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsT0FBTztRQUNMLFFBQVE7UUFDUixVQUFVLEVBQUUsV0FBVztRQUN2QixjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDakUsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFD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