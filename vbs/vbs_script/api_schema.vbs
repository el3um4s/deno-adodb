' c:\Windows\SysWOW64\cscript.exe .\api_schema.vbs adodb.mdb [JSON/CSV]

Include("db_OpenConnection.vbs")
Include("schema_GetSchemaTables_All.vbs")
Include("db_CloseConnection.vbs")
Include("db_GenerateConnectionString.vbs")

Dim nameDatabase
nameDatabase = WScript.Arguments.Item(0)

Dim format
format = "JSON"  'CSV - JSON

If Wscript.Arguments.Unnamed.Count = 2 then
	format = WScript.Arguments.Item(1) 'CSV - JSON
End If

Dim sConnectionString
sConnectionString = GenerateConnectionString(nameDatabase)

Set objConnection = CreateObject("ADODB.Connection")
objConnection.Open(sConnectionString)

dim schema

If UCase(format) = "CSV" then
    schema = GetSchemaTables_All_CSV(objConnection)
Else
    schema = GetSchemaTables_All_JSON(objConnection)
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