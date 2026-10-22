const inputNumber = document.querySelector("#age");
const inputRules = document.querySelector("#rules");
const discountStatus = document.querySelector(".discount");
const deliveryStatus = document.querySelector(".delivery");
const inputSubmit = document.querySelector(".submit");
const startBtn = document.querySelector(".startBtn");
const inputPassword = document.querySelector("#password");
const divErrors = document.querySelector(".errors");
let errors = [];
let total = 3040;
delivery = 400;
let quantity = 4;
let goodsCount = 10;
let cartSum = 0;
let isNum = false;
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
calculateCart();



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
function calculateCart()
{
    for (let i = 0; i <= goodsCount; i++) 
    {    
        cartSum += 250;
    }
    console.log("Сумма товаров в корзине: " + cartSum);
}

// do // полюбому выполнится 1 раз.
//     {
        // a += 1;
//     }
// while (a < 5)
//     {

//     }
// break выход из цикла

let oddsCount = 0;
let evensCount = 0;
let i = 1;
while (i != 26)
    {
        if (i % 2 == 0) evensCount++;
        if (i % 2 != 0) oddsCount++;
        i++;
    }
console.log(`Количество чётных: ${evensCount}\nКоличество нечётных: ${oddsCount}`);


for (let i = 1; i < goodsCount; i++) {

    if (i == 3 || i == 6) console.log(`Заказ №${i} отменён.`);
    if (i == 8) break;
    console.log(`Заказ №${i} обработан.`);
}


inputPassword.addEventListener("change", () =>
    {
        validatePassword();
    })

function validatePassword()
{
    errors = [];
    divErrors.textContent = "";
    isNum = false;

    if (inputPassword.value.length < 8) errors.push("Пароль должен содержать не менее 8 символов.");
    
    for (let i = 0; i < inputPassword.value.length; i++) {
        if (inputPassword.value[i] >= '0' && inputPassword.value[i] <= '9')
            {
                isNum = true;
                break;
            }
    }
    
    if (!isNum) errors.push("Пароль должен содержать хотя бы 1 цифру.");
    
    if (errors.length !== 0)
        {
            errors.forEach(err =>{ 
            let error = document.createElement("p");
            error.textContent = err;
            divErrors.append(error);
        })  
        
        }
   
    if (errors.length == 0) divErrors.textContent = "";
    
    
    
}