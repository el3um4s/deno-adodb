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
  query: {
    sql: function (
      cscriptString: string,
      nameDatabase: string,
      sQuery: string,
      format: string = "JSON",
    ) {
      const vbs: string = listAPI.QUERY.sql.vbs;
      return [cscriptString, nologo, vbs, nameDatabase, sQuery, format];
    },
    getAllValue: function (
      cscriptString: string,
      nameDatabase: string,
      nomeTable: string,
      format: string = "JSON",
    ) {
      const vbs: string = listAPI.QUERY.allValue.vbs;
      return [cscriptString, nologo, vbs, nameDatabase, nomeTable, format];
    },
  },
};
