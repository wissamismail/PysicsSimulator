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


var dt = dynamicTable.config('data-table', ['field0', 'field1', 'field2', 'field3'], ['إسم المكثف', 'السعة', 'فارق الجهد', 'الشحنة'],
    'لا يوجد أسطر في الجدول ...');

let rowID = 0;
$('#btn-append').click(function(e) {
    rowID++;
    var data2 = [{
        field0: "المكثف " + rowID,
        field1: document.getElementById("C").value,
        field2: document.getElementById("U").value,
        field3: document.getElementById("Q").value,
    }];
    dt.load(data2, true);
    appendFunction()
});

$('#btn-clear').click(function(e) {
    dt.clear();
    rowID = 0;
    clearFunction(false)
});


function appendFunction() {
    if (document.getElementById('U').disabled != true) {
        document.getElementById('U').disabled = true;
        if (document.getElementById('radio-U').checked == true) {
            document.getElementById('radio-C').checked = true;
            handleClick(document.getElementById('radio-C'));
            var currentValue = 'C';
        }
        document.getElementById('radio-U').disabled = true;
    }
}

function clearFunction() {
    document.getElementById('U').disabled = false;
    document.getElementById('radio-U').disabled = false;
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

window.calculateResult = function() {
    var C = document.getElementById('C').value;
    var U = document.getElementById('U').value;
    var Q = document.getElementById('Q').value;

    if (currentValue == 'C') {
        var result = parseFloat(Q) / parseFloat(U);
        document.getElementById('C').value = result.toFixed(8);
    } else if (currentValue == 'U') {
        var result = parseFloat(Q) / parseFloat(C);
        document.getElementById('U').value = result.toFixed(6);
    } else {
        var result = parseFloat(C) * parseFloat(U);
        document.getElementById('Q').value = result.toFixed(8);
    }
}

window.calculateTotal = function() {
    var C = document.getElementById('C').value;
    var U = document.getElementById('U').value;
    var Q = document.getElementById('Q').value;
    //Q = C * U
    if (currentValue == 'C') {
        var result = parseFloat(Q) / parseFloat(U);
        document.getElementById('C').value = result.toFixed(8);
    } else if (currentValue == 'U') {
        var result = parseFloat(Q) / parseFloat(C);
        document.getElementById('U').value = result.toFixed(6);
    } else {
        var result = parseFloat(C) * parseFloat(U);
        document.getElementById('Q').value = result.toFixed(8);
    }
}

document.getElementById('btn-chart').addEventListener('click', function() {

    var Ct = 0;
    var Ut = document.getElementById('U').value;
    var Qt = 0;

    var table = document.getElementById("data-table");
    for (var i = 1, row; row = table.rows[i]; i++) {
        Ct += parseFloat(row.cells[1].innerText);
        Qt += parseFloat(row.cells[3].innerText);
    }
    var dataTotal2 = [{
        field0: 'المكثف المكافئ',
        field1: 'السعة المكافئة',
        field2: 'فارق الجهد المكافئ',
        field3: 'الشحنة المكافئة',
    }];
    dt.load(dataTotal2, true);
    var myRow = table.rows[table.rows.length - 1];
    myRow.className = 'rowTotalStyle';

    var dataTotal1 = [{
        field0: 'Cap eq',
        field1: Ct.toFixed(8),
        field2: Ut,
        field3: Qt.toFixed(8),
    }];
    dt.load(dataTotal1, true);
    var myRow = table.rows[table.rows.length - 1];
    myRow.className = 'rowStyle';
});