var heatmapcolor = {
	chart: {
		renderTo: 'heatmap-color',
		type: 'heatmap',
		//height: 360,
		marginTop: 0
	},
	title: {
		text: ''
	},
	subtitle: {
		text: ''
	},
	yAxis: {
		labels: {
			format: '{value}h'//:00
		},
		minPadding: 0,
		maxPadding: 0,
		startOnTick: false,
		endOnTick: false,
		tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		tickWidth: 1,
		min: 0,
		max: 23,
		reversed: true,
		title: {
			text: 'Schedule'
		},
	},
	xAxis: {
		categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		opposite: false,
		labels: {
            rotation: 0
        },
		title: {
			text: 'Consumption'
		}
	},
	colorAxis: {
		stops: [
			[0, '#3060cf'],
			[0.5, '#fffbbc'],
			[0.9, '#c4463a'],
			[1, '#c4463a']
		],
		min: 0,
		max:  parseInt(maxDenseDisplay)
	},
	legend: {
		align: 'center',
		layout: 'horizontal',
		verticalAlign: 'bottom',
		borderWidth: 1,
		width: '100%',
		floating: false,
		x: -35,
		enabled: true,
		itemStyle: {
			textAlign: 'right',
		}
	},
	series: [{
				cursor: 'pointer',
				name: 'Energy consumption per day in the week',
				borderWidth: 0.5,
				borderColor: '#000',
				keys: ['x', 'y', 'value'],
				data: [],
				dataLabels: {
					enabled: false,
					color: 'black',
					style: {
						fontWeight: 'bold',
						fontSize: '10px'
					}
				}
			},
			{
				type: 'scatter',
				name: 'Lowest<br>Consump.<br>Daily',
				color: '#00008B',
				data: [],
				marker: {
					symbol: 'triangle-down',
					lineWidth: 0, //changed
					radius: 6,
					lineColor: '#FFFFFF',
					fillColor: '#00008B' //white
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Highest<br>Consump.<br>Daily',
				color: '#CC0000',
				data: [],
				marker: {
					symbol: 'triangle',
					lineWidth: 0,
					radius: 6,
					lineColor: '#CC0000',
					fillColor: '#CC0000'
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Lowest<br>Consump.<br>Hours',
				color: '#0000CD',
				data: [],
				lineWidth: 0,
				marker: {
					symbol: 'triangle-down',
					lineWidth: 0,
					radius: 6,
					lineColor: '#0000CD',
					fillColor: '#0000CD',
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Highest<br>Consump.<br>Hours',
				color: '#B70B2C',
				data: [],
				lineWidth: 0,
				marker: {
						symbol: 'triangle',
						lineWidth: 0,
						radius: 6,
					lineColor: '#B70B2C',
					fillColor: '#B70B2C',
					
				},
				visible: false
			}],
	plotOptions: {
		series: {
			events: {
				click: function (e) {
					
					var data = e.point.series.xAxis.categories[e.point.options.x];
					
					if(zoomAberto == true){
						$("#panel-fullscreen-heatmap").click();
					}

					largura_dias = chart_dias.chartWidth;
					altura_dias = chart_dias.chartHeight;
					largura_horas = chart_horas.chartWidth;
					altura_horas = chart_horas.chartHeight;

					if (e.point.value != null) {
						abreGraficos(e.point, data);					
					
						$('#graficos').show();
						$(".grupo").show();
					}
				}
			}
		}
	},	
	tooltip: {
		formatter: function () {
			var valor = this.series.xAxis.categories[this.point.x];

			if (typeof valor == "undefined") {
				var ponto = String(this.point.x);
				var valor_ponto = ponto.substring(0, 1);
				return '<b>' + this.series.xAxis.categories[valor_ponto] + ', '+ this.point.y + ':00 hours </b>';
			}
			else {
				if (this.point.value != null) {
					return '<b>' + this.series.xAxis.categories[this.point.x] + ', '+ this.point.y + ':00 hours - ' + this.point.value + ' Consumption</b>';
				}
				else {
					return "<b>No value to show</b>";
				}
				
			}
		},
		followPointer: true
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
}

function abreGraficos(ponto, data){

	heatmapcolor.series[0].data = lista_itens;

	var arrayValoresX = [], arrayValoresY = [];
	var arrayValoresMinimosX = [], arrayValoresMediosX = [], arrayValoresMaximosX = [], arrayValoresMedianaX = [];
	var arrayValoresMinimosY = [], arrayValoresMediosY = [], arrayValoresMaximosY = [], arrayValoresMedianaY = [];
	var total = ponto.x * 24;
	var valorDesvioPadraoX, valorVarianciaX, valorErroPadraoX, valorDesvioPadraoY, valorVarianciaY, valorErroPadraoY;
	
	var hora = ponto.y;
	var res = data.split("<br><b>", 2);
	var dataSelecionada = res[1].split("/");
	var mes = dataSelecionada[1];
	
	var limitesLoop = retornaInicioPorMes(mes);
	console.log('limitesLoop', limitesLoop)
	
	var valoresX = retornaValoresDiaDeSemana(limitesLoop[0], limitesLoop[1]);
	var valoresY = retornaValoresDiaDeSemanaPorHora(limitesLoop[0], limitesLoop[1], hora);
	
	console.log('valoresY', valoresY)

	var consumoY = [];
	var totalConsumo = 0;

	/*VALORES PARA HORAS*/
	for(var i=0; i<=6; i++){
		var contador = i + 1;
		var consumo =  heatmapcolor.series[0].data[(24 * i) + ponto.y][2];
		totalConsumo += consumo;
		consumoY.push(consumo);
		
		if (i == 6) {
			contador = 0;
		}
		
		var objeto = { 
			"name": i + " Day week",
			"y" : consumo
		}
		
		var listaValoresY = valoresY[contador];
		
		var objetoMinimo = { 
			"name": i + " Day week",
			"y" : Math.min.apply(null, listaValoresY)
		}

		var objetoMedia = { 
			"name": i + " Day week",
			"y" : retornaSoma(listaValoresY) / listaValoresY.length
		}
		
		var objetoMaximo = { 
			"name": i + " Day week",
			"y" : Math.max.apply(null, listaValoresY)
		}
		
		var objetoMediana = { 
			"name": i + " Day week",
			"y" : mediana(listaValoresY)
		}

		arrayValoresY.push(objeto);
		arrayValoresMinimosY.push(objetoMinimo);
		arrayValoresMaximosY.push(objetoMaximo);
		arrayValoresMedianaY.push(objetoMediana);
		arrayValoresMediosY.push(objetoMedia);
		
	}

	valorDesvioPadraoY = round(retornaDesvioPadrao(consumoY));
	valorVarianciaY = round(retornaVariancia(consumoY));
	valorErroPadraoY = round(retornaErroPadrao(consumoY, valorDesvioPadraoY));
	valorCVY = round((valorDesvioPadraoY / (totalConsumo / 7)));

	var consumoX = [];
	var totalConsumo = 0;

	/*VALORES PARA DIAS*/
	for(var z=0; z<=23; z++){
		var consumo = heatmapcolor.series[0].data[z+total][2];
		totalConsumo += consumo;
		consumoX.push(consumo);
		
		var objeto = { 
			"name": z + ":00 hours",
			"y" : consumo
		}

		var listaMedias = [];
		var valorMinimo, valorMaximo;

		for(var a=0; a<valoresX.length; a++){
			for(var b=0; b<valoresX[a].length; b++){
				var valor = valoresX[a][b][z];
				listaMedias.push(valor);
			}
		}

		valorMinimo = Math.min( ...listaMedias),
		valorMaximo = Math.max( ...listaMedias);

		var objetoMinimo = {
			"name": z + ":00 hours",
			"y" : valorMinimo
		}
		
		var objetoMedia = {
			"name": z + ":00 hours",
			"y" : parseInt(retornaMedia(listaMedias))
		}
		
		var objetoMaximo = {
			"name": z + ":00 hours",
			"y" : valorMaximo
		}

		var valorMediana = mediana(listaMedias);
		
		var objetoMediana = {
			"name": z + ":00 hours",
			"y" : valorMediana
		}

		arrayValoresX.push(objeto);
		arrayValoresMinimosX.push(objetoMinimo);
		arrayValoresMediosX.push(objetoMedia);
		arrayValoresMaximosX.push(objetoMaximo);
		arrayValoresMedianaX.push(objetoMediana);
	}

	valorDesvioPadraoX = round(retornaDesvioPadrao(consumoX));
	valorVarianciaX = round(retornaVariancia(consumoX));
	valorErroPadraoX = round(retornaErroPadrao(consumoX, valorDesvioPadraoX));
	valorCVX = round((valorDesvioPadraoX / (totalConsumo / 24)));

	var dia_semana =  res[0];
	var dia =  res[1];
	
	$("#diasTexto").html("Day View Selected: <b>" + dia +" </b> - <b>" + dia_semana);
	$("#horasTexto").html("Hour View Selected: <b>" + hora + "</b> Hours");
	
	abreGraficoDias("area-conjunto-x1", arrayValoresX, arrayValoresMinimosX, arrayValoresMediosX, arrayValoresMaximosX, arrayValoresMedianaX, valorDesvioPadraoX,
	valorVarianciaX, valorErroPadraoX, valorCVX);
	abreGraficoHoras("area-conjunto-y1", arrayValoresY, arrayValoresMinimosY, arrayValoresMaximosY, arrayValoresMedianaY, arrayValoresMediosY, valorDesvioPadraoY,
	valorVarianciaY, valorErroPadraoY, valorCVY);

}

function retornaValoresDiaDeSemana(diaInicio, diasMes){
	var lista = [], listaSunday = [], listaMonday = [], listaTuesday = [], listaWednesday = [], listaThursday = [], listaFriday = [], listaSaturday = [];
	
	for(i=diaInicio; i<=diasMes; i++){	
		var diaUTC = heatmap_large.series[0].data[(i*24)][0];
		var valores = [];
		
		for(var a=0; a<=23; a++){
			valores.push(heatmap_large.series[0].data[(i*24+a)][2]);
		}
		
		var diaDaSemana = retornaDiaDaSemana(new Date(diaUTC).getUTCDay());

		switch (diaDaSemana) {
			case "Sunday":
				listaSunday.push(valores);
				break;
			case "Monday":
				listaMonday.push(valores);
				break;
			case "Tuesday":
				listaTuesday.push(valores);
				break;
			case "Wednesday":
				listaWednesday.push(valores);
				break;
			case "Thursday":
				listaThursday.push(valores);
				break;
			case "Friday":
				listaFriday.push(valores);
				break;
			case "Saturday":
				listaSaturday.push(valores);
				break;
		}
	}

	lista.push(listaSunday, listaMonday, listaTuesday, listaWednesday, listaThursday, listaFriday, listaSaturday);
	
	return lista;
}

function retornaValoresDiaDeSemanaPorHora(diaInicio, diasMes, hora) {
	var lista = [], listaSunday = [], listaMonday = [], listaTuesday = [], listaWednesday = [], listaThursday = [], listaFriday = [], listaSaturday = [];

	for(i=diaInicio; i<=diasMes; i++){	
		var diaUTC = heatmap_large.series[0].data[(i*24)][0];
		var consumo	= heatmap_large.series[0].data[(i*24+hora)-1][2];
		var valores = [];
		valores.push(consumo);
		
		var diaDaSemana = retornaDiaDaSemana(new Date(diaUTC).getUTCDay());

		switch (diaDaSemana) {
			case "Sunday":
				var valoresExistentes = listaSunday;
				listaSunday = valoresExistentes.concat(valores);
				break;
			case "Monday":
				var valoresExistentes = listaMonday;
				listaMonday = valoresExistentes.concat(valores);
				break;
			case "Tuesday":
				var valoresExistentes = listaTuesday;
				listaTuesday = valoresExistentes.concat(valores);
				break;
			case "Wednesday":
				var valoresExistentes = listaWednesday;
				listaWednesday = valoresExistentes.concat(valores);
				break;
			case "Thursday":
				var valoresExistentes = listaThursday;
				listaThursday = valoresExistentes.concat(valores);
				break;
			case "Friday":
				var valoresExistentes = listaFriday;
				listaFriday = valoresExistentes.concat(valores);
				break;
			case "Saturday":
				var valoresExistentes = listaSaturday;
				listaSaturday = valoresExistentes.concat(valores);
				break;
		}

	}

	lista.push(listaSunday, listaMonday, listaTuesday, listaWednesday, listaThursday, listaFriday, listaSaturday);
	
	return lista;
}