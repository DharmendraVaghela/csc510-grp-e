var arrayOfNumbers = [];

var regex =  /\w*[figure|Fig.|fig][ ][0-9]/gi;

newBody = document.body.innerHTML;
var i = 0;
do
{
    temp = regex.exec(newBody);
    if (temp != null)
        arrayOfNumbers[i] = temp;
    i++
}
while (temp)

var myArray=new Array(100);

for (i=0; i <100; i++)
    myArray[i]=new Array(2);

var images = document.getElementsByTagName("img");

//background: red; 
var css = 'a>div { display: none; } a:hover>div { display: block; }',
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

for (var i = 0; i < arrayOfNumbers.length; i++)
{
    for(var j = 0; j < images.length; j++){
        if(images[j].alt.indexOf(arrayOfNumbers[i])>-1)
        {   
            newBody = newBody.replace(arrayOfNumbers[i], "<a href="+images[j].src+">"+"<div><img src="+images[j].src+">"+"</img>"+"</div>"+ arrayOfNumbers[i] + "</a>");
        }
    }
}

document.body.innerHTML = newBody;