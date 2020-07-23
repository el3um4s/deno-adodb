Dim sConnectionString
sConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source='adodb.mdb'"

Set objConnection = CreateObject("ADODB.Connection")
objConnection.Open sConnectionString

Set objRecordSet = CreateObject("ADODB.Recordset")

Dim sQuery
sQuery = "SELECT * FROM USERS"

Set objRecordset = objConnection.Execute(sQuery)

strOutput = ""

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

objRecordset.Close
objConnection.Close

WScript.Echo strHeader & vbCrLf & strOutput & vbCrLf
