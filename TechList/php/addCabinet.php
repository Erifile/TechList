<?php session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit();
}

require_once '../database/dbconnect.php';


$cabinet_number = trim($_POST['cabinet_number']);
$responsible_id = $_POST['responsible_employee']; // обр. к селекту. хранит value выбранного option (id ответственного)


// if (mb_strlen($title) < 8)
//     {
//         $_SESSION['adminMessage'] = 'Ошибка. Название мастер-класса должно быть не менее 8 букв.';
//         header("Location:../adminPanel.php?stat=error");
//         exit();
//     }

$inputs = 
[
    'cabinet_number'
];


foreach ($inputs as $input) 
{
    if (!isset($_POST[$input]) || $_POST[$input] == '')
        {
            $_SESSION['adminMessage'] = 'Ошибка. Есть пустые поля формы.';
            header("Location:../adminPanel.php?stat=error");
            exit();
        }
};




$cabinetStmt = $conn->prepare("INSERT INTO cabinets
(cabinet_number, responsible_employee)
VALUES (:cabinet_number, :responsible_employee)");

$cabinetStmt = $cabinetStmt->execute(
    [
        ':cabinet_number' => $cabinet_number,
        ':responsible_employee' => $responsible_id
    ]);

// послед. отправленное id (текущий мастер-класс)
// $masterClId = $conn->lastInsertId();
// var_dump($masterClId);
//$date = null;
// $datesSql = "INSERT INTO dates (masterclass_id, date) VALUES (:masterClId, :date)";
// $datesStmt = $conn->prepare($datesSql);
// foreach ($dates as $date) { 
//     // $datesStmt = $conn->prepare($datesSql);
//     $datesStmt->execute(
//         [
//             ':masterClId' => $masterClId,
//             ':date' => $date
//         ]);
// }

$_SESSION['adminMessage'] = 'Кабинет "'.$cabinet_number.'" добавлен.';
header("Location:../adminPanel.php");
exit();