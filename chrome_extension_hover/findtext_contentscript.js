var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
console.log(String(newURL));
console.time();

var array = [];
var hash = new Object();

var regex =  /(fig|figure|fig.|Fig.)[\s][0-9]/gi;

newBody = document.body.innerHTML;

array = newBody.toString().match(regex);
//console.log(array)
var arrayOfWords=[];
for (var i = 0; i < array.length; i++)
{ 
    if(arrayOfWords.indexOf(array[i])<0){
        arrayOfWords.push(array[i].toString());
    }
}
console.log(arrayOfWords);

var images = document.getElementsByTagName("img");

for (var i = 0; i < arrayOfWords.length; i++)
{
    for(var j = 0; j < images.length; j++)
    {
        //var exp = /\d+/gi;
        //var num = arrayOfWords[i].toString().match(exp)[0];
        if(images[j].alt.indexOf(arrayOfWords[i])>-1)
        {
            if(images[j].src!=undefined){
                hash[arrayOfWords[i]] = images[j].src;
                //alert(arrayOfWords[i]);
                //alert(hash[arrayOfWords[i]]);
            }
        }
    }
}

var keys = Object.keys(hash);

console.log(keys);

for(var i = 0; i < keys.length; i++)
    {
        var exp = /\d+/gi;
        var num = keys[i].toString().match(exp)[0];

        for(var j = 0; j < arrayOfWords.length; j++)
        {
            var exp1 = /\d+/gi;
            var num1 = arrayOfWords[j].toString().match(exp1)[0];

            if(num == num1){

                hash[arrayOfWords[j]] = hash[keys[i]];
            }
        }

    }

console.log(hash);

//var css = 'a>div { display: none; } a:hover>div { display: block; left: 123px; top: 56px;}';  
var css = ' .thumbnail img{ border: 1px solid white; margin: 0 0px 0px 0; } .thumbnail:hover{ position: relative; background-color: transparent; } .thumbnail:hover img{ border: 1px solid blue; } .thumbnail span{ position: absolute; padding: 0px; left: -1000px; border: 1px; visibility: hidden; color: black; text-decoration: none; } .thumbnail span img{ border-width: 0; padding: 0px; } .thumbnail:hover span{ visibility: visible; top: 0; left: -230px; z-index: 100; }';  
 
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

document.head.appendChild(style);

for (var i = 0; i < arrayOfWords.length; i++)
{    
    var img = hash[arrayOfWords[i]];
        if(img != undefined)
        {
            //var rep = "<a href="+img+">"+"<div><img src="+img+">"+"</img>"+"</div>"+ arrayOfWords[i] + "</a>";
            var rep = "<a class=thumbnail href="+'#thumb'+">"+ arrayOfWords[i]+"<span><img src="+img+">"+"</img>" + "</span></a>";
            //var rep = "<a class=thumbnail href="+'#thumb'+">"+ arrayOfWords[i]+"<span><img src="+img+">"+"</img>" + "</span></a>";
            var r = new RegExp(arrayOfWords[i], 'gi');
            newBody = newBody.replace(r, rep);
            console.log(arrayOfWords[i]);
            console.log(rep);
        }
}

document.body.innerHTML = newBody;
