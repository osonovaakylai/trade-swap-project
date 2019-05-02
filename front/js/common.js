
$(document).ready(function () {
    var SelectCategory = $('.select-cat');

    if(SelectCategory !== undefined && SelectCategory !== null)
        SelectCategory.selectize({
        });

    var PhoneMask = $('.phone-mask');

    // // Маска для телефонов
    if (PhoneMask !== undefined && PhoneMask !== null) {
        PhoneMask("(+996) 000-00-00-00");
    }

}); // end document.ready


// $(document).ajaxComplete(loadCommon);
//     $(function () { loadCommon(); });

//     function loadCommon() {
//         // Писать common.js скрипты сюда
//     }

