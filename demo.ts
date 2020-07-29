import { execute, cscriptSync, command } from "./mod.ts";

const nameDatabase = Deno.args[0];
const cscriptString: string = cscriptSync();

// const command = ["c:/Windows/SysWOW64/cscript.exe","//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];
// const command = [cscriptString, "//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];
const cmd = command.schema.getAllTables(cscriptString, nameDatabase);

const result = await execute(cmd);
console.log("CAPTURED:", result.captured);
console.log("CMD:", result.cmd);
console.log("STATUS ADODB:", result.statusAdodb);
console.log(JSON.parse(result.result));

// set env in ps: `$Env:DENO_DIR="deno_dir"`
// deno run --unstable --allow-env --allow-read --allow-run mod.ts ./demo/adodb.mdb
