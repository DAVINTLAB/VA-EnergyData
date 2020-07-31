var lista_global = [];
var lista_global_mensal = [];
var lista_datas = [];
var lista_heatmap = [];
var lista_dados = [];
var lista_dias = [];
var lista_series_historico = [];
var lista_conteudo_dense = [];
var lista_itens = [];
var chart_heatmap_large, chart_heatmap_color, chart_dias, chart_horas, app, chart_relogio_tarde, chart_historico, chart_historico_geral;
var chart_heatmap_large_init;
var chart_dias_valores, chart_dias_valores_boxplot, chart_horas_valores, chart_horas_valores_boxplot;
var semana_selecionada, lugar_selecionado;
var heatmap_large, maxDenseDisplay = 0,
    maxHeatmap = 0,
    tamanhoX = 0;
var largura_dense, altura_dense, largura_heatmap, altura_heatmap, largura_dias, altura_dias, largura_horas, altura_horas;

var selecaoPorGrupo = false;
var valoresEletricidade = [0, 1, 2, 3, 4, 5];
var valoresGas = [6, 7, 8, 9];
var ELETRICIDADE = 1,
    GAS = 2,
    ELETRICIDADE_TEXTO = "Eletricidade",
    GAS_TEXTO = "Gas";
var anoComboSelecionado = $("#ano").val();
var pontoHeatmapLarge = 0;

$(function() {
	$("#meteorologia").show();
	
    $('#rangeValuesDense').change(function() {
        if (tamanhoX == 0) {
            tamanhoX = chart_heatmap_large.chartWidth;
        }

        heatmapcolor.series[0].data = [];
        abreDados($("#ano").val(), $("#lugar").val());

        $('#denseRange').html("<b>" + parseInt($('#rangeValuesDense').val()) + "<b>");

        var dados = chart_heatmap_large.series[0].data;
        var valorRange = parseInt($('#rangeValuesDense').val());
        var filteredData = dados.map(function(item) {
            var valorFiltrado = null;
            if (item.value >= valorRange) {
                valorFiltrado = item.value;
            }

            return [item.x, item.y, valorFiltrado];
        });

        heatmap_large.series[0].data = filteredData;
        chart_heatmap_large = new Highcharts.Chart(heatmap_large);
        largura_dense = chart_heatmap_large.chartWidth;
        altura_dense = chart_heatmap_large.chartHeight;
        chart_heatmap_large.setSize(largura_dense, altura_dense);
    });

    $('#rangeValuesHeatmap').change(function() {
        $('#heatmapRange').html("<b>" + parseInt($('#rangeValuesHeatmap').val()) + "<b>");
        var valorRange = parseInt($('#rangeValuesHeatmap').val());
        var filteredData = lista_itens.filter(p => {
            return p[2] >= valorRange;
        })

        heatmapcolor.series[0].data = filteredData;
        chart_heatmap_color = new Highcharts.Chart(heatmapcolor);
    });

    abreDados($("#ano").val(), $("#lugar").val());
});

function abreDadosJson() {
    lista_dados_semanais = [];
    lista_dados_consumo = [];

    abreDados($("#ano").val(), $("#lugar").val());
}

function verificaGrupoPorEnergia(valor) {
    var retorno = 0;

    if (valoresEletricidade.indexOf(valor) > -1) {
        retorno = ELETRICIDADE;
    } else if (valoresGas.indexOf(valor) > -1) {
        retorno = GAS;
    }

    return retorno;
}

function ajustarTextos() {
    $("#denseTexto").html("Annual / Monthly View");
    $("#heatmapTexto").html("Weekly View");
    $("#diasTexto").html("Day View");
    $("#horasTexto").html("Hour View");
    $("#heatmapHistoricoGeralTexto").html("All energy sources - <b>Year selected<b>: " + $("#ano").val());
}

function abreDados(ano, lugar) {
    $(".botoes-graficos").hide();
    ajustarTextos();

    var anoProximo = parseInt(1) + parseInt(ano);
    heatmap_large = {
        chart: {
            renderTo: 'ht_large',
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
            min: Date.UTC(ano, 0, 1),
            max: Date.UTC(anoProximo, 0, 1),
            useUTC: true,
            labels: {
                align: 'left',
                x: 5,
                y: 14
                /*,
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
				
				/*[0, 'rgb(91,161,203)'],
				[0.167, 'rgb(199,224,237)'],
				[0.332, 'rgb(255,255,255)'],
				[0.5, 'rgb(248,206,183)'],
				[0.667, 'rgb(212,94,80)'],
				[0.832, 'rgb(170,31,46)'],
				[1, 'rgb(110,2,32)']/*/
            ],
            min: -5,
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
                pointFormat: '<b>{point.x:%e %b, %Y, %A} {point.y}:00h:<br><b>Consumption: {point.value}</b>'
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
							
							$("#origemDialog").val("consumo");
                            $("#heatmapComparisonModal").modal('show');
                        } else {	
                            var retorno = getWeekNumber(new Date(parseInt(pontoSelecionado)));
                            lista_itens = [];

							if (new Date(pontoSelecionado).getUTCDay() === 1) {
								retorno[1] += 1;
							}

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
                                largura_heatmap = chart_heatmap_color.chartWidth;
                                altura_heatmap = chart_heatmap_color.chartHeight;
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
                                $("#panel-fullscreen-dense-display").click();
                            }

                            rolarTela("link_heatmap");
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

    var file = ano + "_" + lugar + ".json";
    lugar_selecionado = lugar;

    $.ajax({
        url: "datasets/" + file,
        success: function(data) {
			minDenseDisplay = 0;
            maxDenseDisplay = 0;

            lista_datas = [];
            dados_heat = [];
            lista_global = []
            lista_global_mensal = []

            $.each(data, function(key, val) {
                if (key != 0) {
                    if (selecaoPorGrupo == true) {
                        var grupo = $("#grupo").val();
                        var valorAgrupado = 0;

                        for (j = 0; j <= val[2].length; j++) {
                            if (grupo == ELETRICIDADE_TEXTO && verificaGrupoPorEnergia(j) == ELETRICIDADE) {
                                valorAgrupado = valorAgrupado + val[2][j];
                            } else if (grupo == GAS_TEXTO && verificaGrupoPorEnergia(j) == GAS) {
                                valorAgrupado = valorAgrupado + val[2][j];
                            }
                        }

                        if (valorAgrupado > maxDenseDisplay) {
                            maxDenseDisplay = valorAgrupado;
                        }

                        var dataFormato = val[0].split('-');
                        var dataUTC = Date.UTC(dataFormato[0], dataFormato[1] - 1, dataFormato[2]);
                        var dataBR = dataFormato[0] + "-" + dataFormato[1] + "-" + dataFormato[2];
                        var dado = [dataBR, val[1], valorAgrupado];
                        lista_datas.push(dado);

                        var elemento = [dataUTC, val[1], parseInt(valorAgrupado)];
                        lista_global.push(elemento);
                    } else {
                        var dataFormato = val[0].split('-');
                        var energia = $("#energia").val();
                        var valor = 0;

                        if (energia == "Média") {
                            var contadorTotal = 0;
                            for (var z = 0; z <= val[2].length - 1; z++) {
                                contadorTotal += parseInt(val[2][z]);
                            }

                            valor = contadorTotal / val[2].length;
                        } else {
                            valor = val[2][energia - 1];
                        }

                        if (valor > maxDenseDisplay) {
                            maxDenseDisplay = valor;
                        }
						
						if (valor < minDenseDisplay) {
                            minDenseDisplay = valor;
                        }

                        var dataUTC = Date.UTC(dataFormato[0], dataFormato[1] - 1, dataFormato[2]);
                        var dataBR = dataFormato[0] + "-" + dataFormato[1] + "-" + dataFormato[2];
                        var dado = [dataBR, val[1], valor];
                        lista_datas.push(dado);

                        var elemento = [dataUTC, val[1], parseInt(valor)];
                        lista_global.push(elemento);

                        var elemento_mensal = [parseInt(dataFormato[1]), dataUTC, val[1], parseInt(valor)];
                        lista_global_mensal.push(elemento_mensal);
                    }

                } else {
                    // primeira linha
                    if ($("#lugar").val() == "teste") {
                        if ($('#energia option').size() < 20) {
                            $('#energia').empty();

                            if (null == $("#energia").val()) {
                                $('#energia').empty();
                                $('#energia').append($("<option></option>").attr("value", "Média").text("Average"));

                                for (var i = 1; i <= val.length; i++) {
                                    $('#energia').append($("<option></option>").attr("value", i).text(val[i - 1]));
                                }

                            }
                        }
                    } else {
                        if ($('#energia option').size() > 20) {
                            $('#energia').empty();
                        }

                        if (null == $("#energia").val()) {
                            $('#energia').append($("<option>-</option>").attr("value", "-").text("-"));
                            $('#energia').append($("<option></option>").attr("value", "Média").text("Average"));
                            $('#energia').val('Média');

                            for (var i = 1; i <= val.length; i++) {
                                $('#energia').append($("<option></option>").attr("value", i).text(val[i - 1]));
                            }

                        }
                    }
                }
            });

            var valorEnergia = $('#energia option:selected').text();
            var valorGrupo = $('#grupo option:selected').text();
            var textoHtml = "";

            if (valorEnergia == "-" && valorGrupo == "-") {
                textoHtml = "";
                tracoHtml = "";
            } else if (valorEnergia != "-") {
                textoHtml = "Energy selected: <b>" + valorEnergia + "</b>";
                tracoHtml = "- ";
            } else if (valorGrupo != "-") {
                textoHtml = "Group selected: <b>" + valorGrupo + "</b>";
                tracoHtml = "- ";
            }

            $("#denseTexto").html("Annual / Monthly View " + tracoHtml + textoHtml + " - Max consumption: <b>" + parseInt(maxDenseDisplay) + " Megawatts</br>");
            $("#heatmapHistoricoTexto").html("Monthly History " + tracoHtml + textoHtml);
            $("#rangeValuesDense").attr("max", parseInt(maxDenseDisplay));

            chart_heatmap_color = new Highcharts.Chart(heatmapcolor);
            largura_heatmap = chart_heatmap_color.chartWidth;
            altura_heatmap = chart_heatmap_color.chartHeight;

            carregaGraficoDias();
            chart_dias = new Highcharts.Chart(dias);

            carregaGraficoHoras();
            chart_horas = new Highcharts.Chart(horas);

            carregarHistorico();
            carregarHistoricoGeral(file);

            heatmap_large.series[0].data = lista_global;
            heatmap_large.colorAxis.max = maxDenseDisplay;

            chart_heatmap_large = new Highcharts.Chart(heatmap_large);
            largura_dense = chart_heatmap_large.chartWidth;
            altura_dense = chart_heatmap_large.chartHeight;
        },
        async: false
    });
}

function carregaHeatmap(heatmapcolor, lista_itens, maxDenseDisplay, minDenseDisplay, isDialog) {

    if (isDialog == false) {
		console.log('minDenseDisplay', minDenseDisplay)
        heatmapcolor.series[0].data = lista_itens;
        heatmapcolor.colorAxis.max = parseInt(maxDenseDisplay);
		heatmapcolor.colorAxis.min = parseInt(minDenseDisplay);
        heatmapcolor.xAxis.categories = ['Monday<br><b>' + formatarData(lista_dias[0]),
            'Tuesday<br><b>' + formatarData(lista_dias[1]),
            'Wednesday<br><b>' + formatarData(lista_dias[2]),
            'Thursday<br><b>' + formatarData(lista_dias[3]),
            'Friday<br><b>' + formatarData(lista_dias[4]),
            'Saturday<br><b>' + formatarData(lista_dias[5]),
            'Sunday<br><b>' + formatarData(lista_dias[6])
        ];

        dataInicioSemana = formatarData(lista_dias[0]);
        dataFimSemana = formatarData(lista_dias[6]);

        $("#heatmapTexto").html("Weekly View - Week selected: <b>" + semana_selecionada + "</b> - Start: <b>" + dataInicioSemana + "</b> - End: <b>" + dataFimSemana + "</b>");
    } else {
        heatmapcolor.xAxis.categories = ['Mon<br><b>' + formatarDiaMes(lista_dias[0]),
            'Tue<br><b>' + formatarDiaMes(lista_dias[1]),
            'Wed<br><b>' + formatarDiaMes(lista_dias[2]),
            'Thu<br><b>' + formatarDiaMes(lista_dias[3]),
            'Fri<br><b>' + formatarDiaMes(lista_dias[4]),
            'Sat<br><b>' + formatarDiaMes(lista_dias[5]),
            'Sun<br><b>' + formatarDiaMes(lista_dias[6])
        ];
    }

    var arrayValorMedioLinha1 = [],
        arrayValorMedioLinha2 = [],
        arrayValorMedioLinha3 = [],
        arrayValorMedioLinha4 = [],
        arrayValorMedioLinha5 = [],
        arrayValorMedioLinha6 = [],
        arrayValorMedioLinha7 = [];
    var arrayValorMedioLinhaX1 = [],
        arrayValorMedioLinhaX2 = [],
        arrayValorMedioLinhaX3 = [],
        arrayValorMedioLinhaX4 = [],
        arrayValorMedioLinhaX5 = [],
        arrayValorMedioLinhaX6 = [],
        arrayValorMedioLinhaX7 = [],
        arrayValorMedioLinhaX8 = [],
        arrayValorMedioLinhaX9 = [],
        arrayValorMedioLinhaX10 = [],
        arrayValorMedioLinhaX11 = [],
        arrayValorMedioLinhaX12 = [],
        arrayValorMedioLinhaX13 = [],
        arrayValorMedioLinhaX14 = [],
        arrayValorMedioLinhaX15 = [],
        arrayValorMedioLinhaX16 = [],
        arrayValorMedioLinhaX17 = [],
        arrayValorMedioLinhaX18 = [],
        arrayValorMedioLinhaX19 = [],
        arrayValorMedioLinhaX20 = [],
        arrayValorMedioLinhaX21 = [],
        arrayValorMedioLinhaX22 = [],
        arrayValorMedioLinhaX23 = [],
        arrayValorMedioLinhaX24 = [];
    var minimoL1 = 0,
        minimoL2 = 0,
        minimoL3 = 0,
        minimoL4 = 0,
        minimoL5 = 0,
        minimoL6 = 0,
        minimoL7 = 0;
    var maximoL1 = 0,
        maximoL2 = 0,
        maximoL3 = 0,
        maximoL4 = 0,
        maximoL5 = 0,
        maximoL6 = 0,
        maximoL7 = 0;

    for (var l = 0; l <= 6; l++) {
        if (l == 0) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha1.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 1) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha2.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 2) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha3.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 3) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha4.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 4) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha5.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 5) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha6.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        } else if (l == 6) {
            for (var z = 0; z <= 23; z++) {
                arrayValorMedioLinha7.push(heatmapcolor.series[0].data[z + 24 * l][2]);
            }
        }

        arrayValorMedioLinhaX1.push(heatmapcolor.series[0].data[l * 24][2]);
        arrayValorMedioLinhaX2.push(heatmapcolor.series[0].data[l * 24 + 1][2]);
        arrayValorMedioLinhaX3.push(heatmapcolor.series[0].data[l * 24 + 2][2]);
        arrayValorMedioLinhaX4.push(heatmapcolor.series[0].data[l * 24 + 3][2]);
        arrayValorMedioLinhaX5.push(heatmapcolor.series[0].data[l * 24 + 4][2]);
        arrayValorMedioLinhaX6.push(heatmapcolor.series[0].data[l * 24 + 5][2]);
        arrayValorMedioLinhaX7.push(heatmapcolor.series[0].data[l * 24 + 6][2]);
        arrayValorMedioLinhaX8.push(heatmapcolor.series[0].data[l * 24 + 7][2]);
        arrayValorMedioLinhaX9.push(heatmapcolor.series[0].data[l * 24 + 8][2]);
        arrayValorMedioLinhaX10.push(heatmapcolor.series[0].data[l * 24 + 9][2]);
        arrayValorMedioLinhaX11.push(heatmapcolor.series[0].data[l * 24 + 10][2]);
        arrayValorMedioLinhaX12.push(heatmapcolor.series[0].data[l * 24 + 11][2]);
        arrayValorMedioLinhaX13.push(heatmapcolor.series[0].data[l * 24 + 12][2]);
        arrayValorMedioLinhaX14.push(heatmapcolor.series[0].data[l * 24 + 13][2]);
        arrayValorMedioLinhaX15.push(heatmapcolor.series[0].data[l * 24 + 14][2]);
        arrayValorMedioLinhaX16.push(heatmapcolor.series[0].data[l * 24 + 15][2]);
        arrayValorMedioLinhaX17.push(heatmapcolor.series[0].data[l * 24 + 16][2]);
        arrayValorMedioLinhaX18.push(heatmapcolor.series[0].data[l * 24 + 17][2]);
        arrayValorMedioLinhaX19.push(heatmapcolor.series[0].data[l * 24 + 18][2]);
        arrayValorMedioLinhaX20.push(heatmapcolor.series[0].data[l * 24 + 19][2]);
        arrayValorMedioLinhaX21.push(heatmapcolor.series[0].data[l * 24 + 20][2]);
        arrayValorMedioLinhaX22.push(heatmapcolor.series[0].data[l * 24 + 21][2]);
        arrayValorMedioLinhaX23.push(heatmapcolor.series[0].data[l * 24 + 22][2]);
        arrayValorMedioLinhaX24.push(heatmapcolor.series[0].data[l * 24 + 23][2]);
    }

    minimoL1 = Math.min(...arrayValorMedioLinha1);
    maximoL1 = Math.max(...arrayValorMedioLinha1);
    minimoL2 = Math.min(...arrayValorMedioLinha2);
    maximoL2 = Math.max(...arrayValorMedioLinha2);
    minimoL3 = Math.min(...arrayValorMedioLinha3);
    maximoL3 = Math.max(...arrayValorMedioLinha3);
    minimoL4 = Math.min(...arrayValorMedioLinha4);
    maximoL4 = Math.max(...arrayValorMedioLinha4);
    minimoL5 = Math.min(...arrayValorMedioLinha5);
    maximoL5 = Math.max(...arrayValorMedioLinha5);
    minimoL6 = Math.min(...arrayValorMedioLinha6);
    maximoL6 = Math.max(...arrayValorMedioLinha6);
    minimoL7 = Math.min(...arrayValorMedioLinha7);
    maximoL7 = Math.max(...arrayValorMedioLinha7);

    posicaoMinimoL1 = arrayValorMedioLinha1.indexOf(minimoL1);
    posicaoMinimoL2 = arrayValorMedioLinha2.indexOf(minimoL2);
    posicaoMinimoL3 = arrayValorMedioLinha3.indexOf(minimoL3);
    posicaoMinimoL4 = arrayValorMedioLinha4.indexOf(minimoL4);
    posicaoMinimoL5 = arrayValorMedioLinha5.indexOf(minimoL5);
    posicaoMinimoL6 = arrayValorMedioLinha6.indexOf(minimoL6);
    posicaoMinimoL7 = arrayValorMedioLinha7.indexOf(minimoL7);

    posicaoMaximoL1 = arrayValorMedioLinha1.indexOf(maximoL1);
    posicaoMaximoL2 = arrayValorMedioLinha2.indexOf(maximoL2);
    posicaoMaximoL3 = arrayValorMedioLinha3.indexOf(maximoL3);
    posicaoMaximoL4 = arrayValorMedioLinha4.indexOf(maximoL4);
    posicaoMaximoL5 = arrayValorMedioLinha5.indexOf(maximoL5);
    posicaoMaximoL6 = arrayValorMedioLinha6.indexOf(maximoL6);
    posicaoMaximoL7 = arrayValorMedioLinha7.indexOf(maximoL7);

    heatmapcolor.series[1].data = [
        [0.1, posicaoMinimoL1],
        [1.1, posicaoMinimoL2],
        [2.1, posicaoMinimoL3],
        [3.1, posicaoMinimoL4],
        [4.1, posicaoMinimoL5],
        [5.1, posicaoMinimoL6],
        [5.8, posicaoMinimoL7]
    ];

    heatmapcolor.series[2].data = [
        [0.1, posicaoMaximoL1],
        [1.1, posicaoMaximoL2],
        [2.1, posicaoMaximoL3],
        [3.1, posicaoMaximoL4],
        [4.1, posicaoMaximoL5],
        [5.1, posicaoMaximoL6],
        [5.8, posicaoMaximoL7]
    ];

    minimoX1 = Math.min(...arrayValorMedioLinhaX1);
    maximoX1 = Math.max(...arrayValorMedioLinhaX1);
    minimoX2 = Math.min(...arrayValorMedioLinhaX2);
    maximoX2 = Math.max(...arrayValorMedioLinhaX2);
    minimoX3 = Math.min(...arrayValorMedioLinhaX3);
    maximoX3 = Math.max(...arrayValorMedioLinhaX3);
    minimoX4 = Math.min(...arrayValorMedioLinhaX4);
    maximoX4 = Math.max(...arrayValorMedioLinhaX4);
    minimoX5 = Math.min(...arrayValorMedioLinhaX5);
    maximoX5 = Math.max(...arrayValorMedioLinhaX5);
    minimoX6 = Math.min(...arrayValorMedioLinhaX6);
    maximoX6 = Math.max(...arrayValorMedioLinhaX6);
    minimoX7 = Math.min(...arrayValorMedioLinhaX7);
    maximoX7 = Math.max(...arrayValorMedioLinhaX7);
    minimoX8 = Math.min(...arrayValorMedioLinhaX8);
    maximoX8 = Math.max(...arrayValorMedioLinhaX8);
    minimoX9 = Math.min(...arrayValorMedioLinhaX9);
    maximoX9 = Math.max(...arrayValorMedioLinhaX9);
    minimoX10 = Math.min(...arrayValorMedioLinhaX10);
    maximoX10 = Math.max(...arrayValorMedioLinhaX10);
    minimoX11 = Math.min(...arrayValorMedioLinhaX11);
    maximoX11 = Math.max(...arrayValorMedioLinhaX11);
    minimoX12 = Math.min(...arrayValorMedioLinhaX12);
    maximoX12 = Math.max(...arrayValorMedioLinhaX12);
    minimoX13 = Math.min(...arrayValorMedioLinhaX13);
    maximoX13 = Math.max(...arrayValorMedioLinhaX13);
    minimoX14 = Math.min(...arrayValorMedioLinhaX14);
    maximoX14 = Math.max(...arrayValorMedioLinhaX14);
    minimoX15 = Math.min(...arrayValorMedioLinhaX15);
    maximoX15 = Math.max(...arrayValorMedioLinhaX15);
    minimoX16 = Math.min(...arrayValorMedioLinhaX16);
    maximoX16 = Math.max(...arrayValorMedioLinhaX16);
    minimoX17 = Math.min(...arrayValorMedioLinhaX17);
    maximoX17 = Math.max(...arrayValorMedioLinhaX17);
    minimoX18 = Math.min(...arrayValorMedioLinhaX18);
    maximoX18 = Math.max(...arrayValorMedioLinhaX18);
    minimoX19 = Math.min(...arrayValorMedioLinhaX19);
    maximoX19 = Math.max(...arrayValorMedioLinhaX19);
    minimoX20 = Math.min(...arrayValorMedioLinhaX20);
    maximoX20 = Math.max(...arrayValorMedioLinhaX20);
    minimoX21 = Math.min(...arrayValorMedioLinhaX21);
    maximoX21 = Math.max(...arrayValorMedioLinhaX21);
    minimoX22 = Math.min(...arrayValorMedioLinhaX22);
    maximoX22 = Math.max(...arrayValorMedioLinhaX22);
    minimoX23 = Math.min(...arrayValorMedioLinhaX23);
    maximoX23 = Math.max(...arrayValorMedioLinhaX23);
    minimoX24 = Math.min(...arrayValorMedioLinhaX24);
    maximoX24 = Math.max(...arrayValorMedioLinhaX24);

    posicaoMinimoX1 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX1.indexOf(minimoX1));
    posicaoMinimoX2 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX2.indexOf(minimoX2));
    posicaoMinimoX3 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX3.indexOf(minimoX3));
    posicaoMinimoX4 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX4.indexOf(minimoX4));
    posicaoMinimoX5 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX5.indexOf(minimoX5));
    posicaoMinimoX6 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX6.indexOf(minimoX6));
    posicaoMinimoX7 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX7.indexOf(minimoX7));
    posicaoMinimoX8 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX8.indexOf(minimoX8));
    posicaoMinimoX9 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX9.indexOf(minimoX9));
    posicaoMinimoX10 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX10.indexOf(minimoX10));
    posicaoMinimoX11 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX11.indexOf(minimoX11));
    posicaoMinimoX12 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX12.indexOf(minimoX12));
    posicaoMinimoX13 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX13.indexOf(minimoX13));
    posicaoMinimoX14 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX14.indexOf(minimoX14));
    posicaoMinimoX15 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX15.indexOf(minimoX15));
    posicaoMinimoX16 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX16.indexOf(minimoX16));
    posicaoMinimoX17 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX17.indexOf(minimoX17));
    posicaoMinimoX18 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX18.indexOf(minimoX18));
    posicaoMinimoX19 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX19.indexOf(minimoX19));
    posicaoMinimoX20 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX20.indexOf(minimoX20));
    posicaoMinimoX21 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX21.indexOf(minimoX21));
    posicaoMinimoX22 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX22.indexOf(minimoX22));
    posicaoMinimoX23 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX23.indexOf(minimoX23));
    posicaoMinimoX24 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX24.indexOf(minimoX24));

    posicaoMaximoX1 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX1.indexOf(maximoX1));
    posicaoMaximoX2 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX2.indexOf(maximoX2));
    posicaoMaximoX3 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX3.indexOf(maximoX3));
    posicaoMaximoX4 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX4.indexOf(maximoX4));
    posicaoMaximoX5 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX5.indexOf(maximoX5));
    posicaoMaximoX6 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX6.indexOf(maximoX6));
    posicaoMaximoX7 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX7.indexOf(maximoX7));
    posicaoMaximoX8 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX8.indexOf(maximoX8));
    posicaoMaximoX9 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX9.indexOf(maximoX9));
    posicaoMaximoX10 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX10.indexOf(maximoX10));
    posicaoMaximoX11 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX11.indexOf(maximoX11));
    posicaoMaximoX12 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX12.indexOf(maximoX12));
    posicaoMaximoX13 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX13.indexOf(maximoX13));
    posicaoMaximoX14 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX14.indexOf(maximoX14));
    posicaoMaximoX15 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX15.indexOf(maximoX15));
    posicaoMaximoX16 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX16.indexOf(maximoX16));
    posicaoMaximoX17 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX17.indexOf(maximoX17));
    posicaoMaximoX18 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX18.indexOf(maximoX18));
    posicaoMaximoX19 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX19.indexOf(maximoX19));
    posicaoMaximoX20 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX20.indexOf(maximoX20));
    posicaoMaximoX21 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX21.indexOf(maximoX21));
    posicaoMaximoX22 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX22.indexOf(maximoX22));
    posicaoMaximoX23 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX23.indexOf(maximoX23));
    posicaoMaximoX24 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX24.indexOf(maximoX24));

    heatmapcolor.series[3].data = [
        [posicaoMinimoX1, 0],
        [posicaoMinimoX2, 1],
        [posicaoMinimoX3, 2],
        [posicaoMinimoX4, 3],
        [posicaoMinimoX5, 4],
        [posicaoMinimoX6, 5],
        [posicaoMinimoX7, 6],
        [posicaoMinimoX8, 7],
        [posicaoMinimoX9, 8],
        [posicaoMinimoX10, 9],
        [posicaoMinimoX11, 10],
        [posicaoMinimoX12, 11],
        [posicaoMinimoX13, 12],
        [posicaoMinimoX14, 13],
        [posicaoMinimoX15, 14],
        [posicaoMinimoX16, 15],
        [posicaoMinimoX17, 16],
        [posicaoMinimoX18, 17],
        [posicaoMinimoX19, 18],
        [posicaoMinimoX20, 19],
        [posicaoMinimoX21, 20],
        [posicaoMinimoX22, 21],
        [posicaoMinimoX23, 22],
        [posicaoMinimoX24, 23],
    ];

    heatmapcolor.series[4].data = [
        [posicaoMaximoX1, 0],
        [posicaoMaximoX2, 1],
        [posicaoMaximoX3, 2],
        [posicaoMaximoX4, 3],
        [posicaoMaximoX5, 4],
        [posicaoMaximoX6, 5],
        [posicaoMaximoX7, 6],
        [posicaoMaximoX8, 7],
        [posicaoMaximoX9, 8],
        [posicaoMaximoX10, 9],
        [posicaoMaximoX11, 10],
        [posicaoMaximoX12, 11],
        [posicaoMaximoX13, 12],
        [posicaoMaximoX14, 13],
        [posicaoMaximoX15, 14],
        [posicaoMaximoX16, 15],
        [posicaoMaximoX17, 16],
        [posicaoMaximoX18, 17],
        [posicaoMaximoX19, 18],
        [posicaoMaximoX20, 19],
        [posicaoMaximoX21, 20],
        [posicaoMaximoX22, 21],
        [posicaoMaximoX23, 22],
        [posicaoMaximoX24, 23],
    ];

    maxHeatmap = 0;

    for (a = 0; a < heatmapcolor.series[0].data.length; a++) {
        var valor = heatmapcolor.series[0].data[a][2];
        if (valor > maxHeatmap) {
            maxHeatmap = valor;
        }
    }

    $("#rangeValuesHeatmap").attr("max", parseInt(maxHeatmap));

}

function carregaGraficoDias() {
    dias = {
        chart: {
            renderTo: 'area-conjunto-x1',
            type: 'line',
            inverted: true
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
        yAxis: {
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
            tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            tickWidth: 1,
            min: 0,
            max: 23
        },
        xAxis: {
            title: {
                text: 'Consumption'
            }
        },
        tooltip: {
            shared: true
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
        series: [{
            name: "Consumption",
            data: []
        }],
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
            text: null
        }
    };
}

function carregaGraficoHoras() {
	horas = {
			chart: {
					renderTo: 'area-conjunto-y1',
					type: 'line',
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
					categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
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
					formatter: function() {
							return 'Consumption <b>' + this.y + '</b>';
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
			series: [{
					name: "Consumption",
					data: [null, null, null, null, null, null, null]
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
					text: null
			}
	};
}