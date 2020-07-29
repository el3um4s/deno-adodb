# deno-adodb

> A deno.js javascript client implementing the ADODB protocol on windows.
>
> [![GitHub license](https://img.shields.io/github/license/el3um4s/deno-adodb.svg)](https://github.com/el3um4s/deno-adodb/blob/master/LICENSE)
> [![HitCount](http://hits.dwyl.com/el3um4s/deno-adodb.svg)](http://hits.dwyl.com/el3um4s/deno-adodb)

### Warnings

1. This project is in the early stages of its development. So many things can still change.
2. To use deno-adodb you must manually save the contents of the repository on your PC. I don't know if it will be possible to avoid this in the future.
3. The library need system support Microsoft.Jet.OLEDB.4.0 or Microsoft.ACE.OLEDB.12.0, Windows XP SP2 above support Microsoft.Jet.OLEDB.4.0 by default, Others need to install support! Recommended use Microsoft.ACE.OLEDB.12.0, download: [Microsoft.ACE.OLEDB.12.0](https://www.microsoft.com/en-us/download/details.aspx?id=13255)
4. For the moment I have created only one API, to test the feasibility of the project.

### How to use

Create a demo.ts file containing this code:

```typescript
import { execute, cscriptSync, command } from "./mod.ts";

const nameDatabase = Deno.args[0];
const cscriptString: string = cscriptSync();

const cmd = command.schema.getAllTables(cscriptString, nameDatabase);
const result = await execute(cmd);

console.log("CAPTURED:" , result.captured);
console.log("CMD:", result.cmd);
console.log("STATUS ADODB:" , result.statusAdodb);
console.log(JSON.parse(result.result));
```

From the terminal use this code:

```shell
deno run --unstable --allow-run --allow-read --allow-env demo.ts "./demo/adodb.mdb"
```

`parse.result` will contain an object similar to this:

```json
{
  schema: [
    { TABLE_NAME: "MSysAccessObjects", TABLE_TYPE: "ACCESS TABLE" },
    { TABLE_NAME: "MSysACEs", TABLE_TYPE: "SYSTEM TABLE" },
    { TABLE_NAME: "MSysNavPaneGroupCategories", TABLE_TYPE: "ACCESS TABLE" },
    { TABLE_NAME: "MSysNavPaneGroups", TABLE_TYPE: "ACCESS TABLE" },
    { TABLE_NAME: "MSysNavPaneGroupToObjects", TABLE_TYPE: "ACCESS TABLE" },
    { TABLE_NAME: "MSysNavPaneObjectIDs", TABLE_TYPE: "ACCESS TABLE" },
    { TABLE_NAME: "MSysObjects", TABLE_TYPE: "SYSTEM TABLE" },
    { TABLE_NAME: "MSysQueries", TABLE_TYPE: "SYSTEM TABLE" },
    { TABLE_NAME: "MSysRelationships", TABLE_TYPE: "SYSTEM TABLE" },
    { TABLE_NAME: "Users", TABLE_TYPE: "TABLE" }
  ]
}
```

### MODULES:

* **cscript** and **cscriptSync**: identifies the location of "cscript.exe" on the PC where deno-adodb is launched.
* **execute**: performs operations on the database and return the result in the form of JSON (or CVS).
* **command**: a set of predefined commands to pass as an argument to _execute_

### COMMAND.SCHEMA

Query database schema information (see [SchemaEnum](https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/schemaenum?redirectedfrom=MSDN&view=sql-server-ver15)).

* **`schema.getAllTables(cscriptString, nameDatabase);`**: Returns the tables (including views) defined in the catalog that are accessible to a given user.

### TO DO

[x] **`schema.getAllTables(cscriptString, nameDatabase);`**: Returns the tables (including views) defined in the catalog that are accessible to a given user.
[] **`schema.getTablesByType(cscriptString, nameDatabase, tableType);`**: Returns the tables (including views) defined in the catalog that are accessible to a given user.
[] **`query.sql(cscriptString, nameDatabase, sqlString);`**: Execute a SQL statement.
