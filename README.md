# Customise the controls of fabric.js
Change the icon / cursor / action of the fabric.js corner controls.

# Install

```
bower install fabric-customise-controls --save
```

# Concerning fabric.js 1.6.x and current master compatibility
This repo is originally targeted at the latest stable version of fabric.js (1.5.0). Still in case you need the
features that are currently in development in fabric.js you can check out the branch here:
https://github.com/pixolith/fabricjs-customise-controls-extension/tree/fabric-current-master-compat

It is a working draft for this extension for the current version of fabric.js.
I will try maintain this as well but since fabric.js is subject to regular updates there is no guarantee that
it will always work flawlessly. Please report any bugs you find :)

# Demo
http://pixolith.github.io/fabricjs-customise-controls-extension/example/index.html

## What is this?
This is an extension which overwrites certain functions in the fabric.js core to enable you to customise the controls
through easy settings in your fabric.js project preserving the opportunity to update the fabric.js libary in the future.

## Why would you want this?
Well, i have felt the need to adapt the fabric.js UI to the project is is put in. Especially special actions and icons for the
controls were needed. Since you can't do that without massively hacking the core, it seemed cleaner to create this for future use.

## How to use
Add customiseControls.js (or its minified version) to your fabric.js project and reference in your html:
```
<script defer src="../path-to/fabric.min.js"></script>
<script defer src="../path-to/customiseControls.js"></script>
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
    }
});
```

This will overwrite the actions and cursor handler for adding custom actions.

```
tl: object
```

tl (top-left) corner passing an object consisting of corner ```action``` (see Actions) and ```cursor``` (see Cursors).
An Exception is the new ```rotateByDegrees``` action which also takes the amount of degrees you want to rotate as an integer.

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

**Default action is: 'scale'**

#### Cursors:

currently the native cursors are possible as well as a custom cursor url.

Depending on what you set the javascript will detect if you have set an image which needs to be loaded or a native cursor.

**Default is: resize direction cursor (e.g north-west arrow cursor)**

### Customising the Corner Icons

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
});
```

This will overwrite the controls handler (for all Objects) for adding custom icons and corresponding background-shapes and colors (since 0.0.3).

#### Settings:

```cornerSize: int```

size in pixels of the corner control box

Default in fabric.js: 12
* * *
```cornerShape: 'string'```

shape of the corner control box. Currently supports ```'rect'``` and ```'circle'```

Default: No Shape will be drawn
* * *
```borderColor: 'string'```

the color of the bounding box border

Takes any Color String as String/Hex/RGB e.G: ```'black'```

Default in fabric.js: 'rgba(102,153,255,0.75)'
* * *
```cornerBackgroundColor: 'string'```

the color of the background shape
Takes any Color String as String/Hex/RGB e.G: ```'black'```

Default: 'transparent'
* * *
```cornerPadding: int```

the inner Padding between icon image and background shape.

Takes any pixel integer.

Default: 0
* * *
```tl: object```

corner-type passing an object with the desired ```icon``` url
* * *

**Important:** You don't have to chose a combination of icon and background-color, it is also possible to use a fully styled icon image with the background included
as an icon. The Background-color is simply meant to support transparent layered icons, so they can be placed inside a coloured control box.
The default Background-color is transparent.

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
});
```

**Default is: currently not drawing anything but displaying a warning that your image might be corrupt unless cornerShape is set.
Then it will draw the Shape and display a console warn about the image url.**

You can set the size of the control icons or the border color with the standard setter too if you like to, yet it is also included in
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
