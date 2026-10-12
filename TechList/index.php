<?php session_start();?>

<?php if(!isset($_SESSION['user'])):
        header('Location:login.php');
        exit();
        endif;?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechList | Главная</title>
    <link rel="stylesheet" href="css/indexstyle.css">
    <link rel="stylesheet" href="css/colors.css">
</head>
<body>

<?php if(isset($_SESSION['message'])): ?>
            <p class="sessionMsg"> <?php echo $_SESSION['message']; ?></p>
            <?php unset($_SESSION['message']);
            endif; ?>

    <header>
        <p>Главная страница</p>
    </header>
    
</body>
</html>