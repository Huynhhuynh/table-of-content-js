### Table of Content
Help you add a table of contents to your blog very easily. This plugin can automatically scan your headings throughout a post and create the table of contents, which is fixed in the page display.

[Link Demo](https://huynhhuynh.github.io/table-of-content-js/)

### How to use
```js
# jQuery
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

# Table of Content
<link rel="stylesheet" href="./dist/toc.css">
<script src="./src/toc.jquery.js"></script>

jQuery( function() {
    var settings = {
        target: 'h1,h2,h3,h4,h5,h6',
        default_text: 'Select table of content',
        content_witdh: 680,
        padding_left_right: 10,
        on_change( toc_obj, key_active ) { return; },
        on_show( toc_obj ) { return; },
        on_hide( toc_obj ) { return; },
    };

    new window.table_of_content( jQuery( '#content' ), settings );
} )
```
