<!--#include file="canvas.asp"-->
<%

	Dim objCanvas
	Dim PointX,PointY,PointColor
	Dim iTemp
	Dim SafeCode
	Dim R,G,B,cc,kk	
	cc=57
	kk=20
	SafeCode = ""
	Session("SafeCode") = ""
	
	BGColor = "FFFFFF"
	
	R = Mid(BGColor,1,2)
	G = Mid(BGColor,3,2)
	B = Mid(BGColor,5,2)
		
	
	
	R = DecHex(R)
	G = DecHex(G)
	B = DecHex(B)
	
	Set objCanvas = New Canvas
	
	objCanvas.GlobalColourTable(0) = RGB(255,255,255) ' White
	objCanvas.GlobalColourTable(1) = RGB(0,0,0) ' Black
	objCanvas.GlobalColourTable(2) = RGB(255,0,0) ' Red
	objCanvas.GlobalColourTable(3) = RGB(0,255,0) ' Green
	objCanvas.GlobalColourTable(4) = RGB(0,0,255) ' Blue
	objCanvas.GlobalColourTable(5) = RGB(128,0,0) 
	objCanvas.GlobalColourTable(6) = RGB(0,128,0) 
	objCanvas.GlobalColourTable(7) = RGB(0,0,128)
	objCanvas.GlobalColourTable(8) = RGB(158,158,100) 
	objCanvas.GlobalColourTable(9) = RGB(0,128,128) 
	objCanvas.GlobalColourTable(10) = RGB(128,0,128)
	objCanvas.GlobalColourTable(11) = RGB(R,G,B)

	objCanvas.BackgroundColourIndex = 8
	
	objCanvas.Resize cc,kk,false	
	
	
	Randomize timer
	SafeCode = cint(8999*Rnd+1000)	
		
	For iTemp = 0 To 100
		Randomize timer
		PointX = Int(Rnd * cc)
		PointY = Int(Rnd * kk)
		PointColor = Int(Rnd * 5)+5
		objCanvas.ForegroundColourIndex	= PointColor		
		objCanvas.Line PointX,PointY,PointX,PointY	
		
	next	
	
	objCanvas.ForegroundColourIndex = 1
	objCanvas.Line 1,1,cc,1
	objCanvas.Line 1,kk,1,1
	objCanvas.Line 1,kk,cc,kk
	objCanvas.Line cc,1,cc,kk
	
	Session("SafeCode") = SafeCode
	dim sc,sk
	Randomize timer
	sc = cint(1*Rnd)
	sk = cint(1*Rnd)
	objCanvas.DrawTextWE sc,sk,SafeCode
	objCanvas.Write
		



Function DecHex (HStr)
	
	Dim Result
	Dim i,L
	
	Result = 0
	
	
	L = Len(Hstr)
	

	For i = L-1 To 0 Step -1
	
		Result = Result + (16 ^ i)*GetDecBit(Mid(HStr,i+1,1))
		
	Next
	
	DecHex = Result
	
End Function

Function GetDecBit (HStr)
	
	Dim Result
	Dim R(16)
	Dim i
	
	Result = 0
	
	R(0) = "0"
	R(1) = "1"
	R(2) = "2"
	R(3) = "3"
	R(4) = "4"
	R(5) = "5"
	R(6) = "6"
	R(7) = "7"
	R(8) = "8"
	R(9) = "9"
	R(10) = "A"
	R(11) = "B"
	R(12) = "C"
	R(13) = "D"
	R(14) = "E"
	R(15) = "F"
	
	For i = 0 To 15
		
		if HStr=R(i) Then Result = i : Exit For
		
	Next 
	
	GetDecBit = Result
	
End Function
%>