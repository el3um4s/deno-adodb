Const adSchemaTables = 20

Set objConnection = CreateObject("ADODB.Connection")
Set objRecordSet = CreateObject("ADODB.Recordset")
objConnection.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source='adodb.mdb'" 
Set objRecordSet = objConnection.OpenSchema(adSchemaTables)
Do Until objRecordset.EOF
    Wscript.Echo "Table name: " & objRecordset.Fields.Item("TABLE_NAME")
    Wscript.Echo "Table type: " & objRecordset.Fields.Item("TABLE_TYPE")
    Wscript.Echo
    objRecordset.MoveNext
Loop

objRecordset.Close
objConnection.Close