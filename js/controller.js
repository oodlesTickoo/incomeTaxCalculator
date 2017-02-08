app.controller("TTRController", ['$scope', '$timeout', 'TaxRateCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', function($scope, $timeout, TaxRateCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker) {

    $scope.result = {}

    $scope.forms = {};

    $scope.personalDetails = {};
    $scope.personalDetails = {
        firstName: "Amit",
        lastName: "Kumar",
        email: "iamitkrs@gmail.com",
        mobile: 412121212,
        postalCode: 1234
    };

    $scope.chartOneOpen = true;
    $scope.tempp;
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    $scope.infoShow = function(value) {
        if (value) {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
            document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
            document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
            document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
        } else {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
        }
    };
    $scope.listOb = [{ id: 0, name: "Week" },
        { id: 1, name: "Fortnight" },
        { id: 2, name: "Month" }
    ];
    var paymentFrequency = "1";
    $timeout(function() {
        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 2,
        });
        $('.selectpicker option[value="1"]').attr("selected", true);
        $('.selectpicker').selectpicker('refresh');
    });

    $('.selectpicker').on('change', function() {
        paymentFrequency = $('.selectpicker option:selected').val();
        // calculateFinal();
        $timeout(0);
    });

    $scope.annualSalary = 60000;
    var annualSalarySlider = document.getElementById('annualSalarySlider');
    noUiSlider.create(annualSalarySlider, {
        start: [$scope.annualSalary],
        range: {
            'min': [0],
            'max': [2000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });
    var annualSalaryInput = document.getElementById('annualSalaryInput');

    annualSalarySlider.noUiSlider.on('update', function(values, handle) {
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
    });

    annualSalaryInput.addEventListener("change", function() {
        annualSalarySlider.noUiSlider.set($scope.annualSalary);
    });

    annualSalarySlider.noUiSlider.on('set', function(values, handle) {
        // calculateFinal();
        $timeout(0);
    });

    // annualSalarySlider.noUiSlider.on('set', function(values, handle) {
    //     annualSalaryInput.value = values[handle];
    //     $scope.annualSalary = (values[handle]);
    // });

    $scope.calculateFinal = function(isValid) {
        if (isValid) {
            /*var http = new XMLHttpRequest();
                var url = "get_data.php";
                var params = "lorem=ipsum&name=binny";
                http.open("POST", url, true);

                //Send the proper header information along with the request
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                http.onreadystatechange = function() { //Call a function when the state changes.
                    if (http.readyState == 4 && http.status == 200) {
                        alert(http.responseText);
                    }
                }
                http.send(params);*/

            function httpGetAsync(theUrl, callback) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var dataURI = 'data:image/jpeg;base64,' + btoa(unescape(encodeURIComponent(xmlHttp.responseText)));
                        document.getElementsByClassName("comp-logo").src=dataURI;
                        console.log("response:",xmlHttp.response);
                        console.log("responseText:",xmlHttp.responseText);
                        console.log("responseType:",xmlHttp.responseType);
                        console.log("responseURL:",xmlHttp.responseURL);
                        callback(xmlHttp.responseText);
                    }
                }
                xmlHttp.open("GET", theUrl, true); // true for asynchronous 
                xmlHttp.send(null);
            }

            httpGetAsync("http://180.151.85.194:3000/webshot?fy=2010&age=25&cses=60000&thp=37000", function() {
                /*fs.writeFile('logo.png', imagedata, 'binary', function(err) {
                    if (err) throw err
                    console.log('File saved.')
                })*/
                PdfMaker.createChart($scope.personalDetails, Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', '')), $scope.result);
            });


            /*var xhr = new XMLHttpRequest();
            xhr.open('GET', "http://180.151.85.194:3000/webshot?fy=2010&age=25&cses=60000&thp=37000", true);
            xhr.send();
            xhr.addEventListener("readystatechange", processRequest, false);

            function processRequest(e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // time to partay!!!
                }
            }*/











        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }

    //$scope.calculateFinal(true);

    document.getElementById("download").addEventListener("click", function() {
        if ($scope.forms.ttrForm.$valid) {
            PdfMaker.createChart($scope.personalDetails, Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', '')), $scope.result, $scope.tempp);
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    });

    document.getElementById("bar-chart").addEventListener("click", function() {
        $scope.chartOneOpen = true;
        document.getElementById("donutContainer").style.display = "none";
        document.getElementById("container").style.display = "block";
    });

    document.getElementById("donut-chart").addEventListener("click", function() {
        $scope.chartOneOpen = false;
        document.getElementById("container").style.display = "none";
        document.getElementById("donutContainer").style.display = "block";
    });

    $(".print-doc").on("click", printBothCharts);

    function printBothCharts() {

        if ($scope.forms.ttrForm.$valid) {

            if ($scope.chartOneOpen) {
                document.getElementById("donutContainer").style.display = "block";
                window.print();
                setTimeout(function() {
                    document.getElementById("donutContainer").style.display = "none";
                }, 100);
            } else {
                document.getElementById("container").style.display = "block";
                window.print();
                setTimeout(function() {
                    document.getElementById("container").style.display = "none";
                }, 100);
            }
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }

}]);
