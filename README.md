# Customise the controls of fabric.js
Implementation of a way of changing the icon / cursor / action of the fabric.js corner controls.

# Install

```
bower install fabric-customise-controls
```

# Live Demo Page
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
fabric.Canvas.prototype.customiseControls( {
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
    }
} );
```

This will overwrite the actions and cursor handler for adding custom actions.

tl' meaning the top-left corner will have the action 'rotate' and the cursor icon url cow.png

#### Actions:

currently the following actions are possible:

* drag
* scale
* scaleX
* scaleY
* rotate
* remove (custom)

The default action is: 'scale'


#### Cursors:

currently the native cursors are possible as well as a custom cursor url.

Depending on what you set the javascript will detect if you have set an image which needs to be loaded or a native cursor.

Default is: resize direction cursor

### Customising the Corner Icons

```
fabric.Object.prototype.customiseCornerIcons( {
    settings: {
        borderColor: '#0094dd',
        cornerSize: 34
    },
    tl: {
        icon: 'cow.png'
    },
    tr: {
        icon: 'cow.png'
    },
    bl: {
        icon: 'cow.png'
    },
    br: {
        icon: 'cow.png'
    }
} );
```

This will overwrite the controls handler for adding custom icons.

Default: currently not drawing anything but displaying a warning that your image might be corrupt.

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
when applied to the test image. The source for that is also provided in the example.js.

## Usage
Licensed under the MIT license.
