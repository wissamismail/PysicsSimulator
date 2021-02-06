var config = {
    type: 'line',
    data: {
        labels: ['0', '20', '40', '60', '80'],
        datasets: [{
            label: 'الشحنة',
            backgroundColor: 'Coral',
            borderColor: 'Coral',
            data: [{ x: 0, y: 0 }, { x: 20, y: 2e-11 }, { x: 40, y: 4e-11 }, { x: 60, y: 6e-11 }, { x: 80, y: 8e-11 }],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Em/d = 8.85e-13'
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
                            return tick.toString() + 'm²';
                        }
                        return '';
                    },
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: ' المساحة'
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                ticks: {
                    userCallback: function(tick) {
                        return tick.toString() + 'F';
                    },
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'السعة'
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
    var A2labels = [];
    var C2Data = [];
    var table = document.getElementById("data-table");
    var points = [{
        x: 0,
        y: 0
    }];
    for (var i = 1, row; row = table.rows[i]; i++) {
        A2labels.push(row.cells[2].innerText);
        C2Data.push(row.cells[0].innerText);
    }
    A2labels.sort((a, b) => a - b);
    C2Data.sort((a, b) => a - b);
    for (var i = 0; i < A2labels.length; i++) {
        points.push({ x: A2labels[i], y: C2Data[i] });
    }
    var newDataset = {
        label: 'السعة',
        backgroundColor: 'Coral',
        borderColor: 'Coral',
        data: points,
        fill: false
    };

    config.data.labels = A2labels;
    config.data.datasets.push(newDataset);
    config.options.title.text = 'Em/d= ' + document.getElementById('Em_number').value / document.getElementById("fixDistance").value;
    window.myLine.update();
});