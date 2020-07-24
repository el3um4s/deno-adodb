// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { exists, existsSync } from "./exists.ts";
import { isSubdir } from "./_util.ts";
/** Moves a file or directory */
export async function move(src, dest, { overwrite = false } = {}) {
    const srcStat = await Deno.stat(src);
    if (srcStat.isDirectory && isSubdir(src, dest)) {
        throw new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`);
    }
    if (overwrite) {
        if (await exists(dest)) {
            await Deno.remove(dest, { recursive: true });
        }
        await Deno.rename(src, dest);
    }
    else {
        if (await exists(dest)) {
            throw new Error("dest already exists.");
        }
        await Deno.rename(src, dest);
    }
    return;
}
/** Moves a file or directory synchronously */
export function moveSync(src, dest, { overwrite = false } = {}) {
    const srcStat = Deno.statSync(src);
    if (srcStat.isDirectory && isSubdir(src, dest)) {
        throw new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`);
    }
    if (overwrite) {
        if (existsSync(dest)) {
            Deno.removeSync(dest, { recursive: true });
        }
        Deno.renameSync(src, dest);
    }
    else {
        if (existsSync(dest)) {
            throw new Error("dest already exists.");
        }
        Deno.renameSync(src, dest);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFNdEMsZ0NBQWdDO0FBQ2hDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUFXLEVBQ1gsSUFBWSxFQUNaLEVBQUUsU0FBUyxHQUFHLEtBQUssS0FBa0IsRUFBRTtJQUV2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFckMsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FDYixnQkFBZ0IsR0FBRyxtQ0FBbUMsSUFBSSxJQUFJLENBQy9ELENBQUM7S0FDSDtJQUVELElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlCO1NBQU07UUFDTCxJQUFJLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN6QztRQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFFRCxPQUFPO0FBQ1QsQ0FBQztBQUVELDhDQUE4QztBQUM5QyxNQUFNLFVBQVUsUUFBUSxDQUN0QixHQUFXLEVBQ1gsSUFBWSxFQUNaLEVBQUUsU0FBUyxHQUFHLEtBQUssS0FBa0IsRUFBRTtJQUV2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0JBQWdCLEdBQUcsbUNBQW1DLElBQUksSUFBSSxDQUMvRCxDQUFDO0tBQ0g7SUFFRCxJQUFJLFNBQVMsRUFBRTtRQUNiLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QjtTQUFNO1FBQ0wsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDIn0=