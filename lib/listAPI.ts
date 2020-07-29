import * as path from "https://deno.land/std/path/mod.ts";

const baseURL = "./vbs/vbs_script/";

/** API library already implemented */
export const listAPI = {
  SCHEMA: {
    allTables: {
      vbs: path.join(baseURL, "api_schema.vbs"),
      args: ["nameDatabase"],
      format: ["JSON", "CSV"],
      description:
        "Returns the tables (including views) defined in the catalog that are accessible to a given user.",
      stable: true,
    },
  },
};
