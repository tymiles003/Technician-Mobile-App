# JSTemplateApp Installation

This documentation contains the steps needed in order to use the template.
It assumed that you have done the prerequisite (you can find it in prerequisite.md).

You can rename the project by using the RENAMEPROJECT.bat at the top of the zip. 
It will use fnr.exe to replace all occurence of "jsTemplateApp" to the name you 
entered in the console.

## Update node packages

The first step is to update the node packages of the application.

1. Open a new command windows 
2. Go inside the folder of the template by typing "cd C:\JSTemplateApp\" for example
3. Then type "npm update"

You have to wait until the download and installation of the package is done.
The karma-phantomjs-launcher will probably failed. You'll have to install it manualy.

In order to do that you have to copy the folder "karma-phantomjs-launcher" in the
JSTemplateApp.zip and paste it to "JSTemplateApp/node_modules".

## Update bower packages

Now, we have to update the bower packages.

1. In the same command windows
2. Be sure to be in the folder of the template
3. Then type "bower update"

Again, you have to wait until the download is complete.

## Grunt

The template is now ready to use. You can launch it by typing : "grunt live".

## Versions

This template contains :

"angular": "1.3",
"angular-apimock": "0.1.6",//interceptor
"angular-i18n": "~1.3",//langage
"angular-mocks": "~1.3",//test
"angular-messages": "~1.3",//error
"angular-moment": "~0.7.0",//date
"angular-bootstrap": "0.12.0",//UI
"angular-ui-router": "~0.2",//routes
"angular-ui-utils": "0.0.3",
"angular-webstorage": "~0.10.3",
"bootstrap": "3.3.1",
"moment": "~2.5",
"jquery": "~1.10.0",
"jqueryui": "~1.10.4",
"stacktrace": "~0.6.0"

It also contains a JQuery plugin for datatables : https://datatables.net/

You can also look at this blog post on the new feature for (form validation in Angular 1.3)
[http://www.htmlxprs.com/post/11/angularjs-1.3-form-validation-tutorial]
