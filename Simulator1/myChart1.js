var config = {
    type: 'scatter',
    data: {
        labels: ['0', '5', '15', '20', '35'],
        datasets: [{
            label: 'الشحنة',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
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
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'فارق الجهد'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'الشحنة'
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('canvasChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};


var colorNames = Object.keys(window.chartColors);
document.getElementById('btn-chart').addEventListener('click', function() {

    if (document.getElementById("myCheckCapacity").checked == false) {
        alert("لا يمكن تحديث الرسم في حال عدم تثبيت قيمة السعة")
        return;
    };

    config.data.datasets.splice(0, 1);
    var Ulabels = [];
    var QData = [];
    var table = document.getElementById("data-table");
    var points = [{ x: 0, y: 0 }];
    for (var i = 1, row; row = table.rows[i]; i++) {
        Ulabels.push(row.cells[1].innerText);
        QData.push(row.cells[2].innerText);
        points.push({ x: row.cells[1].innerText, y: row.cells[2].innerText });
    }
    Ulabels.sort();
    QData.sort();

    var newDataset = {
        label: 'الشحنة',
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        //data: QData,
        data: points,
        fill: false
    };

    //for (var index = 0; index < config.data.labels.length; ++index) {
    //newDataset.data.push(randomScalingFactor());
    //}
    config.data.labels = Ulabels;
    config.data.datasets.push(newDataset);
    config.options.title.text = 'السعة ثابتة بقيمة ' + document.getElementById("Capacity").value;

    window.myLine.update();
});