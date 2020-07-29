import { listAPI } from "./listAPI.ts";

const nologo = "//NOLOGO";

/** A set of predefined commands to pass as an argument to _execute_ */
export const command = {
  schema: {
    getAllTables: function (
      cscriptString: string,
      nameDatabase: string,
      format: string = "JSON",
    ) {
      const vbs: string = listAPI.SCHEMA.allTables.vbs;
      return [cscriptString, nologo, vbs, nameDatabase, format];
    },
  },
};
