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
            content_witdh: 700,
        }, settings );

        self.target_list = self.$container.find( self.settings.target );
        if( self.target_list.length <= 0 ) return;

        self.$toc_sticky_tool = self.toc_sticky_temp();

        /**
         * Append toc tool bar
         */
        $( 'body' ).append( self.$toc_sticky_tool );

        /**
         * Event scroll handler
         */
        this.scroll_handler();
    }

    toc.prototype.toc_sticky_temp = function() {
        var self = this;
        self.$select = $( '<ul>', {
            class: 'toc-select',
        } );

        self.$nav = $( '<div>', {
            class: 'toc-nav'
        } )

        self.$current = $( '<div>', {
            class: 'toc-current',
            html: self.settings.default_text
        } )

        self.target_list.each( function( index, item ) {

            var rand_key = `toc-key-${ Math.random().toString(36).substr(2, 5) }`;

            $( item ).data( 'toc-key', rand_key ).addClass( rand_key );
            self.$select.append( `<li data-toc-key="${ rand_key }">${ $( item ).text() }</li>` );
            self.$nav.append( `<div class="item" data-toc-key="${ rand_key }"><span></span></div>` );
        } )

        var $temp = $( `<div class="toc-sticky-container">
            <div class="toc-sticky-container__inner" style="width: ${ self.settings.content_witdh }px;">
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

        $( w ).on( {
            'scroll.toc' ( e ) {
                if( true == in_view() ) {
                    $body.addClass( 'toc-show' );
                    var data = in_content();

                    self.$nav
                        .find( `[data-toc-key="${ data.key }"]` )
                        .addClass( '__is-active' )
                        .siblings()
                        .removeClass( '__is-active' );

                    self.$current.text( data.text );
                } else {
                    $body.removeClass( 'toc-show' );
                }
            }
        } )
    }

    w.table_of_content = toc;

} )( window, jQuery );

if( typeof exports === "object" ) {
    module.exports = {}
}
