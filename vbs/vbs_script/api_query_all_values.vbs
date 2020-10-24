' c:\Windows\SysWOW64\cscript.exe .\api_query_all_values.vbs adodb.mdb users [JSON/CSV]

Include("db_OpenConnection.vbs")
Include("query_SQL.vbs")
Include("db_CloseConnection.vbs")
Include("db_GenerateConnectionString.vbs")

Dim nameDatabase
nameDatabase = WScript.Arguments.Item(0)

Dim nameTable
nameTable = WScript.Arguments.Item(1)

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
    schema = GetAllValue_CSV(objConnection, nameTable)
Else
    schema = GetAllValue_JSON(objConnection, nameTable)
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