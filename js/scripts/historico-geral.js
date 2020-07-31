function carregarHistoricoGeral(file) {
    
   var listaObjetos = carregarDadosGeral(file);

    var historico_geral = {
       
        title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
        chart: {
            renderTo: 'historico_geral',
            type: 'line',
            zoomType: 'x'
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            dateTimeLabelFormats : {
                day:"%b %e"
            },
            formatter: function () {
                var nf = new Intl.NumberFormat();
                var s = '<b>'+ this.x +'</b>';
                s += '<br/><span style="color:' + this.points[0].color + '">\u25CF</span> Consumption: <b>' + nf.format(this.y) + '</b>';
                return s;
            }
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'],
            plotBands: [{
                            color: '#F0F0F0',
                            from: -10,
                            to: 0.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 1.5,
                            to: 2.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 3.5,
                            to: 4.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 5.5,
                            to: 6.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 7.5,
                            to: 8.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 9.5,
                            to: 10.5
                        }],
		},
        series: listaObjetos,
        exporting: {
            enabled: false
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
		}
		
    };
    
    chart_historico_geral = new Highcharts.Chart(historico_geral);

}

function carregarDadosGeral(file){
    var energia = $("#energia").val();
    var retornoFinal =[];
    var nomeEnergias =[];
    var valorEnergias =[];
    var jan = [], fev = [], mar = [], abr = [], mai = [], jun = [], jul = [], ago = [], set = [], out = [], nov = [], dez = [];
	var janMedia = [];
	var trocaMes = "01";

    $.ajax({
        url: "datasets/"+file,
        success: function (dadosJson) {
            $.each(dadosJson, function (chave, val) {

                if (chave == 0){
                    for(i=0; i<val.length; i++){
                        nomeEnergias.push(val[i]);
                    }
                    return;
                }          

                for(i=0; i<val[2].length; i++){
                    if(isNaN(valorEnergias[i])){
                        valorEnergias[i] = 0;
                    }

					var dataFormato = val[0].split('-');
                    var mes = dataFormato[1];
                    var primeiroValor = 0;
					if (mes != trocaMes) {
                        zeraValoresDoArray(valorEnergias);
                        i = 0;
                        valorEnergias[i] = 0;
						trocaMes = mes;
					}

                    valor = valorEnergias[i] + val[2][i];
                    valorEnergias[i] = valor;

                    switch (mes) {
                        case "01":
                            jan[i] = valorEnergias[i];
                            break;
                        case "02":
                            fev[i] = valorEnergias[i];
                            break;
                        case "03":
                            mar[i] = valorEnergias[i];
                            break;
                        case "04":
                            abr[i] = valorEnergias[i];
                            break;
                        case "05":
                            mai[i] = valorEnergias[i];
                            break;
                        case "06":
                            jun[i] = valorEnergias[i];
                            break;
                        case "07":
                            jul[i] = valorEnergias[i];
                            break;
                        case "08":
                            ago[i] = valorEnergias[i];
                            break;
                        case "09":
                            set[i] = valorEnergias[i];
                            break;
                        case "10":
                            out[i] = valorEnergias[i];
                            break;
                        case "11":
                            nov[i] = valorEnergias[i];
                            break;
                        case "12":
                            dez[i] = valorEnergias[i];
                    }
					
                }

            });

            for(i=0; i<nomeEnergias.length; i++){
                var objeto = {};
                objeto.name = nomeEnergias[i];
                objeto.data = [jan[i], fev[i], mar[i], abr[i], mai[i], jun[i], jul[i], ago[i], set[i], out[i], nov[i], dez[i]];
                retornoFinal.push(objeto);
            }

            jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;
        },
        async: false
    });

   return retornoFinal;
}

function zeraValoresDoArray(valorEnergias){
	for(i=0; i<valorEnergias.length; i++){
		valorEnergias[i] = 0;
	}
}