# Customise the controls of fabric.js
Implementation of a way of changing the icon / cursor / action of the fabric.js corner controls.

# Live Demo Page
http://www.simonkunz.io/demos/fabric-js-customise-controls/example/index.html

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

### There are three settings you can enable:
#### 1.
```
fabric.Canvas.prototype.setCustomActions( {
    tl: 'rotate',
    tr: 'scale',
    bl: 'remove'
} );
```

This will overwrite the actions handler for adding custom actions.

tl' meaning the top-left corner will have the action 'rotate'.

currently the following actions are possible:

* drag
* scale
* scaleX
* scaleY
* rotate
* remove (custom)

Default is: 'scale'

#### 2.

```
fabric.Canvas.prototype.setCustomCornerCursor( {
    tl: 'cow.png',
    bl: 'pointer'
} );
```

This will overwrite the cursor handler for adding custom cursors.

Depending on what you set the javascript will detect if you have set an image which needs to be loaded or a build-in cursor.

Default is: resize direction cursor

#### 3.

```
fabric.Object.prototype.setCustomCorner( {
    tl: 'cow.png',
    tr: 'cow.png',
    bl: 'cow.png',
    br: 'cow.png'
} );
```

This will overwrite the controls handler for adding custom icons.

Default: currently not drawing anything but displaying a warning.

You can set size of the control icons with the standard corner size setting. It is also still possible to change the border color
of the bounding rectangle of the object.

```
fabric.Object.prototype.set( {
    borderColor: '#000000',
    cornerSize: 34,
    } );
```

That should be it, feel free to contact me concerning bugs or improvements.

## Example Implementation
There is an example implementation in the example folder, just open the index file and check out how the custom handles look like
when applied to the test image. The source for that is also provided in the example.js.

## Usage
Licensed under the MIT license.
