function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // Added to allow decimal, period, or delete
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isNumberKey1(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // Added to allow decimal, period, or delete
    if (charCode > 31 && (charCode < 44 || charCode > 57))
        return false;

    return true;
}