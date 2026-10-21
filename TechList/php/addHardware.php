<?php

session_start();

require_once '../database/dbconnect.php';


// Защита от перехода к этому обработчику через Адрс. строку
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit();
}


$hardware_title = $_POST['hardware_title']; 

$stmt = $conn -> prepare("INSERT INTO hardware (title) VALUES (:hardware_title)");
$stmt -> execute
(
  [
  ":categoryName" => $categoryName
  ]
);

$_SESSION['adminMessage'] = "Категория ".$categoryName." добавлена.";
header("Location:../adminPanel.php");
exit();
