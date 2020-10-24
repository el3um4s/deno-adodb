'c:\Windows\SysWOW64\cscript.exe .\api_query_sql.vbs adodb.mdb "SELECT id, [first name] FROM [Users];"  [JSON/CSV]

Include("db_OpenConnection.vbs")
Include("query_SQL.vbs")
Include("db_CloseConnection.vbs")
Include("db_GenerateConnectionString.vbs")

Dim nameDatabase
nameDatabase = WScript.Arguments.Item(0)

Dim sQuery
sQuery = WScript.Arguments.Item(1)

Dim format
format = "JSON"  'CSV - JSON

If Wscript.Arguments.Unnamed.Count = 3 then
	format = WScript.Arguments.Item(2) 'CSV - JSON
End If

Dim sConnectionString
sConnectionString = GenerateConnectionString(nameDatabase)

Set objConnection = CreateObject("ADODB.Connection")
objConnection.Open(sConnectionString)

dim schema

If UCase(format) = "CSV" then
    schema = SQL_CSV(objConnection, sQuery)
Else
    schema = SQL_JSON(objConnection, sQuery)
End if

Wscript.Echo schema


Sub Include (strFile)
    scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
    Set objFSO = CreateObject("Scripting.FileSystemObject")
    Dim filePosition
    filePosition = scriptdir & "/" & strFile
	Set objTextFile = objFSO.OpenTextFile(filePosition, 1)
	ExecuteGlobal objTextFile.ReadAll
	objTextFile.Close
	Set objFSO = Nothing
	Set objTextFile = Nothing
End Sub