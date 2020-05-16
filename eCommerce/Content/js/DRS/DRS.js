$(function () {

    var hCols = [3];

    var table = $('#tblDRSdetails').DataTable({
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
            "url": "/DRS/GetDrsSelectionList",
            "type": "POST",
            "datatype": "json",
            "data": function (d) {
                ////d.search = $("#SearchBranch").val();
                //d.isDisplayInPayment = 1;
                d.fdate = $('#SearchFromDate').val();
                d.tdate= $('#SearchToDate').val();
                d.stateid = $('#OriginHubStateId').val();
                console.log(d);
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

});
$(function () {
    //BindPurchaseBillList();
    var updateString = $('#DRSDetails_Update').val();
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

function AddDockets() {
    //$('#myModal').modal('show');
    $('#myModal').addClass('show');
    $("#myModal").css("display", "block");

    //GetDocketSelectionList();

}

function fnAddDRS() {
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
            url: '/DRS/GetSelectedDRSData_Payment/',
            type: 'POST',
            cache: false,
            async: false,
            data: {
                selectedDRSIds: newBranchIds
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
        //fnClearBillData();
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
            lastId = parseInt($("#tblBranchManifest tbody tr:last td.DetailId:last").attr('id').split("_").pop());
        } catch (e) {
            lastId = 0;
        }
        if (isNaN(lastId))
            lastId = 0;

        lastId = lastId === 0 ? 1 : lastId + 1;
    } else {
        lastId = UpdateId;
    }
    if (IsDisplayMessage && fnCheckDuplication(lastId, obj.DocketId)) {
        toastr.error("Bill already exists!");
        return;
    }
    //var Quantity = parseFloat(obj.Quantity);
    //if (isNaN(Quantity)) {
    //    Quantity = 0;
    //}
    var EditRow = "<a href='/Docket/DocketBookingForm?mode=view&mid=" + obj.DocketId_Encrypt + "' target = '_blank' > <i class='fa fa-eye'></i></a>";

    //var EditRow = "<a href="@Url.Action(" DocketBookingForm", "Docket")?mode = 'view ' & mid=obj.DocketId" target = '_blank' > <i class='fa fa - eye'></i></a >";
    var DeleteRow = "<a title='Delete' onclick='fnDeleteDetail(" + lastId + "," + obj.DetailId + ");' class='text-danger mr-2'><i class='fa fa-trash deleteRow'></i></a>";

    var htmlString = ''
        + '<td>' + lastId + '</td>'
        //+ '<td class="DocketId" id="DocketId_' + lastId + '">' + obj.DocketId+ '</td>'
        + '<td class="DocketNo" id="DocketNo_' + lastId + '">' + obj.DocketNo + '</td>'
        + '<td class="BookingDate"  id="BookingDate_' + lastId + '">' + obj.BookingDate + '</td>'
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
   
        + '<td class="NetAmount" id="NetAmount_' + lastId + '">' + obj.NetAmount + '</td>'
        + '<td>' + EditRow + '</td>'
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
        $('#tblBranchManifest').append(htmlString);
        if (IsDisplayMessage)
            toastr.success("Detail Inserted Successfully!");
    }
    $('#myModal').removeClass('show');
    $("#myModal").removeAttr("style");
}
function fnGetAllDetails() {
    var productDetails = [];
    //fnGetAllChargeDetails();

    $("#tblBranchManifest tr:gt(0)").each(function () {

        var this_row = $(this);
        var DocketId = parseInt($.trim(this_row.find('.DocketId').html()));
        var DocketNo = parseInt($.trim(this_row.find('.DocketNo').html()));
        var NetAmount = parseInt($.trim($.trim(this_row.find('.NetAmount').html())));
        
        //var DetailId = parseInt($.trim(this_row.find('.DetailId').html()));

        if (isNaN(DocketId))
            DocketId = 0;
        if (isNaN(DocketNo))
            DocketNo = 0;
        if (isNaN(NetAmount))
            NetAmount = 0;
        //if (isNaN(Quantity))
        //    Quantity = 0;
        //if (isNaN(BaseQuantity))
        //    BaseQuantity = 0;
        //if (isNaN(Rate))
        //    Rate = 0;
        //if (isNaN(BaseRate))
        //    BaseRate = 0;
        //if (isNaN(DiscountAmount))
        //    DiscountAmount = 0;
        //if (isNaN(DiscountPercentage))
        //    DiscountPercentage = 0;
        //if (isNaN(Amount))
        //    Amount = 0;
        //if (isNaN(SGSTId))
        //    SGSTId = 0;
        //if (isNaN(SGSTAmount))
        //    SGSTAmount = 0;
        //if (isNaN(SGSTPer))
        //    SGSTPer = 0;
        //if (isNaN(CGSTId))
        //    CGSTId = 0;
        //if (isNaN(CGSTAmount))
        //    CGSTAmount = 0;
        //if (isNaN(CGSTPer))
        //    CGSTPer = 0;
        //if (isNaN(IGSTId))
        //    IGSTId = 0;
        //if (isNaN(IGSTAmount))
        //    IGSTAmount = 0;
        //if (isNaN(IGSTPer))
        //    IGSTPer = 0;
        //if (isNaN(OtherTaxId))
        //    OtherTaxId = 0;
        //if (isNaN(OtherTaxAmount))
        //    OtherTaxAmount = 0;
        //if (isNaN(OtherTaxPer))
        //    OtherTaxPer = 0;
        //if (isNaN(TotalAmount))
        //    TotalAmount = 0;
        //if (isNaN(DetailId))
        //    DetailId = 0;

        productDetails.push({
            DocketId: DocketId,
            DocketNo: DocketNo,
            NetAmount: NetAmount,
           
        });
    });

    if (productDetails.length > 0) {
        $("#DRSDetails_Insert").val(JSON.stringify(productDetails));
        return true;
    } else {
        $("#DRSDetails_Insert").val('');
        toastr.error("Please Enter atleast one Product Details!");
        return false;
    }
}