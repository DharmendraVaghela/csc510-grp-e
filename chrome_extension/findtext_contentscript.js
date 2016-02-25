var arrayOfNumbers = [];
var hash = {};
//alert("hi");
var regex =  /\w*[figure|Fig.|fig][ ][0-9]/gi;
//var regex3 = /((https|http)?:\/\/.*\.(?:png|jpg))/i;
//var regex4 = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
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


input_content=newBody;
var matches = [];

input_content.replace(/[^<]*(<a href="([^"]+)">([^<]+)<\/a>)/g, function () {
    matches.push(Array.prototype.slice.call(arguments, 1, 4));
});

alert(matches.join("\n"));


/*
reg = new RegExp(
    "[\\w/.]*(jpg|gif|png)(\\?[\\w=&]*)?",
    "gi");
*/
/*
reg = new RegExp(
    "/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))",
    "gi");
var result;
var images = [];
while ((result = reg.exec(newBody)) !== null) {
    var res0 = result[0];
    images.push(res0);
}
*/
//alert(images.join("\n"))
//alert(arrayOfNumbers.join("\n"));

for (var i = 0; i < arrayOfNumbers.length; i++)
{
    newBody = newBody.replace(arrayOfNumbers[i], "<a href='http://www.google.com'>" + arrayOfNumbers[i] + "</a>");
}
document.body.innerHTML = newBody;