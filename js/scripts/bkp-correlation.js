var modalNumberCorrelation = 1;

function openDialogCorrelationDaily() {
	var valuesDay = getLoadDatas(dateSelected);
	var idChart = 'idDialogCorrelation_'+ modalNumberCorrelation;
	var data = dateSelected.split('-');
	mesSelected = data[1];

	var title = 'Day View - ' + daySelected + '/' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
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
		yAxis: [{
		  title: {
			text: 'Consumption'
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
			  color: '#3060cf'
			}
		  },
		  title: {
			text: 'Humidity',
			style: {
			  color: '#3060cf'
			}
		  },
		  opposite: true
		}, 
		{
		  labels: {
			style: {
			  color: '#993399'
			}
		  },
		  title: {
			text: 'Pressure',
			style: {
			  color: '#993399'
			}
		  },
		  opposite: true
		},
		{
		  labels: {
			style: {
			  color: '#d1473a'
			}
		  },
		  title: {
			text: 'Temperature',
			style: {
			  color: '#d1473a'
			}
		  },
		  opposite: true
		},
		{
		  labels: {
			style: {
			  color: '#FD6A02'
			}
		  },
		  title: {
			text: 'Wind',
			style: {
			  color: '#FD6A02'
			}
		  },
		  opposite: true
		}],
		tooltip: {
			formatter: function () {
				var text = '<b>'+this.x +':00h ' + this.y + ' Consumption<br>';
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
				data:  arrayValoresConsumo,
				color: "#008000",
				marker: {
					symbol: 'triangle',
					radius: 6,
				}
			},
			{
			  name: 'Humidity',
			  color: '#3060cf',
			  yAxis: 1,
			  data: [93.0,93.0,93.0,87.0,93.0,93.0,93.0,93.0,86.0,93.0,86.0,86.0,86.0,93.0,86.0,86.0,86.0,93.0,93.0,86.0,100.0,93.0,93.0,93.0],
			  marker: {
			    symbol: 'triangle',
			    radius: 6
			  },
			  visible: true
			}, {
			  name: "Pressure",
			  color: '#993399',
			  yAxis: 2,
			  data: [1026,1026,1026,1027,1027,1026,1028,1029,1026,1027,1028,1029,1026,1026,1026,1027,1027,1026,1028,1029,1026,1027,1028,1029],
			  marker: {
			    symbol: 'triangle',
			    radius: 6
			  },
			  visible: true
			}, {
			  name: "Temperature",
			  color: '#d1473a',
			  yAxis: 3,
			  data: [2,1,1,1,0,1,0,1,1,1,1,0,0,1,1,0,1,1,1,2,2,2,3,1],
			  marker: {
			    symbol: 'triangle',
			    radius: 6
			  },
			  visible: true
			}
			, {
			  name: "Wind",
			  color: '#FD6A02',
			  yAxis: 4,
			  data: [1,2,0,0,1,1,3,4,4,2,2,3,3,3,1,2,0,0,1,0,1,2,1,2],
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