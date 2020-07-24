import * as path from "https://deno.land/std/path/mod.ts";

const baseURL = "./vbs/vbs_script/";

export const listAPI = {
  SCHEMA: {
    allTables: {
      vbs: path.join(baseURL, "api_schema.vbs"),
      args: ["nameDatabase"],
      format: ["JSON", "CSV"],
    },
  },
};
