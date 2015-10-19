( function() {
    'use strict';
    var image = document.createElement( 'img' ),
        canvas,
        width = 1000,
        height = 500;

    fabric.Canvas.prototype.setCustomActions( {
        tl: 'rotate',
        tr: 'scale',
        bl: 'remove'
    } );

    fabric.Canvas.prototype.setCustomCornerCursor( {
        tl: 'cow.png',
        bl: 'pointer'
    } );

    fabric.Object.prototype.set( {
        borderColor: '#0094dd',
        cornerSize: 34
    } );

    fabric.Object.prototype.setCustomCorner( {
        tl: 'cow.png',
        tr: 'cow.png',
        bl: 'cow.png',
        br: 'cow.png'
    } );

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
