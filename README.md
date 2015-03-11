This jQuery plugin provides the object **$.clipboard** for unified copy & paste functionality in browsers.

Internet Explorer allows access to the system clipboard via the object **window.clipboard** in both directions, reading and writing.
The way you can read the content of the clipboard differs slightly for other browsers, but is also an easy task, at least if you are within a paste handler.
Writing to the clipboard is more or less impossible with pure JavaScript in other browsers.


### ClipboardApplet

**jquery-clipboard** provides an applet called **ClipboardApplet** to get full access to the clipboard for browsers other than internet explorer.

The usage of the applet is optional. You can read more about the consequences of using it or not using it, in the API section for **getData** and **setData**.

The following steps are needed to use the **ClipboardApplet**:

#### 1. Sign **ClipboardApplet.jar** with a trusted certificate.
More about the Why and How is explained here: [Java Applet & Web Start - Code Signing](http://www.oracle.com/technetwork/java/javase/tech/java-code-signing-1915323.html)

Before signing the applet, it is recommended to modify the values of the arributes **Codebase**, **Application-Library-Allowable-Codebase** and **Caller-Allowable-Codebase** in the **MANIFEST.MF** file inside of the **ClipboardApplet.jar** file for your needs, to further increase the security (see [JAR File Manifest Attributes for Security](http://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html)).

#### 2. Load deployJava.js file
```html
<script src="http://java.com/js/deployJava.js"></script>
```

#### 3. Initialize ClipboardApplet
```javascript
$.clipboard.initApplet("../../ClipboardApplet.jar");
```


### Why is the Flash solution not supported?

First of all, the applet solution is **now** safer than the Flash version. Thanks to the detected vulnerabilities in Java in the last time, the security requirements for applets were increased. That means, applets have to be signed with a trusted certificate now. That's why the applet solution should be the preferred solution for business applications.


### API


#### Initialize the ClipboardApplet - *initApplet(file)*

Initializes the **ClipboardApplet**. You can specify the path of the file via **file** parameter.
If you omit the parameter, "ClipboardApplet.jar" is used.

```javascript
$.clipboard.initApplet("../../ClipboardApplet.jar");
```


#### Get the content of the clipboard - *getData([event])*

Reads the content of the clipboard, using...

1. **window.clipboard.getData** for internet explorer
1. **event.originalEvent.clipboardData.getData** if called from within a paste handler and if event object is passed as param
1. applet **ClipboardApplet** if configured

If the used browser is an internet explorer, **jquery-clipboard** just uses **window.clipboard.getData** to read the content of the clipboard. If the browser is not an internet explorer and you use the method within a paste handler and you pass the event object as param, **event.originalEvent.clipboardData.getData** is used. If you don't pass the event object as param and the **ClipboardApplet** is configured, it is used. If the **ClipboardApplet** is not configured, or is not working for some reason, an error is thrown.


#### Write to the clipboard - *setData(data)*

Writes the specified *data* to the clipboard, using...

1. **window.clipboard.setData** for internet explorer
1. applet **ClipboardApplet** if configured
1. a textarea with the content to be copied and user copy action (CTRL+C) as fallback

If the used browser is an internet explorer, **jquery-clipboard** just uses **window.clipboard.setData** to write the data to the clipboard. If the browser is not an internet explorer and you have configured the **ClipboardApplet**, it is used. If you haven't configured the **ClipboardApplet**, or it is not working for some reason, a textarea is displayed with the data, which shall to be written to the clipboard, already selected. The user can now press **CTRL+C**, or use *copy* from the menu or popup menu, to write the data to the clipboard. The textarea will disappear in the moment it looses the focus.
The displayed textarea represents a fallback solution, which should work for all browsers.


### Example

[Matrix Copy & Paste](http://rawgit.com/dwittner/jquery-clipboard/master/example/matrixCopyAndPaste/index.html)
