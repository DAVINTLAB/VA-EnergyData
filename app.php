<html>
  <head>
    <meta charset="utf-8">
    <title>Model Visualization to Smart Cities and Smart Buildings</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>
    <link href="css/keen-dashboards.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="css/jquery-ui.css" type="text/css" media="all">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body class="keen-dashboard">
    <div class="navbar nav-color">
      <div class="container-fluid">
        <div class="navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <span class="texto">Place: </span>
              <select id="lugar">
                <option value="restaurante">Restaurant</option>
                <option value="pjm" selected>PJM</option>
              </select>
            </li>
            <li>
              <span class="texto">Year: </span>
              <select id="ano">
                <option value="2004">2004</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013" selected>2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
              </select>
            </li>
            <li>
              <span class="texto">Energy Source: </span><select id="energia"></select>
            </li>
            <li>
              <span class="texto">Comparison: </span>
              <label class="switch">
                <input type="checkbox" id="comparison">
                <span class="slider round"></span>
              </label>
            </li>
			
			<li>
              <span class="texto">Correlation: </span>
              <label class="switch">
                <input type="checkbox" id="correlation" checked>
                <span class="slider round"></span>
              </label>
            </li>
            <!--	<li>
              <span class="texto">Group Energy Source: </span>
              <select id="grupo">
                <option value="-">-</option>
              	<option value="Eletricidade">Eletricidade</option>
              	<option value="Gas">Gás</option>
              </select>
              </li>-->
          </ul>
        </div>
      </div>
    </div>

    <div class="container-fluid">
		<div class="row">
        <div id="dialogs" class="modal-style">
          <div class="dialog-tmpl">
            <div class="dialog-body"></div>
          </div>
        </div>

        <div id="calendarComparisonModal" class="modal fade" tabindex="-1" align="center" valign="center">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Select mode visualization</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-footer" align="center">
                <button id="modal-calendario-monthly" type="button" class="btn btn-danger" data-dismiss="modal">Monthly</button>
                <button id="modal-calendario-weekly" type="button" class="btn btn-primary" data-dismiss="modal">Weekly</button>
                <button id="modal-calendario-daily"  type="button" class="btn btn-success" data-dismiss="modal">Daily</button>
              </div>
            </div>
          </div>
        </div>

        <div id="heatmapComparisonModal" class="modal fade" tabindex="-1" align="center" valign="center">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Select mode visualization</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-footer" align="center">
                <button id="modal-heatmap-monthly" type="button" class="btn btn-danger" data-dismiss="modal">Monthly</button>
                <button id="modal-heatmap-weekly" type="button" class="btn btn-primary" data-dismiss="modal">Weekly</button>
                <button id="modal-heatmap-daily"  type="button" class="btn btn-success" data-dismiss="modal">Daily</button>
                <button id="modal-heatmap-hourly" type="button" class="btn btn-warning" data-dismiss="modal">Hourly</button>
              </div>
            </div>
          </div>
        </div>
		
		<input type="hidden" value="" id="origemDialog">
		<input type="hidden" value="" id="tipoMeteriologia">
        <div class="col-sm-12 chart-container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="calendarTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-calendar-view" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
				<div id="calendar_view" style="height: 500px; margin: 0 auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 chart-container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="denseTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li>
					<select id="dadosMeteorologicos">
						<option value="-" selected>Select option</option>
						<option value="humidity">Humidity</option>
						<option value="pressure">Pressure</option>
						<option value="temperature">Temperature</option>
						<option value="wind">Wind</option>
					</select>
					<select id="cidadeMeteorologicos">
						<option value="-" selected>Select city</option>
						<option value="0">Vancouver</option>
						<option value="1">Portland</option>
						<option value="2">San Francisco</option>
						<option value="3">Seattle</option>
						<option value="4">Los Angeles</option>
						<option value="5">San Diego</option>
						<option value="6">Las Vegas</option>
						<option value="7">Phoenix</option>
						<option value="8">Albuquerque</option>
						<option value="9">Denver</option>
						<option value="10">San Antonio</option>
						<option value="11">Dallas</option>
						<option value="12">Houston</option>
						<option value="13">Kansas City</option>
						<option value="14">Minneapolis</option>
						<option value="15">Saint Louis</option>
						<option value="16">Chicago</option>
						<option value="17">Nashville</option>
						<option value="18">Indianapolis</option>
						<option value="19">Atlanta</option>
						<option value="20">Detroit</option>
						<option value="21">Jacksonville</option>
						<option value="22">Charlotte</option>
						<option value="23">Miami</option>
						<option value="24">Pittsburgh</option>
						<option value="25">Toronto</option>
						<option value="26">Philadelphia</option>
						<option value="27">New York</option>
						<option value="28">Montreal</option>
						<option value="29">Boston</option>
						<option value="30">Beersheba</option>
						<option value="30">Tel Aviv District</option>
						<option value="31">Eilat</option>
						<option value="32">Haifa</option>
						<option value="33">Nahariyya</option>
						<option value="34">Jerusalem</option>
					</select>
					<button id="carregarDadosMeteorologicos" class="btn btn-primary btn-sm">Load data</button>
					<a href="#" id="panel-fullscreen-dense-display" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a>
				</li>
              </ul>
            </div>
            <div class="panel-body">
              <div id="ht_large"></div>
              <div>
                <input id="rangeValuesDense" type="range" value="0" name="points" min="0">
                <span>Values equal or grater than: </span><span id="denseRange"><b>0</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>
	  
	  <div class="row" id="meteorologia"> <a name="link_meteorologia"></a>
        <div class="col-sm-12 chart-container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="denseMeteriologicoTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-dense-display-meteriologico" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div id="ht_large_dados_meteriologicos"></div>
            </div>
          </div>
        </div>
      </div>
			
			<div class="row"><a name="link_heatmap"></a>
				<div class="col-sm-6 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="heatmapTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-heatmap" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div id="heatmap-color" align="center"></div>
              <div id="rangeHeatmap">
                <input id="rangeValuesHeatmap" type="range" value="0" name="points" min="0">
                <span>Values equal or grater than: </span><span id="heatmapRange"><b>0</b></span>
              </div>
            </div>
          </div>
				</div>
				
        <div class="col-sm-5 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="diasTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-dias" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div class="col-sm-12">
                <div id="area-conjunto-x1" align="center"></div>
                <div id="botoes-area-conjunto-x1" style="text-align:center;">
                  <button id="area-conjunto-x1-coluna" class="btn btn-primary btn-sm">Bar</button>
                  <!--<button id="area-conjunto-x1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
                  <button id="area-conjunto-x1-polar" class="btn btn-success btn-sm">Polar</button>
                  <button id="area-conjunto-x1-plot" class="btn btn-info btn-sm">Plot</button>
                  <button id="area-conjunto-x1-linha" class="btn btn-danger btn-sm">Line</button>
                  <button id="area-conjunto-x1-area" class="btn btn-warning btn-sm">Area</button>
                  <button id="area-conjunto-x1-box" class="btn btn-green btn-sm">Box</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm1 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="horasTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-horas" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div class="col-sm-12">
                <div id="area-conjunto-y1" align="center"></div>
                <div id="botoes-area-conjunto-y1" style="text-align:center;">
                  <button id="area-conjunto-y1-coluna" class="btn btn-primary btn-sm">Bar</button>
                  <!--<button id="area-conjunto-y1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
                  <button id="area-conjunto-y1-polar" class="btn btn-success btn-sm">Polar</button>
                  <button id="area-conjunto-y1-plot" class="btn btn-info btn-sm">Plot</button>
                  <button id="area-conjunto-y1-linha" class="btn btn-danger btn-sm">Line</button>
                  <button id="area-conjunto-y1-area" class="btn btn-warning btn-sm">Area</button>
                  <button id="area-conjunto-y1-box" class="btn btn-green btn-sm">Box</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

		
    <div class="row">
      <div class="col-sm-6 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center" style="margin:4px;"><span id="heatmapHistoricoTexto"></span></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-historico" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="historico" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center">
              <span id="boxplotTexto"></span> 
              <span> - Hour: </span>
              <select id="boxplotAno">
                <option value="-" selected>All</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
              </select></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-boxplot" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="boxplotAnnual" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center"> <span id="heatmapHistoricoGeralTexto"></span></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-historico-geral" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="historico_geral" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <script src="js/jquery.js" type="text/javascript"></script>
    <script src="js/bootstrap.js" type="text/javascript"></script>
    <script src="js/highchart/highcharts.js"></script>
    <script src="js/highchart/highcharts-more.js"></script>
    <script src="js/highchart/heatmap.js"></script>
    <script src="js/highchart/series-label.js"></script>
    <script src="js/highchart/exporting.js"></script>
    <script src="js/highchart/data.js"></script>
    <script src="js/highchart/boost-canvas.js"></script>
    <script src="js/highchart/jquery-ui.js"></script>
    <script src="js/scripts/funcoes.js"></script>
    <script src="js/scripts/historico.js"></script>
	<script src="js/scripts/historico-geral.js"></script>
	<script src="js/scripts/calendar-view.js"></script>
    <script src="js/scripts/heatmap-large.js"></script>
	<script src="js/scripts/dados-meteriologicos.js"></script>
    <script src="js/scripts/heatmap-color.js"></script>
    <script src="js/scripts/panel-full.js"></script>
    <script src="js/scripts/config.js"></script>
    <script src="js/scripts/horas.js"></script>
    <script src="js/scripts/dias.js"></script>
    <script src="js/scripts/graficos.js"></script>
    <script src="js/scripts/boxplot.js"></script>
    <script src="js/scripts/dialogs.js"></script>
	<script src="js/scripts/dialogs-correlation.js"></script>
  </body>
</html>