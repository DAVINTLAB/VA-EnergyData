$( document ).ready(function() {

	$('#area-conjunto-x1-coluna').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}

		var grafico = chart_dias_valores;
		grafico.chart.type = 'column';
		grafico.chart.polar = false;
		chart_dias = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-x1-polar').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}
		
		var grafico = chart_dias_valores;
		grafico.chart.type = '';
		grafico.chart.polar = true;
		chart_dias = new Highcharts.Chart(grafico);
	});	
	
	$('#area-conjunto-x1-plot').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}
		
		var grafico = chart_dias_valores;
		grafico.chart.type = 'scatter';
		grafico.chart.polar = false;
		chart_dias = new Highcharts.Chart(grafico);
	});
	
	$('#area-conjunto-x1-area').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}
		
		var grafico = chart_dias_valores;
		grafico.chart.type = 'area';
		grafico.chart.polar = false;
		chart_dias = new Highcharts.Chart(grafico);
	});
	
	$('#area-conjunto-x1-linha').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}
		
		var grafico = chart_dias_valores;
		grafico.chart.type = 'line';
		grafico.chart.polar = false;
		chart_dias = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-x1-pizza').click(function () {
		if (typeof chart_dias_valores === 'undefined') {
			return;	
		}
		
		var grafico = chart_dias_valores;
		grafico.chart.type = 'pie';
		grafico.chart.polar = false;
		chart_dias = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-x1-box').click(function () {
		if (typeof chart_dias_valores_boxplot === 'undefined') {
			return;	
		}

		var grafico = chart_dias_valores_boxplot;
		chart_dias = new Highcharts.Chart(grafico);
	});
	
//---------------------------------------------------------------------------------------------------------------------------------------	
	
	$('#area-conjunto-y1-coluna').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = 'column';
		grafico.chart.polar = false;
		chart_horas = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-y1-polar').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = '';
		grafico.chart.polar = true;
		chart_horas = new Highcharts.Chart(grafico);
	});	
	
	$('#area-conjunto-y1-plot').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = 'scatter';
		grafico.chart.polar = false;
		chart_horas = new Highcharts.Chart(grafico);
	});
	
	$('#area-conjunto-y1-area').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = 'area';
		grafico.chart.polar = false;
		chart_horas = new Highcharts.Chart(grafico);
	});
	
	$('#area-conjunto-y1-linha').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = 'line';
		grafico.chart.polar = false;
		chart_horas = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-y1-pizza').click(function () {
		if (typeof chart_horas_valores === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores;
		grafico.chart.type = 'pie';
		grafico.chart.polar = false;
		chart_horas = new Highcharts.Chart(grafico);
	});

	$('#area-conjunto-y1-box').click(function () {
		if (typeof chart_horas_valores_boxplot === 'undefined') {
			return;	
		}

		var grafico = chart_horas_valores_boxplot;
		chart_horas = new Highcharts.Chart(grafico);
	});

});