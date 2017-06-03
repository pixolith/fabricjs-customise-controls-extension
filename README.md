# Customise the controls of fabric.js
Implementation of a way of changing the icon / cursor / action of the fabric.js corner controls.

# How to install

## Bower

```
bower install fabric-customise-controls --save
```

## npm

```
npm install fabric-customise-controls --save
```

## yarn
```
yarn add fabric-customise-controls
```

# Note on versions
if you support the latest version of fabric.js (from 1.6.0 on) use the release 0.1.0 of this extension. Otherwise all older releases have
downward compatibility for fabric.js 1.5.0 but of course not all current features.

# Live Demo Page
http://pixolith.github.io/fabricjs-customise-controls-extension/example/index.html

## What is this?
This is an extension which overwrites certain functions in the fabric.js core to enable you to customise the controls
through easy settings in your fabric.js project preserving the opportunity to update the fabric.js libary in the future.

## Why would you want this?
Well, i have felt the need to adapt the fabric.js UI to the project is is put in. Especially special actions and icons for the
controls were needed. Since you can't do that without massively hacking the core, it seemed cleaner to create this for future use.

## Support
If you want to support the development of this feel free to buy me a beer at <https://www.paypal.me/mdslktr>. I started this for a former client project of mine
and knowing that the need for customisation in fabric.js is rather large especially when put in client branded projects. Today most of my time will
be in different projects but actively supporting this extension for future fabric.js releases will still be a goal of mine until it hopefully lands natively in [fabric.js](https://www.bountysource.com/issues/8054100-ability-to-customize-controls) itself.

## How to use
Add customiseControls.js (or its minified version) to your fabric.js project and reference in your html:
```
<script defer src="../path-to/fabric.min.js"></script>
<script defer src="../path-to/customiseControls.js"></script>
```

or ES6 import
```
import fabric from 'fabric';
import 'fabric-customise-controls';
```

### Customising the Controls:
```
fabric.Canvas.prototype.customiseControls({
    tl: {
        action: 'rotate',
        cursor: 'cow.png'
    },
    tr: {
        action: 'scale'
    },
    bl: {
        action: 'remove',
        cursor: 'pointer'
    },
    br: {
        action: 'moveUp',
        cursor: 'pointer'
    },
    mb: {
        action: 'moveDown',
        cursor: 'pointer'
    },
    mt: {
        action: {
            'rotateByDegrees': 45
        }
    },
    mr: {
        action: function( e, target ) {
            target.set( {
                left: 200
            } );
            canvas.renderAll();
        }
     }
}, function() {
    canvas.renderAll();
} );
```

This will overwrite the actions and cursor handler for adding custom actions.

* **tl: object**

top-left corner passing an object consisting of corner action (see Actions) and cursor (see Cursors)

* **cb: function**

Callback

#### Actions:

currently the following actions are possible:

* drag
* scale
* scaleX
* scaleY
* rotate
* remove (custom)
* moveUp (z-index, custom) since 0.0.3
* moveDown (z-index, custom) since 0.0.3
* rotateByDegrees: int (custom) since 0.0.4 (origin can now be set to anything)
* define your own functions so i don't have to do it since 0.1.2 ( see the example above, returned are always the event and the target for you to use )

**Default action is: 'scale'**

#### Note on having custom control actions for each object

Since technically the prototype for binding actions in fabric.js is the Canvas which means you won't get custom controls for each object by default. [craziduezi](https://github.com/craziduezi) came up with the idea of binding fabric.Canvas.prototype.customiseControls to an event handler and changing it on the fly if you need to. This is a nice workaround for something that would otherwise need to be changed in the core.
See this link for reference:
https://github.com/pixolith/fabricjs-customise-controls-extension/issues/28

#### Cursors:

currently the native cursors are possible as well as a custom cursor url.

Depending on what you set the javascript will detect if you have set an image which needs to be loaded or a native cursor.

**Default is: resize direction cursor**

### Customising the corner icons

```
fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10
    },
    tl: {
        icon: 'icons/rotate.svg'
    },
    tr: {
        icon: 'icons/resize.svg'
    },
    bl: {
        icon: 'icons/remove.svg'
    },
    br: {
        icon: 'icons/up.svg'
    },
    mb: {
        icon: 'icons/down.svg'
    }
}, function() {
    canvas.renderAll();
} );
```

This will overwrite the controls handler (for all Objects) for adding custom icons and corresponding background-shapes and colors (since 0.0.3).

* **cornerSize: int**

size in pixels of the corner control box

* **cornerShape: string ('rect', 'circle')**

shape of the corner control box

* **borderColor: string (color)**

color of the bounding box border (even 'rgba(255, 165, 0, 0.25)' with opacity works)

* **cornerBackgroundColor: string (color)**

color of the background shape

* **cornerPadding: int**

inner Padding between icon image and background shape

* **tl: object**

corner-type passing an object with the desired icon url

* **cb: function**

Callback

You can also set these settings **Object specific** using inheritance of this prototype (since 0.0.3):

```
yourFabricObject.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10
    },
    tl: {
        icon: 'icons/rotate.svg'
    },
    tr: {
        icon: 'icons/resize.svg'
    },
    bl: {
        icon: 'icons/remove.svg'
    },
    br: {
        icon: 'icons/up.svg'
    },
    mb: {
        icon: 'icons/down.svg'
    }
}, function() {
    canvas.renderAll();
} );
```

**Default is: currently not drawing anything but displaying a warning that your image might be corrupt unless cornerShape is set.
Then it will draw the Shape and display a console warn about the image url.**

### Customising the corner icons per corner (since 0.2.6)

You can now set specific options per corner for increased customizability (currently limited to: **cornerShape**, **cornerBackgroundColor** and **cornerPadding**). This works on the prototype like this:

```
fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10
    },
    tl: {
        icon: 'icons/rotate.svg',
        settings: {
            cornerShape: 'rect',
            cornerBackgroundColor: 'red',
            cornerPadding: 10,
        },
    },
    tr: {
        icon: 'icons/resize.svg'
    },
    bl: {
        icon: 'icons/remove.svg'
    },
    br: {
        icon: 'icons/up.svg'
    },
    mb: {
        icon: 'icons/down.svg'
    }
}, function() {
    canvas.renderAll();
} );
```

For the **object-specific** settings it works the same, simply putting the settings on the object you want to customise:

```
yourFabricObject.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10
    },
    tl: {
        icon: 'icons/rotate.svg',
        settings: {
            cornerShape: 'rect',
            cornerBackgroundColor: 'red',
            cornerPadding: 10,
        },
    },
    tr: {
        icon: 'icons/resize.svg',
        settings: {
            cornerShape: 'circle',
            cornerBackgroundColor: '#000',
            cornerPadding: 15,
        },
    },
    bl: {
        icon: 'icons/remove.svg'
    },
    br: {
        icon: 'icons/up.svg'
    },
    mb: {
        icon: 'icons/down.svg'
    }
}, function() {
    canvas.renderAll();
} );
```

Please note that setting this on the prototype for a specific corner will overwrite default settings for each corner, which means that your default config for a specific object
will be overwritten by the corner prototype settings. So prototype corner settings are only viable if all objects have the same setup.
You can check the newly added example for hints how this might be useful. 

## fabric.js related settings
You can set the size of the control icons or the border color with the standard setter too if you like, yet it is also included in
the function above.

```
fabric.Object.prototype.set( {
    borderColor: '#000000',
    cornerSize: 34,
    } );
```

That should be it, feel free to contact me concerning bugs or improvements.

## Note

American english can be used too, so calling:
```
fabric.Object.prototype.customizeCornerIcons
fabric.Canvas.prototype.customizeControls
```
works too.

## Example Implementation
There is an example implementation in the example folder, just open the index file and check out how the custom handles look like
when applied to the test images. The source for that is also provided in the example.js.

## Usage
Licensed under the MIT license.
