            function fnAddNewContract(e) {
                //e.preventDefault();
                var obj = new Object();

            var GstNo = $('#ContractGSTNo').val();
                if (obj.GstNo == '') {
                $('#ContractGSTNo').focus();
            toastr.error('Please Enter GSTNo ');
            return false;
             }

            var StateId = isNaN(parseInt($('#ContractStateId').val())) ? 0 : parseInt($('#ContractStateId').val());
            var StateName = $('#ContractStateId :selected').text();
            var CityId = isNaN(parseInt($('#ContractDestinationId').val())) ? 0 : parseInt($('#ContractDestinationId').val());
            var CityName = $('#ContractDestinationId :selected').text();
            var Address = $('#ContractAdd1').val();
                var BranchIds = isNaN(parseInt($('#ContractBranchIds').val())) ? 0 : parseInt($('#ContractBranchIds').val());
                var BranchName = $('#ContractBranchIds :selected').text();

                var $ele = $('input[name="ContractBranchIds"]');
                var newBranchIds = '';
                if ($ele.length > 0) {
                    for (var i = 0; i < $ele.length; i++) {
                        if ($ele[i].type === 'checkbox') {
                            if ($ele[i].checked === true) {
                                if (newBranchIds !== '') {
                                    newBBranchIds = newBranchIds + ',' + $ele[i].value;
                                }
                                else {
                                    newBranchIds = $ele[i].value;
                                }
                            }
                        }
                    }
                }
            obj.ContractStateId = StateId;
            obj.ContractDestinationId = CityId;
            obj.ContractAdd1 = Address;
            obj.ContractGSTNo = GstNo;
            obj.StateName = StateName;
            obj.CityName = CityName;
                obj.ContractBranchIds = BranchIds;
                obj.BranchName = BranchName;

        fnAddRow(obj, true);
        }

            function fnAddRow(obj, IsDisplayMessage) {

                var UpdateId = parseInt($('#UpdateId').val());
            if (isNaN(UpdateId))
                UpdateId = 0;
            var lastId = 0;
                if (UpdateId === 0) {
                    try {
                lastId = parseInt($("#tblcustomercontractlist tr:last td.DetailId:last").attr('id').split("_").pop());
            } catch (e) {
                lastId = 0;
            }
            if (isNaN(lastId))
                lastId = 0;

            lastId = lastId === 0 ? 1 : lastId + 1;
                } else {
                lastId = UpdateId;
            }

                var EditRow = '<a title="Edit" onclick = "fnEditDetail(' + lastId + ');" class="text-success mr-2"><i class="fa fa-pencil"></i></a>';
                var DeleteRow = "<a title='Delete' onclick = 'fnDeleteDetail(" + lastId + "," + obj.ContractId + ");' class='text-danger mr-2'><i class='fa fa-trash'></i></a>";
               // var DeleteRow = "<a title='Delete' onclick='fnDeleteDetail(" + lastId + "," + obj.ContractId + ");' class='text-danger mr-2'><i class='nav-icon i-Close-Window font-weight-bold deleteRow'></i></a>";
               // var DeleteRow = "<a title='Delete' onclick='fnDeleteDetail(" + lastId + "," + obj.ContractId + ");' class='text-danger mr-2'><i class='nav-icon i-Close-Window font-weight-bold deleteRow'></i></a>";
            var htmlString = ''
                    + '<td>' + lastId + '</td>'
                    + '<td class="ContractStateId" id="ContractStateId_' + lastId + '">' + obj.StateName + '</td>'
                    + '<td class="ContractDestinationId" id="ContractDestinationId_' + lastId + '">' + obj.CityName + '</td>'
                    + '<td class="ContractAdd1" id="ContractAdd1_' + lastId + '">' + obj.ContractAdd1 + '</td>'
                + '<td class="ContractGSTNo" id="ContractGSTNo_' + lastId + '" >' + obj.ContractGSTNo + '</td>'
                + '<td class = "ContractBranchIds" id="ContractBranchIds_' + lastId + '" >' + obj.BranchIds + '</td>'  
                    + '<td>' + EditRow + '</td>'
                    + '<td>' + DeleteRow + '</td>'
            + '';

                if (UpdateId > 0) {
                $('#tr_' + lastId).html(htmlString);
            if (IsDisplayMessage)
                toastr.success("Detail Updated Successfully!");
                } else if (htmlString != null) {
                htmlString = '<tr id="tr_' + lastId + '">'
                + htmlString
                + '</tr>';
            $('#tblcustomercontractlist').append(htmlString);
            if (IsDisplayMessage)
                toastr.success("Detail Inserted Successfully!");
        }
                else {
                alert("NOPE");
                }

                clear_form_elements($('#myModal'));
                $('#myModal').modal('hide');
                fnClearData();

        }

function fnClearData() {
    $('#ContractStateId').val('').trigger('change');
   // $('#HSNCode').val('');
    $('#ContractDestinationId').val('').trigger('change');
    $('#ContractAdd1').val('').trigger('change');
    $('#ContractAdd2').val('').trigger('change');
    $('#ContractGSTNo').val('').trigger('change');
    $('#ContractBranchIds').val('').trigger('change');
   
}

function fnClearTable() {
    fnClearData();
    $("#tblcustomercontractlist tbody").empty();
}