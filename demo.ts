import { execute, cscriptSync, command } from "./mod.ts";

const nameDatabase = Deno.args[0];
const cscriptString: string = cscriptSync();

// const command = ["c:/Windows/SysWOW64/cscript.exe","//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];
// const command = [cscriptString, "//NOLOGO","./vbs/vbs_script/api_schema.vbs","./vbs/vbs_script/adodb.mdb","JSON"];

console.log("# command.schema.getAllTables(cscriptString, nameDatabase)");
const cmd = command.schema.getAllTables(cscriptString, nameDatabase);
const result = await execute(cmd);
console.log("CAPTURED:", result.captured);
console.log("CMD:", result.cmd);
console.log("STATUS ADODB:", result.statusAdodb);
console.log(JSON.parse(result.result));

console.log("# getAllUsers(cscriptString, nameDatabase)");
console.log( JSON.parse(await getAllUsers(cscriptString, nameDatabase)));
console.log( await getAllUsers(cscriptString, nameDatabase, "USERS", "CSV", false));

console.log("# command.query.sql(cscriptString, nameDatabase, 'SELECT id, [first name] FROM [Users];')");
const cmd_Squery = command.query.sql(cscriptString, nameDatabase, "SELECT id, [first name] FROM [Users];");
const result_sQuery = await execute(cmd_Squery);
console.log(JSON.parse(result_sQuery.result));

console.log("# command.query.sql(cscriptString, nameDatabase, 'SELECT id, [first name] FROM [Users];')");
const cmd_Squery_Update = command.query.sql(cscriptString, nameDatabase, "UPDATE Users SET Users.[first name] = LEFT([FIRST NAME],4);");
const result_sQuery_Update = await execute(cmd_Squery_Update);
console.log(JSON.parse(result_sQuery_Update.result));

console.log(await getAllUsers(cscriptString, nameDatabase, "users", "csv", false));

console.log("# command.query.sql(cscriptString, nameDatabase, 'UPDATE Users SET [first name] = [Users].[First Name] & ' (x)';')");
const cmd_Squery_Update_2 = command.query.sql(cscriptString, nameDatabase, "UPDATE Users SET [first name] = [Users].[First Name] & ' (x)';");
const result_sQuery_Update_2 = await execute(cmd_Squery_Update_2);
console.log(JSON.parse(result_sQuery_Update_2.result));

console.log(await getAllUsers(cscriptString, nameDatabase, "users", "csv", false));

console.log("# count books");
// const count_books = `SELECT [first name] & " " & [second name] AS Name, Count([Books].user) AS Books FROM Users INNER JOIN Books ON [Users].id = Books.user GROUP BY Users.id, [first name] & " " & [second name] ORDER BY Count(Books.user) DESC;`
// const cmd_count_books = command.query.sql(cscriptString, nameDatabase, count_books);
// const result_count_books = await execute(cmd_count_books);
// console.log(JSON.parse(result_count_books.result));
console.log(await getAllUsers(cscriptString, nameDatabase, "count_books", "csv", false));
console.log(JSON.parse(await getAllUsers(cscriptString, nameDatabase, "count_books", "json", false)));

const cmd_view = command.query.sql(cscriptString, nameDatabase, "SELECT Name, Books FROM [count_books];");
const result_view =  await execute(cmd_view);
console.log(JSON.parse(result_view.result));






async function getAllUsers(cscriptString: string, nameDatabase: string, nameTable: string = "USERS", format: string = "JSON", verbose: boolean = true) {
    const cmd_query = command.query.getAllValue(cscriptString, nameDatabase, nameTable, format);
    const result_query = await execute(cmd_query);
    if (verbose) {
        console.log("CAPTURED:", result_query.captured);
        console.log("CMD:", result_query.cmd);
        console.log("STATUS ADODB:", result_query.statusAdodb);
    }

    return result_query.result;
}

// set env in ps: `$Env:DENO_DIR="deno_dir"`
// deno run --unstable --allow-env --allow-read --allow-run mod.ts ./demo/adodb.mdb
