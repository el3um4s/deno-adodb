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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3RBUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLElBQUksTUFBTSxtQ0FBbUMsQ0FBQztBQUUxRCxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFO1lBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDO1lBQ3pDLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN0QixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1NBQ3hCO0tBQ0Y7Q0FDRixDQUFDIn0=