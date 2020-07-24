import { listAPI } from "./listAPI.ts";

const nologo = "//NOLOGO";

export const command = {
 schema: {
     getAllTables: function (cscriptString : string, nameDatabase : string, format : string = "JSON")  {
        const vbs : string = listAPI.SCHEMA.allTables.vbs;
        return [cscriptString, nologo, vbs, nameDatabase, format]
     }
 }
}