import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

const result = await exec(
  `c:/Windows/SysWOW64/cscript.exe //NOLOGO "./vbs/vbs_script/api_schema.vbs" "./vbs/vbs_script/adodb.mdb" JSON`,
  { output: OutputMode.Capture, verbose: false },
);


console.log(result);
console.log(result.status.success);
const jsonResult = JSON.parse(result.output);
console.log(jsonResult);
// console.log(jsonResult.result.length);

// set env in ps: `$Env:DENO_DIR="deno_dir"`