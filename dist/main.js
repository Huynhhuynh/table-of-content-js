/**
 *
 */
jQuery( function() {
    new window.table_of_content( jQuery( '#main' ), {
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
