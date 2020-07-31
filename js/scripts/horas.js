function abreGraficoHoras(grafico, pontos, pontosMinimos, pontosMaximos, pontosMediana, pontosMedios, valorDesvioPadrao, 
	valorVariancia, valorErroPadrao, valorCV){

	$("#" + grafico).show();
	$("#botoes-" + grafico).show();

	tipoGrafico = 'line';
	var horas = criaGraficoHoras(pontos, pontosMinimos, pontosMedios, pontosMaximos, pontosMediana, valorDesvioPadrao, 
		valorVariancia, valorErroPadrao, valorCV, tipoGrafico, false);

	var dados = [];
	for(var i=0; i<=6; i++){
		var seriesBoxplot = [];
		var primeiroQuartil = parseInt(Quartile_25(new Array(pontosMinimos[i].y, pontosMaximos[i].y)));
		var ultimoQuartil = parseInt(Quartile_75(new Array(pontosMinimos[i].y, pontosMaximos[i].y)));

		seriesBoxplot.push(pontosMinimos[i].y, primeiroQuartil, pontosMediana[i].y, ultimoQuartil,  pontosMaximos[i].y);
		dados.push(seriesBoxplot);
	}

	criaGraficoHorasBoxPlot(dados);
	
	chart_horas = new Highcharts.Chart(horas);
}

function criaGraficoHoras(pontos, pontosMinimos, pontosMedios, pontosMaximos, pontosMediana, valorDesvioPadrao, 
	valorVariancia, valorErroPadrao, valorCV, tipoGrafico, booleanPolar){
		return chart_horas_valores = {
				chart: {
					renderTo: 'area-conjunto-y1',
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
					y: 25,
					floating: true,
					borderWidth: 1,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				},
				xAxis: {
					categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun'],
					title: {
						text: 'Schedule'
					},
				},
				yAxis: {
					title: {
						text: 'Consumption'
					}
				},
				tooltip: {
					formatter: function () {
		
						var text = '<b>' + this.y + ' Consumption<br>';
		
						if (this.series.name == "Consumption") {
							text += '<b>'+ valorVariancia + ' Variance<br>';
							text += '<b>'+ valorDesvioPadrao + ' Std. Deviation<br>';
							text += '<b>'+ valorErroPadrao + ' Std. Error<br>';
							text += '<b>'+ valorCV + ' Coef. Variation<br>';
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
			};
}

function criaGraficoHorasBoxPlot(dados){
	return chart_horas_valores_boxplot = {
		chart: {
			renderTo: 'area-conjunto-y1',
			type: 'boxplot'
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
			y: 25,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun'],
			title: {
				text: 'Schedule'
			},
		},
		yAxis: {
			title: {
				text: 'Consumption'
			}
		},
		credits: {
			enabled: false
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
	};
}