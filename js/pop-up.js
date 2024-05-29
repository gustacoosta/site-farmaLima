function popForm() {
    var width = 600;
    var height = 400;
    var left = (window.innerWidth - width) / 2;
    var top = (window.innerHeight - height) / 2;

    var popupWindow = window.open('pop-form.html', 'Pop-up', 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + ', resizable=no, scrollbars=no, fullscreen=no');

    if (window.focus) {
        popupWindow.focus();
    }
}

