<?php
$ano = 2017;
echo"[<br>";

$contadorDia = 0;
$valorMaximo = 52311744;

for($a=1;$a<=12;$a++){ // meses
	for($j=1;$j<=31;$j++){ // dias
		$contadorDia++;
		for($i=0; $i<=23; $i++){ // horas
			$hora = $i;

			if ($i <= 9){
				$i = "0".$i;
			}
			
			if ($j <= 9){
				$dia = "0".$j;
			}
			else{
				$dia = $j;
			}
			
			if ($a <= 9){
				$mes = "0".$a;
			}
			else{
				$mes = $a;
			}

			if(checkdate($mes, $dia, $ano)){
				echo "[\"". $ano ."-" . $mes . "-" . $dia . "\"," . $hora  . ",[" . geraDadosSuperficie($hora,$contadorDia) / $valorMaximo . "," . geraDadosSuperficie($hora,$contadorDia) / $valorMaximo. "," . geraDadosSuperficie($hora,$contadorDia) / $valorMaximo."]],<br>";
			}
		}
	}
}
echo"]";


function geraDadosSuperficie(int $x, int $y){

    $total = 5 * $x + 3 * pow($x, 2) + 1 * pow($x, 3) + $y + 6 * pow($y, 2) + pow($y, 3);
    
	return $total;
}

?>