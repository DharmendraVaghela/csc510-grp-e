## Improving Readability of an infographic Web Page

## Team Members
Aditya Mandhare, Dharmendra Vaghela, Rohit Mandge, Rupaj Soni

## Problem
It is often observed that a web page contains images and references to these images are made at multiple places across the page. In this case the reader has to scroll back and forth through the web page every time he has to refer to an image. This is highly inconvenient. Due to this, the user faces many problems like loss of continuity, comprehension and context. It also puts stress on user’s vision, due to which the user cannot concentrate fully. It also consumes considerable amount of user time. This results in spoiling the user’s reading experience.

## Solutions
**[Solution 1](https://github.com/DharmendraVaghela/csc510-grp-e/tree/master/chrome_extension_hover): Displaying image in a pop-up on hovering over its reference**
In this solution first we created a regular expression which searches image references in the web page. A Map has been created which stores key-value pairs wherein the key equals the “alt” argument of the <img/> tag and the value equals the corresponding “src” argument of the <img/> tag. A string replacement method has been created. This method has the task of converting each of the image references into a hyperlink. The hyperlink contains an on-hover functionality which enables the referenced image to pop-up, when the user hovers over it.  

**[Solution 2](https://github.com/DharmendraVaghela/csc510-grp-e/tree/master/Chrome_Extention_SideBar): Display thumbnails of all images in the page in a sidebar**
In this solution, we first scan the page to search for images contained in it. These images are then extracted and converted into thumbnails. A sidebar has been created which holds these thumbnails and scrolls with the page.  Being on the side of the screen, the sidebar is easily accessible (according to Fitts’ law) and the user can click these thumbnails contained in the sidebar. On click the user’s page is automatically scrolled to display the original image in the page. 

**[Solution 3](https://github.com/DharmendraVaghela/csc510-grp-e/tree/master/Chrome_Extension_New_Tab): Click on image reference to open image it in a new tab**
The “alt” value of the “img” tag associated with each image is stored in a map. If the page source contains any key from the map, the text is converted to a hyperlink. When the user clicks on this link, a new tab opens with the source image. The user can switch between tabs as and when required and refer the desired images without disrupting his continuity.

## March 1 Deliverables

1. [Issues page](https://github.com/DharmendraVaghela/csc510-grp-e/issues)

2. [Contributor's page](https://github.com/DharmendraVaghela/csc510-grp-e/graphs/contributors)

3. [Sample Telemetry Output Log](https://github.com/DharmendraVaghela/csc510-grp-e/blob/master/Report/chrome_console.log)

4. [Milestone page](https://github.com/DharmendraVaghela/csc510-grp-e/milestones) 
