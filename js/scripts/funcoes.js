function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

function getLoadDatas(code) {
  return lista_datas.filter(
      function(lista_datas) {
          if (lista_datas[0] == code) {
              return lista_datas;
          }
      }
  );
}

function getLoadDatasByMonth(month) {
	
	if ($("#origemDialog").val() == "consumo" ) {
		return lista_global_mensal.filter(
		  function(lista_global_mensal) {
			  if (lista_global_mensal[0] == month) {
				  return lista_global_mensal;
			  }
		  }
		);
	}
	else {
		return lista_global_mensal_meteriologicos.filter(
		  function(lista_global_mensal_meteriologicos) {
			  if (lista_global_mensal_meteriologicos[0] == month) {
				  return lista_global_mensal_meteriologicos;
			  }
		  }
		);
	}
}

function getEstadoInicial(data, hora) {
  return dados_dense_estado_inicial.filter(
      function(valores) {
          if (valores[0] == data && valores[1] == hora) {
              return dados_dense_estado_inicial[2];
          }
      }
  );
}

function formatarData(data) {
  var split = data.split("-");
  return split[2] + "/" + split[1] + "/" + split[0];
}

function formatarDiaMes(data) {
  var split = data.split("-");
  return split[2] + "." + split[1];
}

function formatarDataEn(data) {
  var split = data.split("/");
  var dia = split[0];
  var mes = split[1];
  return split[2] + "-" + mes + "-" + dia;
}

function ajustePosicaoHeatmapSerie3(valor) {
  if (parseInt(valor) == 6) {
      valor -= 0.3;
  } else {
      valor += 0.3;
  }

  return valor;
}

function ajustePosicaoHeatmapSerie4(valor) {
  if (parseInt(valor) == 6) {
      valor -= 0.2;
  } else {
      valor += 0.2;
  }

  return valor;
}

function retornaInicioSemanaHeatmapLarge(pontoCelula, diaSemanaCelula){
	var diff = 24;
	
	switch (diaSemanaCelula) {
		case 0:
			return pontoCelula - (diff * 6); 
		case 1:
			return pontoCelula;
		case 2:
			return pontoCelula - (diff * 1);
		case 3:
			return pontoCelula - (diff * 2); 
		case 4:
			return pontoCelula - (diff * 3); 
		case 5:
			return pontoCelula - (diff * 4);
		case 6:
			return pontoCelula - (diff * 5);
	}
}
	

function retornaDiaDaSemana(diaUTC) {
  var weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[diaUTC];
}

function retornaNomePorMes(mes) {
  switch (String(mes)) {
      case "01":
          return "Jan";
      case "02":
          return "Feb";
      case "03":
          return "Mar";
      case "04":
          return "Apr";
      case "05":
          return "May";
      case "06":
          return "Jun";
      case "07":
          return "Jul";
      case "08":
          return "Aug";
      case "09":
          return "Set";
      case "10":
          return "Oct";
      case "11":
          return "Nov";
      case "12":
          return "Dec";
  }
}

function retornaTotalDiasPorMes(mes, ano) {
  switch (mes) {
      case "01":
          return 31;
      case "02":
          return 28;
      case "03":
          return 31;
      case "04":
          return 30;
      case "05":
          return 31;
      case "06":
          return 30;
      case "07":
          return 31;
      case "08":
          return 30;
      case "09":
          return 31;
      case "10":
          return 31;
      case "11":
          return 30;
      case "12":
          return 31;
  }
}

function retornaInicioPorMes(mes) {
  var lista = [];
  switch (String(mes)) {
      case "01":
          lista.push(0, 30);
          return lista;
      case "02":
          lista.push(31, 58);
          return lista;
      case "03":
          lista.push(59, 89);
          return lista;
      case "04":
          lista.push(90, 119);
          return lista;
      case "05":
          lista.push(120, 150);
          return lista;
      case "06":
          lista.push(151, 180);
          return lista;
      case "07":
          lista.push(181, 211);
          return lista;
      case "08":
          lista.push(212, 242);
          return lista;
      case "09":
          lista.push(243, 272);
          return lista;
      case "10":
          lista.push(273, 303);
          return lista;
      case "11":
          lista.push(304, 333);
          return lista;
      case "12":
          lista.push(334, 364);
          return lista;
  }
}

function retornaInicioPorMes2(mes) {
  var lista = [];
  switch (String(mes)) {
      case "01":
          lista.push(0, 30);
          return lista;
      case "02":
          lista.push(31, 58);
          return lista;
      case "03":
          lista.push(59, 89);
          return lista;
      case "04":
          lista.push(90, 119);
          return lista;
      case "05":
          lista.push(120, 150);
          return lista;
      case "06":
          lista.push(151, 180);
          return lista;
      case "07":
          lista.push(181, 211);
          return lista;
      case "08":
          lista.push(212, 242);
          return lista;
      case "09":
          lista.push(243, 272);
          return lista;
      case "10":
          lista.push(273, 303);
          return lista;
      case "11":
          lista.push(304, 333);
          return lista;
      case "12":
          lista.push(334, 364);
          return lista;
  }
}

function evitaUndefined(lista, diaDaSemana, hora) {
  if (typeof lista[diaDaSemana] === 'undefined') {
      lista[diaDaSemana] = [];
  }

  if (typeof lista[diaDaSemana][hora] === 'undefined') {
      lista[diaDaSemana][hora] = [];
  }

  return lista;
}

function mediana(values) {
  values.sort(function(a, b) {
      return a - b;
  });
  var half = Math.floor(values.length / 2);

  if (values.length % 2)
      return values[half];
  else
      return (values[half - 1] + values[half]) / 2.0;
}

function moda(numbers) {
  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  var modes = [],
      count = [],
      i, number, maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
      number = numbers[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
          maxIndex = count[number];
      }
  }

  for (i in count)
      if (count.hasOwnProperty(i)) {
          if (count[i] === maxIndex) {
              modes.push(Number(i));
          }
      }

  return modes;
}

function retornaSoma(array) {
  return array.reduce(function(a, b) {
      return a + b
  }, 0);
}

function retornaMedia(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function retornaVariancia(array) {
  var media = retornaMedia(array);
  var valor = retornaMedia(array.map(function(num) {
      return Math.pow(num - media, 2);
  }));
  return valor;
}

function retornaDesvioPadrao(array) {
  return Math.sqrt(retornaVariancia(array));
}

function retornaMediaGeometrica(lista) {
  return Math.pow(lista.reduce((a, b) => a * b), 1 / lista.length);
}

function round(valor) {
  var str = valor.toFixed(2);
  var number = Number(str);
  return number;
}

function retornaMediaHarmonica(lista) {
  var resultado = 0;

  for (i = 0; i < lista.length; i++) {
      resultado = resultado + (1 / lista[i]);
  }

  return lista.length / resultado;
}

function retornaErroPadrao(lista, desvioPadrao) {
  var tamanhoAmostra = lista.length;
  var raizQuadrada = Math.sqrt(tamanhoAmostra);
  return desvioPadrao / raizQuadrada;
}

function verificaAnoBissexto(ano) {
  return ((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0);
}

function retornaPorcentagem(valor, porcentual) {
  return valor * porcentual / 100;
}

function Median(data) {
  return Quartile_50(data);
}

function Quartile_25(data) {
  return Quartile(data, 0.25);
}

function Quartile_50(data) {
  return Quartile(data, 0.5);
}

function Quartile_75(data) {
  return Quartile(data, 0.75);
}

function Quartile(data, q) {
  data = Array_Sort_Numbers(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if ((data[base + 1] !== undefined)) {
      return data[base] + rest * (data[base + 1] - data[base]);
  } else {
      return data[base];
  }
}

function Array_Sort_Numbers(inputarray) {
  return inputarray.sort(function(a, b) {
      return a - b;
  });
}

function Array_Sum(t) {
  return t.reduce(function(a, b) {
      return a + b;
  }, 0);
}

function Array_Average(data) {
  return Array_Sum(data) / data.length;
}

function Array_Stdev(tab) {
  var i, j, total = 0,
      mean = 0,
      diffSqredArr = [];
  for (i = 0; i < tab.length; i += 1) {
      total += tab[i];
  }
  mean = total / tab.length;
  for (j = 0; j < tab.length; j += 1) {
      diffSqredArr.push(Math.pow((tab[j] - mean), 2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl) {
      return firstEl + nextEl;
  }) / tab.length));
}

function setZero(mes) {
  if (mes < 10) {
    mes = '0' + mes;
  }
  return mes;
}

function primeiraLetraGrande(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}