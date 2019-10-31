/**
 *
 */

var _main = document.getElementsByID('main');
var load_script_func = function( url, callback ) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';

    script.onload = function() {
        callback.call( this );
    };

    _main.appendChild(script);
}

load_script_func( 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js', function() {

    load_script_func( 'https://huynhhuynh.github.io/table-of-content-js/src/toc.jquery.js', function() {

        var $ = window.jQuery;

        $( function() {
            new window.table_of_content( $( '#main' ), {
                on_show ( key ) {
                    // console.log( this, key );
                },
                on_hide () {
                    // console.log( this, key );
                },
                on_change ( key ) {
                    // console.log( this, key );
                },
            } );
        } )
    } )
} )
