<?php

// 1) 
 if ($_SERVER['REQUEST_METHOD'] !== 'POST')
    {
        http_response_code(405);
        exit();
    }

require_once '../database/dbconnect.php';  // подключение БД

session_start();


$inputs = 
[
    'login',  // явл просто строками для последующего их подставления в цикл foreach. 
    'password',
    'repPassword',
    'email',
    'phone',
    'fio'
];

// 2) ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ В ФОРМЕ
foreach ($inputs as $input) 
{
    if (!isset($_POST[$input]) || $_POST[$input]=='')
        {
            $errors[] = 'Ошибка. Есть пустые поля формы.';
    
        }
}
// 3) ДОП. ПРОВЕРКА НА СОВПАДЕНИЕ ПАРОЛЕЙ
if ($_POST['password'] !== $_POST['repPassword'])
    {
        $errors[] = 'Ошибка. Пароли не совпадают';
 
    }

// ПРОВЕРКА НА КОРРЕКТНОСТЬ EMAIL
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) // 1 arg - что проверяем, 2 arg - на что проверяем.
    {
        $errors[] = 'Ошибка. Некорректный email';
 
    }

// 4) УБИРАНИЕ ПРОБЕЛОВ У ВВЕДЁННЫХ ДАННЫХ
$login = trim($_POST['login']);
$password = trim($_POST['password']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$fio = $_POST['fio'];   

// 5) ПРОВЕРКА, ЗАНЯТЫ ЛИ LOGIN/EMAIL
$check = $conn->prepare("select 
exists (select 1 from users where login = :login) as login_err, exists (select 1 from users where email = :email) as email_err"); //подготавливаем: говорим sql что мы хотим выбрать
$check -> execute([':login' => $login, ':email' => $email]);

$check = $check -> fetch(PDO::FETCH_ASSOC); // в ассоциативный массив

$errors = [];

if ($check)
    {
        if ($check['login_err'])
            {
                $errors[] = 'Логин занят.';
            }
        if ($check['email_err'])
            {
                $errors[] = 'Email занят.';
            }
        // if (!empty($errors))
        //     {
        //         $_SESSION['errors'] = $errors;
        //         header("Location:../register.php?stat=error");
        //         exit();           
        //     }
      
    }




// preg_match ищет хотя бы 1 совпадение по заданному диапазону. 
// возвращает true/false //

// Проверка логина

// Проверяем длину
if (mb_strlen($login) < 3 || mb_strlen($login) > 30) {
    $errors[] = "Логин должен быть от 3 до 30 символов.";
}

// Проверяем на наличие любых других символов вне разрешенного диапазона:
// Латиница + Цифры + Спец символы (\ - экранирование) + Пробел
if (!preg_match('/^[A-Za-z0-9]+$/', $login)) {
    $errors[] = "В логине разрешены только латиница и цифры.";
}





// Проверка пароля

// Проверяем длину
if (mb_strlen($password) < 6 || mb_strlen($password) > 30) {
    $errors[] = "Пароль должен быть от 6 до 30 символов.";
}

// Проверяем на наличие любых других символов вне разрешенного диапазона:
// Латиница + Цифры + Спец символы (\ - экранирование) + Пробел
if (!preg_match('/^[A-Za-z0-9@#\$%\^&\*!_\-]+$/', $password)) {
    $errors[] = "В пароле разрешены только латиница, цифры, спец. символы";
}

// Проверяем наличие букв и цифр
if (!preg_match('/[A-Za-z]/', $password)) {
    $errors[] = "В пароле должна быть минимум одна буква.";
}

if (!preg_match('/[0-9]/', $password)) {
    $errors[] = "В пароле должна быть минимум одна цифра.";
}
//



if(!empty($errors))
    {
        $_SESSION['errors'] = $errors;
        header("Location:../register.php?stat=error");
        exit();
    }


// 6) 
$newUser = $conn -> prepare("INSERT INTO users (login, password, fio, email, phone) VALUES (:login, :password, :fio, :email, :phone)");
$newUser -> execute 
    (
    [
        ':login' => $login,
        ':password' => password_hash($password, PASSWORD_DEFAULT),
        ':fio' => $fio,
        ':email' => $email,
        ':phone' => $phone
    ]);
    $_SESSION['message'] = 'Регистрация успешна!';
    header("Location:../login.php?stat=ok");
    exit();


?>