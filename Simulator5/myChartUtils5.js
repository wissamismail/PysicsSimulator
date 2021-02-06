var configu = {
    type: 'line',
    data: {
        labels: 'V(node1)',
        datasets: [{
            label: 'فولتية المكثف  بالنسبة للزمن',
            backgroundColor: 'SlateBlue',
            borderColor: 'SlateBlue',
            data: [{ x: 0.01, y: 6.34736 }, { x: 0.02, y: 4.0289 }, { x: 0.03, y: 2.55729 }, { x: 0.04, y: 1.62321 }, { x: 0.08, y: 0.26348 }, { x: 0.1, y: 0.10615 }],
            fill: false,
        }, {
            label: 'مخرجات ثابت الزمن',
            backgroundColor: 'Violet',
            borderColor: 'Violet',
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
            text: 'رسم بياني لفولتية المكثف أثناء التفريغ'
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
            label: 'قيمة التيار المتدفق بالنسبة للزمن',
            backgroundColor: 'Chocolate',
            borderColor: 'Chocolate',
            data: [{ x: 0.01, y: -0.06347364 }, { x: 0.02, y: -0.04028903 }, { x: 0.03, y: -0.02557292 }, { x: 0.04, y: -0.01623206 }, { x: 0.08, y: -0.0026348 }, { x: 0.1, y: -0.00106153 }],
            fill: false,
        }, {
            label: 'مخرجات ثابت الزمن',
            backgroundColor: 'Violet',
            borderColor: 'Violet',
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
            text: 'رسم بياني لقيمة التيار أثناء التفريغ'
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

window.onload = function() {
    var ctxU = document.getElementById('canvasChart1').getContext('2d');
    var ctxI = document.getElementById('canvasChart2').getContext('2d');
    window.myLineU = new Chart(ctxU, configu);
    window.myLineI = new Chart(ctxI, configi);
};

function calculateValues(foi) {

    var E4 = document.getElementById('E4').value;
    var R4 = document.getElementById('R4').value;

    var ex4 = Math.exp(-(foi));
    var uFin = (parseFloat(E4) * ex4).toFixed(6);
    var iFin = -(parseFloat(E4) * ex4 / parseFloat(R4)).toFixed(6);
    return [uFin, iFin];
};

document.getElementById('btn-chart').addEventListener('click', function() {

    configu.data.datasets.splice(0, 2);
    configi.data.datasets.splice(0, 2);
    var tlabels = [];
    var uData = [];
    var iData = [];

    var table = document.getElementById("data-table");
    newValues0 = calculateValues(0);
    uData.push(newValues0[0]);
    iData.push(newValues0[1]);
    tlabels.push(0);

    for (var i = 1, row; row = table.rows[i]; i++) {
        tlabels.push(row.cells[0].innerText);
        uData.push(row.cells[1].innerText);
        iData.push(row.cells[2].innerText);
    }

    var ct = document.getElementById("ct4").value;
    var tData = [{ x: ct, y: 0 }, { x: ct * 2, y: 0 }, { x: ct * 3, y: 0 }, { x: ct * 4, y: 0 }, { x: ct * 5, y: 0 }];

    newValues1 = calculateValues(1);
    uData.push(newValues1[0]);
    iData.push(newValues1[1]);
    tlabels.push(ct);

    newValues2 = calculateValues(2);
    uData.push(newValues2[0]);
    iData.push(newValues2[1]);
    tlabels.push((ct * 2).toFixed(6));

    newValues3 = calculateValues(3);
    uData.push(newValues3[0]);
    iData.push(newValues3[1]);
    tlabels.push((ct * 3).toFixed(6));

    newValues4 = calculateValues(4);
    uData.push(newValues4[0]);
    iData.push(newValues4[1]);
    tlabels.push((ct * 4).toFixed(6));

    newValues5 = calculateValues(5);
    uData.push(newValues5[0]);
    iData.push(newValues5[1]);
    tlabels.push((ct * 5).toFixed(6));

    tlabels.sort((a, b) => a - b);
    uData.sort((a, b) => b - a);
    iData.sort((a, b) => a - b);
    var upoints = [];
    var ipoints = [];
    for (var i = 0; i < uData.length; i++) {
        upoints.push({ x: tlabels[i], y: uData[i] });
        ipoints.push({ x: tlabels[i], y: iData[i] });
    }
    var newDatasetu = {
        label: 'فولتية المكثف بالنسبة للزمن',
        backgroundColor: 'SlateBlue',
        borderColor: 'SlateBlue',
        data: upoints,
        fill: false,
    };
    var newDataseti = {
        label: 'قيمة التيار المتدفق بالنسبة للزمن',
        backgroundColor: 'Chocolate',
        borderColor: 'Chocolate',
        data: ipoints,
        fill: false
    };

    var newDatasetCT = {
        label: 'مخرجات ثابت الزمن',
        backgroundColor: 'Violet',
        borderColor: 'Violet',
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
    window.myLineI.update();
});