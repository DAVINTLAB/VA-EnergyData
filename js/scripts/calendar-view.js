var calendar_view = {};
var chart_box_plot = {};
var lista_dados = [],
    lista_dados_semanais = [],
    lista_dados_consumo = [];
var lista_jan = [],
    lista_fev = [],
    lista_mar = [],
    lista_abr = [],
    lista_mai = [],
    lista_jun = [],
    lista_jul = [],
    lista_ago = [],
    lista_set = [],
    lista_out = [],
    lista_nov = [],
    lista_dez = [];
var lista_jan_boxplot = [],
    lista_fev_boxplot = [],
    lista_mar_boxplot = [],
    lista_abr_boxplot = [],
    lista_mai_boxplot = [],
    lista_jun_boxplot = [],
    lista_jul_boxplot = [],
    lista_ago_boxplot = [],
    lista_set_boxplot = [],
    lista_out_boxplot = [],
    lista_nov_boxplot = [],
    lista_dez_boxplot = [];
var lista_jan_hora_boxplot = [],
    lista_fev_hora_boxplot = [],
    lista_mar_hora_boxplot = [],
    lista_abr_hora_boxplot = [],
    lista_mai_hora_boxplot = [],
    lista_jun_hora_boxplot = [],
    lista_jul_hora_boxplot = [],
    lista_ago_hora_boxplot = [],
    lista_set_hora_boxplot = [],
    lista_out_hora_boxplot = [],
    lista_nov_hora_boxplot = [],
    lista_dez_hora_boxplot = [];
var chart_calendar_view, largura_calendario, altura_calendario;
var zoomAberto = false;
var mesSelected = 0;
var weekSelected = [];
var daySelected = 0;
var dateSelected = '';
var hourSelected = 0;
var energiaSelecionada = '';

$(function() {
    $("#calendarTexto").html("Calendar View - Energy selected: " + $('#energia option:selected').text());
    $("#boxplotTexto").html("Monthly Consumption - Energy selected: " + $('#energia option:selected').text());
	
    calendar_view = {
        chart: {
            renderTo: 'calendar_view',
            type: 'heatmap',
            plotBorderWidth: 0,
            marginTop: 50,
            events: {
                // show the month name (series.name) as label of every block
                // add text element to the BBox - using SVGRenderer
                load: function() {
                    var series = this.series,
                        bbox;

                    series.forEach(function(s) {
                        bbox = s.group.getBBox(true);
                        this.renderer.text(
                                "<b>" + s.name + "<b>",
                                bbox.x +
                                this.plotLeft +
                                bbox.width / 2,
                                bbox.y +
                                this.plotTop - 10
                            )
                            .attr({
                                align: 'center'
                            })
                            .css({
                                color: '#666666',
                                fontSize: '11px'
                            })
                            .add();
                    }, this);
                }
            }
        },
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            type: 'category',
            title: null,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            opposite: true,
            labels: {
                // don't show the axis label : it's the category id
                // see plotOptions -> dataLabels to show the week number
                enabled: false
            }
        },

        yAxis: {
            type: 'category',
            categories: [
                'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.',
                'Week<br>Avg', ' ', ' ',
                'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.', 'Week<br>Avg'
            ],
            title: null,
            reversed: true,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            minTickInterval: 1,
            labels: {
                style: {
                    fontSize: '9px'
                }
            }
        },

        colorAxis: {
            stops: [
                [0, '#3060cf'],
				[0.5, '#fffbbc'],
				[0.9, '#c4463a'],
				[1, '#c4463a']
            ],
            min: -29,
            startOnTick: false,
            endOnTick: false,
            labels: {
                enabled: true
            }
        },
        legend: {
            layout: 'horizontal',
            verticalAlign: 'bottom',
            margin: 30,
            y: 20,
            borderWidth: 0,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },

        tooltip: {
            useHTML: true,
            formatter: function() {
                if (this.point.value == 0) return false;
                var s = Highcharts.dateFormat('<b>%e %b, %Y, %A', this.point.date);
                s += '<br><b>Consumption: ' + this.point.value;
                return s;
            }
        },

        plotOptions: {
            series: {
                events: {
                    click: function(e) {
						
						if ($("#correlation").is(':checked')) {
							console.log('correlation');
							daySelected = new Date(e.point.date + (24 * 60 * 60 * 1000));
							month = daySelected.getMonth()
							daySelected = daySelected.getDate();
                            mesSelected = setZero(month+1);
                            weekSelected = getWeekNumber(new Date(parseInt(e.point.date)));
                            
                            dateSelected = $("#ano").val() + '-' + mesSelected + '-' + setZero(daySelected);
							openDialogCorrelationDaily();
						} else if ($("#comparison").is(':checked')) {
							console.log('comparison');
							daySelected = new Date(e.point.date + (24 * 60 * 60 * 1000));
							month = daySelected.getMonth()
							daySelected = daySelected.getDate();
                            mesSelected = setZero(month+1);
                            weekSelected = getWeekNumber(new Date(parseInt(e.point.date)));
                            
                            dateSelected = $("#ano").val() + '-' + mesSelected + '-' + setZero(daySelected);

							if (new Date(e.point.date).getUTCDay() === 1) {
								weekSelected[1] += 1;
							}

							$("#origemDialog").val("consumo");
                            $("#calendarComparisonModal").modal('show');
                        } else {
							console.log('normal');
                            var retorno = getWeekNumber(new Date(parseInt(e.point.date)));
                            lista_itens = [];
                            semana_selecionada = retorno[1];

                            $.post("datas_semanais.php", {
                                ano: retorno[0],
                                semana: retorno[1]
                            }, function(data) {
                                lista_dias = [];

                                $.each(data, function(key, val) {
                                    lista_dias.push(val);
                                    lista_heatmap.push(getLoadDatas(val));
                                });

                                for (var i = 0; i <= 6; i++) {
                                    for (var j = 0; j <= 23; j++) {
                                        var item = [];
                                        var valor = 0;

                                        if (typeof lista_heatmap[i][j] === 'undefined') {
                                            valor = null
                                        } else {
                                            valor = lista_heatmap[i][j][2];
                                        }

                                        if (valor != null) {
                                            valor = parseInt(valor);
                                        }

                                        item.push(i, j, valor);
                                        lista_itens.push(item);
                                    }
                                }

                                carregaHeatmap(heatmapcolor, lista_itens, maxDenseDisplay, minDenseDisplay, false);

                                lista_heatmap = [];
                                chart_heatmap_color = new Highcharts.Chart(heatmapcolor);
                            }, "json");

                            $("#heatmap-color-semana").show();
                            $("#heatmap-color").show();
                            $('#heatmapRange').html("<b>0</b>");
                            $('#rangeValuesHeatmap').val(0);

                            carregaGraficoDias();
                            chart_dias = new Highcharts.Chart(dias);
                            carregaGraficoHoras();
                            chart_horas = new Highcharts.Chart(horas);

                            if (zoomAberto == true) {
                                $("#panel-fullscreen-calendar-view").click();
                            }

                            rolarTela("link_heatmap");
                        }
                    }
                },
                // show the week number under the calendar blocks
                // use the datas of last block row and move it down
                dataLabels: {
                    // align: 'right',
                    enabled: true,
                    y: 20,
                    x: 0,
                    crop: false,
                    //overflow: 'allow',
                    formatter: function() {
						if (this.point.value == 0) {
							this.point.color = "rgb(255,255,255)"
						}
						
                        if (this.point.y == 6 || this.point.y == 16) {
                            var dados = retornaValoresSemanais(this.point.week);
                            var somaTotal = 0;

                            for (i = 0; i <= 6; i++) {
                                if (typeof dados[i] === 'undefined') {
                                    somaTotal = somaTotal + 0;
                                } else {
                                    somaTotal = somaTotal + dados[i][1];
                                }
                            }

                            var media = somaTotal / dados.length;
                            return this.point.week + "<br>" + parseInt(media);

                        } else {
                            return null;
                        }
                    },
                    style: {
                        fontSize: '9px',
                        color: '#999999',
                        fontWeight: 'normal',
                        textOutline: 'none',
                        textAlign: 'center'
                    }
                },
                borderColor: '#ffffff',
                borderWidth: 3
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
        },

        series: [{
            name: 'January',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'February',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'March',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'April',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'May',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'June',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'July',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'August',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'September',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'October',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'November',
            keys: ['x', 'y', 'value', 'week', 'date']
        }, {
            name: 'December',
            keys: ['x', 'y', 'value', 'week', 'date']
        }]
    }
    carregaDadosCalendario();
    atualizaBoxPlot();
});


function rolarTela(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 'slow');
}

$("#lugar").change(function() {
    $("#rangeValuesDense").attr("max", 0);
    $("#energia").val('Média');

    if ($("#lugar").val() == "restaurante") {
        $("#ano").val(2004);
    }

    if ($("#lugar").val() == "pjm") {
        $("#ano").val(2011);
    }

    abreDadosJson();
    removeTodosValores();
    carregaDadosCalendario($("#energia").val());
    atualizaBoxPlot();
	verificaComboDadosMeteriologicos();
});

$("#ano").change(function() {
    $('#denseRange').html("<b>0<b>");
    $("#energia").val('Média');
    $("#rangeValuesDense").attr("max", 0);
	
    abreDadosJson();
    removeTodosValores();
    carregaDadosCalendario($("#energia").val());
    atualizaBoxPlot();
	verificaComboDadosMeteriologicos();
});

$("#energia").change(function() {
    $('#denseRange').html("<b>0<b>");
    $("#rangeValuesDense").attr("max", 0);
    abreDadosJson();
    removeTodosValores();
    carregaDadosCalendario($("#energia").val());
    atualizaBoxPlot();
	verificaComboDadosMeteriologicos();
});

function loadValuesFromFile(energiaSelecionada) {
    //['x', 'y', 'value', 'week', 'date']
    var ano = $("#ano").val();
    var anoPassado = parseInt(ano) - 1;
    var lugar = $("#lugar").val();
    var file = ano + "_" + lugar + ".json";
    var date = new Date(ano + "-01-01");
    var diaSemana = diaDaSemana(date);
    var valorEixoY = 0;
    var trocaMes = 0;

    $.ajax({
        url: "datasets/" + file,
        success: function(data) {
            lista_global = [];
            var valor = 0;
            var contadorTotal = 0;
            var valorEixoX = 0;

            $.each(data, function(key, valorJson) {
                if (key != 0) {

                    if (typeof energiaSelecionada === "undefined" ) {
                        energiaSelecionada = $("#energia").val()
                    }
					
                    $("#energia").val(energiaSelecionada);
                    var data = valorJson[0];
                    var diaSplit = data.split("-");
                    var dia = parseInt(diaSplit[2]);
                    var mes = parseInt(diaSplit[1]);
                    var hora = valorJson[1];
                    var valorHora = 0;
                    if (energiaSelecionada == "Média") {
                        for (var z = 0; z <= valorJson[2].length - 1; z++) {
                            contadorTotal += parseInt(valorJson[2][z]);
                            valorHora += parseInt(valorJson[2][z]);
                        }
                        valor = contadorTotal / valorJson[2].length;
                        valorHora = valorHora / valorJson[2].length;
                    } else {
                        valor = valorJson[2][energiaSelecionada - 1];
                        valorHora = valorJson[2][energiaSelecionada - 1];
                    }

                    salvaHoras(mes, hora, valorHora);
                    valorHora = 0;

                    if (hora == 23) {
                        var semanaAno = semanaDoAno(new Date(data));
                        diaSemana = diaDaSemana(new Date(data));

                        if (valorEixoY == 7) {
                            valorEixoY = 0;
                            valorEixoX++;
                        }

                        if (mes == 7 && trocaMes == 0) {
                            trocaMes = 1;
                            valorEixoX = 0;
                        }

                        if (mes == 1) {
                            if (semanaAno >= 50) {
                                semanaAno = semanaAno + " - " + parseInt(ano - 1);
                            }

                            if (dia == 1) {
                                if (diaSemana == 0) {
                                    valorEixoX++;
                                }

                                for (var i = 0; i < diaSemana; i++) {
                                    lista_jan.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 0, 0)]);
                                }

                                valorEixoY = diaSemana;
                            }

                            lista_jan.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 0, dia)]);
                            lista_dados_consumo.push(valor);
                            lista_jan_boxplot.push(valor);

                            if (semanaAno >= 50) {
                                lista_dados_semanais.push(new Array(semanaAno + "-" + ano, valor));
                            } else {
                                lista_dados_semanais.push(new Array(semanaAno, valor));
                            }

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_jan.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 0, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_jan.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 0, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 2) {
                            if (dia == 1) {
                                for (var i = 0; i < diaSemana; i++) {
                                    lista_fev.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 0, 0)]);
                                }

                                valorEixoY = diaSemana;
                            }

                            lista_fev.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 1, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_fev_boxplot.push(valor);

                            if ((dia == 28 && false == verificaAnoBissexto(ano)) ||
                                (dia == 29 && true == verificaAnoBissexto(ano))) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_fev.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 1, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_fev.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 1, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 3) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_mar.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 2, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_mar_boxplot.push(valor);

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_mar.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 2, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_mar.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 2, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 4) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_abr.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 3, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_abr_boxplot.push(valor);

                            if (dia == 30) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_abr.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 3, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_abr.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 3, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 5) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_mai.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 4, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_mai_boxplot.push(valor);

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_mai.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 4, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_mai.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 4, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 6) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_jun.push([valorEixoX, valorEixoY, valor, semanaAno, Date.UTC(ano, 5, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_jun_boxplot.push(valor);

                            if (dia == 30) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_jun.push([valorEixoX, valorEixo, 0, semanaAno, Date.UTC(ano, 5, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_jun.push([valorEixoX, i, 0, semanaAno, Date.UTC(ano, 5, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 7) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_jul.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 6, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_jul_boxplot.push(valor);

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_jul.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 6, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_jul.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 6, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 8) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_ago.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 7, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_ago_boxplot.push(valor);

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_ago.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 7, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_ago.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 7, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 9) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_set.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 8, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_set_boxplot.push(valor);

                            if (dia == 30) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_set.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 8, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_set.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 8, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 10) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_out.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 9, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_out_boxplot.push(valor);

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_out.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 9, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_out.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 9, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 11) {
                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_nov.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 10, dia)]);
                            lista_dados_semanais.push(new Array(semanaAno, valor));
                            lista_dados_consumo.push(valor);
                            lista_nov_boxplot.push(valor);

                            if (dia == 30) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_nov.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 10, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_nov.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 10, 0)]);
                                    }
                                }
                            }
                        } else if (mes == 12) {

                            if (semanaAno <= 3) {
                                var soma = parseInt(ano) + parseInt(1);
                                semanaAno = semanaAno + " - " + soma;
                            }

                            if (dia == 1) {
                                valorEixoY = diaSemana;
                            }

                            lista_dez.push([valorEixoX, 10 + valorEixoY, valor, semanaAno, Date.UTC(ano, 11, dia)]);
                            lista_dados_consumo.push(valor);
                            lista_dez_boxplot.push(valor);

                            if (semanaAno <= 3) {
                                lista_dados_semanais.push(new Array(semanaAno + "-" + soma, valor));
                            } else {
                                lista_dados_semanais.push(new Array(semanaAno, valor));
                            }

                            if (dia == 31) {
                                if (diaSemana == 0) {
                                    var valorEixo = valorEixoY;
                                    for (var i = 1; i <= 6; i++) {
                                        valorEixo++;
                                        if (valorEixo == 7) {
                                            valorEixo = 0;
                                        }

                                        lista_dez.push([valorEixoX, 10 + valorEixo, 0, semanaAno, Date.UTC(ano, 11, dia)]);
                                    }
                                } else {
                                    diaSemana++;
                                    if (diaSemana == 7) {
                                        diaSemana = 0;
                                        valorEixoX++;
                                    }

                                    for (var i = diaSemana; i <= 7; i++) {
                                        lista_dez.push([valorEixoX, 10 + i, 0, semanaAno, Date.UTC(ano, 11, 0)]);
                                    }
                                }
                            }
                        }

                        var ultimaData = ultimoDiaMes(ano, mes - 1);

                        if (dia == ultimaData) {
                            valorEixoX++;
                            valorEixoY = 0;
                        }

                        valor = 0;
                        contadorTotal = 0;
                        valorEixoY++;
                    }
                } else {
                    if ($('#energia option').size() < 20) {
                        $('#energia').empty();

                        if (null == $("#energia").val()) {
                            $('#energia').empty();
                            $('#energia').append($("<option></option>").attr("value", "Média").text("Average"));

                            for (var i = 1; i <= valorJson.length; i++) {
                                $('#energia').append($("<option></option>").attr("value", i).text(valorJson[i - 1]));
                            }
                        }
                    }
                }
            });
        },
        async: false
    });

    lista_dados.push(lista_jan);
    lista_dados.push(lista_fev);
    lista_dados.push(lista_mar);
    lista_dados.push(lista_abr);
    lista_dados.push(lista_mai);
    lista_dados.push(lista_jun);
    lista_dados.push(lista_jul);
    lista_dados.push(lista_ago);
    lista_dados.push(lista_set);
    lista_dados.push(lista_out);
    lista_dados.push(lista_nov);
    lista_dados.push(lista_dez);

    return lista_dados;
}

function carregaDadosCalendario(energiaSelecionada) {
    var lista_dados = loadValuesFromFile(energiaSelecionada);
    calendar_view.series[0].data = lista_dados[0];
    calendar_view.series[1].data = lista_dados[1];
    calendar_view.series[2].data = lista_dados[2];
    calendar_view.series[3].data = lista_dados[3];
    calendar_view.series[4].data = lista_dados[4];
    calendar_view.series[5].data = lista_dados[5];
    calendar_view.series[6].data = lista_dados[6];
    calendar_view.series[7].data = lista_dados[7];
    calendar_view.series[8].data = lista_dados[8];
    calendar_view.series[9].data = lista_dados[9];
    calendar_view.series[10].data = lista_dados[10];
    calendar_view.series[11].data = lista_dados[11];
    chart_calendar_view = new Highcharts.Chart(calendar_view);

    largura_calendario = chart_calendar_view.chartWidth;
    altura_calendario = chart_calendar_view.chartHeight;
    $("#calendarTexto").html("Calendar View - Energy selected: " + $('#energia').val() + " - Max consumption: <b>" + Math.max(...lista_dados_consumo));
    $("#boxplotTexto").html("Monthly Consumption - Energy selected: <b>" + $('#energia').val() + "</b>");
}

function salvaHoras(mes, hora, valor) {
    if (mes == 1) {
        lista_jan_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 2) {
        lista_fev_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 3) {
        lista_mar_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 4) {
        lista_abr_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 5) {
        lista_mai_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 6) {
        lista_jun_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 7) {
        lista_jul_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 8) {
        lista_ago_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 9) {
        lista_set_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 10) {
        lista_out_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 11) {
        lista_nov_hora_boxplot.push(new Array(hora, valor));
    } else if (mes == 12) {
        lista_dez_hora_boxplot.push(new Array(hora, valor));
    }
}

function diaDaSemana(date) {
    var weekdays = new Array(0, 1, 2, 3, 4, 5, 6); //0 - "Monday", 1 - "Tuesday", 2 - "Wednesday", 3 - "Thursday", 4 - "Friday", 5 - "Saturday", 6 - "Sunday"
    return weekdays[date.getDay()];
}

function semanaDoAno(d) {
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return week;
}

function ultimoDiaMes(ano, mes) {
    return new Date(ano, mes + 1, 0).getDate();
}

function removeTodosValores() {
    for (var i = lista_jan.length - 1; i >= 0; i--) {
        lista_jan.splice(i, 1);
    }

    for (var i = lista_fev.length - 1; i >= 0; i--) {
        lista_fev.splice(i, 1);
    }

    for (var i = lista_mar.length - 1; i >= 0; i--) {
        lista_mar.splice(i, 1);
    }

    for (var i = lista_abr.length - 1; i >= 0; i--) {
        lista_abr.splice(i, 1);
    }

    for (var i = lista_mai.length - 1; i >= 0; i--) {
        lista_mai.splice(i, 1);
    }

    for (var i = lista_jun.length - 1; i >= 0; i--) {
        lista_jun.splice(i, 1);
    }

    for (var i = lista_jul.length - 1; i >= 0; i--) {
        lista_jul.splice(i, 1);
    }

    for (var i = lista_ago.length - 1; i >= 0; i--) {
        lista_ago.splice(i, 1);
    }

    for (var i = lista_set.length - 1; i >= 0; i--) {
        lista_set.splice(i, 1);
    }

    for (var i = lista_out.length - 1; i >= 0; i--) {
        lista_out.splice(i, 1);
    }

    for (var i = lista_nov.length - 1; i >= 0; i--) {
        lista_nov.splice(i, 1);
    }

    for (var i = lista_dez.length - 1; i >= 0; i--) {
        lista_dez.splice(i, 1);
    }
}

function verificaAnoBissexto(ano) {
    return ((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0);
}

function retornaValoresSemanais(semanaAno) {
    return lista_dados_semanais.filter(
        function(valores) {
            if (valores[0] == semanaAno) {
                return parseInt(lista_dados_semanais[1]);
            }
        }
    )
}