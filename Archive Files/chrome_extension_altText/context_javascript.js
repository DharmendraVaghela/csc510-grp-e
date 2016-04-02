
alert("dschello");

String.prototype.replaceBetween = function(start, end, what) {
	if(substring(start-5,"alt=")) return this;
	return this.substring(0, start) + what + this.substring(end); 
};

pageBody=document.body.innerHTML;
pageBody=pageBody;
var images = document.getElementsByTagName("img");
var imageAlt, imageSrc;

var imageMap  = new Object();
var startIndex=0;
var pos=0;
alert("hello");

for(var i=0; i<images.length ; i++){
	imageAlt=images[i].alt;
	imageAlt=imageAlt;
	imageSrc=images[i].src;

	imageMap[imageAlt]=imageSrc;
}
var mapSize=Object.keys(imageMap).length;

var altToDelete = new Object();
alert("after imageMap mapsize"+mapSize);

for(var key in imageMap){
		pos= pageBody.indexOf("alt=", startIndex);
		//alert(key+" "+imageMap[key] + "pos"+pos);
		altToDelete[pos]=pos;
		startIndex=pos+1;
		//alert("pos: "+pos" "+"key: "+key);
}
alert("after imageMap");

var keyLength=0;
var pageBodyToRender=""

for(var key in imageMap){
	var position=0;
	if(key==null || key==""){
		alert("Inside continue key"+key);
		continue;
	}
	startIndex=0;
	var keyLength=key.length;
	alert("Key="+key+"keyLength="+keyLength);
	
	while(startIndex < pageBody.length){
		//alert("startIndex: "+startIndex);
		position= pageBody.indexOf(key, startIndex);
			
		//var anchorTag="<a href="+imageMap[key]+">"+"<div><img src="+imageMap[key]+">"+"</img>"+"</div>"+key+ "</a>";
		var anchorTag="zzzzzzzz";
		pageBody.replaceBetween(position, position+keyLength, anchorTag);
		startIndex=position+str.length+1;
		//alert("position: "+position+"position+keyLength: "+position+keyLength);
		}
	}
	alert("startIndex: "+startIndex+"pageBody.length="+pageBody.length);
}
