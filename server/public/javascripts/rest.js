
function del(val) {
    console.log(val)
    $.ajax({
        url: '/admin/'+val,
        type: 'DELETE',
        success: function (result) {
            alert(result);
        }
    });
}
function update(val) {
    console.log(val)
    $.ajax({
        url: '/admin/'+val,
        type: 'put',
        success: function (result) {
            $(location).attr("href", '/admin');
        }
    });
}
function add() {
    $.ajax({
        url: '/admin',
        type: 'post',
        success: function (result) {
            $(location).attr("href", '/admin');
        }
    });
}
