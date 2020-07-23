Option Explicit

Dim arrTables( ), i, idxTables, intValidArgs
Dim blnContent, blnFieldNames
Dim objConn, objFSO, objRS, objSchema
Dim strConnect, strHeader, strOutput
Dim strFile, strResult, strSQL, strTable

Const adSchemaTables = 20

' Check command line arguments
With WScript.Arguments
    If .Unnamed.Count = 1 Then
        strFile = .Unnamed(0)
    Else
        Syntax
    End If
    blnFieldNames = True
    blnContent    = True
    If .Named.Count > 0 Then
        intValidArgs = 0
        If .Named.Exists( "T" ) Then
            blnFieldNames = False
            blnContent    = False
            intValidArgs  = intValidArgs + 1
        End If
        If .Named.Exists( "TF" ) Then
            blnContent    = False
            intValidArgs  = intValidArgs + 1
        End If
        If intValidArgs <> .Named.Count Then Syntax
    End If
End With

' Check if the specified database file exists
Set objFSO = CreateObject( "Scripting.FileSystemObject" )
If Not objFSO.FileExists( strFile ) Then Syntax
Set objFSO = Nothing

' Connect to the MS-Access database
Set objConn = CreateObject( "ADODB.Connection" )
strConnect = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & strFile
objConn.Open strConnect

' Search for user tables and list them in an array
Set objSchema = objConn.OpenSchema( adSchemaTables )
idxTables = -1
Do While Not objSchema.EOF
    If objSchema.Fields.Item(3).Value = "TABLE" Then
        idxTables = idxTables + 1
        ReDim Preserve arrTables( idxTables )
        arrTables( idxTables ) = objSchema.Fields.Item(2).Value
    End If
    objSchema.MoveNext
Loop

' List all tables, their column names and their contents
For Each strTable In arrTables
    strSQL = "Select * From " & strTable
    Set objRS = objConn.Execute( strSQL )
    If IsObject( objRS ) Then
        ' Display the current table's name
        If blnContent Then
            WScript.Echo """Table: " & strTable & """"
        Else
            WScript.Echo """" & strTable & """"
        End If
        If blnFieldNames Then
            strOutput = ""
            Do While Not objRS.EOF
                ' Create a header line with the column names and data types
                strHeader = ""
                For i = 0 To objRS.Fields.Count - 1
                    strHeader = strHeader & ",""[" _
                              & GetDataTypeDesc( objRS.Fields.Item(i).Type ) & "] " _
                              & objRS.Fields.Item(i).Name & """"
                Next
                strHeader = Mid( strHeader, 2 )
                If blnContent Then
                    ' List the fields of the current record in comma delimited format
                    strResult = ""
                    For i = 0 To objRS.Fields.Count - 1
                        strResult = strResult & ",""" & objRS.Fields.Item(i).Value & """"
                    Next
                    ' Add the current record to the output string
                    strOutput = strOutput & Mid( strResult, 2 ) & vbCrLf
                End If
                ' Next record
                objRS.MoveNext
            Loop
            ' List the results for the current table
            WScript.Echo strHeader & vbCrLf & strOutput & vbCrLf
        End If
    End If
Next

objRS.Close
objSchema.Close
objConn.Close
Set objRS     = Nothing
Set objSchema = Nothing
Set objConn   = Nothing


Function GetDataTypeDesc( myTypeNum )
    Dim arrTypes( 8192 ), i
    For i = 0 To UBound( arrTypes )
        arrTypes( i ) = "????"
    Next
    arrTypes(0)     = "Empty"
    arrTypes(2)     = "SmallInt"
    arrTypes(3)     = "Integer"
    arrTypes(4)     = "Single"
    arrTypes(5)     = "Double"
    arrTypes(6)     = "Currency"
    arrTypes(7)     = "Date"
    arrTypes(8)     = "BSTR"
    arrTypes(9)     = "IDispatch"
    arrTypes(10)    = "Error"
    arrTypes(11)    = "Boolean"
    arrTypes(12)    = "Variant"
    arrTypes(13)    = "IUnknown"
    arrTypes(14)    = "Decimal"
    arrTypes(16)    = "TinyInt"
    arrTypes(17)    = "UnsignedTinyInt"
    arrTypes(18)    = "UnsignedSmallInt"
    arrTypes(19)    = "UnsignedInt"
    arrTypes(20)    = "BigInt"
    arrTypes(21)    = "UnsignedBigInt"
    arrTypes(64)    = "FileTime"
    arrTypes(72)    = "GUID"
    arrTypes(128)   = "Binary"
    arrTypes(129)   = "Char"
    arrTypes(130)   = "WChar"
    arrTypes(131)   = "Numeric"
    arrTypes(132)   = "UserDefined"
    arrTypes(133)   = "DBDate"
    arrTypes(134)   = "DBTime"
    arrTypes(135)   = "DBTimeStamp"
    arrTypes(136)   = "Chapter"
    arrTypes(138)   = "PropVariant"
    arrTypes(139)   = "VarNumeric"
    arrTypes(200)   = "VarChar"
    arrTypes(201)   = "LongVarChar"
    arrTypes(202)   = "VarWChar"
    arrTypes(203)   = "LongVarWChar"
    arrTypes(204)   = "VarBinary"
    arrTypes(205)   = "LongVarBinary"
    arrTypes(8192)  = "Array"
    GetDataTypeDesc = arrTypes( myTypeNum )
End Function


Sub Syntax
    Dim strMsg
    strMsg = strMsg & vbCrLf _
           & "AccessRd.vbs,  Version 1.01" & vbCrLf _
           & "Display MS Access database (user) tables and, optionally, their contents"  _
           & vbCrLf & vbCrLf _
           & "Usage:  CSCRIPT  //NOLOGO  ACCESSRD.VBS  access_db_file  [ /T | /TF ]" _
           & vbCrLf & vbCrLf _
           & "Where:  ""access_db_file""   is an MS-Access database file"   & vbCrLf _
           & "        /T                 list table names only"             & vbCrLf _
           & "        /TF                list table and field names only"   & vbCrLf _
           & "                           (default is list tables, field names AND contents)" _
           & vbCrLf & vbCrLf _
           & "Written by Rob van der Woude" & vbCrLf _
           & "http://www.robvanderwoude.com"
    WScript.Echo strMsg
    WScript.Quit(1)
End Sub