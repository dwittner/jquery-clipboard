This jQuery plugin provides the object **$.clipboard** for standardizing copy & paste functionality in browsers.

## Low Level API

Internet Explorer allows access to the system clipboard via the object **window.clipboard** in both directions, reading and writing.
The way you can read the content of the clipboard differs slightly for other browsers, but is also an easy task. Writing to the
clipboard  

### Get the content of the clipboard - `getData(event)`

All you have to do is to register a
paste handler and to read the content from the propery **clipboardData** of the passed event object.

In order you don't have to bother yourself with the different ways of reading the clipboard content, **jquery-clipboard** provides 
the method **$.clipboard.getData**. The method is intended to be used in a paste handler, therefore it expects the event object passed
as param. It can be used as follows

```javascript
$('input').on("paste", function (event) {
    var data = $.clipboard.getData(event);
    ...
});
```

### Write to the clipboard - `setData(data)`

Writing to the clipboard is only allowed in internet explorer. Thus you need workarounds for all other browsers.  
**jquery-clipboard** provides 3 ways to write to the clipboard.

1. **window.clipboard.setData** for internet explorer
1. an applet to circumvent the restriction (if configured)
1. a textarea with the content to be copied and user copy action (CTRL+C) as fallback



## High Level API

Additionally to the basic functions provided by the object **$.clipboard**, the plugin provides the following convenient method,
which can be called on selected jQuery elements.


### `pasteAll(pasteHandler)`

What the method does is, it registers the given `pasteHandler` to the paste event of all selected elements, indirectly.
Indirectly means, that in fact another handler is registered, which calls the given `pasteHandler` for every selected element.
...