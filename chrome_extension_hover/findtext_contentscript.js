var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
console.log(newURL);
console.time();

var array = [];
var hash = new Object();

var regex =  /(fig|figure|fig.)[\s][0-9]/gi;

newBody = document.body.innerHTML;

array = newBody.toString().match(regex);

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
        if(images[j].alt.indexOf(arrayOfWords[i])>-1)
        {
            if(images[j].src!=undefined){
                hash[arrayOfWords[i]] = images[j].src;
                alert(arrayOfWords[i]);
                alert(hash[arrayOfWords[i]]);
            }
        }
    }
}

console.log(hash);

var css = 'a>div { display: none; } a:hover>div { display: block; }';
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
            var rep = "<a href="+img+">"+"<div><img src="+img+">"+"</img>"+"</div>"+ arrayOfWords[i] + "</a>";
            var r = new RegExp(arrayOfWords[i], 'gi');
            newBody = newBody.replace(r, rep);
            console.log(arrayOfWords[i]);
            console.log(rep);
        }
}

document.body.innerHTML = newBody;
