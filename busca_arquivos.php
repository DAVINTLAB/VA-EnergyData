<?php
$arquivos = array();

$nome_arquivo = $_GET["nome_arquivo"];

chdir('datasets');

foreach (glob("*" . $nome_arquivo . "*.json") as $filename) {
   $arquivos[] = $filename;
}

echo json_encode($arquivos);
?>