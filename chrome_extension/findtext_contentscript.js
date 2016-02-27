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

function ShowImage(id)
{
    var img = document.getElementById(id);
    img.style.display = "block";
}
function HideImage(id)
{
    document.getElementById(id).style.display = "none";
}

for (var i = 0; i < arrayOfNumbers.length; i++)
{
    for(var j = 0; j < images.length; j++){
        if(images[j].alt.indexOf(arrayOfNumbers[i])>-1)
        {
            newBody = newBody.replace(arrayOfNumbers[i], "<a href="+images[j].src+">"+ arrayOfNumbers[i] + "</a>");
        }
    }
}

document.body.innerHTML = newBody;