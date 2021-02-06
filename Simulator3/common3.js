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

    var dt = dynamicTable.config('data-table', ['field1', 'field2', 'field3'], ['السعة', 'فارق الجهد', 'الطاقة المخزنة'], //set to null for field names instead of custom header names
        'لا يوجد أسطر في الجدول ...');

    $('#btn-append').click(function(e) {
        var data2 = [{
            field1: document.getElementById("C").value,
            field2: document.getElementById("U").value,
            field3: document.getElementById("E").value,
        }];
        dt.load(data2, true);
    });

    $('#btn-clear').click(function(e) {
        dt.clear();
    });

});

window.calculateResult = function() {
    var C = document.getElementById('C').value;
    var U = document.getElementById('U').value;
    var Q = document.getElementById('Q').value;

    if (currentValue == 'C') {
        var result = parseFloat(Q) / parseFloat(U);
        document.getElementById('C').value = result.toFixed(8);
    } else if (currentValue == 'U') {
        var result = parseFloat(Q) / parseFloat(C);
        document.getElementById('U').value = result.toFixed(2);
    } else {
        var result = parseFloat(C) * parseFloat(U);
        document.getElementById('Q').value = result.toFixed(5);
    }
}

function calculateUEP() {
    var C = parseFloat(document.getElementById('C').value);
    var Q = parseFloat(document.getElementById('Q').value);
    var t = parseFloat(document.getElementById('t').value);
    var result1 = Q / C;
    document.getElementById('U').value = result1.toFixed(2);
    var result2 = (Q * Q) / (C * 2);
    document.getElementById('E').value = result2.toFixed(5);
    var result3 = result2 / t;
    document.getElementById('P').value = result3.toFixed(5);
}

function calculateQEP() {
    var C = parseFloat(document.getElementById('C').value);
    var U = parseFloat(document.getElementById('U').value);
    var t = parseFloat(document.getElementById('t').value);
    var result1 = parseFloat(C) * parseFloat(U);
    document.getElementById('Q').value = result1.toFixed(5);
    var result2 = (C * U * U) / 2;
    document.getElementById('E').value = result2.toFixed(5);
    var result3 = result2 / t;
    document.getElementById('P').value = result3.toFixed(5);
}

function calculateP() {
    var t = parseFloat(document.getElementById('t').value);
    var E = parseFloat(document.getElementById('E').value);
    var result3 = E / t;
    document.getElementById('P').value = result3.toFixed(5);
}