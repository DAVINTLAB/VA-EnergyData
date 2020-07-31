var modalNumberCorrelation = 1;

function openDialogCorrelationDaily() {
	var valuesDay = getLoadDatas(dateSelected);
	var idChart = 'idDialogCorrelation_'+ modalNumberCorrelation;
	var data = dateSelected.split('-');
	mesSelected = data[1];

	var title = 'Correlation ' + retornaNomePorMes(mesSelected) + '/2004';
	var $dlg = createNewDialogCorrelation(title, "<div id='"+idChart+"'></div>", 470, 630, 'dialog-green');
	var chart = createDialogDaily(idChart, mesSelected, $("#ano").val(), valuesDay);

	Highcharts.chart(chart);
	modalNumberCorrelation++;
}

var createNewDialogCorrelation = (title, body, height, width, color) => {
  var $newDialog = $('#dialogs .dialog-tmpl').clone();
  $('.dialog-body', $newDialog).html(body);
  $('#dialogs').append($newDialog);

  $newDialog.dialog({
      dialogClass : color,
      top : 110,
      title: title,
      height: height, //350
      width: width,
      position: {my: "center",
                  at: "center",
                  of: "#dialogs"}
  });
  return $newDialog;
};

function createDialogDaily(idChart, mes, ano, listaDadosConsumo){
	var limitesLoop = retornaInicioPorMes(mes);
	var valoresDias = retornaValoresDiaDeSemana(limitesLoop[0], limitesLoop[1]);
	var arrayValoresConsumo = [], arrayValoresConsumoMinimo = [], arrayValoresConsumoMedio = [], arrayValoresConsumoMaximo = [], arrayValoresConsumoMediana= [];
	var arrayConsumo = [];
	var totalConsumo = 0;

  for(var i=0; i<=23; i++){
    var consumo = listaDadosConsumo[i];
    var objeto = { 
      "name": i + ":00 hours",
      "y" : consumo[2]
    }
    totalConsumo += consumo[2];
    arrayConsumo.push(consumo[2]);

    arrayValoresConsumo.push(objeto);
  }

  return {
		chart: {
			renderTo: idChart,
			type: 'line'
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
				format: '{value}', //:00
				rotation: -60
			},
			title: {
				text: 'Schedule'
			},
			minPadding: 0,
			maxPadding: 0,
			startOnTick: false,
			endOnTick: false,
			tickPositions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
			tickWidth: 0,
			min: 0,
			max: 31
		},
		yAxis: [{
		  title: {
			text: 'Consumption [KW]'
		  },
		  labels: {
			style: {
			  color: '#008000'
			}
		  }
		}, 
		{
		  labels: {
			style: {
			  color: '#d1473a'
			}
		  },
		  title: {
			text: 'Temperature °C'
		  },
		  opposite: true
		}],
		tooltip: {
			formatter: function () {
				var text = '<b>Pearson correlation coefficient: 0.2919';
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
				//name: "Consumption",
				//data: [836,835,836,835,835,835,834,834,833,833,832,831,832,832,830,830,831,830,829,829,828,828,827,828,825,825,825,824,824,823,823], --jan
				//data: [823,822,823,823,821,781,820,822,820,819,820,819,779,816,817,816,815,815,814,775,813,814,812,812,812,810,771,809,810], //--fev
				//data:  [808,808,808,807,768,807,807,806,805,806,805,782,802,803,802,802,802,801,779,801,801,799,799,799,797,775,796,797,796,795,796],
				name: "Heating Gas",
				data:  [2766,2925,3492,2568,2792,2355,2139,2937,3053,3377,4218,4576,3684,3180,3183,2623,2394,2706,2032,2224,1938,1992,2484,3009,3235,3170,2549,3193,3513,3512,3210], //jan
				//data: [2690,1890,2295,2909,2899,2178,1530,1553,1689,1806,1738,2239,2442,2264,2568,2631,2839,2976,3267,3179,3257,3418,3208,3473,3464,3689,3977,3592], //fev
				//data: [3188,3022,2922,2860,2342,2339,2038,2014,1861,2036,1959,2418,2879,2537,2838,2360,1514,1434,1527,1307,1419,1229,1607,2062,2421,2544,2344,2227,2273,2534,2633], //mar
				//name: "Water Heater",
				//data: [238,284,285,284,285,284,274,238,284,285,284,285,284,274,238,238,284,285,284,285,273,238,285,284,285,284,285,273,238,285,284], jan
				//data:[285,284,285,273,238,285,284,285,284,285,273,238,285,284,285,284,285,273,238,238,285,284,285,284,274,238,284,285], fev
				//data: [284,285,284,274,238,284,285,284,285,284,274,238,284,285,284,285,284,274,238,284,285,284,285,285,273,238,284,285,284,285,284],
				color: "#008000",
				marker: {
					symbol: 'triangle',
					radius: 6,
				}
			},
			{
			  name: 'Temperature',
			  color: '#d1473a',
			  yAxis: 1,
			  data: [-26,-27,-18,-15,-21,-28,-27,-21,-21,-22,-17,-21,-22,-21,-23,-20,-34,-39,-42,-42,-23,-18,-14,-19,-29,-24,-26,-21,-28,-31,-33], //jan
			  //data: [-25,-20,-20,-19,-18,-16,-25,-18,-16,-6,0.7,-9,-10,-11,-15,-19,-18,-21,-23,-18,-15,-6,-12,-15,-15,-12,-13,-8],  //--fev
			  //data: [-12,-9,-5,-8,-17,-24,-21,-23,-22,-5,-7,-8,-8,-7,-8,-7,-6,-9,-13,-21,-12,-8,-6,-7,-19,-22,-15,-16,-15,-19,-21],
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
	}
}