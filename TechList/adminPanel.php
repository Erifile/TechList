<?php session_start();

if (!isset($_SESSION['user']))
	{
		header('Location:login.php');
		exit();
	}
// if ($_SERVER['REQUEST_METHOD'] !== 'POST')
//     {
//         http_response_code(405);
//         exit();
//     } 
require_once 'database/dbconnect.php';


$sqlUsers = 'SELECT * FROM users';

$users = $conn->prepare($sqlUsers);
$users->execute();


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechList | Админ-панель</title>
    <link rel="stylesheet" href="css/adminPanel.css">
    <link rel="stylesheet" href="css/colors.css">
</head>
<body>
    <header>
        <h2>Админ-панель</h2>
        <a href="index.php">На главную</a>
    </header>
    <main>
        <form action="php/addCabinet.php" method="post" id="addCabinet">
            <h3>Добавить кабинет</h3>
            <input type="number" name="cabinet_number" id="" placeholder="Номер кабинета (101, 102..)" required>
            <select name="responsible_employee" id="" required>
                <?php foreach ($users as $user): ?>
                   <option value="<?= $user['id'];?>"><?= $user['fio'];?></option>
                <?php endforeach;?>
            </select>
            <input type="submit" value="Добавить">
        </form>

        <form action="" method="post">
            <h3>Добавление новой единицы техники</h3>
            <input type="text" name="hardware_title" id="">
            <select name="" id="">
                <?php foreach ($categories as $category): ?>
                   <option value="<?= $category['id'];?>"><?= $category['title'];?></option>
                <?php endforeach;?>
            </select>
        </form>

        <form action="php/addCategory.php" method="POST">
            <h3>Добавление категории</h3>
            <label for="category">Название:</label>
            <input type="text" id="category" name="categoryName" placeholder="Название категории.." required>
            <input type="submit" value="Добавить">
        </form>

    </main>
</body>
</html>