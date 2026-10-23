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

$sqlCategories = 'SELECT * FROM categories';
$categories = $conn->prepare($sqlCategories);
$categories->execute();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechList | Админ-панель</title>
    <link rel="stylesheet" href="css/adminPanel.css">
    <link rel="stylesheet" href="css/colors.css">
    <script src="js/adminPanel.js" defer></script>
</head>
<body>

    <div class="errors"></div>

    <header>
        <h2>Админ-панель</h2>
        <a href="index.php">На главную</a>
    </header>
    <main>



        <button id="addCabinetBtn">Форма добавления кабинета</button>
        <button id="addCategoryBtn">Форма добавления категории</button>
        <button id="addHardwareBtn">Форма добавления техники</button>
        
        <form action="php/addCabinet.php" method="post" id="addCabinet">
            <h3>Добавление кабинета</h3>
            <label for="cabinet_number">Номер кабинета:</label>
            <input type="number" name="cabinet_number" id="cabinet_number" placeholder="101, 102.." required>
            <label for="responsible">Ответственное лицо:</label>
            <select name="responsible_employee" id="responsible" required>
                <?php foreach ($users as $user): ?>
                   <option value="<?= $user['id'];?>"><?= $user['fio'];?></option>
                <?php endforeach;?>
            </select>
            <input type="submit" value="Добавить">
        </form>

        <form action="" method="post" id="addHardware">
            <h3>Добавление техники</h3>
            <label for="hardware">Название:</label>
            <input type="text" name="hardware_title" id="hardware" placeholder="Процессор Intel..">
            <label for="category">Выбор категории:</label>
            <select name="category" id="category">
                <?php foreach ($categories as $category): ?>
                   <option value="<?= $category['id'];?>"><?= $category['title'];?></option>
                <?php endforeach;?>
            </select>
            <label for="quantity">Количество:</label>
            <input type="number" name="quantity" id="quantity" min="0">

            <div class="locations">
                <h4>Распределите технику:</h4>
                <label for="storage">На склад:</label>
                <input type="number" name="storage" id="storage" placeholder="Введите число..">

                <div class="locationBtns">
                    <!-- type button чтоб форма не думала о кнопке как о submit -->
                    <button type="button" class="addLocation">+</button>
                    <button type="button" class="removeLocation">-</button>
                </div>
                

            </div>
            <input type="submit" value="Добавить технику" class="submitHardware">
        </form>

        <form action="php/addCategory.php" method="POST" id="addCategory">
            <h3>Добавление категории</h3>
            <label for="category">Название:</label>
            <input type="text" id="category" name="categoryName" placeholder="Название категории.." required>
            <input type="submit" value="Добавить">
        </form>
    
    </main>
</body>
</html>