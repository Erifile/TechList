const inputNumber = document.querySelector("#age");
const inputRules = document.querySelector("#rules");
const discountStatus = document.querySelector(".discount");
const deliveryStatus = document.querySelector(".delivery");
const inputSubmit = document.querySelector(".submit");
const startBtn = document.querySelector(".startBtn");

let total = 3040;
delivery = 400;
let quantity = 4;

registered = true;
premium = false;
isActive = true;
isBlocked = false;
formErrors = false;
isRegistered = true;

role = 'student';
age = 18;
isFinished = false;

checkDiscount();
checkDelivery();
checkSend();
checkStudent();



function checkDiscount()
{
    if (total >= 3000 && quantity >= 4 && registered)
        {
            discount = total * 0.15;
            total = total - discount;
            discountStatus.textContent = "Ваша скидка: " + discount; 
        }
    else
        {
            discountStatus.textContent = "Нет соответствия условиям скидки :(";
        }
}
function checkDelivery()
{
    if (total >= 5000 || premium)
        {
            deliveryStatus.textContent = "Доставка бесплатна!";
        }
    else
        {
            deliveryStatus.textContent = "Стоимость доставки: " + delivery;
        }
}
function checkSend()
{
    if (isActive && !isBlocked && !formErrors)
        {
            inputSubmit.disabled = false;
        }
    else inputSubmit.disabled = true;
}
function checkStudent()
{
    if (age >= 16 && isRegistered && !isFinished && role == 'student')
        {
            startBtn.disabled = false;
        }
    else
        {
            startBtn.disabled = true;
        }
}