import * as path from "https://deno.land/std/path/mod.ts";

const baseURL = "./vbs/vbs_script/";

/** API library already implemented */
export const listAPI = {
  SCHEMA: {
    allTables: {
      vbs: path.join(baseURL, "api_schema.vbs"),
      args: ["nameDatabase"],
      format: ["JSON", "CSV"],
      description: "Returns the tables (including views) defined in the catalog that are accessible to a given user.",
      stable: true,
    },
  },
  QUERY: {
    sql: {
      vbs: path.join(baseURL, "api_query_sql.vbs"),
      args: ["nameDatabase", "sQuery"],
      format: ["JSON", "CSV"],
      description: "Execute a SQL statement.",
      stable: true,
    },
    allValue: {
      vbs: path.join(baseURL, "api_query_all_values.vbs"),
      args: ["nameDatabase", "nameTable"],
      format: ["JSON", "CSV"],
      description: "Returns all of the fields and records for the table",
      stable: true,
    },
  }
};
