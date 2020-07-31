$("#boxplotAno").change(function() {
    var horaSelecionada = $("#boxplotAno").val();

    if (horaSelecionada == "-") {
        atualizaBoxPlot();
    }
    else {
        atualizaBoxPlotPorHora(horaSelecionada);
    }
});

function atualizaBoxPlot(){
    var lista_valores_boxplot = carregaDadosBoxplot();
    var box_plot = retornaGrafico(lista_valores_boxplot);
    chart_box_plot = new Highcharts.Chart(box_plot);
}

function atualizaBoxPlotPorHora(horaSelecionada){
    var lista_valores_boxplot = [];
    var lista = [];
    
    lista = trataLista(retornaHorasPorMes(lista_jan_hora_boxplot, horaSelecionada));
    var janeiro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_fev_hora_boxplot, horaSelecionada));
    var fevereiro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_mar_hora_boxplot, horaSelecionada));
    var marco = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_abr_hora_boxplot, horaSelecionada));
    var abril = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_mai_hora_boxplot, horaSelecionada));
    var maio = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_jun_hora_boxplot, horaSelecionada));
    var junho = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_jul_hora_boxplot, horaSelecionada));
    var julho = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_ago_hora_boxplot, horaSelecionada));
    var agosto = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_set_hora_boxplot, horaSelecionada));
    var setembro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_out_hora_boxplot, horaSelecionada));
    var outubro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_nov_hora_boxplot, horaSelecionada));
    var novembro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista = trataLista(retornaHorasPorMes(lista_dez_hora_boxplot, horaSelecionada));
    var dezembro = [
        Math.min(...lista),
        parseInt(Quartile_25(new Array(Math.min(...lista), Math.max(...lista)))),
        mediana(lista),
        parseInt(Quartile_75(new Array(Math.min(...lista), Math.max(...lista)))),
        Math.max(...lista)
    ];

    lista_valores_boxplot.push(janeiro);
    lista_valores_boxplot.push(fevereiro);
    lista_valores_boxplot.push(marco);
    lista_valores_boxplot.push(abril);
    lista_valores_boxplot.push(maio);
    lista_valores_boxplot.push(junho);
    lista_valores_boxplot.push(julho);
    lista_valores_boxplot.push(agosto);
    lista_valores_boxplot.push(setembro);
    lista_valores_boxplot.push(outubro);
    lista_valores_boxplot.push(novembro);
    lista_valores_boxplot.push(dezembro);

    var box_plot = retornaGrafico(lista_valores_boxplot);
    chart_box_plot = new Highcharts.Chart(box_plot);
}

function trataLista(lista){
    var retorno = [];
    for(var i=0; i<lista.length; i++){
        retorno.push(lista[i][1]);
    }
    return retorno;
}

function retornaGrafico(lista_valores_boxplot){
    return {
        chart: {
            type: 'boxplot',
            renderTo: 'boxplotAnnual'
        },
        title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
        legend: {
            enabled: false
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
        exporting: {
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
    
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'],
            title: {
                text: ''
            }
        },
    
        yAxis: {
            title: {
                text: 'Consumption'
            }
        },
    
        series: [{
            name: 'Consumption',
            data: lista_valores_boxplot,
            showInLegend: false,
            fillColor: '#C0C0C0',
            color: '#010916',
            lineWidth: 1,
            tooltip: {
                headerFormat: '<b>Month: {point.x} - Year: '+anoComboSelecionado+'</b><br/>'
            }
        }]
    }
}

function retornaHorasPorMes(lista, hora){
    return lista.filter(
        function(valores){
            if(valores[0] == hora){
                return parseInt(lista[1]);
            }
        }
    )
}

function carregaDadosBoxplot(){
    var retorno = []
    var janeiro = [
        Math.min(...lista_jan_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_jan_boxplot), Math.max(...lista_jan_boxplot)))),
        mediana(lista_jan_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_jan_boxplot), Math.max(...lista_jan_boxplot)))),
        Math.max(...lista_jan_boxplot)
    ];

    var fevereiro = [
        Math.min(...lista_fev_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_fev_boxplot), Math.max(...lista_fev_boxplot)))),
        mediana(lista_fev_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_fev_boxplot), Math.max(...lista_fev_boxplot)))),
        Math.max(...lista_fev_boxplot)
    ];

    var marco = [
        Math.min(...lista_mar_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_mar_boxplot), Math.max(...lista_mar_boxplot)))),
        mediana(lista_mar_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_mar_boxplot), Math.max(...lista_mar_boxplot)))),
        Math.max(...lista_mar_boxplot)
    ];

    var abril = [
        Math.min(...lista_abr_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_abr_boxplot), Math.max(...lista_abr_boxplot)))),
        mediana(lista_abr_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_abr_boxplot), Math.max(...lista_abr_boxplot)))),
        Math.max(...lista_abr_boxplot)
    ];

    var maio = [
        Math.min(...lista_mai_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_mai_boxplot), Math.max(...lista_mai_boxplot)))),
        mediana(lista_mai_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_mai_boxplot), Math.max(...lista_mai_boxplot)))),
        Math.max(...lista_mai_boxplot)
    ];

    var junho = [
        Math.min(...lista_jun_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_jun_boxplot), Math.max(...lista_jun_boxplot)))),
        mediana(lista_jun_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_jun_boxplot), Math.max(...lista_jun_boxplot)))),
        Math.max(...lista_jun_boxplot)
    ];

    var julho = [
        Math.min(...lista_jul_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_jul_boxplot), Math.max(...lista_jul_boxplot)))),
        mediana(lista_jul_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_jul_boxplot), Math.max(...lista_jul_boxplot)))),
        Math.max(...lista_jul_boxplot)
    ];

    var agosto = [
        Math.min(...lista_ago_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_ago_boxplot), Math.max(...lista_ago_boxplot)))),
        mediana(lista_ago_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_ago_boxplot), Math.max(...lista_ago_boxplot)))),
        Math.max(...lista_ago_boxplot)
    ];

    var setembro = [
        Math.min(...lista_set_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_set_boxplot), Math.max(...lista_set_boxplot)))),
        mediana(lista_set_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_set_boxplot), Math.max(...lista_set_boxplot)))),
        Math.max(...lista_set_boxplot)
    ];

    var outubro = [
        Math.min(...lista_out_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_out_boxplot), Math.max(...lista_out_boxplot)))),
        mediana(lista_out_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_out_boxplot), Math.max(...lista_out_boxplot)))),
        Math.max(...lista_out_boxplot)
    ];

    var novembro = [
        Math.min(...lista_nov_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_nov_boxplot), Math.max(...lista_nov_boxplot)))),
        mediana(lista_nov_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_nov_boxplot), Math.max(...lista_nov_boxplot)))),
        Math.max(...lista_nov_boxplot)
    ];

    var dezembro = [
        Math.min(...lista_dez_boxplot),
        parseInt(Quartile_25(new Array(Math.min(...lista_dez_boxplot), Math.max(...lista_dez_boxplot)))),
        mediana(lista_dez_boxplot),
        parseInt(Quartile_75(new Array(Math.min(...lista_dez_boxplot), Math.max(...lista_dez_boxplot)))),
        Math.max(...lista_dez_boxplot)
    ];

    retorno.push(janeiro);
    retorno.push(fevereiro);
    retorno.push(marco);
    retorno.push(abril);
    retorno.push(maio);
    retorno.push(junho);
    retorno.push(julho);
    retorno.push(agosto);
    retorno.push(setembro);
    retorno.push(outubro);
    retorno.push(novembro);
    retorno.push(dezembro);
    return retorno;
}