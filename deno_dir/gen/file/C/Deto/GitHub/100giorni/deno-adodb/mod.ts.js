import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
const result = await exec(`c:/Windows/SysWOW64/cscript.exe //NOLOGO "./vbs/vbs_script/api_schema.vbs" "./vbs/vbs_script/adodb.mdb" JSON`, { output: OutputMode.Capture, verbose: false });
console.log(result);
console.log(result.status.success);
const jsonResult = JSON.parse(result.output);
console.log(jsonResult);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQ3ZCLDhHQUE4RyxFQUM5RyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FDL0MsQ0FBQztBQUdGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMifQ==