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

$(document).ready(function(e) {

    var dt = dynamicTable.config('data-table', ['field1', 'field2', 'field3'], ['لحظة القياس', 'فولتية المكثف', 'قيمة التيار المتدفق'], //set to null for field names instead of custom header names
        'لا يوجد أسطر في الجدول ...');

    $('#btn-append').click(function(e) {
        var data2 = [{
            field1: document.getElementById("T4").value,
            field2: document.getElementById("u4").value,
            field3: document.getElementById("i4").value,
        }];
        dt.load(data2, true);
    });

    $('#btn-clear').click(function(e) {
        dt.clear();
        var x = document.getElementById("myChart");
        x.style.display = "none";

    });

});

function myCheckBoxFunction() {
    var checkBox = document.getElementById("myCheckCapacity");
    var text = document.getElementById("Capacity");
    if (checkBox.checked == true) {
        text.style.display = "inline-block";
        document.getElementById('C').disabled = true;
        document.getElementById('radio-Q').checked = true;
        document.getElementById('radio-C').disabled = true
        document.getElementById('C').value = document.getElementById('Capacity').value;
    } else {
        text.style.display = "none";
        document.getElementById('radio-C').disabled = false;
        document.getElementById('C').disabled = false;
    };
}

var currentValue = 'Q';

function handleClick(myRadio) {
    currentValue = myRadio.value;
    if (currentValue == 'C') {
        document.getElementById('C').readOnly = true;
        document.getElementById('U').readOnly = false;
        document.getElementById('Q').readOnly = false;
    } else if (currentValue == 'U') {
        document.getElementById('C').readOnly = false;
        document.getElementById('U').readOnly = true;
        document.getElementById('Q').readOnly = false;
    } else {
        document.getElementById('C').readOnly = false;
        document.getElementById('U').readOnly = false;
        document.getElementById('Q').readOnly = true;
    }
}
window.synchCapacity = function() {
    document.getElementById('C').value = document.getElementById('Capacity').value;
}
window.calculateResult = function() {
    var R4 = document.getElementById('R4').value;
    var C4 = document.getElementById('C4').value;
    var E4 = document.getElementById('E4').value;
    var T4 = document.getElementById('T4').value;


    var ct4 = parseFloat(R4) * parseFloat(C4);
    document.getElementById('ct4').value = ct4.toFixed(2);

    var ex4 = Math.exp(-T4 / ct4);

    var u4 = parseFloat(E4) * (1 - ex4);
    document.getElementById('u4').value = u4.toFixed(2);

    var i4 = parseFloat(E4) * ex4 / parseFloat(R4);
    document.getElementById('i4').value = i4.toFixed(2);
}