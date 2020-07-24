// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** Reads a JSON file and then parses it into an object */
export async function readJson(filePath) {
    const decoder = new TextDecoder("utf-8");
    const content = decoder.decode(await Deno.readFile(filePath));
    try {
        return JSON.parse(content);
    }
    catch (err) {
        err.message = `${filePath}: ${err.message}`;
        throw err;
    }
}
/** Reads a JSON file and then parses it into an object */
export function readJsonSync(filePath) {
    const decoder = new TextDecoder("utf-8");
    const content = decoder.decode(Deno.readFileSync(filePath));
    try {
        return JSON.parse(content);
    }
    catch (err) {
        err.message = `${filePath}: ${err.message}`;
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZF9qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVhZF9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUUxRSwwREFBMEQ7QUFDMUQsTUFBTSxDQUFDLEtBQUssVUFBVSxRQUFRLENBQUMsUUFBZ0I7SUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUU5RCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsUUFBUSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QyxNQUFNLEdBQUcsQ0FBQztLQUNYO0FBQ0gsQ0FBQztBQUVELDBEQUEwRDtBQUMxRCxNQUFNLFVBQVUsWUFBWSxDQUFDLFFBQWdCO0lBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXpDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxRQUFRLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE1BQU0sR0FBRyxDQUFDO0tBQ1g7QUFDSCxDQUFDIn0=