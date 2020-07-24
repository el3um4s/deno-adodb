import * as path from "../path/mod.ts";
/**
 * Test whether or not `dest` is a sub-directory of `src`
 * @param src src file path
 * @param dest dest file path
 * @param sep path separator
 */
export function isSubdir(src, dest, sep = path.sep) {
    if (src === dest) {
        return false;
    }
    const srcArray = src.split(sep);
    const destArray = dest.split(sep);
    return srcArray.every((current, i) => destArray[i] === current);
}
/**
 * Get a human readable file type string.
 *
 * @param fileInfo A FileInfo describes a file and is returned by `stat`,
 *                 `lstat`
 */
export function getFileInfoType(fileInfo) {
    return fileInfo.isFile
        ? "file"
        : fileInfo.isDirectory
            ? "dir"
            : fileInfo.isSymlink
                ? "symlink"
                : undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBRXZDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FDdEIsR0FBVyxFQUNYLElBQVksRUFDWixNQUFjLElBQUksQ0FBQyxHQUFHO0lBRXRCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUNoQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBSUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLFFBQXVCO0lBQ3JELE9BQU8sUUFBUSxDQUFDLE1BQU07UUFDcEIsQ0FBQyxDQUFDLE1BQU07UUFDUixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVc7WUFDdEIsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0JBQ3BCLENBQUMsQ0FBQyxTQUFTO2dCQUNYLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDaEIsQ0FBQyJ9