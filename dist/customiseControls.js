/*
 * fabric.js Controls Extension
 *
 * Simon Kunz 18.10.2015 for pixolith
 * Licensed under the MIT license.
 */
( function( global ) {

    'use strict';
    var fabric = global.fabric || ( global.fabric = {} ),
        isVML = function() { return typeof G_vmlCanvasManager !== 'undefined';},
        degreesToRadians = fabric.util.degreesToRadians,
        cursorOffset = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

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
         */

        customiseCornerIcons: function( obj ) {
            var self = this,
                setting,
                icon;

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

                        switch ( setting ) {
                            case 'tl':
                                icon = new Image();

                                icon.onload = function() {
                                    self.tlIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;

                                break;
                            case 'tr':
                                icon = new Image();
                                icon.onload = function() {
                                    self.trIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'bl':
                                icon = new Image();
                                icon.onload = function() {
                                    self.blIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'br':
                                icon = new Image();
                                icon.onload = function() {
                                    self.brIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'mt':
                                icon = new Image();
                                icon.onload = function() {
                                    self.mtIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'mb':
                                icon = new Image();
                                icon.onload = function() {
                                    self.mbIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'mr':
                                icon = new Image();
                                icon.onload = function() {
                                    self.mrIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'ml':
                                icon = new Image();
                                icon.onload = function() {
                                    self.mlIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                            case 'mtr':
                                icon = new Image();
                                icon.onload = function() {
                                    self.mtrIcon = this;
                                };

                                icon.onerror = function() {
                                    fabric.warn( this.src + ' icon is not an image' );
                                };

                                icon.src = obj[ setting ].icon;
                                break;
                        }
                    }
                }
            }
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
                cornerBG = this.cornerBackgroundColor,
                cornerShape = this.cornerShape,
                cornerPadding = this.cornerPadding;

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
            var self = this,
                setting;

            for ( setting in obj ) {
                if ( obj.hasOwnProperty( setting ) ) {
                    if ( obj[ setting ].action !== undefined ) {
                        this.overwriteActions = true;
                        switch ( setting ) {
                            case 'tl':
                                self.tlAction = obj[ setting ].action;
                                break;
                            case 'tr':
                                self.trAction = obj[ setting ].action;
                                break;
                            case 'bl':
                                self.blAction = obj[ setting ].action;
                                break;
                            case 'br':
                                self.brAction = obj[ setting ].action;
                                break;
                            case 'mt':
                                self.mtAction = obj[ setting ].action;
                                break;
                            case 'mb':
                                self.mbAction = obj[ setting ].action;
                                break;
                            case 'mr':
                                self.mrAction = obj[ setting ].action;
                                break;
                            case 'ml':
                                self.mlAction = obj[ setting ].action;
                                break;
                            case 'mtr':
                                self.mtrAction = obj[ setting ].action;
                                break;
                        }
                    }

                    if ( obj[ setting ].cursor !== undefined ) {
                        this.fixedCursors = true;
                        switch ( setting ) {
                            case 'tl':
                                this.tlcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'tr':
                                this.trcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'bl':
                                this.blcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'br':
                                this.brcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'mt':
                                this.mtcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'mb':
                                this.mbcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'mr':
                                this.mrcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'ml':
                                this.mlcursorIcon = obj[ setting ].cursor;
                                break;
                            case 'mtr':
                                this.mtrcursorIcon = obj[ setting ].cursor;
                                break;
                        }
                    }
                }
            }
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
