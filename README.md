This jQuery plugin provides the object **$.clipboard** for unified copy & paste functionality in browsers.

## Low Level API

Internet Explorer allows access to the system clipboard via the object **window.clipboard** in both directions, reading and writing.
The way you can read the content of the clipboard differs slightly for other browsers, but is also an easy task. Writing to the
clipboard is more or less impossible with pure JavaScript. Therefore you have to use workarounds to circumvent that restriction.

### Get the content of the clipboard - *getData(event)*

In order that you don't have to bother yourself with the different ways of reading the clipboard content, **jquery-clipboard** provides
the method **$.clipboard.getData**. The method is intended to be used in a paste handler, therefore it expects the event object passed
as param. It can be used as follows

```javascript
$('input').on("paste", function (event) {
    var data = $.clipboard.getData(event);
    ...
});
```

### Write to the clipboard - *setData(data)*

**jquery-clipboard** provides 3 different ways to write to the clipboard.

1. **window.clipboard.setData** for internet explorer
1. the applet **ClipboardApplet** to circumvent the restriction (if configured)
1. a textarea with the content to be copied and user copy action (CTRL+C) as fallback

If the used browser is an internet explorer, **jquery-clipboard** just uses **window.clipboard.setData** to write the data to the
clipboard. If the browser isn't an internet explorer and you haven't configured the **ClipboardApplet**, or it isn't working for some
reason, a textarea is displayed with the data, which is to be written to the clipboard, already selected. The user now can press **CTRL+C**,
or use *copy* from the menu or popup menue, to write the data to the clipboard. The textarea disappears in the moment it looses the focus.
The displayed textarea represents a fallback solution, which should function for all browsers.


### Initialize the ClipboardApplet - *initApplet(file)*

Initializes the **ClipboardApplet**. You can specify the path of the file via **file** parameter.
If you omit the parameter, "ClipboardApplet.jar" is used.

```javascript
$.clipboard.initApplet("../../ClipboardApplet.jar");
```


#### ClipboardApplet

The following steps are needed to use the **ClipboardApplet**:

### 1. Sign **ClipboardApplet.jar** with a trusted certificate.
More about the Why and How is explained here: [Java Applet & Web Start - Code Signing](http://www.oracle.com/technetwork/java/javase/tech/java-code-signing-1915323.html)

### 2. Load deployJava.js file
```html
<script src="http://java.com/js/deployJava.js"></script>
```

### 3. Initialize ClipboardApplet
```javascript
$.clipboard.initApplet("../../ClipboardApplet.jar");
```


#### Why isn't the Flash workaround supported?

First of all the applet workaround is **now** safer than the Flash version. Thanks to the detected vulnerabilities in Java
in the last time, the security requirements for applets were increased. That means applets have to be signed with a trusted
certificate. That's why the applet workaround should be the preferred solution for business applications, in my opinion.
But as long as internet explorer supports the unsafe way to write data to the clipboard, it is difficult to argue that way
and for sure there are applications, for which writing to the clipboard the unsafe way is not an issue.


## High Level API

Additionally to the basic functions provided by the object **$.clipboard**, the plugin provides the following convenient method,
which can be called on selected jQuery elements.


### *pasteAll(pasteHandler)*

What the method does is, it registers the given `pasteHandler` to the paste event of all selected elements, indirectly.
Indirectly means, that in fact another handler is registered, which calls the given `pasteHandler` for every selected element.
...