var __b_release_mode = false;
var tag_hdr = document.getElementsByTagName('head')[0];
['SIPml.js', 'src/tinySIP/src/tsip_api.js'].forEach(function (file) {
    var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', file + "?svn=252");
    tag_hdr.appendChild(tag_script);
});
window.console &&window.console.warn && window.console.warn("YOUR ARE USING DEBUG CODE. PLEASE USE CODE UNDER 'release' FOLDER or check https://code.google.com/p/sipml5/wiki/FAQ#How_to_reduce_the_size_of_the_scripts_before_deploying for more information on how to amalgamate the code.");
