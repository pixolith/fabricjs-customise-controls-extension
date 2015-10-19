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

        useImageIcons: false,

        /**
         * Set a custom corner icon
         * @param {Object} obj type and icon url.
         */

        setCustomCorner: function( obj ) {
            this.useImageIcons = true;
            var self = this,
                corner,
                icon;

            for ( corner in obj ) {
                if ( obj.hasOwnProperty( corner ) ) {
                    switch ( corner  ) {
                        case 'tl':
                            icon = new Image();

                            icon.onload = function() {
                                self.tlIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];

                            break;
                        case 'tr':
                            icon = new Image();
                            icon.onload = function() {
                                self.trIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'bl':
                            icon = new Image();
                            icon.onload = function() {
                                self.blIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'br':
                            icon = new Image();
                            icon.onload = function() {
                                self.brIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'mt':
                            icon = new Image();
                            icon.onload = function() {
                                self.mtIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'mb':
                            icon = new Image();
                            icon.onload = function() {
                                self.mbIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'mr':
                            icon = new Image();
                            icon.onload = function() {
                                self.mrIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'ml':
                            icon = new Image();
                            icon.onload = function() {
                                self.mlIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                        case 'mtr':
                            icon = new Image();
                            icon.onload = function() {
                                self.mtrIcon = this;
                            };

                            icon.onerror = function() {
                                fabric.warn( this.src + 'icon is not an image' );
                            };

                            icon.src = obj [ corner ];
                            break;
                    }
                }
            }
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

            if ( !this.useImageIcons ) {

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

        /**
         * @private
         */

        _drawControl: function( control, ctx, methodName, left, top, icon ) {
            if ( !this.isControlVisible( control ) ) {
                return;
            }

            var size = this.cornerSize;

            if ( this.useImageIcons ) {
                if ( icon !== undefined ) {
                    ctx[ methodName ]( icon, left, top, size, size );
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
         * Set a custom corner action
         * @param {Object} obj with corner and action.
         */

        setCustomActions: function( obj ) {
            var self = this,
                corner;
            this.overwriteActions = true;
            for ( corner in obj ) {
                if ( obj.hasOwnProperty( corner ) ) {
                    switch ( corner ) {
                        case 'tl':
                            self.tlAction = obj[ corner ];
                            break;
                        case 'tr':
                            self.trAction = obj[ corner ];
                            break;
                        case 'bl':
                            self.blAction = obj[ corner ];
                            break;
                        case 'br':
                            self.brAction = obj[ corner ];
                            break;
                        case 'mt':
                            self.mtAction = obj[ corner ];
                            break;
                        case 'mb':
                            self.mbAction = obj[ corner ];
                            break;
                        case 'mr':
                            self.mrAction = obj[ corner ];
                            break;
                        case 'ml':
                            self.mlAction = obj[ corner ];
                            break;
                        case 'mtr':
                            self.mtrAction = obj[ corner ];
                            break;
                    }
                }
            }
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

            this._resetCurrentTransform( e );
        },

        /**
         * Custom remove object action
         * @private
         * @param {Event} e Event object
         * @param {fabric.Object} target
         */

        _removeAction: function( e, target ) {
            if ( this.getActiveGroup() && this.getActiveGroup() != 'undefined' ) {
                this.getActiveGroup().forEachObject( function( o ) {
                    o.remove();
                } );
                this.discardActiveGroup();
            } else {
                target.remove();
            }
        },

        /**
         * When true, cursors are fixed
         * @type Boolean
         * @default false
         */

        fixedCursors: false,

        /**
         * Set a custom corner cursor
         * @param {Object} obj with corner and cursor url/type.
         */

        setCustomCornerCursor: function( obj ) {
            var corner;
            this.fixedCursors = true;

            for ( corner in obj ) {
                if ( obj.hasOwnProperty( corner ) ) {
                    switch ( corner ) {
                        case 'tl':
                            this.tlcursorIcon = obj [ corner ];
                            break;
                        case 'tr':
                            this.trcursorIcon = obj [ corner ];
                            break;
                        case 'bl':
                            this.blcursorIcon = obj [ corner ];
                            break;
                        case 'br':
                            this.brcursorIcon = obj [ corner ];
                            break;
                        case 'mt':
                            this.mtcursorIcon = obj [ corner ];
                            break;
                        case 'mb':
                            this.mbcursorIcon = obj [ corner ];
                            break;
                        case 'mr':
                            this.mrcursorIcon = obj [ corner ];
                            break;
                        case 'ml':
                            this.mlcursorIcon = obj [ corner ];
                            break;
                        case 'mtr':
                            this.mtrcursorIcon = obj [ corner ];
                            break;
                    }
                }
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
