set args = Wscript.Arguments

Dim sourceDB
sourceDB  = WScript.Arguments.Item(0)

Dim sQuery
sQuery = WScript.Arguments.Item(1)

Wscript.Echo sourceDB
Wscript.Echo sQuery

Dim sConnectionString
sConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source='" & sourceDB & "'" 

Set objConnection = CreateObject("ADODB.Connection")
objConnection.Open sConnectionString

Set objRecordSet = CreateObject("ADODB.Recordset")


Dim recordsAffected
Set objRecordset = objConnection.Execute(sQuery, recordsAffected)

WScript.Echo recordsAffected

strOutput = ""

If objRecordset.State = 1 Then
   WScript.Echo "Recordset is open"
ElseIf objRecordset.State <> 1 Then
  WScript.Echo "Recordset is not open"
End If

If IsObject( objRecordset ) Then
    If objRecordset.State = 1 Then
        Do While Not objRecordset.EOF
            ' Create a header line with the column names and data types
            strHeader = ""
            For i = 0 To objRecordset.Fields.Count - 1
                strHeader = strHeader & ",""" & objRecordset.Fields.Item(i).Name & """"
            Next
            strHeader = Mid(strHeader, 2)
            ' List the fields of the current record in comma delimited format
            strResult = ""
            For i = 0 To objRecordset.Fields.Count - 1
                strResult = strResult & ",""" & objRecordset.Fields.Item(i).Value & """"
            Next
            ' Add the current record to the output string
            strOutput = strOutput & Mid( strResult, 2 ) & vbCrLf
            objRecordset.MoveNext
        Loop
    End If
End If

If objRecordset.State = 1 Then
    objRecordset.Close
End If
objConnection.Close

WScript.Echo strHeader & vbCrLf & strOutput & vbCrLf
