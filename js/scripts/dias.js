function abreGraficoDias(grafico, pontos, pontosMinimos, pontosMedios, pontosMaximos, pontosMediana, valorDesvioPadrao, 
	valorVariancia, valorErroPadrao, valorCV){

	$("#" + grafico).show();
	$("#botoes-" + grafico).show();

	tipoGrafico = 'line';
	var dias = criaGraficoDias(pontos, pontosMinimos, pontosMedios, pontosMaximos, pontosMediana, valorDesvioPadrao, 
		valorVariancia, valorErroPadrao, valorCV, tipoGrafico, false);

	var dados = [];
	for(var i=0; i<=23; i++){
		var seriesBoxplot = [];
		var primeiroQuartil = parseInt(Quartile_25(new Array(pontosMinimos[i].y, pontosMaximos[i].y)));
		var ultimoQuartil = parseInt(Quartile_75(new Array(pontosMinimos[i].y, pontosMaximos[i].y)));

		seriesBoxplot.push(pontosMinimos[i].y, primeiroQuartil, pontosMediana[i].y, ultimoQuartil,  pontosMaximos[i].y);
		dados.push(seriesBoxplot);
	}

	criaGraficoDiasBoxPlot(dados);

	pontos = [];
	chart_dias = new Highcharts.Chart(dias);
}

function criaGraficoDias(pontos, pontosMinimos, pontosMedios, pontosMaximos, pontosMediana, valorDesvioPadrao, 
	valorVariancia, valorErroPadrao, valorCV, tipoGrafico, booleanPolar){
	return chart_dias_valores = {
		chart: {
			renderTo: 'area-conjunto-x1',
			type: tipoGrafico,
			polar: booleanPolar
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 0,
			y: 23,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			labels: {
				format: '{value}h', //:00
				rotation: -60
			},
			title: {
				text: 'Schedule'
			},
			minPadding: 0,
			maxPadding: 0,
			startOnTick: false,
			endOnTick: false,
			tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
			tickWidth: 1,
			min: 0,
			max: 23.5
		},
		yAxis: {
			title: {
				text: 'Consumption'
			}
		},
		tooltip: {
			formatter: function () {
				var text = '<b>'+this.x +':00h ' + this.y + ' Consumption<br>';

				if (this.series.name == "Consumption") {
					text += '<b>'+ valorVariancia + ' Variance<br>';
					text += '<b>'+ valorDesvioPadrao + ' Std. Deviation<br>';
					text += '<b>'+ valorErroPadrao + ' Std. Error<br>';
					text += '<b>'+ valorCV + ' Cof. Variation<br>';
				}

				return text;
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			},
			series: {
                allowPointSelect: true
            }
		},
		series: [
			{
				name: "Consumption",
				data:  pontos,
				color: "#008000",
				marker: {
					symbol: 'circle',
					radius: 6,
				}
			},
			{
				name: "Min.",
				data:  pontosMinimos,
				color: "#3060cf",
				marker: {
					symbol: 'triangle-down',
					radius: 6
				},
				visible: true
			},
			{
				name: "AVG",
				data:  pontosMedios,
				color: "#ffd700",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Median",
				data:  pontosMediana,
				color: "#FD6A02",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Max.",
				data:  pontosMaximos,
				color: "#d1473a",
				marker: {
					symbol: 'triangle',
					radius: 6
				},
				visible: true
			}
		],
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: "100%",
					maxHeight: "100%"
				}
			}]
		},
		legend: {
			text:null
		}
	};
}

function criaGraficoDiasBoxPlot(dados){
	return chart_dias_valores_boxplot = {

			chart: {
				renderTo: 'area-conjunto-x1',
				type: 'boxplot'
			},
		
			title: {
				text: ''
			},
		
			legend: {
				enabled: false
			},
		
			xAxis: {
				labels: {
					format: '{value}h', //:00
					rotation: -60
				},
				title: {
					text: 'Schedule'
				},
				minPadding: 0,
				maxPadding: 0,
				startOnTick: false,
				endOnTick: false,
				tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
				tickWidth: 1,
				min: 0,
				max: 23.5
			},
		
			yAxis: {
				title: {
					text: 'Consumption'
				}
			},
			plotOptions: {
				boxplot: {
					fillColor: '#A63400',
					lineWidth: 1,
					medianColor: '#3060CF',
					medianBorderColor: '#FFFFFF',
					medianWidth: 4,
					stemColor: 'black',
					stemDashStyle: 'solid',
					stemWidth: 1,
					whiskerColor: 'blueviolet',
					whiskerLength: '75%',
					whiskerWidth: 4
				}
			},
			series: [{
				name: 'Consumption',
				showInLegend: false,
				data: dados,
				fillColor: '#C0C0C0',
				color: '#010916',
				lineWidth: 1,
				tooltip: {
					headerFormat: '<b>{point.x}:00 Hour</b><br/>'
				}
			}],	
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
						maxWidth: "100%",
						maxHeight: "100%"
					}
				}]
			},
			legend: {
				text:null
			}
		}
}