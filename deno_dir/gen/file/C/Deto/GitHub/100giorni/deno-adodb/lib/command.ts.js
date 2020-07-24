import { listAPI } from "./listAPI.ts";
const nologo = "//NOLOGO";
export const command = {
    schema: {
        getAllTables: function (cscriptString, nameDatabase, format = "JSON") {
            const vbs = listAPI.SCHEMA.allTables.vbs;
            return [cscriptString, nologo, vbs, nameDatabase, format];
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFFMUIsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3RCLE1BQU0sRUFBRTtRQUNKLFlBQVksRUFBRSxVQUFVLGFBQXNCLEVBQUUsWUFBcUIsRUFBRSxTQUFrQixNQUFNO1lBQzVGLE1BQU0sR0FBRyxHQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUNsRCxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVELENBQUM7S0FDSjtDQUNELENBQUEifQ==