var config = {
    type: 'line',
    data: {
        labels: 'V(node2)',
        datasets: [{
            label: 'فولتية المكثف',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [{ x: 0, y: 150 }, { x: 2, y: 80 }, { x: 5, y: 50 }, { x: 10, y: 20 }, { x: 15, y: 15 }, { x: 20, y: 5 }],
            fill: false,
        }, {
            label: 'قيمة التيار المتدفق',
            backgroundColor: 'rgb(255, 159, 64)',
            borderColor: 'rgb(255, 159, 64)',
            data: [{ x: 1, y: 2 }, { x: 3, y: 80 }, { x: 8, y: 170 }, { x: 15, y: 180 }, { x: 16, y: 185 }, { x: 20, y: 190 }],
            fill: false,
        }, {
            label: 'مخرجات ثابت الزمن',
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
            data: [{ x: 3, y: 0 }, { x: 6, y: 0 }, { x: 9, y: 0 }, { x: 12, y: 0 }, { x: 15, y: 0 }],
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 10,
            showLine: false // no line shown
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'رسم بياني توضيحي'
        },

        hover: {
            mode: 'nearest',
            intersect: false
        },
        scales: {
            xAxes: [{
                type: 'linear',
                display: true,
                ticks: {
                    userCallback: function(tick) {
                        var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
                        if (remain === 1 || remain === 2 || remain === 5) {
                            return tick.toString() + 'second';
                        }
                        return '';
                    },
                },
                scaleLabel: {
                    display: true,
                    labelString: 'لحظة القياس'
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                ticks: {
                    userCallback: function(tick) {
                        return tick.toString();
                    }
                },
                scaleLabel: {
                    display: false

                }
            }]
        }
    }
};
var randomScalingFactor = function() {
    return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
};

window.onload = function() {
    var ctx = document.getElementById('canvasChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

document.getElementById('btn-chart').addEventListener('click', function() {

    config.data.datasets.splice(0, 3);
    var tlabels = [0];
    var uData = [0];
    var iData = [0];

    var table = document.getElementById("data-table");
    var upoints = [{ x: 0, y: 0 }];
    var ipoints = [{ x: 0, y: 0 }];
    for (var i = 1, row; row = table.rows[i]; i++) {
        tlabels.push(row.cells[0].innerText);
        uData.push(row.cells[1].innerText);
        iData.push(row.cells[2].innerText);
    }
    tlabels.sort((a, b) => a - b);
    uData.sort((a, b) => a - b);
    for (var i = 0; i < uData.length; i++) {
        upoints.push({ x: tlabels[i], y: uData[i] });
        ipoints.push({ x: tlabels[i], y: iData[i] });
    }
    var ct = document.getElementById("ct4").value;
    var tData = [{ x: ct, y: 0 }, { x: ct * 2, y: 0 }, { x: ct * 3, y: 0 }, { x: ct * 4, y: 0 }, { x: ct * 5, y: 0 }];

    var newDataseti = {
        label: 'فولتية المكثف',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: ipoints,
        fill: false
    };
    var newDatasetu = {
        label: 'قيمة التيار المتدفق',
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgb(255, 159, 64)',
        data: upoints,
        fill: false,
    };
    var newDatasetCT = {
        label: 'مخرجات ثابت الزمن',
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor: 'rgb(153, 102, 255)',
        data: tData,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 10,
        showLine: false // no line shown
    }

    //['0', '1Ƭ', '2Ƭ', '3Ƭ', '4Ƭ', '5Ƭ']
    config.data.labels = tlabels;
    config.data.datasets.push(newDataseti);
    config.data.datasets.push(newDatasetu);
    config.data.datasets.push(newDatasetCT);
    config.options.title.text = 'السعة ثابتة بقيمة ' + document.getElementById("ct4").value;

    window.myLine.update();
});