const inputQuantity = document.querySelector("#quantity");
const inputStorage = document.querySelector("#storage");
const locations = document.querySelector(".locations");
const addLocationBtn = document.querySelector(".addLocation");
const removeLocationBtn = document.querySelector(".removeLocation");
const divErrors = document.querySelector(".errors");
const hardwareForm = document.querySelector("#addHardware");

let totalLocated = 0;
locCount = 0;
let errorTimeout;

removeLocationBtn.disabled = true;


// добавить окно-предупреждение при попытке удалить кабинет для распределения,
// где уже введен текст
// добавить проверку математики в полях ввода кол-ва техники для кабинетов.
// после каждого change eventListener проверяет, не больше ли сумма в инпутах
// чем изначальное число. если да - выводить divErrors.

hardwareForm.addEventListener('submit', (e) =>
    {
        e.preventDefault();
    })
inputQuantity.addEventListener('change', (e) => 
    {
        e.preventDefault();
        let quantity = Number(inputQuantity.value);
        if (quantity > 0)
            {
                locations.style.display = "flex";
            }
        if (quantity == 0 || quantity == null)
            {
                locations.style.display = "none";
            }
    })


inputStorage.addEventListener('change', (e) => 
    {
        let storageQuantity = Number(inputStorage.value); // обожаю свою жизнь
        let quantity = Number(inputQuantity.value);
        if (storageQuantity == quantity)
            {
               locationDivs.forEach(div => {
                div.remove();
                locCount = 0;
            })
            }
        if (storageQuantity < quantity)
            {
                addLocationBtn.disabled = false;
                removeLocationBtn.disabled = true;
            }
        if (storageQuantity > quantity)
            {
            locationDivs.forEach(div => {
                div.remove();
                locCount = 0;
            });
                divErrors.textContent = "Ошибка. Количество техники на склад больше изначального"
                displayError();
            }
    })

addLocationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    locCount++;
    if (locCount > 0) removeLocationBtn.disabled = false;

    // 1. Создаем главный контейнер для новой локации
    const newLocationDiv = document.createElement('div');
    newLocationDiv.className = `location-${locCount} location`;

    // 2. Создаем Label
    const label = document.createElement('label');
    label.setAttribute('for', `location-${locCount}`);
    label.textContent = `Кабинет ${locCount}:`;

    // 3. инпут для номера кабинета
    const roomInput = document.createElement('input');
    roomInput.type = 'number';
    roomInput.name = `location-${locCount}`;
    roomInput.id = `location-${locCount}`;
    roomInput.required = true;
    roomInput.placeholder = `Номер кабинета ${locCount}`;

    // 4. Иннпут для количества
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.name = `quantity-${locCount}`;
    qtyInput.classList.add("qtyInput");
    qtyInput.required = true;
    qtyInput.placeholder = `Кол-во в кабинет ${locCount}..`;

    // 5. НАВЕШИВАЕМ ИВЕНТЛИСТЕНЕРЫ на нужные элементы
    // Пример для инпута количества (сработает сразу при вводе цифр)
    qtyInput.addEventListener('input', (event) => {
        let quantity = Number(inputQuantity.value);
        console.log("Общее кол-во:" + quantity)
        let locQuantity = Number(qtyInput.value);
        console.log("В текущий кабинет: " + locQuantity);

        let qtyInputs = document.querySelectorAll(".qtyInput");
        qtyInputs.forEach(input => {

            calculateLocated();

            
        });
    });

    // 6. Собираем структуру вместе и добавляем на страницу
    newLocationDiv.append(label, roomInput, qtyInput);
    locations.appendChild(newLocationDiv);
});

removeLocationBtn.addEventListener('click', (e) =>
    {
        e.preventDefault();
        locCount--;
        if (locCount == 0) removeLocationBtn.disabled = true;

        // Находим последний кабинет и удаляем
        const allLocations = locations.querySelectorAll(".location");
        const lastLocation = allLocations[allLocations.length - 1];
        lastLocation.remove();
    })





function timerError()
{
  clearTimeout(errorTimeout);
  errorTimeout = setTimeout(() =>
    {
      divErrors.style.display = "none";
      divErrors.classList.remove("show");
    }, 2000);
}
function displayError()
{
  divErrors.style.display = "flex";
  divErrors.classList.add("show");
  timerError();
}
function quantityError()
{
    let locationDivs = document.querySelectorAll(".location");
    
    addLocationBtn.disabled = true;
    removeLocationBtn.disabled = true;
}
function calculateLocated()
{
    totalLocated = 0;
    
    let qtyInputs = document.querySelectorAll(".qtyInput");
    qtyInputs.forEach(input => {
        totalLocated = totalLocated + Number(input.value);
    });
    console.log("Распределено по кабинетам:" + totalLocated);

    if (Number(totalLocated) > Number(inputQuantity.value))
    {
        quantityError();
        divErrors.textContent = "Ошибка. Кол-во распределённой техники по помещениям больше общего.";
        displayError();
        inputQuantity.style.border = "5px solid red";
        
    }
    if (Number(totalLocated) < Number(inputQuantity.value))
    {
        divErrors.style.display = "none";
        divErrors.classList.remove("show");
        addLocationBtn.disabled = false;
        removeLocationBtn.disabled = false;
        inputQuantity.style.border = "none";
    }
}