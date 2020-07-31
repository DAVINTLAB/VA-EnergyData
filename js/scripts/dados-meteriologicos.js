var lista_datas_meteriologicos = [];
var lista_global_meteriologicos = [];
var lista_global_mensal_meteriologicos = [];
var chart_heatmap_meteriologicos;
var unidades_medida = { "humidity" :"%", "pressure" : "hPa", "temperature" : "°C", "wind" : "m/s"};
var maxDenseDisplayDadosMeteriologicos = 0;

$(function() {
	verificaComboDadosMeteriologicos();
});

$("#carregarDadosMeteorologicos").click(function() {
	
	verificaComboDadosMeteriologicos();
	
	if ($("#dadosMeteorologicos").val() == "-") {
		alert("Select a option: Humidity, Pressure, Temperature or Wind.");
		return false;
	}
	
	if ($("#cidadeMeteorologicos").val() == "-") {
		alert("Select a city.");
		return false;
	}
	
	abreDadosMeteriologicos();
});

function verificaComboDadosMeteriologicos(){
	$('#dadosMeteorologicos').hide();
	$('#cidadeMeteorologicos').hide();
	$('#carregarDadosMeteorologicos').hide();
	$('#meteorologia').hide();

	var anoSelecionado = parseInt($("#ano").val());
	
	if (anoSelecionado >= 2013 && anoSelecionado <= 2017) {
		$('#dadosMeteorologicos').show();
		$('#cidadeMeteorologicos').show();
		$('#carregarDadosMeteorologicos').show();
	}
}

function abreDadosMeteriologicos() {
	
	var anoSelecionado = parseInt($("#ano").val());
	var anoProximo = anoSelecionado + 1;
	var opcao = $("#dadosMeteorologicos").val();
	var cidade = $("#cidadeMeteorologicos").val();
	var file = anoSelecionado + "_" + opcao + ".json";

    heatmap_meteriologico = {
        chart: {
            renderTo: 'ht_large_dados_meteriologicos',
            type: 'heatmap',
            zoomType: 'xy',
            margin: [60, 10, 80, 50],
            style: {
                cursor: 'crosshair' //zoom-in'
            },
            height: 360,
            marginTop: 0
        },

        boost: {
            useGPUTranslations: true
        },

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },

        xAxis: {
            type: 'datetime',
            min: Date.UTC(anoSelecionado, 0, 1),
            max: Date.UTC(anoProximo, 0, 1),
            useUTC: true,
            labels: {
                align: 'left',
                x: 5,
                y: 14
            },
            title: {
                text: 'Day'
            }
        },

        yAxis: {
            title: {
                text: null
            },
            labels: {
                format: '{value}h' //:00
            },
            minPadding: 0,
            maxPadding: 0,
            startOnTick: false,
            endOnTick: false,
            tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            tickWidth: 1,
            min: 0,
            max: 23,
            reversed: true,
            title: {
                text: 'Schedule',
                margin: 3
            },
        },

        colorAxis: {
            stops: [
                [0, '#3060cf'],
                [0.5, '#fffbbc'],
                [0.9, '#c4463a'],
                [1, '#c4463a']
            ],
            min: 0,
            startOnTick: false,
            endOnTick: false,
            labels: {
                format: '{value}'
            }
        },

        series: [{
            boostThreshold: 100,
            borderWidth: 0,
            nullColor: '#EFEFEF',
            colsize: 24 * 36e5, // one day
            tooltip: {
                headerFormat: null,
                pointFormat: '<b>{point.x:%e %b, %Y, %A} {point.y}:00h:<br><b>Consumption: {point.value} ' + primeiraLetraGrande(unidades_medida[opcao]) + '</b>'
            },
            turboThreshold: Number.MAX_VALUE
        }],

        plotOptions: {
            series: {
                events: {
                    click: function(e) {
						pontoHeatmapLarge = e;
						var pontoSelecionado = e.point.x;
						
                        if ($("#comparison").is(':checked')) {
							daySelected = new Date(pontoSelecionado + (24 * 60 * 60 * 1000));
							month = daySelected.getMonth()
							daySelected = daySelected.getDate();
                            mesSelected = setZero(month+1);
                            weekSelected = getWeekNumber(new Date(parseInt(pontoSelecionado)));
                            
                            dateSelected = $("#ano").val() + '-' + mesSelected + '-' + setZero(daySelected);

                            hourSelected = e.point.y;

							if (new Date(pontoSelecionado).getUTCDay() === 1) {
								weekSelected[1] += 1;
							}
							$("#origemDialog").val("meteriologico");
							$("#tipoMeteriologia").val(opcao);
                            $("#heatmapComparisonModal").modal('show');
                        }
                    }
                }
            }
        },

        navigation: {
            buttonOptions: {
                enabled: false
            }
        },

        credits: {
            enabled: false
        },

        responsive: {
            rules: [{
                condition: {
                    maxWidth: "100%"
                }
            }]
        }
    };

    $.ajax({
        url: "datasets/" + file,
        success: function(data) {
			minDenseDisplayDadosMeteriologicos = 0;
            maxDenseDisplayDadosMeteriologicos = 0;

            lista_datas_meteriologicos = [];
            lista_global_meteriologicos = [];

            $.each(data, function(key, val) {
                if (key != 0) {
					var dataFormato = val[0].split('-');
					var valor = val[2][cidade];
					
					//console.log("key", key, "valor", valor);
					
					if (valor < minDenseDisplayDadosMeteriologicos) {
						minDenseDisplayDadosMeteriologicos = valor;
					}

					if (valor > maxDenseDisplayDadosMeteriologicos) {
						maxDenseDisplayDadosMeteriologicos = valor;
					}

					var dataUTC = Date.UTC(dataFormato[0], dataFormato[1] - 1, dataFormato[2]);
					var dataBR = dataFormato[0] + "-" + dataFormato[1] + "-" + dataFormato[2];
					var dado = [dataBR, val[1], valor];
					lista_datas_meteriologicos.push(dado);

					var elemento = [dataUTC, val[1], parseInt(valor)];
					lista_global_meteriologicos.push(elemento);
					
					var elemento_mensal = [parseInt(dataFormato[1]), dataUTC, val[1], parseInt(valor)];
					lista_global_mensal_meteriologicos.push(elemento_mensal);

                } 
            });
			
			heatmap_meteriologico.series[0].data = lista_global_meteriologicos;
			heatmap_meteriologico.colorAxis.min = minDenseDisplayDadosMeteriologicos;
            heatmap_meteriologico.colorAxis.max = maxDenseDisplayDadosMeteriologicos;

            chart_heatmap_meteriologicos = new Highcharts.Chart(heatmap_meteriologico);
			
			$("#denseMeteriologicoTexto").html("Annual / Monthly View - Data selected <b>" + primeiraLetraGrande(opcao) + "</b> Max consumption: <b>" + parseInt(maxDenseDisplayDadosMeteriologicos) + " " + unidades_medida[opcao]);
			$('#meteorologia').show();
			rolarTela("link_meteorologia");
        },
        async: false
    });
}