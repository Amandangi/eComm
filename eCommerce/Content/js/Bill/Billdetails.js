function table() {
    var hCols = [4];

    var table = $('#tblbilldetails').DataTable({
        "paging": true,
        "pageLength": $('#PageSize').val(),
        "bLengthChange": false,
        "autoWidth": true,
        //"rowReorder": {
        //    selector: 'td:nth-child(2)'
        //},
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "filter": false, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
     
        "ajax": {
            "url": "/Bill/GetBilldetailListss",
            "type": "POST",
            "datatype": "json",
            "data": function (d) {
                d.search = $("#SearchBranch").val();
                //d.isDisplayInPayment = 1;
                d.FromDate = $('#SearchFromDate').val();
                d.ToDate = $('#SearchToDate').val();
                d.CustomerId = $('#CustomerId').val();
                d.DepartmentId = $('#DepartmentId').val();
                //console.log(d);
            }
        },
        "columns": [
            {
                mRender: function (data, type, full) {
                    return '<label class="checkbox checkbox-primary"><input type="checkbox" class="BranchIds" value="' + full.DocketId + '" name="BranchIds" /><span class="checkmark"></span></label>'
                }
            },
            { "data": "RowNo", "autoWidth": true },
            //{ "data": "DocketId", "autoWidth": true },
            { "data": "DocketNo", "autoWidth": true },
            { "data": "BookingDate", "autoWidth": true },
            { "data": "CustomerType", "autoWidth": true },
            { "data": "DispatchMode", "autoWidth": true },
            { "data": "PaymentType", "autoWidth": true },
            { "data": "Source", "autoWidth": true },
            { "data": "DestinationState", "autoWidth": true },
            { "data": "ConsignorName", "autoWidth": true },
            { "data": "ConsigneeName", "autoWidth": true },
            { "data": "NoOfPackages", "autoWidth": true },
            { "data": "ActualWeight", "autoWidth": true },
            { "data": "ChargeWeight", "autoWidth": true },
            { "data": "EwayBillNo", "autoWidth": true },
            { "data": "NetAmount", "autoWidth": true }
        ],
        "responsive": false,
        //"columnDefs": [
        //    {orderable: false, "targets": [0, 1, 2, 3, 4, 5, 6, 7] }
        //],
        "order": [[0, "desc"]]
    });

}


   

    $(function () {
       // BindPurchaseBillList();
    var updateString = $('#BillDetails_Update').val();
        if (updateString !== "" && parseInt($('#Id').val()) > 0) {
            var data = JSON.parse(updateString);
            if (data !== null) {
                var listArray = data;
                if (listArray.length > 0) {
                    for (var i = 0; i < listArray.length; i++) {
                        var obj = new Object();

    obj = listArray[i];

    fnAddRow(obj, false);
}
}
}
//fnClearBillData();
}
});



function fnAddBill() {
    var $ele = $('input[name="BranchIds"]');
    var newBranchIds = '';
    if ($ele.length > 0) {
        for (var i = 0; i < $ele.length; i++) {
            if ($ele[i].type === 'checkbox') {
                if ($ele[i].checked === true) {
                    if (newBranchIds !== '') {
                        newBranchIds = newBranchIds + ',' + $ele[i].value;
                    } else {
                        newBranchIds = $ele[i].value;
                    }
                }
            }
        }
        $.ajax({
            url: '/Bill/GetSelectedBillData_Payment/',
            type: 'POST',
            cache: false,
            async: false,
            data: {
                selectedBillIds: newBranchIds
            },
            success: function (listArray) {
                if (listArray.length > 0) {
                    for (var i = 0; i < listArray.length; i++) {
                        var obj = new Object();

                        obj = listArray[i];

                        fnAddRow(obj, false);
                    }
                }
                toastr["success"]('Docket Added Successfully!');
            },
            error: function (response) {
                console.log(response);
                toastr["error"]('Something Went Wrong!');
            }
        });

    } else {
        $.alert("Please Select At least One Bill...");
    }
}

    function fnAddRow(obj, IsDisplayMessage) {

        var UpdateId = parseInt($('#UpdateId').val());
    if (isNaN(UpdateId))
        UpdateId = 0;
    var lastId = 0;
        if (UpdateId === 0) {
            try {
                lastId = parseInt($("#tblBillList tbody tr:last td.DetailId:last").attr('id').split("_").pop());
    } catch (e) {
        lastId = 0;
    }
    if (isNaN(lastId))
        lastId = 0;

    lastId = lastId === 0 ? 1 : lastId + 1;
        } else {
        lastId = UpdateId;
    }
        if (IsDisplayMessage && fnCheckDuplication(lastId, obj.ProductId)) {
        toastr.error("Bill already exists!");
    return;
}
//var Quantity = parseFloat(obj.Quantity);
//        if (isNaN(Quantity)) {
//        Quantity = 0;
//    }
        //var DeleteRow = "<a title='Delete' onclick='fnDeleteDetail(" + lastId + "," + obj.DetailId + ");' class='text-danger mr-2'><i class='fa fa-trash'></i></a>";
        var ViewRow = '<a title="View" onclick = "fnViewDetail(' + lastId + ');" class="text-success mr-2"><i class="fa fa-eye"></i></a>';
        var DeleteRow = "<a title='Delete' onclick = 'fnDeleteDetail(" + lastId + "," + obj.DocketId + ");' class='text-danger mr-2'><i class='fa fa-trash'></i></a>";
    var htmlString = ''
            + '<td>' + lastId + '</td>'
            //+ '<td class="DocketId" id="DocketId_' + lastId + '">' + obj.DocketId+ '</td>'
            + '<td class="DocketNo" id="DocketNo_' + lastId + '">' + obj.DocketNo + '</td>'
            + '<td class="BookingDate" id="BookingDate_' + lastId + '">' + obj.BookingDate + '</td>'
            + '<td class="CustomerType" id="CustomerType_' + lastId + '">' + obj.CustomerType + '</td>'
            + '<td class="DispatchMode" id="DispatchMode_' + lastId + '">' + obj.DispatchMode + '</td>'
            + '<td class="PaymentType" id="PaymentType_' + lastId + '">' + obj.PaymentType + '</td>'
            + '<td class="Source" id="Source_' + lastId + '">' + obj.Source + '</td>'
            + '<td class="DestinationState" id="DestinationState_' + lastId + '">' + obj.DestinationState + '</td>'
            + '<td class="ConsignorName" id="ConsignorName_' + lastId + '">' + obj.ConsignorName + '</td>'
            + '<td class="ConsigneeName" id="ConsigneeName_' + lastId + '">' + obj.ConsigneeName + '</td>'
            + '<td class="NoOfPackages" id="NoOfPackages_' + lastId + '">' + obj.NoOfPackages + '</td>'
            + '<td class="ActualWeight" id="ActualWeight_' + lastId + '">' + obj.ActualWeight + '</td>'
        + '<td class="ChargeWeight" id="ChargeWeight_' + lastId + '">' + obj.ChargeWeight + '</td>'
        + '<td class="EwayBillNo" id="EwayBillNo_' + lastId + '">' + obj.EwayBillNo + '</td>'
            + '<td class="NetAmount" id="NetAmount_' + lastId + '">' + obj.NetAmount + '</td>'

            + '<td>' + ViewRow + '</td>'
            + '<td>' + DeleteRow + '</td>'
            + '<td class="DetailId" id="DetailId_' + lastId + '" hidden>' + obj.DetailId + '</td>'
            + '<td class="DocketId" id="DocketId_' + lastId + '" hidden>' + obj.DocketId + '</td>'
            //+ '<td class="PurchaseOrderId" id="PurchaseOrderId_' + lastId + '" hidden>' + obj.PurchaseOrderId + '</td>'
            //+ '<td class="PurchaseOrderDate" id="PurchaseOrderDate_' + lastId + '" hidden>' + obj.PurchaseOrderDate + '</td>'
    + '';

        if (UpdateId > 0) {
        $('#tr_' + lastId).html(htmlString);
    if (IsDisplayMessage)
        toastr.success("Detail Updated Successfully!");
        } else {
        htmlString = '<tr id="tr_' + lastId + '">'
        + htmlString
        + '</tr>';
            $('#tblBillList').append(htmlString);
    if (IsDisplayMessage)
        toastr.success("Detail Inserted Successfully!");
        }
        clear_form_elements($('#myModal'));
        $('#myModal').modal('hide');
        //$("#myModal").removeAttr("style");
//lblTotalBalanceDebitNoteAmount();
}

//    function fnDeleteDetail(RowId, DetailId) {
//        $.confirm({
//            title: 'Are You Sure?',
//            content: 'Bill Details will be Removed!',
//            type: 'red',
//            buttons: {
//                ok: {
//                    text: "Delete!",
//                    btnClass: 'btn-primary',
//                    keys: ['enter'],
//                    action: function () {
//                        $('#tr_' + RowId).remove();
//                        //lblTotalBalanceDebitNoteAmount();
//                        if (DetailId > 0) {
//                            var DeleteIds = $('#BranchManifestDetails_Delete').val();
//                            if (DeleteIds !== '') {
//                                DeleteIds = DeleteIds + ',' + DetailId;
//                            } else {
//                                DeleteIds = DetailId;
//                            }
//                            $('#BranchManifestDetails_Delete').val(DeleteIds);
//                        }
//                        fnClearBillData();
//                        toastr.success("Docket Deleted Successfully!");
//                    }
//                },
//                cancel: function () {
//                }
//            }
//        });
//    }

    function fnGetAllBillDetails() {
        var billDetails = [];

    //fnGetAllAdvanceDetails();

    //var paymentDetailsArray = [];
        //$('#tblPaymentTypeDetails').DataTable().rows().iterator('row', function (context, index) {
        //    var node = $(this.row(index).node());
        //    if ($('td .PaymentTypeId', node).val() && $('td .AccountId', node).val()) {
        //        paymentDetailsArray.push({
        //            PaymentTypeId: $('td .PaymentTypeId', node).val(),
        //            AccountId: isNaN(parseInt($('td .AccountId', node).val())) ? 0 : parseInt($('td .AccountId', node).val()),
        //            RefNo: $('td .RefNo', node).val(),
        //            RefDate: $('td .RefDate', node).val(),
        //            Amount: isNaN(parseFloat($('td .Amount', node).val())) ? 0 : parseFloat($('td .Amount', node).val()),
        //            Remarks: $('td .Remarks', node).val(),
        //            DetailId: isNaN(parseInt($('td .DetailId', node).val())) ? 0 : parseInt($('td .DetailId', node).val())
        //        });
        //    }
        //});
        //if (paymentDetailsArray.length > 0) {
        //    $("#PaymentTypeDetails_Insert").val(JSON.stringify(paymentDetailsArray));
        //} else {
        //    $("#PaymentTypeDetails_Insert").val('');
        //    //toastr.error("Please Enter at least one Payment Details!");
        //    //return false;
        //}

        $("#tblBillList tbody tr").each(function () {

            var this_row = $(this);
            var DocketId = parseInt($.trim(this_row.find('.DocketId').html()));
            var DocketNo = parseInt($.trim(this_row.find('.DocketNo').html()));
            var BookingDate = parseInt($.trim(this_row.find('.BookingDate').html()));
            //var CustomerType = $.trim(this_row.find('.CustomerType').html());
            //var NetAmount = parseInt($.trim($.trim(this_row.find('.NetAmount').html())));
           
            if (isNaN(DocketId))
                DocketId = 0;
            if (isNaN(DocketNo))
                DocketNo = 0;
            if (isNaN(BookingDate))
                BookingDate = 0;
            //if (isNaN(NetAmount))
            //    NetAmount = 0;
            //if (isNaN(PurchaseOrderId))
            //    PurchaseOrderId = 0;
            //if (isNaN(DetailId))
            //    DetailId = 0;

            billDetails.push({
                DocketId: DocketId,
                DocketNo: DocketNo,
                BookingDate: BookingDate,
                //CustomerType: CustomerType,
                //NetAmount: NetAmount
               
            });
        });

  

        if (billDetails.length > 0) {
            $("#BillDetails_Insert").val(JSON.stringify(billDetails));
    return true;
            } else {
                $("#BillDetails_Insert").val('');
    toastr.error("Please Enter at least one Bill!");
    return false;
        }
        fnCalculateTotalAmount();
} 



function fnViewDetail()
{
   // $('#myModal').addClass('show');
   // $('#myModal').addClass('show');
    //$("#myModal").prop("diaplay", "disable");

    $('#myModal').addClass('hide');
    $('#myModal').addClass('show');
    $("#myModal").css("display", "none");
}


function dismissModal() {
    $('#myModal').removeClass('show');
    $("#myModal").removeAttr("style");
}

//    function fnSetBalanceAmount(RowId) {
//        var BillAmount = parseFloat($('#BillAmount_' + RowId).val());
//    if (isNaN(BillAmount))
//        BillAmount = 0;

//    var TDSAmount = parseFloat($('#TDSAmount_' + RowId).val());
//    if (isNaN(TDSAmount))
//        TDSAmount = 0;

//    var AdjustmentAmount = parseFloat($('#AdjustmentAmount_' + RowId).val());
//    if (isNaN(AdjustmentAmount))
//        AdjustmentAmount = 0;

//    var PaidAmount = parseFloat($('#PaidAmount_' + RowId).val());
//    if (isNaN(PaidAmount))
//        PaidAmount = 0;

//    var BalanceAmount = BillAmount - TDSAmount - AdjustmentAmount - PaidAmount;
//        if (BalanceAmount < 0) {
//        BalanceAmount = BillAmount - PaidAmount;
//    $('#BalanceAmount_' + RowId).val(parseFloat(BalanceAmount).toFixed($('#D_L').val()));
//    $('#AdjustmentAmount_' + RowId).val(parseFloat(0).toFixed($('#D_L').val()));
//    $('#TDSAmount_' + RowId).val(parseFloat(0).toFixed($('#D_L').val()));
//    toastr.error("Adjustment/TDS Amount can not be greater than Balance!");
//        } else {
//        $('#BalanceAmount_' + RowId).val(parseFloat(BalanceAmount).toFixed($('#D_L').val()));
//    }

//    lblTotalBalanceDebitNoteAmount();
//}

//    function fnCheckCollectionAmount(RowId) {
//        var BalanceAmount = parseFloat($('#BalanceAmount_' + RowId).val());
//    if (isNaN(BalanceAmount))
//        BalanceAmount = 0;

//    var CollectionAmount = parseFloat($('#CollectionAmount_' + RowId).val());
//    if (isNaN(CollectionAmount))
//        CollectionAmount = 0;

//        if (CollectionAmount > BalanceAmount) {
//        toastr.error("Collection Amount can not be more then Balance Amount!");
//    $('#CollectionAmount_' + RowId).val(parseFloat(BalanceAmount).toFixed($('#D_L').val()));
//}
//lblTotalBalanceDebitNoteAmount();
//}

//    function lblTotalBalanceDebitNoteAmount() {

//        var TotalTDSAmount = 0;
//    var TotalAdjustmentAmount = 0;
//    var TotalCollectionAmount = 0;
//        $("#tblBranchManifest tbody tr").each(function () {
//            var this_row = $(this);

//    var TDSAmount = parseFloat($.trim(this_row.find('.TDSAmount').val()));
//    if (isNaN(TDSAmount))
//        TDSAmount = 0;
//    TotalTDSAmount += TDSAmount;

//    var AdjustmentAmount = parseFloat($.trim(this_row.find('.AdjustmentAmount').val()));
//    if (isNaN(AdjustmentAmount))
//        AdjustmentAmount = 0;
//    TotalAdjustmentAmount += AdjustmentAmount;

//    var CollectionAmount = parseFloat($.trim(this_row.find('.CollectionAmount').val()));
//    if (isNaN(CollectionAmount))
//        CollectionAmount = 0;
//    TotalCollectionAmount += CollectionAmount;

//});
//$('#lblTotalTDSAmount').val(parseFloat(TotalTDSAmount).toFixed($('#D_L').val()));
//$('#lblTotalAdjustAmount').val(parseFloat(TotalAdjustmentAmount).toFixed($('#D_L').val()));
//$('#lblTotalCollectionAmount').val(parseFloat(TotalCollectionAmount).toFixed($('#D_L').val()));

//var TotalUsedAmount = 0;
//        $("#tblAdvanceDetails tr:gt(0)").each(function () {
//            var this_row = $(this);
//    var UsedAmount = parseFloat($.trim(this_row.find('.UsedAmount').val()));

//    if (isNaN(UsedAmount))
//        UsedAmount = 0;
//    TotalUsedAmount += UsedAmount;
//});
//$('#TotalAdvanceAmount').val(TotalUsedAmount);

//var TotalAmount = TotalCollectionAmount - TotalUsedAmount;

//$('#TotalAmount').val(parseFloat(TotalAmount).toFixed($('#D_L').val()));
//}



    function fnCalculateTotalAmount() {
        var SubTotal = 0;
        var RoundOffAdd = 0;
        var RoundOffSub = 0;
        var NetAmount = 0;
        //var OtherRemarks = 0;

        $("#tblBillList tr:gt(0)").each(function () {
            var this_row = $(this);
          
            var SubTotal = parseInt($.trim(this_row.find('.SubTotal').html()));
            var RoundOffAdd = parseInt($.trim(this_row.find('.RoundOffAdd').html()));
            var RoundOffSub = parseInt($.trim(this_row.find('.RoundOffSub').html()));
            var NetAmount = parseInt($.trim(this_row.find('.NetAmount').html()));
           // var OtherRemarks = parseInt($.trim(this_row.find('.OtherRemarks').html()));

            if (isNaN(SubTotal))
                SubTotal = 0;
            if (isNaN(RoundOffAdd))
                RoundOffAdd = 0;
            if (isNaN(RoundOffSub))
                RoundOffSub = 0;

            if (isNaN(NetAmount))
                 NetAmount = 0;
            //if (isNaN(OtherRemarks))
               // OtherRemarks = 0;
    
    //if (isNaN(ChargeWeight))
    //    ChargeWeight = 0;

            SubTotal += NetAmount;
   // TotalToPayAmount += NoOfPackages;
    //TotalActualWeight += ChargeWeight;
});
        $('#SubTotal').val(parseFloat(TotalAmount).toFixed($('#SubTotal').val()));
        $('#RoundOffAdd').val(parseFloat(TotalToPayAmount).toFixed($('#RoundOffAdd').val()));
        $('#RoundOffSub').val(parseFloat(TotalActualWeight).toFixed($('#RoundOffSub').val()));
}
