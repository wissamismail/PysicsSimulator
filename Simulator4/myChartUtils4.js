var configu = {
    type: 'line',
    data: {
        labels: 'V(node1)',
        datasets: [{
            label: 'فولتية المكثف',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [{ x: 0.01, y: 3.65264 }, { x: 0.02, y: 5.9711 }, { x: 0.03, y: 7.44271 }, { x: 0.04, y: 8.37679 }, { x: 0.08, y: 9.73652 }, { x: 0.1, y: 9.89385 }],
            fill: false,
        }, {
            label: 'مخرجات ثابت الزمن',
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
            data: [{ x: 0.022, y: 0 }, { x: 0.044, y: 0 }, { x: 0.066, y: 0 }, { x: 0.088, y: 0 }, { x: 0.11, y: 0 }],
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
                    display: true,
                    labelString: 'u'
                }
            }]
        }
    }
};
var configi = {
    type: 'line',
    data: {
        labels: 'V(node2)',
        datasets: [{
            label: 'قيمة التيار المتدفق',
            backgroundColor: 'rgb(255, 159, 64)',
            borderColor: 'rgb(255, 159, 64)',
            data: [{ x: 0.01, y: 0.06347364 }, { x: 0.02, y: 0.04028903 }, { x: 0.03, y: 0.02557292 }, { x: 0.04, y: 0.01623206 }, { x: 0.08, y: 0.0026348 }, { x: 0.1, y: 0.00106153 }],
            fill: false,
        }, {
            label: 'مخرجات ثابت الزمن',
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
            data: [{ x: 0.022, y: 0 }, { x: 0.044, y: 0 }, { x: 0.066, y: 0 }, { x: 0.088, y: 0 }, { x: 0.11, y: 0 }],
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
                    display: true,
                    labelString: 'i'

                }
            }]
        }
    }
};
var randomScalingFactor = function() {
    return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
};

window.onload = function() {
    var ctxU = document.getElementById('canvasChart1').getContext('2d');
    var ctxI = document.getElementById('canvasChart2').getContext('2d');
    window.myLineU = new Chart(ctxU, configu);
    window.myLineI = new Chart(ctxI, configi);
};
document.getElementById('btn-chart').addEventListener('click', function() {

    configu.data.datasets.splice(0, 2);
    configi.data.datasets.splice(0, 2);
    var tlabels = [];
    var uData = [];
    var iData = [];

    var table = document.getElementById("data-table");
    var upoints = [];
    var ipoints = [];
    for (var i = 1, row; row = table.rows[i]; i++) {
        tlabels.push(row.cells[0].innerText);
        uData.push(row.cells[1].innerText);
        iData.push(row.cells[2].innerText);
    }
    tlabels.sort((a, b) => a - b);
    uData.sort((a, b) => a - b);
    iData.sort((a, b) => a - b);
    for (var i = 0; i < uData.length; i++) {
        upoints.push({ x: tlabels[i], y: uData[i] });
        ipoints.push({ x: tlabels[i], y: iData[i] });
    }
    var ct = document.getElementById("ct4").value;
    var tData = [{ x: ct, y: 0 }, { x: ct * 2, y: 0 }, { x: ct * 3, y: 0 }, { x: ct * 4, y: 0 }, { x: ct * 5, y: 0 }];

    var newDatasetu = {
        label: 'قيمة التيار المتدفق',
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgb(255, 159, 64)',
        data: upoints,
        fill: false,
    };
    var newDataseti = {
        label: 'فولتية المكثف',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: ipoints,
        fill: false
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


    configu.data.labels = tlabels;
    configu.data.datasets.push(newDatasetu);
    configu.data.datasets.push(newDatasetCT);
    window.myLineU.update();
    configi.data.labels = tlabels;
    configi.data.datasets.push(newDataseti);
    configi.data.datasets.push(newDatasetCT);
    //config.options.title.text = 'السعة ثابتة بقيمة ' + document.getElementById("ct4").value;
    window.myLineI.update();
});