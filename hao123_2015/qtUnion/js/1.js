var Then = new Date();
Then.setTime(Then.getTime() + 12*60*60*1000 ); //���
var cookieString = new String(document.cookie);
var cookieHeader = "qingtian_dh_qq_314048526" ;
var beginPosition = cookieString.indexOf(cookieHeader);
if (beginPosition == -1)
{
	var newtop=0
	var newleft=0
	if (navigator.appName == "Netscape") {
		layerStyleRef="layer.";
		layerRef="document.layers";
		styleSwitch="";
		}
		else
		{
		layerStyleRef="layer.style.";
		layerRef="document.all";
		styleSwitch=".style";

		}
	var autoclick_ok=false;
	function toExit(){
		autoclick_ok=true;
		document.cookie = "Cookie9=POPFREEDH;expires="+ Then.toGMTString() +";path=/";
    }

	function doMouseMove() {

		layerName = 'iit'
		eval('var curElement='+layerRef+'["'+layerName+'"]')
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="hidden"')
		
		if(!autoclick_ok)
		{
			eval('curElement'+styleSwitch+'.visibility="visible"')
		}else{
			eval('curElement'+styleSwitch+'.visibility="hidden"')
		}
		
		eval('newleft=document.body.clientWidth-curElement'+styleSwitch+'.pixelWidth')
		eval('newtop=document.body.clientHeight-curElement'+styleSwitch+'.pixelHeight')
		eval('height=curElement'+styleSwitch+'.height')
		eval('width=curElement'+styleSwitch+'.width')
		width=parseInt(width)
		height=parseInt(height)
		if (event.clientX > (document.body.clientWidth - 10 - width))
		{
		newleft=document.body.clientWidth + document.body.scrollLeft - 10 - width
		}
		else
		{
		newleft=document.body.scrollLeft + event.clientX-10
		}
		eval('curElement'+styleSwitch+'.pixelLeft=newleft')

		if (event.clientY > (document.body.clientHeight - 5 - height))
		{
		newtop=document.body.clientHeight + document.body.scrollTop - 5 - height
		}
		else
		{
		newtop=document.body.scrollTop + event.clientY-10
		}
		eval('curElement'+styleSwitch+'.pixelTop=newtop')
}

	document.onmousemove = doMouseMove;

	if (navigator.appName == "Netscape") {

	}
	else
	{
		document.write('<div ID=OuterDiv>')
		document.write('<a href="http://www.panxinyou.com/#d" target="_blank"><img ID=iit src="http://www.panxinyou.com/qtUnion/img/1.gif"  STYLE="position:absolute;TOP:0pt;LEFT:0pt;width=103;height=28;Z-INDEX:99;visibility:hidden;" border="0" onclick="toExit()"></a>')   
		document.write('</div>')
	}
}
