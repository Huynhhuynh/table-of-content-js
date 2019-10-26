/**
 * Table of Content
 *
 * @author Beplus
 * @version 1.0.0
 */

;( function( w, $ ) {
    'use strict'

    var toc = function( $container, settings ) {
        var self = this;

        self.$container = $container;
        self.settings = $.extend( {
            target: 'h1,h2,h3,h4,h5,h6',
            default_text: 'Select table of content',
            content_witdh: 680,
            on_change() { return; },
            on_show() { return; },
            on_hide() { return; },
        }, settings );

        self.target_list = self.$container.find( self.settings.target );
        if( self.target_list.length <= 0 ) return;

        self.$toc_sticky_tool = self.toc_sticky_temp();

        /**
         * Append toc tool bar
         */
        $( 'body' ).append( [self.$toc_sticky_tool, self.$select] );

        /**
         * Select handle
         */
        this.select_handle();

        /**
         * Event scroll handler
         */
        this.scroll_handler();
    }

    toc.prototype.toc_sticky_temp = function() {
        var self = this;
        self.$select = $( '<ol>', {
            class: 'toc-select',
        } );

        self.$nav = $( '<div>', {
            class: 'toc-nav'
        } );

        self.$current = $( `<div class="toc-current">
            <div class="text">
                ${ self.settings.default_text }
            </div>
        </div>` );

        self.target_list.each( function( index, item ) {

            var rand_key = `toc-key-${ Math.random().toString(36).substr(2, 5) }`;
            var num_increase = index + 1;

            $( item ).data( 'toc-key', rand_key ).addClass( rand_key );
            self.$select.append( `<li data-toc-key="${ rand_key }">${ num_increase }. ${ $( item ).text() }</li>` );
            self.$nav.append( `<div class="item" data-toc-key="${ rand_key }"><span></span></div>` );
        } )

        var $temp = $( `<div class="toc-sticky-container" style="--toc-content-width: ${ self.settings.content_witdh }px; ">
            <div class="toc-sticky-container__inner">
                <div class="toc-summary"></div>
            </div>
        </div>`, {
            css: {
                position: `fixed`,
                left: 0,
                top: 0,
                width: `100%`,
            }
        } );

        $temp.find( '.toc-summary' ).append( [self.$nav, self.$current] );
        return $temp;
    }

    toc.prototype.select_handle = function() {
        var self = this;

        $( 'body' ).on( 'click', function( e ) {

            if( $( '.__is-select-show' ).length > 0 && $( e.target ).parents( '.toc-select' ).length == 0 ) {

                $( 'body' ).removeClass( '__is-select-show' );
            }
        } )

        self.$current.on( 'click', function( e ) {
            e.preventDefault();
            e.stopPropagation();

            $( 'body' ).toggleClass( '__is-select-show' )
        } )

        self.$select.on( 'click', 'li', function( e ) {
            var key = $( this ).data( 'toc-key' );

            $( 'body, html' ).animate( {
                scrollTop: self.$container.find( `.${ key }` ).offset().top + 1,
            }, 300, function() {
                $( 'body' ).removeClass( '__is-select-show' );
            } );
        } )
    }

    toc.prototype.scroll_handler = function() {
        var self = this;
        var $w = $( w );
        var $body = $( 'body' );

        var get_container_info = function( el ) {
            return el.getBoundingClientRect();
        }

        var in_view = function( scroll_pos ) {
            var container_info = get_container_info( self.$container.get( 0 ) );

            if(  container_info.y < 0 &&  container_info.bottom > 0 ) {
                return true;
            } else {
                return false;
            }
        }

        var in_content = function() {
            var current_key;

            for( var i = 0; i <= self.target_list.length - 1; i++ ) {
                var el = self.target_list.get( i );
                var info = get_container_info( el );

                if( info.y < 0 ) {
                    current_key = $( el ).data( 'toc-key' );
                }
            }

            var $heading_el = self.$container.find( `.${ current_key }` );

            return {
                key: current_key,
                text: $heading_el.text() || self.settings.default_text,
            };
        }

        var save_key = '';
        $( w ).on( {
            'scroll.toc' ( e ) {
                if( true == in_view() ) {
                    $body.addClass( 'toc-show' );
                    var data = in_content();
                    self.settings.on_show.call( self, data.key );

                    if( data.key == save_key ) return;

                    [self.$nav, self.$select].forEach( function( $item, index  ) {
                        $item
                            .find( `[data-toc-key="${ data.key }"]` )
                            .addClass( '__is-active' )
                            .siblings()
                            .removeClass( '__is-active' );
                    } )

                    self.$current.find( '.text' ).text( data.text );
                    save_key = data.key;

                    if( self.settings.on_change )
                        self.settings.on_change.call( self, data.key );

                } else {
                    $body.removeClass( 'toc-show' );

                    if( self.settings.on_hide )
                        self.settings.on_hide.call( self );
                }
            }
        } )
    }

    w.table_of_content = toc;

} )( window, jQuery );

if( typeof exports === "object" ) {
    module.exports = {}
}
