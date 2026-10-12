<?php 
session_start();


?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechList | Регистрация</title>
    <link rel="stylesheet" href="css/regStyle.css">
    <link rel="stylesheet" href="css/colors.css">
    <script src="js/regForm.js" defer></script>
</head>
<body>



    <div id="Wrap">

        <div id="title">
            <h1>TechList</h1>
            <h2>Регистрация</h2>
        </div>

        <form action="php/reg.php" method="POST" id="form">

            <div class="inputs">

            <label for="login">Логин</label>
            <input type="text" required name="login" id="login" placeholder="Создайте логин..">

            <label for="password">Пароль</label>
            <input type="password"  class="password" required name="password" id="password" placeholder="Создайте пароль..">

            <label for="repPassword" >Повторный пароль</label>
            <input type="password"  class="password" required name="repPassword" id="repPassword" placeholder="Введите пароль повторно..">

            <p id="message"></p>

            <label for="fio">ФИО</label>
            <input type="text" required name="fio" id="fio" placeholder="Ваше ФИО..">

            <label for="email">Почта</label>
            <input type="email" required name="email" id="email" placeholder="Введите почту..">

            <label for="phone">Телефон</label>
            <input type="phone" required name="phone" id="phone" placeholder="Введите телефон..">

            <?php if(isset($_SESSION['message'])): ?>
            <p class="sessionMsg"> <?php echo $_SESSION['message']; ?></p>
            <?php unset($_SESSION['message']);
            endif; ?>

            <label for="accept">Согласен на обработку персональных данных</label>
            <input type="checkbox" required name="accept" id="accept">

            
            <input type="submit" value="Зарегистрироваться" id="submit">

            </div>

            <a href="login.php">Есть аккаунт?</a>

        </form>
    </div>
</body>
</html>