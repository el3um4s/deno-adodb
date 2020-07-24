import { execute } from "./lib/execute.ts";
import { cscriptSync } from "./lib/cscript.ts";
import { command } from "./lib/command.ts";
const nameDatabase = Deno.args[0];
const cscriptString = cscriptSync();
// const command = ["c:/Windows/SysWOW64/cscript.exe","//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];
// const command = [cscriptString, "//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];
const cmd = command.schema.getAllTables(cscriptString, nameDatabase);
const result = await execute(cmd);
console.log("CAPTURED:", result.captured);
console.log("CMD:", result.cmd);
console.log("STATUS ADODB:", result.statusAdodb);
console.log(JSON.parse(result.result));
// set env in ps: `$Env:DENO_DIR="deno_dir"`
// deno run --unstable --allow-env --allow-read --allow-run mod.ts ./vbs/vbs_script/adodb.mdb
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxhQUFhLEdBQVcsV0FBVyxFQUFFLENBQUM7QUFFNUMsd0lBQXdJO0FBQ3hJLHFIQUFxSDtBQUNySCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFckUsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBR3ZDLDRDQUE0QztBQUM1Qyw2RkFBNkYifQ==