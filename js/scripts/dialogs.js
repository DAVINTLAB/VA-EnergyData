var modalNumber = 1;

$('#modal-calendar-monthly').draggable();
$('#modal-calendar-weekly').draggable();
$('#modal-calendar-daily').draggable();

$('#modal-heatmap-monthly').draggable();
$('#modal-heatmap-weekly').draggable();
$('#modal-heatmap-daily').draggable();
$('#modal-heatmap-hourly').draggable();

$("#modal-calendario-monthly").click(function(e){
  openDialogMonthly();
});

$("#modal-heatmap-monthly").click(function(e){
  openDialogMonthly();
});

$("#modal-calendario-weekly").click(function(e){
  openDialogWeekly();
});

$("#modal-heatmap-weekly").click(function(e){
  openDialogWeekly();
});

$("#modal-calendario-daily").click(function(e){
  openDialogDaily();
});

$("#modal-heatmap-daily").click(function(e){
  openDialogDaily();
});

$("#modal-heatmap-hourly").click(function(e){
  openDialogHourly(false, null, null);
});

function openDialogMonthly() {
	var dados = getLoadDatasByMonth(mesSelected);
	var listaDados = []

	for (var i=0; i<dados.length; i++) {
	  var valores = [dados[i][1], dados[i][2], dados[i][3]];
	  listaDados.push(valores);
	}
	
	var max = 0;
	var idChart = 'idDialog_'+ modalNumber;
	var title = '';

	if ($("#origemDialog").val() == "consumo" ) {
		minimo = 0;
		console.log("minimo aki",minimo);
		max = maxDenseDisplay;
		title = 'Month View ' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val() + " - Max Cons: " + max + 'MW';
	}
	else {
		minimo = minDenseDisplayDadosMeteriologicos;
		max = maxDenseDisplayDadosMeteriologicos;
		title = 'Month View ' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val() + " - " + primeiraLetraGrande($("#tipoMeteriologia").val()) + ' - Max Cons: ' + max + ' ' + unidades_medida[$("#tipoMeteriologia").val()];
	}

	var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 430, 470, 'dialog-red')
	var chartMonth = createDialogMonthly(idChart, mesSelected, minimo, max, listaDados);

	Highcharts.chart(chartMonth);
	modalNumber++;
}

function openDialogWeekly() {
	var listaDados = [];
	var lista_heatmap_dialog = [];

	$.post( "datas_semanais.php", { ano: weekSelected[0], semana: weekSelected[1] }, function( data ) {
		lista_dias=[];

		$.each(data, function (key, val) {
		  lista_dias.push(val);
		  lista_heatmap_dialog.push(getLoadDatas(val));
		});

		for(var i=0; i<=6; i++){
		  for(var j=0; j<=23; j++){
			var item = [];
			var valor = 0;

			if (typeof lista_heatmap_dialog[i][j] === 'undefined') {
				valor = null
			}
			else {
				valor = lista_heatmap_dialog[i][j][2];
			}

			if (valor != null) {
				valor = parseInt(valor);
			}

			item.push(i, j, valor);
			listaDados.push(item);
		  }
		}

		var idChart = 'idDialog_'+ modalNumber;
		var title = 'Week View - Week ' + weekSelected[1] + ' - ' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
		var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 425, 425, 'dialog-blue')
		var chartWeek = createDialogWeek(idChart, mesSelected, weekSelected[1], listaDados);

		carregaHeatmap(chartWeek, listaDados, maxDenseDisplay, true);

		Highcharts.chart(chartWeek);
		modalNumber++;

	}, "json");
}

function openDialogDaily() {
	console.log('dateSelected', dateSelected)
  var valuesDay = getLoadDatas(dateSelected);
  var idChart = 'idDialog_'+ modalNumber;
  var data = dateSelected.split('-');
  mesSelected = data[1];
  
  var title = 'Day View - ' + daySelected + '/' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
  var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 470, 370, 'dialog-green');
  var chartWeek = createDialogDaily(idChart, mesSelected, $("#ano").val(), valuesDay);

  Highcharts.chart(chartWeek);
  modalNumber++;
}

function openDialogHourly(method, chartClicado, evento) {
  var idChart = 'idDialog_'+ modalNumber;
  
  var title = 'Hour View - ' + hourSelected + 'H - ' +daySelected + '/' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
  var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 470, 370, 'dialog-yellow');
  var chartWeek = createDialogHourly(idChart, mesSelected, $("#ano").val(), hourSelected, method, chartClicado, evento);

  Highcharts.chart(chartWeek);
  modalNumber++;
}

var createNewDialog = (title, body, height, width, color) => {
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

function createDialogMonthly(idChart, mesSelected, minimo, maxDenseDisplay, listaDados){
  return {
      chart: {
          renderTo: idChart,
          type: 'heatmap',
          zoomType: 'xy',
          margin: [60, 10, 80, 50],
          style:{
              cursor:'crosshair' //zoom-in'
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
          min: Date.UTC($("#ano").val(), mesSelected - 1, 1),
          max: Date.UTC($("#ano").val(), mesSelected, 1),
          useUTC: true,
          labels: {
              align: 'left',
              x: 5,
              y: 14/*,
              format: '{value:%B}' // long month */
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
          tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
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
          min: minimo,
          max: maxDenseDisplay,
          startOnTick: false,
          endOnTick: false,
          labels: {
              format: '{value}'
          }
      },

      series: [{
          data: listaDados,
          boostThreshold: 100,
          borderWidth: 0,
          nullColor: '#EFEFEF',
          colsize: 24 * 36e5, // one day
          tooltip: {
              headerFormat: null,
              pointFormat: '<b>{point.x:%e %b, %Y, %A} {point.y}:00h: {point.value} Consumption</b>'
          },
          turboThreshold: Number.MAX_VALUE
      }],
	  
	  plotOptions: {
		series: {
			events: {
				click: function (e) {
					var pontoSelecionado = e.point.x; 
					weekSelected = getWeekNumber(new Date(parseInt(e.point.x)));
					if (new Date(pontoSelecionado).getUTCDay() === 1) {
						weekSelected[1] += 1;
					}
					openDialogWeekly();
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
  }
}

function createDialogWeek(idChart, mesSelected, weekSelected, listaDados){
  return {
    chart: {
      renderTo: idChart,
      type: 'heatmap',
      height: 360,
      width: 360,
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
      categories: ['Mon', 'Tue', 'Wedn', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      visible: false
    },
    series: [{
          // cursor: 'pointer',
          name: 'Energy consumption per day in the week',
          borderWidth: 0.5,
          borderColor: '#000',
          keys: ['x', 'y', 'value'],
          data: listaDados,
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
          name: 'Lowest Day',
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
          name: 'Highest Day',
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
          name: 'Lowest Hours',
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
          name: 'Highest Hours',
          color: '#B70B2C',
          data: [],
          lineWidth: 0,
          marker: {
            symbol: 'triangle',
            lineWidth: 0,
            radius: 6,
            lineColor: '#B70B2C',
            fillColor: '#B70B2C'
          },
          visible: false
        }],
	plotOptions: {
		series: {
			events: {
				click: function (e) {
					var data = e.point.series.xAxis.categories[e.point.options.x];
					var res = data.split("<br><b>", 2);
					var dataSelecionada = res[1].split(".");
					
					var mes = dataSelecionada[1];
					var dia = dataSelecionada[0];
					var ano = $("#ano").val();
					
					daySelected = dia;
					dateSelected =  ano + '-' + mes + '-' + dia;
					hourSelected = e.point.y;
					mesSelected = mes;

					openDialogDaily();
					openDialogHourly(true, idChart, e);
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
}

function createDialogDaily(idChart, mes, ano, listaDadosConsumo){
	console.log('listaDadosConsumo', listaDadosConsumo)
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

    var listaMedias = [];
		var valorMinimo, valorMaximo;

		for(var a=0; a<valoresDias.length; a++){
			for(var b=0; b<valoresDias[a].length; b++){
				var valor = valoresDias[a][b][i];
				listaMedias.push(valor);
			}
		}

		valorMinimo = Math.min( ...listaMedias),
		valorMaximo = Math.max( ...listaMedias);

		var objetoMinimo = {
			"name": i + ":00 hours",
			"y" : valorMinimo
		}
		
		var objetoMedia = {
			"name": i + ":00 hours",
			"y" : parseInt(retornaMedia(listaMedias))
		}
		
		var objetoMaximo = {
			"name": i + ":00 hours",
			"y" : valorMaximo
		}

		var valorMediana = mediana(listaMedias);
		
		var objetoMediana = {
			"name": i + ":00 hours",
			"y" : valorMediana
		}

    arrayValoresConsumo.push(objeto);
		arrayValoresConsumoMinimo.push(objetoMinimo);
		arrayValoresConsumoMedio.push(objetoMedia);
		arrayValoresConsumoMaximo.push(objetoMaximo);
		arrayValoresConsumoMediana.push(objetoMediana);
  }

  var valorDesvioPadrao = round(retornaDesvioPadrao(arrayConsumo));
	var valorVariancia = round(retornaVariancia(arrayConsumo));
	var valorErroPadrao = round(retornaErroPadrao(arrayConsumo, valorDesvioPadrao));
	var valorCV = round((valorDesvioPadrao / (totalConsumo / 24)));

  return {
		chart: {
			renderTo: idChart,
			type: 'line'
			//polar: booleanPolar
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
				data:  arrayValoresConsumo,
				color: "#008000",
				marker: {
					symbol: 'circle',
					radius: 6,
				}
			},
			{
				name: "Min.",
				data:  arrayValoresConsumoMinimo,
				color: "#3060cf",
				marker: {
					symbol: 'triangle-down',
					radius: 6
				},
				visible: true
			},
			{
				name: "AVG",
				data:  arrayValoresConsumoMedio,
				color: "#ffd700",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Median",
				data:  arrayValoresConsumoMediana,
				color: "#FD6A02",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Max.",
				data:  arrayValoresConsumoMaximo,
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
	}
}

function createDialogHourly(idChart, mes, ano, horaSelecionada, metodo, chartClicado, evento){
	
	var arrayValoresConsumo = [], arrayValoresConsumoMinimo = [], arrayValoresConsumoMedio = [], 
      arrayValoresConsumoMaximo = [], arrayValoresConsumoMediana = [];

	var limitesLoop = retornaInicioPorMes(mes);
	var valoresY = retornaValoresDiaDeSemanaPorHora(limitesLoop[0], limitesLoop[1], horaSelecionada);
	var arrayValores = [];
	var arrayValoresConsumo = [];
	var totalConsumo = 0;
	var celulaSelecionada;

	if (metodo == false) {
		celulaSelecionada = heatmap_large.series[0].data[pontoHeatmapLarge.point.index];
		var diaSemanaCelula = new Date(celulaSelecionada[0]).getUTCDay();
		var pontoInicioSemana = retornaInicioSemanaHeatmapLarge(pontoHeatmapLarge.point.index, diaSemanaCelula);
	}
	else {
		var chartOrigem = $("#"+chartClicado).highcharts();
		celulaSelecionada = chartOrigem.series[0];
	}

	for(var i=0; i<=6; i++){
		var contador = i + 1;
		var consumo = 0;

		if (metodo == false) {
			consumo	= heatmap_large.series[0].data[(i*24)+pontoInicioSemana][2];
		}
		else{
			consumo = celulaSelecionada.data[(i*24)+evento.point.y].value;
		}
		
		arrayValores.push(consumo);
		totalConsumo += consumo;

		if (i == 6) {
			contador = 0;
		}
		
		var objeto = { 
			"name": i + ":00 hours",
			"y" : consumo
		}
		
		var listaValoresY = valoresY[contador];
		
		var objetoMinimo = { 
			"name": i + ":00 hours",
			"y" : Math.min.apply(null, listaValoresY)
		}

		var objetoMedia = { 
			"name": i + ":00 hours",
			"y" : retornaSoma(listaValoresY) / listaValoresY.length
		}
		
		var objetoMaximo = { 
			"name": i + ":00 hours",
			"y" : Math.max.apply(null, listaValoresY)
		}
		
		var objetoMediana = { 
			"name": i + ":00 hours",
			"y" : mediana(listaValoresY)
		}

		arrayValoresConsumo.push(objeto);
		arrayValoresConsumoMinimo.push(objetoMinimo);
		arrayValoresConsumoMaximo.push(objetoMaximo);
		arrayValoresConsumoMediana.push(objetoMediana);
		arrayValoresConsumoMedio.push(objetoMedia);
		
	}

	valorDesvioPadrao = round(retornaDesvioPadrao(arrayValores));
	valorVariancia = round(retornaVariancia(arrayValores));
	valorErroPadrao = round(retornaErroPadrao(arrayValores, valorDesvioPadrao));
	valorCV = round((valorDesvioPadrao / (totalConsumo / 7)));

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
				data:  arrayValoresConsumo,
				color: "#008000",
				marker: {
					symbol: 'circle',
					radius: 6,
				}
			},
			{
				name: "Min.",
				data:  arrayValoresConsumoMinimo,
				color: "#3060cf",
				marker: {
					symbol: 'triangle-down',
					radius: 6
				},
				visible: true
			},
			{
				name: "AVG",
				data:  arrayValoresConsumoMedio,
				color: "#ffd700",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Median",
				data:  arrayValoresConsumoMediana,
				color: "#FD6A02",
				marker: {
					symbol: 'diamond',
					radius: 6
				},
				visible: true
			},
			{
				name: "Max.",
				data:  arrayValoresConsumoMaximo,
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
	}
}