( function() {
    'use strict';
    var image = document.createElement( 'img' ),
        canvas,
        width = 1000,
        height = 500;

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
