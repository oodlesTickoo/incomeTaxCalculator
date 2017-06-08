app.service('ChartServiceHc',function(){
  this.createChart = function(taxOnIncome,netIncomePerAnnum){

    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column',
            options3d: {
              enabled: true,
                 alpha: 7,
                 beta: 18,
                 depth: 47,
                 viewDistance: 25
   }
        },
        title: {
            text: 'Income Tax Calculator'
        },
        colors: ['#0d2f47', '#989898'],

        exporting:{
            enabled:false
        },
        xAxis: {
            type: 'category',
            labels:{
                autoRotation : false,
            },
            gridLineColor: 'transparent',
        },
        yAxis: {
            title: {
                text: 'Amount ($)'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0
            }
        },
        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
            pointFormatter: function(){
                return '<b>'+'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

            }
        },
        credits: {
            enabled: false
        },

        series: [{
            colorByPoint: true,
            data: [{
                name: 'Net Income Per Annum',
                y: netIncomePerAnnum,
            }, {
                name: 'Tax On Income',
                y: taxOnIncome,
            }]
        }],

    });

}});
