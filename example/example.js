'use strict';
(function() {
    var image1 = document.createElement('img'),
        image2 = document.createElement('img'),
        image3 = document.createElement('img'),
        canvas,
        width = 1000,
        height = 500,
        randomColor = function randomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

    //fabric.Object.prototype.setControlsVisibility( {
    //    ml: false,
    //    mr: false
    //} );

    fabric.Canvas.prototype.customiseControls({
        tl: {
            action: 'rotate',
            cursor: 'cow.png',
        },
        mtr: {
            action: 'rotate',
            cursor: 'cow.png',
        },
        tr: {
            action: 'scale',
        },
        bl: {
            action: 'remove',
            cursor: 'pointer',
        },
        br: {
            action: 'moveUp',
            cursor: 'pointer',
        },
        mb: {
            action: 'moveDown',
            cursor: 'pointer',
        },
        mr: {
            action: function(e, target) {
                target.set({
                    left: 200,
                });
                canvas.renderAll();
            },
            cursor: 'pointer',
        },
        mt: {
            action: {
                'rotateByDegrees': 30,
            },
            cursor: 'pointer',
        },
    });

    // basic settings
    fabric.Object.prototype.customiseCornerIcons({
        settings: {
            borderColor: '#0094dd',
            cornerSize: 25,
            cornerShape: 'rect',
            cornerBackgroundColor: 'black',
        },
        tl: {
            icon: 'icons/rotate.svg',
        },
        tr: {
            icon: 'icons/resize.svg',
        },
        ml: {
            icon: '//maxcdn.icons8.com/Share/icon/Logos//google_logo1600.png',
        },
        mr: {
            icon: 'icons/diagonal-resize.svg',
        },
        mtr: {
            icon: 'icons/rotate.svg',
        },
    }, function() {
        canvas.renderAll();
    });

    canvas = new fabric.Canvas('example', {
        width: width,
        height: height,
    });

    image1.src = 'cat.jpg';
    fabric.Image.fromURL(image1.src, function(img) {
        img.set({
            id: 'cat',
            left: 500,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2,
            originX: 'center',
            originY: 'center',
            cornerStrokeColor: 'blue',
        });

        // overwrite the prototype object based
        img.customiseCornerIcons({
            settings: {
                borderColor: 'black',
                cornerSize: 25,
                cornerShape: 'rect',
                cornerBackgroundColor: 'black',
                cornerPadding: 10,
            },
            tl: {
                icon: 'icons/rotate.svg',
            },
            tr: {
                icon: 'icons/resize.svg',
            },
            bl: {
                icon: 'icons/remove.svg',
            },
            br: {
                icon: 'icons/up.svg',
            },
            mb: {
                icon: 'icons/down.svg',
            },
            mt: {
                icon: 'icons/acute.svg',
            },
            mr: {
                icon: 'icons/repair-tools-cross.svg',
            },
            mtr: {
                icon: 'icons/rotate.svg',
            },
        }, function() {
            canvas.renderAll();
        });

        canvas.add(img);
        canvas.setActiveObject(img);

    });

    image2.src = 'bear.jpg';
    fabric.Image.fromURL(image2.src, function(img) {
        img.set({
            id: 'bear',
            left: 100,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2,
            originX: 'center',
            originY: 'center',
        });

        // overwrite the prototype object based
        img.customiseCornerIcons({
            settings: {
                borderColor: 'red',
                cornerSize: 25,
                cornerBackgroundColor: 'red',
                cornerShape: 'circle',
                cornerPadding: 10,
            },
            tl: {
                icon: 'icons/rotate.svg',
            },
            tr: {
                icon: 'icons/resize.svg',
            },
            bl: {
                icon: 'icons/remove.svg',
            },
            br: {
                icon: 'icons/up.svg',
            },
            mb: {
                icon: 'icons/down.svg',
            },
            mt: {
                icon: 'icons/acute.svg',
            },
            mr: {
                icon: 'icons/repair-tools-cross.svg',
            },
            mtr: {
                icon: 'icons/rotate.svg',
            },
        }, function() {
            canvas.renderAll();
        });

        canvas.add(img);
    });

    image3.src = 'owl.jpg';
    fabric.Image.fromURL(image3.src, function(img) {
        img.set({
            id: 'owl',
            left: 300,
            top: 100,
            scaleX: 0.05,
            scaleY: 0.05,
            originX: 'center',
            originY: 'center',
        });

        // overwrite the prototype object based
        img.customiseCornerIcons({
            settings: {
                borderColor: randomColor(),
                cornerSize: 25,
                cornerBackgroundColor: 'red',
                cornerShape: 'circle',
                cornerPadding: 10,
            },
            tl: {
                icon: 'icons/rotate.svg',
                settings: {
                    cornerShape: 'rect',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 10,
                    cornerSize: 35,
                },
            },
            tr: {
                icon: 'icons/resize.svg',
                settings: {
                    cornerShape: 'circle',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 15,
                    cornerSize: 20,
                },
            },
            bl: {
                icon: 'icons/remove.svg',
                settings: {
                    cornerShape: 'rect',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 12,
                },
            },
            br: {
                icon: 'icons/up.svg',
                settings: {
                    cornerShape: 'circle',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 17,
                },
            },
            mb: {
                icon: 'icons/down.svg',
                settings: {
                    cornerShape: 'rect',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 5,
                },
            },
            mt: {
                icon: 'icons/acute.svg',
                settings: {
                    cornerShape: 'circle',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 8,
                },
            },
            mr: {
                icon: 'icons/repair-tools-cross.svg',
                settings: {
                    cornerShape: 'rect',
                    cornerBackgroundColor: randomColor(),
                    cornerPadding: 10,
                },
            },
        }, function() {
            canvas.renderAll();
        });

        canvas.add(img);
    });

    canvas.on({
        'after:render': function() {
            canvas.forEachObject(function(obj) {
                document.querySelector('.' + obj.id)
                    .innerText = obj.id + ' z-index: ' + canvas.getObjects().indexOf(obj);
            });

        },
    });
})();
