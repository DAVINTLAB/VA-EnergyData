<?php
$ano = 2017;
echo"[<br>";
for($a=1;$a<=12;$a++){ // meses
	for($j=1;$j<=31;$j++){ // dias
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
				echo "[\"". $ano ."-" . $mes . "-" . $dia . "\"," . $hora  . ",[" . rand(0,100) . "," . rand(0,100) . "," . rand(0,100) ."]],<br>";
			}
		}
	}
}
echo"]";
?>