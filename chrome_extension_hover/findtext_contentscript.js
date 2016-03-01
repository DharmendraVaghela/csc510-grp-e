var arrayOfWords = [];

//var regex =  /\w*[figure|Figure|fig|fig.][\s][0-9]/gi;
var regex =  /(fig|figure|fig.)[\s][0-9]/gi;

newBody = document.body.innerHTML;

array = newBody.toString().match(regex);

/*
var i = 0;
do
{
    temp = newBody.toString().match(regex);
    if (temp != null)
    {
        alert(temp);
        arrayOfWords[i] = temp;
        
    }
    i++
}
while (temp)
*/
var arrayOfWords=[];
for (var i = 0; i < array.length; i++)
{ 
    if(arrayOfWords.indexOf(array[i])<0){
        arrayOfWords.push(array[i]);
    }
    //alert(arrayOfWords[i]);
}
alert(arrayOfWords);
var images = document.getElementsByTagName("img");

var anchors = document.getElementsByTagName("a");

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

newBody = document.body.innerHTML;

for (var i = 0; i < arrayOfWords.length; i++)
{   
    for(var j = 0; j < images.length; j++)
    {   
        if(images[j].alt.indexOf(arrayOfWords[i])>-1)
        {   
            //alert(arrayOfWords[i]);
            var rep = "<a href="+images[j].src+">"+"<div><img src="+images[j].src+">"+"</img>"+"</div>"+ arrayOfWords[i] + "</a>";
            newBody = newBody.replace(arrayOfWords[i], rep);
            alert(arrayOfWords[i]);
            alert(rep);
        }
    }
}

document.body.innerHTML = newBody;