Chart.defaults.global.defaultFontColor = 'rgb(25, 60, 90)';
Chart.defaults.global.defaultFontfamil = 'Droid Arabic Regular';
Chart.defaults.global.defaultFontSize = 14;

var config = {
    type: 'line',
    data: {
        labels: ['0', '5', '15', '20', '35'],
        datasets: [{
            label: 'الطاقة المخزنة',
            backgroundColor: 'rgb(229, 166, 25)',
            borderColor: 'rgb(229, 166, 25)',
            data: [{ x: 0, y: 0 }, { x: 5, y: 25 }, { x: 15, y: 75 }, { x: 20, y: 100 }, { x: 35, y: 175 }],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'السعة ثابتة بقيمة 5'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                type: 'linear',
                display: true,
                ticks: {
                    userCallback: function(tick) {
                        var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
                        if (remain === 1 || remain === 2 || remain === 5) {
                            return tick.toString() + 'V';
                        }
                        return '';
                    },
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'فارق الجهد'
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                ticks: {
                    userCallback: function(tick) {
                        return tick.toFixed(4).toString() + 'J';
                    },
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'الطاقة المخزنة'
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('canvasChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

document.getElementById('btn-chart').addEventListener('click', function() {

    config.data.datasets.splice(0, 1);
    var Ulabels = [];
    var QData = [];
    var table = document.getElementById("data-table");
    var points = [{
        x: 0,
        y: 0
    }];
    for (var i = 1, row; row = table.rows[i]; i++) {
        Ulabels.push(row.cells[2].innerText);
        QData.push(row.cells[3].innerText);
    }
    Ulabels.sort((a, b) => a - b);
    QData.sort((a, b) => a - b);
    for (var i = 0; i < Ulabels.length; i++) {
        points.push({ x: Ulabels[i], y: QData[i] });
    }
    var newDataset = {
        label: 'الطاقة المخزنة',
        backgroundColor: 'rgb(229, 166, 25)',
        borderColor: 'rgb(229, 166, 25)',
        data: points,
        fill: false
    };

    config.data.labels = Ulabels;
    config.data.datasets.push(newDataset);
    config.options.title.text = 'السعة ثابتة بقيمة ' + document.getElementById("C").value;
    window.myLine.update();
});