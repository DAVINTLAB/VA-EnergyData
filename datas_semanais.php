<?php

$semana = $_POST["semana"];
$year = $_POST["ano"];

if ($semana <= 9) {
    $semana = "0".$semana;
}

$datas = array();

for($day=1; $day<=7; $day++){
    $datas[$day] = date('Y-m-d', strtotime($year."W".$semana.$day));
}

echo json_encode($datas);


?>