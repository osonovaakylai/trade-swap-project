
$(document).ready(function () {
    var SelectCategory = $('select-cat');

    if(SelectCategory !== undefined && SelectCategory !== null)
        SelectCategory.selectize({
        });

    // var NameVars = $('.name-class');

    // // Маска для телефонов
    // if (NameVars !== undefined && NameVars !== null) {
    //     NameVars("(+996) 000-00-00-00");
    // }

}); // end document.ready


// $(document).ajaxComplete(loadCommon);
//     $(function () { loadCommon(); });

//     function loadCommon() {
//         // Писать common.js скрипты сюда
//     }

