/* Writes an object to a JSON file. */
export async function writeJson(filePath, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
object, options = {}) {
    let contentRaw = "";
    try {
        contentRaw = JSON.stringify(object, options.replacer, options.spaces);
    }
    catch (err) {
        err.message = `${filePath}: ${err.message}`;
        throw err;
    }
    await Deno.writeFile(filePath, new TextEncoder().encode(contentRaw));
}
/* Writes an object to a JSON file. */
export function writeJsonSync(filePath, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
object, options = {}) {
    let contentRaw = "";
    try {
        contentRaw = JSON.stringify(object, options.replacer, options.spaces);
    }
    catch (err) {
        err.message = `${filePath}: ${err.message}`;
        throw err;
    }
    Deno.writeFileSync(filePath, new TextEncoder().encode(contentRaw));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVfanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlX2pzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0Esc0NBQXNDO0FBQ3RDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUM3QixRQUFnQjtBQUNoQiw4REFBOEQ7QUFDOUQsTUFBVyxFQUNYLFVBQTRCLEVBQUU7SUFFOUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXBCLElBQUk7UUFDRixVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDekIsTUFBTSxFQUNOLE9BQU8sQ0FBQyxRQUFvQixFQUM1QixPQUFPLENBQUMsTUFBTSxDQUNmLENBQUM7S0FDSDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLFFBQVEsS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsTUFBTSxHQUFHLENBQUM7S0FDWDtJQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRUQsc0NBQXNDO0FBQ3RDLE1BQU0sVUFBVSxhQUFhLENBQzNCLFFBQWdCO0FBQ2hCLDhEQUE4RDtBQUM5RCxNQUFXLEVBQ1gsVUFBNEIsRUFBRTtJQUU5QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsSUFBSTtRQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUN6QixNQUFNLEVBQ04sT0FBTyxDQUFDLFFBQW9CLEVBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQ2YsQ0FBQztLQUNIO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsUUFBUSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxNQUFNLEdBQUcsQ0FBQztLQUNYO0lBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDIn0=