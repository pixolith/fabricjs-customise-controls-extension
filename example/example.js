( function() {
    'use strict';
    var image1 = document.createElement( 'img' ),
        image2 = document.createElement( 'img' ),
        canvas,
        width = 1000,
        height = 500;

    //fabric.Object.prototype.setControlsVisibility( {
    //    ml: false,
    //    mr: false
    //} );

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
                'rotateByDegrees': 30
            },
            cursor: 'pointer'
        }
    } );

    // basic settings
    fabric.Object.prototype.customiseCornerIcons( {
        settings: {
            borderColor: '#0094dd',
            cornerSize: 25,
            cornerShape: 'rect',
            cornerBackgroundColor: 'black'
        },
        tl: {
            icon: 'icons/rotate.svg'
        },
        tr: {
            icon: 'icons/resize.svg'
        }
    } );

    canvas = new fabric.Canvas( 'example', {
            width: width,
            height: height
        }
    );

    image1.src = 'cat.jpg';
    fabric.Image.fromURL( image1.src, function( img ) {
        img.set( {
            id: 'cat',
            left: 500,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2,
            originX: 'center',
            originY: 'center',
            hasRotatingPoint: false
        } );

        // overwrite the prototype object based
        img.customiseCornerIcons( {
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
            },
            mt: {
                icon: 'icons/acute.svg'
            }
        }, function() {
            canvas.renderAll();
        } );

        canvas.add( img );
        canvas.setActiveObject( img );

    } );

    image2.src = 'bear.jpg';
    fabric.Image.fromURL( image2.src, function( img ) {
        img.set( {
            id: 'bear',
            left: 100,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2,
            originX: 'center',
            originY: 'center',
            hasRotatingPoint: false
        } );

        // overwrite the prototype object based
        img.customiseCornerIcons( {
            settings: {
                borderColor: 'red',
                cornerSize: 25,
                cornerBackgroundColor: 'red',
                cornerShape: 'circle',
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
            },
            mt: {
                icon: 'icons/acute.svg'
            }
        }, function() {
            canvas.renderAll();
        } );

        canvas.add( img );
    } );

    //fabric.loadSVGFromURL( 'http://fabricjs.com/assets/15.svg', function( ob, op ) {
    //    canvas.add( new fabric.PathGroup( ob, op ).set( {
    //        left: 100,
    //        top: 100,
    //        originX: 'center',
    //        originY: 'center'
    //    } ).scale( 0.4 ) );
    //} );

    canvas.on( {
        'after:render': function() {
            canvas.forEachObject( function( obj ) {
                document.querySelector( '.' + obj.id )
                    .innerText = obj.id + ' z-index: ' + canvas.getObjects().indexOf( obj );
            } );

        }
    } );
} )();
