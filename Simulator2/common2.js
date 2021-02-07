//file:///F:/Projects/PysicsSimulator/Simulator1/index.html
var dynamicTable = (function() {

    var _tableId, _table,
        _fields, _headers,
        _defaultText;

    /** Builds the row with columns from the specified names. 
     *  If the item parameter is specified, the memebers of the names array will be used as property names of the item; otherwise they will be directly parsed as text.
     */
    function _buildRowColumns(names, item) {
        var row = '<tr>';
        if (names && names.length > 0) {
            $.each(names, function(index, name) {
                var c = item ? item[name + ''] : name;
                row += '<td>' + c + '</td>';
            });
        }
        row += '</tr>';
        return row;
    }

    /** Builds and sets the headers of the table. */
    function _setHeaders() {
        // if no headers specified, we will use the fields as headers.
        _headers = (_headers == null || _headers.length < 1) ? _fields : _headers;
        var h = _buildRowColumns(_headers);
        if (_table.children('thead').length < 1) _table.prepend('<thead></thead>');
        _table.children('thead').html(h);
    }

    function _setNoItemsInfo() {
        if (_table.length < 1) return; //not configured.
        var colspan = _headers != null && _headers.length > 0 ?
            'colspan="' + _headers.length + '"' : '';
        var content = '<tr class="no-items"><td ' + colspan + ' style="text-align:center">' +
            _defaultText + '</td></tr>';
        if (_table.children('tbody').length > 0)
            _table.children('tbody').html(content);
        else _table.append('<tbody>' + content + '</tbody>');
    }

    function _removeNoItemsInfo() {
        var c = _table.children('tbody').children('tr');
        if (c.length == 1 && c.hasClass('no-items')) _table.children('tbody').empty();
    }

    return {
        /** Configres the dynamic table. */
        config: function(tableId, fields, headers, defaultText) {
            _tableId = tableId;
            _table = $('#' + tableId);
            _fields = fields || null;
            _headers = headers || null;
            _defaultText = defaultText || 'لا يوجد أسطر في الجدول...';
            _setHeaders();
            _setNoItemsInfo();
            return this;
        },
        /** Loads the specified data to the table body. */
        load: function(data, append) {
            if (_table.length < 1) return; //not configured.
            _setHeaders();
            _removeNoItemsInfo();
            if (data && data.length > 0) {
                var rows = '';
                $.each(data, function(index, item) {
                    rows += _buildRowColumns(_fields, item);
                });
                var mthd = append ? 'append' : 'html';
                _table.children('tbody')[mthd](rows);
            } else {
                _setNoItemsInfo();
            }
            return this;
        },
        /** Clears the table body. */
        clear: function() {
            _setNoItemsInfo();
            return this;
        }
    };
}());

$('#my-materials-combo').on('change', function(e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    document.getElementById("Em_number").value = valueSelected;
    if (valueSelected == 1) {
        document.getElementById('Em_number').disabled = false;
    } else {
        document.getElementById('Em_number').disabled = true;
    }
});

$(document).ready(function(e) {

    var dt = dynamicTable.config('data-table', ['field0', 'field1', 'field2', 'field3'], ['رقم القياس', 'السعة', 'المسافة', 'المساحة'], //set to null for field names instead of custom header names
        'لا يوجد أسطر في الجدول ...');

    let rowID = 0;
    $('#btn-append').click(function(e) {
        rowID++;
        var data2 = [{
            field0: rowID,
            field1: document.getElementById("C2").value,
            field2: document.getElementById("d2").value,
            field3: document.getElementById("A2").value,
        }];
        dt.load(data2, true);
        document.getElementById('fixDistance').disabled = true;
    });

    $('#btn-clear').click(function(e) {
        dt.clear();
        rowID = 0;
        document.getElementById('fixDistance').disabled = false;
    });

});

function myCheckBoxEr() {
    var checkBox = document.getElementById("myCheckEr");

    if (checkBox.checked == true) {
        document.getElementById('my-materials-combo').disabled = true;
        document.getElementById('Em_number').disabled = true;
        document.getElementById('Er_number').hidden = false;
        document.getElementById("my-materials-combo").selectedIndex = 12;
    } else {
        document.getElementById('my-materials-combo').disabled = false;
        document.getElementById('Er_number').hidden = true;
        document.getElementById('Em_number').disabled = false;
    }
}

window.calcEm = function() {
    document.getElementById('Em_number').value = document.getElementById('Er_number').value * 8.85e-12;
}

var currentValue = 'Q2';

function handleClick(myRadio) {
    currentValue = myRadio.value;
    if (currentValue == 'C2') {
        document.getElementById('C2').readOnly = true;
        document.getElementById('d2').readOnly = false;
        document.getElementById('A2').readOnly = false;
    } else if (currentValue == 'd2') {
        document.getElementById('C2').readOnly = false;
        document.getElementById('d2').readOnly = true;
        document.getElementById('A2').readOnly = false;
    } else {
        document.getElementById('C2').readOnly = false;
        document.getElementById('d2').readOnly = false;
        document.getElementById('A2').readOnly = true;
    }
}

window.calculateResult = function() {
    var C = document.getElementById('C2').value;
    var d = document.getElementById('d2').value;
    var A = document.getElementById('A2').value;
    var Em = document.getElementById('Em_number').value;
    if (currentValue == 'C2') {
        var result = Em * parseFloat(A) / parseFloat(d);
        document.getElementById('C2').value = result.toFixed(10);
    } else if (currentValue == 'd2') {
        var result = Em * parseFloat(A) / parseFloat(C);
        document.getElementById('d2').value = result.toFixed(2);
    } else {
        var result = parseFloat(C) * parseFloat(d) / Em;
        document.getElementById('A2').value = result.toFixed(2);
    }

}

window.synchDistance = function() {
    document.getElementById('d2').value = document.getElementById('fixDistance').value;
}


function mydistanceFunction() {
    var checkBox = document.getElementById("mydistanceCapacity");
    var text = document.getElementById("fixDistance");
    if (checkBox.checked == true) {
        text.style.display = "inline-block";
        document.getElementById('d2').disabled = true;
        document.getElementById('radio-A2').checked = true;
        document.getElementById('radio-d2').disabled = true
        document.getElementById('d2').value = document.getElementById('fixDistance').value;
    } else {
        text.style.display = "none";
        document.getElementById('radio-d2').disabled = false;
        document.getElementById('d2').disabled = false;
    };
}