/*
 * fabric.js Controls Extension
 *
 * Simon Kunz 18.10.2015 for pixolith
 * Licensed under the MIT license.
 */
( function( global ) {

    'use strict';
    var fabric = global.fabric || ( global.fabric = {} ),
        isVML = function() {
            return typeof G_vmlCanvasManager !== 'undefined';
        },
        degreesToRadians = fabric.util.degreesToRadians,
        var cursorOffset = {
            mt: 0, // n
            tr: 1, // ne
            mr: 2, // e
            br: 3, // se
            mb: 4, // s
            bl: 5, // sw
            ml: 6, // w
            tl: 7 // nw
          };

    fabric.util.object.extend( fabric.Object.prototype, {

        /**
         * When true, image icons are loaded via the drawImage method
         * @type Boolean
         * @default false
         */

        useCustomIcons: false,

        /**
         * Sets a background-color for drawImage operations with transparency
         * @type string
         * @default transparent
         */

        cornerBackgroundColor: 'transparent',

        /**
         * Sets the shape of the background for drawImage operations with transparency
         * @type string
         * @default rect
         */

        cornerShape: '',

        /**
         * Inner Padding between Shape Background and drawn Image
         * @type int
         * @default rect
         */

        cornerPadding: 0,

        /**
         * Set a custom corner icon
         * @param {Object} obj settings and icon url.
         * @param callback function
         */

        customiseCornerIcons: function( obj, callback ) {
            var setting;

            for ( setting in obj ) {
                if ( obj.hasOwnProperty( setting ) ) {

                    if ( obj[ setting ].cornerShape !== undefined ) {
                        this.cornerShape = obj[ setting ].cornerShape;
                    }

                    if ( obj[ setting ].cornerBackgroundColor !== undefined ) {
                        this.cornerBackgroundColor = obj[ setting ].cornerBackgroundColor;
                    }

                    if ( obj[ setting ].borderColor !== undefined ) {
                        this.borderColor = obj[ setting ].borderColor;
                    }

                    if ( obj[ setting ].cornerSize !== undefined ) {
                        this.cornerSize = obj[ setting ].cornerSize;
                    }

                    if ( obj[ setting ].cornerPadding !== undefined ) {
                        this.cornerPadding = obj[ setting ].cornerPadding;
                    }

                    if ( obj[ setting ].icon !== undefined ) {
                        this.useCustomIcons = true;

                        this.loadIcon( setting, obj[ setting ].icon, function() {
                            if ( callback && typeof( callback ) === 'function' ) {
                                callback();
                            }
                        } );
                    }
                }
            }
        },

        /**
         * loads the icon image as an image src.
         * @param {Object} corner to load an icon.
         * @param iconUrl as a string.
         * @param callback function.
         */

        loadIcon: function( corner, iconUrl, callback ) {
            var self = this,
                icon = new Image();

            icon.onload = function() {
                self[ corner + 'Icon' ] = this;
                if ( callback && typeof( callback ) === 'function' ) {
                    callback();
                }
            };

            icon.onerror = function() {
                fabric.warn( this.src + ' icon is not an image' );
            };

            icon.src = iconUrl;
        },

        /**
         * copy of the setter method for our american friends.
         * @param {Object} obj containing corner icon urls and settings.
         */

        customizeCornerIcons: function( obj ) {
            this.customiseCornerIcons( obj );
        },

        /**
         * Draws corners of an object's bounding box.
         * Requires public properties: width, height
         * Requires public options: cornerSize, padding
         * @param {CanvasRenderingContext2D} ctx Context to draw on
         * @return {fabric.Object} thisArg
         * @chainable
         */

        drawControls: function( ctx ) {

            if ( !this.hasControls ) {
                return this;
            }

            var wh = this._calculateCurrentDimensions( true ),
                width = wh.x,
                height = wh.y,
                left = -( width / 2 ),
                top = -( height / 2 ),
                scaleOffset = this.cornerSize / 2,
                methodName;

            if ( !this.useCustomIcons ) {

                ctx.lineWidth = 1;
                ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
                ctx.strokeStyle = ctx.fillStyle = this.cornerColor;

                methodName = this.transparentCorners ? 'strokeRect' : 'fillRect';
            } else {
                methodName = 'drawImage';
            }

            ctx.save();

            // top-left
            this._drawControl( 'tl', ctx, methodName,
                left - scaleOffset,
                top - scaleOffset,
                this.tlIcon
            );

            // top-right
            this._drawControl( 'tr', ctx, methodName,
                left + width - scaleOffset,
                top - scaleOffset,
                this.trIcon
            );

            // bottom-left
            this._drawControl( 'bl', ctx, methodName,
                left - scaleOffset,
                top + height - scaleOffset,
                this.blIcon
            );

            // bottom-right
            this._drawControl( 'br', ctx, methodName,
                left + width - scaleOffset,
                top + height - scaleOffset,
                this.brIcon
            );

            if ( !this.get( 'lockUniScaling' ) ) {

                // middle-top
                this._drawControl( 'mt', ctx, methodName,
                    left + width / 2 - scaleOffset,
                    top - scaleOffset,
                    this.mtIcon
                );

                // middle-bottom
                this._drawControl( 'mb', ctx, methodName,
                    left + width / 2 - scaleOffset,
                    top + height - scaleOffset,
                    this.mbIcon
                );

                // middle-right
                this._drawControl( 'mr', ctx, methodName,
                    left + width - scaleOffset,
                    top + height / 2 - scaleOffset,
                    this.mrIcon
                );

                // middle-left
                this._drawControl( 'ml', ctx, methodName,
                    left - scaleOffset,
                    top + height / 2 - scaleOffset,
                    this.mlIcon
                );
            }

            // middle-top-rotate
            if ( this.hasRotatingPoint ) {
                this._drawControl( 'mtr', ctx, methodName,
                    left + width / 2 - scaleOffset,
                    top - this.rotatingPointOffset - scaleOffset,
                    this.mtrIcon
                );
            }

            ctx.restore();

            return this;
        },

        /** Draw controls either with background-shape and color (transparency) or plain image
         * @private
         *
         */

        _drawControl: function( control, ctx, methodName, left, top, icon ) {
            if ( !this.isControlVisible( control ) ) {
                return;
            }

            var size = this.cornerSize,
                cornerBG = this.cornerBackgroundColor || 'black',
                cornerShape = this.cornerShape || 'rect',
                cornerPadding = this.cornerPadding || 10 ;

            if ( this.useCustomIcons ) {
                if ( cornerShape ) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = cornerBG;
                    switch ( cornerShape ) {
                        case 'rect':
                            ctx.fillRect( left, top, size, size );
                            if ( icon !== undefined ) {
                                ctx[ methodName ](
                                    icon,
                                    left + cornerPadding / 2,
                                    top + cornerPadding / 2,
                                    size - cornerPadding,
                                    size - cornerPadding
                                );
                            }
                            break;
                        case 'circle':
                            ctx.beginPath();
                            ctx.arc( left + size / 2, top + size / 2, size / 2, 0, 2 * Math.PI );
                            ctx.fill();
                            ctx.closePath();
                            if ( icon !== undefined ) {
                                ctx[ methodName ](
                                    icon,
                                    left + cornerPadding / 2,
                                    top + cornerPadding / 2,
                                    size - cornerPadding,
                                    size - cornerPadding
                                );
                            }
                            break;
                    }
                } else {
                    if ( icon !== undefined ) {
                        ctx[ methodName ](
                            icon,
                            left,
                            top,
                            size,
                            size
                        );
                    }
                }
            } else {
                isVML() || this.transparentCorners || ctx.clearRect( left, top, size, size );
                ctx[ methodName ]( left, top, size, size );
            }

        }
    } );

    fabric.util.object.extend( fabric.Canvas.prototype, {
        /**
         * When true, actions can be overwritten
         * @type Boolean
         * @default false
         */

        overwriteActions: false,

        /**
         * When true, cursors are fixed
         * @type Boolean
         * @default false
         */

        fixedCursors: false,

        /**
         * setter Method for actions and cursors.
         * @param {Object} obj containing corner action and cursor url/type.
         */

        customiseControls: function( obj ) {
            var setting;

            for ( setting in obj ) {
                if ( obj.hasOwnProperty( setting ) ) {
                    if ( obj[ setting ].action !== undefined ) {
                        this.overwriteActions = true;
                        this.setCustomAction( setting, obj[ setting ].action );
                    }

                    if ( obj[ setting ].cursor !== undefined ) {
                        this.fixedCursors = true;
                        this.setCustomCursor( setting, obj[ setting ].cursor );
                    }
                }
            }
        },

        /**
         * loads the icon image as an image src.
         * @param {Object} corner to load an icon.
         * @param action as a string.
         */

        setCustomAction: function( corner, action ) {
            this[ corner + 'Action' ] = action ;
        },

        /**
         * loads the icon image as an image src.
         * @param {Object} corner to load an icon.
         * @param cursorUrl as a string.
         */

        setCustomCursor: function( corner, cursorUrl ) {
            this[ corner + 'cursorIcon' ] = cursorUrl ;
        },

        /**
         * copy of the setter method for our american friends.
         * @param {Object} obj containing corner action and cursor url/type.
         */

        customizeControls: function( obj ) {
            this.customiseControls( obj );
        },

        /**
         * @private
         */

        _getActionFromCorner: function( target, corner ) {
            var action = 'drag';
            if ( corner ) {
                if ( !this.overwriteActions ) {
                    action = ( corner === 'ml' || corner === 'mr' ) ?
                        'scaleX'
                        : ( corner === 'mt' || corner === 'mb' ) ?
                        'scaleY'
                        : corner === 'mtr' ?
                        'rotate'
                        : 'scale';
                } else {
                    action = corner === 'ml' ?
                    this.mlAction || 'scaleX'
                        : corner === 'mr' ?
                    this.mrAction || 'scaleX'
                        : corner === 'mt' ?
                    this.mtAction || 'scaleY'
                        : corner === 'mb' ?
                    this.mbAction || 'scaleY'
                        : corner === 'tr' ?
                    this.trAction || 'scale'
                        : corner === 'tl' ?
                    this.tlAction || 'scale'
                        : corner === 'bl' ?
                    this.blAction || 'scale'
                        : corner === 'br' ?
                    this.brAction || 'scale'
                        : corner === 'mtr' ?
                    this.mtrAction || 'rotate'
                        : 'scale';
                }
                return action;
            }
        },

        /**
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         */
        _setupCurrentTransform: function( e, target ) {
            if ( !target ) {
                return;
            }

            var pointer = this.getPointer( e ),
                corner = target._findTargetCorner( this.getPointer( e, true ) ),
                action = this._getActionFromCorner( target, corner ),
                origin = this._getOriginFromCorner( target, corner );

            this._currentTransform = {
                target: target,
                action: action,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                offsetX: pointer.x - target.left,
                offsetY: pointer.y - target.top,
                originX: origin.x,
                originY: origin.y,
                ex: pointer.x,
                ey: pointer.y,
                left: target.left,
                top: target.top,
                theta: degreesToRadians( target.angle ),
                width: target.width * target.scaleX,
                mouseXSign: 1,
                mouseYSign: 1
            };

            this._currentTransform.original = {
                left: target.left,
                top: target.top,
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                originX: origin.x,
                originY: origin.y
            };

            if ( action === 'remove' ) {
                this._removeAction( e, target );
            }

            if ( action === 'moveUp' ) {
                this._moveLayerUpAction( e, target );
            }

            if ( action === 'moveDown' ) {
                this._moveLayerDownAction( e, target );
            }

            if ( typeof action === 'object' ) {
                if ( Object.keys( action )[ 0 ] === 'rotateByDegrees' ) {
                    this._rotateByDegrees( e, target, action.rotateByDegrees );
                }
            }

            this._resetCurrentTransform( e );
        },

        /**
         * Custom remove object action
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         */

        _removeAction: function( e, target ) {
            if ( this.getActiveGroup() && this.getActiveGroup() !== 'undefined' ) {
                this.getActiveGroup().forEachObject( function( o ) {
                    o.remove();
                } );
                this.discardActiveGroup();
            } else {
                target.remove();
            }
        },

        /**
         * Custom move up object action
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         */

        _moveLayerUpAction: function( e, target ) {
            if ( this.getActiveGroup() && this.getActiveGroup() !== 'undefined' ) {
                this.getActiveGroup().forEachObject( function( o ) {
                    o.bringForward();
                } );
            } else {
                target.bringForward();
            }
        },

        /**
         * Custom move down object action
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         */

        _moveLayerDownAction: function( e, target ) {
            if ( this.getActiveGroup() && this.getActiveGroup() !== 'undefined' ) {
                this.getActiveGroup().forEachObject( function( o ) {
                    o.sendBackwards();
                } );
            } else {
                target.sendBackwards();
            }
        },

        /**
         * Custom move down object action
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         * @param {Integer} value of rotation
         */

        _rotateByDegrees: function( e, target, value ) {
            var angle = target.getAngle() + value;

            angle = angle > 360 ? value : angle < 0 ? 315 : angle;

            if ( this.getActiveGroup() && this.getActiveGroup() !== 'undefined' ) {
                this.getActiveGroup().forEachObject( function( o ) {
                    o.setAngle( angle ).setCoords();
                } );
            } else {
                target.setAngle( angle ).setCoords();
            }

            this.renderAll();
        },

        _setOriginToCenter: function( target ) {
            target._originalOriginX = target.originX;
            target._originalOriginY = target.originY;

            var center = target.getCenterPoint();

            target.set( {
                originX: 'center',
                originY: 'center',
                left: center.x,
                top: center.y
            } );
        },

        _setCenterToOrigin: function( target ) {
            var originPoint = target.translateToOriginPoint(
                target.getCenterPoint(),
                target._originalOriginX,
                target._originalOriginY );

            target.set( {
                originX: target._originalOriginX,
                originY: target._originalOriginY,
                left: originPoint.x,
                top: originPoint.y
            } );
        },

        /**
         * @private
         */
        _setCornerCursor: function( corner, target ) {
            var iconUrlPattern = /\.(?:jpe?g|png|gif|jpg|jpeg|svg)$/;

            if ( !this.fixedCursors ) {
                if ( corner in cursorOffset ) {
                    this.setCursor( this._getRotatedCornerCursor( corner, target ) );
                } else if ( corner === 'mtr' && target.hasRotatingPoint ) {
                    this.setCursor( this.rotationCursor );
                } else {
                    this.setCursor( this.defaultCursor );
                    return false;
                }
            } else {
                switch ( corner ) {
                    case 'tl':
                        if ( !this.tlcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.tlcursorIcon ) ) {
                                this.setCursor( 'url(' + this.tlcursorIcon + '), auto' );
                            } else {
                                if ( this.tlcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.tlcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'tr':
                        if ( !this.trcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.trcursorIcon ) ) {
                                this.setCursor( 'url(' + this.trcursorIcon + '), auto' );
                            } else {
                                if ( this.trcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.trcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'bl':
                        if ( !this.blcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.blcursorIcon ) ) {
                                this.setCursor( 'url(' + this.blcursorIcon + '), auto' );
                            } else {
                                if ( this.blcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.blcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'br':
                        if ( !this.brcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.brcursorIcon ) ) {
                                this.setCursor( 'url(' + this.brcursorIcon + '), auto' );
                            } else {
                                if ( this.brcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.brcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'mt':
                        if ( !this.mtcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.mtcursorIcon ) ) {
                                this.setCursor( 'url(' + this.mtcursorIcon + '), auto' );
                            } else {
                                if ( this.mtcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.mtcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'mb':
                        if ( !this.mbcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.mbcursorIcon ) ) {
                                this.setCursor( 'url(' + this.mbcursorIcon + '), auto' );
                            } else {
                                if ( this.mbcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.mbcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'mr':
                        if ( !this.mrcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.mrcursorIcon ) ) {
                                this.setCursor( 'url(' + this.mrcursorIcon + '), auto' );
                            } else {
                                if ( this.mrcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.mrcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'ml':
                        if ( !this.mlcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.mlcursorIcon ) ) {
                                this.setCursor( 'url(' + this.mlcursorIcon + '), auto' );
                            } else {
                                if ( this.mlcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.mlcursorIcon );
                                }
                            }
                        }
                        break;
                    case 'mtr':
                        if ( !this.mtrcursorIcon ) {
                            this._setScalingCursor( corner, target );
                        } else {
                            if ( iconUrlPattern.test( this.mtrcursorIcon ) ) {
                                this.setCursor( 'url(' + this.mtrcursorIcon + '), auto' );
                            } else {
                                if ( this.mtrcursorIcon === 'resize' ) {
                                    this._setScalingCursor( corner, target );
                                } else {
                                    this.setCursor( this.mtrcursorIcon );
                                }
                            }
                        }
                        break;
                }
            }
        },

        /**
         * @private
         */

        _setScalingCursor: function( corner, target ) {
            this.setCursor( this._getRotatedCornerCursor( corner, target ) );
        }
    } );

} )( typeof exports !== 'undefined' ? exports : this );
