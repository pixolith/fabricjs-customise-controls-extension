( function() {
    'use strict';
    var image = document.createElement( 'img' ),
        canvas,
        width = 1000,
        height = 1000;

    fabric.Canvas.prototype.overwriteActions = true;
    fabric.Canvas.prototype.fixedCursors = true;

    fabric.Canvas.prototype.setCustomActions( 'tl', 'rotate' );
    fabric.Canvas.prototype.setCustomActions( 'tr', 'scale' );
    fabric.Canvas.prototype.setCustomActions( 'bl', 'remove' );

    fabric.Canvas.prototype.setCustomCornerCursor( 'tl', 'cow.png' );
    fabric.Canvas.prototype.setCustomCornerCursor( 'bl', 'pointer' );

    fabric.Object.prototype.set( {
        borderColor: '#0094dd',
        cornerSize: 34,
        useImageIcons: true
    } );

    fabric.Object.prototype.setCustomCorner( 'tl', 'cow.png' );
    fabric.Object.prototype.setCustomCorner( 'tr', 'cow.png' );
    fabric.Object.prototype.setCustomCorner( 'bl', 'cow.png' );
    fabric.Object.prototype.setCustomCorner( 'br', 'cow.png' );

    canvas = new fabric.Canvas( 'example', {
            width: width,
            height: height
        }
    );

    image.src = 'cat.jpg';
    fabric.Image.fromURL( image.src, function( img ) {
        img.set( {
            left: width / 2,
            top: height / 2,
            scaleX: 0.5,
            scaleY: 0.5,
            originX: 'center',
            originY: 'center',
            hasRotatingPoint: false
        } );

        canvas.add( img );
        canvas.setActiveObject( img );
    } );
} )();
