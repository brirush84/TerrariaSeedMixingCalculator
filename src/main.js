$(document).ready(() => {
    $(".calculator").each(function() {
        init($(this));
    });
    injectCSS();
});