Include("./db_CloseRecordset.vbs")

Function GetSchemaTables_All_CSV(objConnection)
    Set objRecordSet = CreateObject("ADODB.Recordset")
    Set objRecordSet = objConnection.OpenSchema(20)
    Dim result
    result = "TABLE_NAME | TABLE_TYPE" & vbCrLf
    Do Until objRecordset.EOF
         result = result & objRecordset.Fields.Item("TABLE_NAME") & " | " & objRecordset.Fields.Item("TABLE_TYPE") & vbCrLf
        objRecordset.MoveNext
    Loop
    CloseRecordset(objRecordset)
    GetSchemaTables_All_CSV = result
End Function

Function GetSchemaTables_All_JSON(objConnection)
    Set objRecordSet = CreateObject("ADODB.Recordset")
    Set objRecordSet = objConnection.OpenSchema(20)
    Dim result
    result = "{""schema"":["
    Do Until objRecordset.EOF
        result = result & "{""TABLE_NAME"":" & """" & objRecordset.Fields.Item("TABLE_NAME") & ""","
        result = result & """TABLE_TYPE"":" & """" & objRecordset.Fields.Item("TABLE_TYPE") & """},"
        objRecordset.MoveNext
    Loop
    CloseRecordset(objRecordset)
    result = Left(result, Len(result) - 1)
    GetSchemaTables_All_JSON = result & "]}"
End Function

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