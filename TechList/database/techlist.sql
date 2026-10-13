-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 13 2026 г., 12:19
-- Версия сервера: 8.0.30
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `techlist`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cabinets`
--

CREATE TABLE `cabinets` (
  `id` int NOT NULL,
  `cabinet_number` int NOT NULL,
  `responsible_employee` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cabinets`
--

INSERT INTO `cabinets` (`id`, `cabinet_number`, `responsible_employee`) VALUES
(1, 12, 1),
(2, 123, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(255) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `fio` varchar(255) CHARACTER SET latin1 NOT NULL,
  `phone` int NOT NULL,
  `role` enum('user','admin') CHARACTER SET latin1 NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `fio`, `phone`, `role`) VALUES
(1, '123', '$2y$12$P2eJ1wRvRNndFV.JHhApC.o2EWZoobQaCCqX6PvAbkZQE5YSnCvLa', '111@gmail.com', '123', 123123123, 'admin'),
(2, '1232', '$2y$10$pvczGTRSbns2AkWMZAIRH.5ZuU2MUG6fjQ0lvlUf01MCSAKNlNlzy', 'yamyyamy228@gmail.com', 'ivanov ivan ivanich', 1233212, 'user');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cabinets`
--
ALTER TABLE `cabinets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cabinet_number` (`cabinet_number`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cabinets`
--
ALTER TABLE `cabinets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
