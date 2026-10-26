const inputQuantity = document.querySelector("#quantity");
const inputStorage = document.querySelector("#storage");
const locations = document.querySelector(".locations");
const addLocationBtn = document.querySelector(".addLocation");
const removeLocationBtn = document.querySelector(".removeLocation");
const divErrors = document.querySelector(".errors");
const submitHardware = document.querySelector(".submitHardware");

const cabinetForm = document.querySelector("#addCabinet");
const categoryForm = document.querySelector("#addCategory");
const hardwareForm = document.querySelector("#addHardware");

const addCabinetBtn = document.querySelector("#addCabinetBtn");
const addCategoryBtn = document.querySelector("#addCategoryBtn");
const addHardwareBtn = document.querySelector("#addHardwareBtn");

const formsBtns = [addCabinetBtn, addCategoryBtn, addHardwareBtn];

// formsBtns.forEach(btn => {

//     btn.addEventListener('click', () =>
//         {
//         if (btn === addCabinetBtn) 
//             {
//                 // Получаем реальный display из CSS
//                 const currentDisplay = window.getComputedStyle(cabinetForm).display;
//                 if (currentDisplay === 'none') cabinetForm.style.display = 'flex';
//                 if (currentDisplay === 'flex') cabinetForm.style.display = 'none';
//             } 
        
//         if (btn === addCategoryBtn) 
//             {
//                 const currentDisplay = window.getComputedStyle(categoryForm).display;
//                 if (currentDisplay === 'none') categoryForm.style.display = 'flex';
//                 if (currentDisplay === 'flex') categoryForm.style.display = 'none';
//             } 
        
//         if (btn === addHardwareBtn) 
//             {
//                 const currentDisplay = window.getComputedStyle(hardwareForm).display;
//                 if (currentDisplay === 'none') hardwareForm.style.display = 'flex';
//                 if (currentDisplay === 'flex') hardwareForm.style.display = 'none';
//             }
//         })
    
// });


let totalLocated = 0;
locCount = 0;
let errorTimeout;

removeLocationBtn.disabled = true;


// Отключение ввода колёсиком
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('wheel', function(e) {
    e.preventDefault();
  });
});




hardwareForm.addEventListener('submit', (e) =>
    {
        e.preventDefault();
    })
inputQuantity.addEventListener('input', (e) => 
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
        calculateLocated();
    })


inputStorage.addEventListener('input', (e) => 
    {
        calculateLocated();        
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
    qtyInput.addEventListener('wheel', (e) =>
        {
            e.preventDefault();
        })

    newLocationDiv.append(label, roomInput, qtyInput);
    locations.appendChild(newLocationDiv);
});

removeLocationBtn.addEventListener('click', (e) =>
    {
        e.preventDefault();
        locCount--;
        if (locCount == 0) removeLocationBtn.disabled = true;

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
    }, 4000);
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
    let totalQuantity = Number(inputQuantity.value);
    totalLocated = 0;
    locationsLocated = 0;
    let storageLocated = Number(inputStorage.value);
    let qtyInputs = document.querySelectorAll(".qtyInput");
    qtyInputs.forEach(input => {
        locationsLocated = locationsLocated + Number(input.value);
    });
    totalLocated = locationsLocated + storageLocated;
    console.log("Распределено по кабинетам:" + locationsLocated);
    console.log("Распределено на склад:" + storageLocated);




    if (storageLocated == totalQuantity)
    {
        let locationDivs = document.querySelectorAll(".location");
        if (locationDivs.length != 0)
            {
                locationDivs.forEach(div => {
                div.remove();
                })
            }
        
        addLocationBtn.disabled = true;
        removeLocationBtn.disabled = true;
        locCount = 0;
        submitHardware.disabled = false;
        inputStorage.style.border = 'none';
    }
    if (storageLocated < totalQuantity)
    {
        addLocationBtn.disabled = false;
        let locationDivs = document.querySelectorAll(".location");
        
        if (locationDivs.length == 0) removeLocationBtn.disabled = true;
        else removeLocationBtn.disabled = false; 

        inputStorage.style.border = 'none';
        submitHardware.disabled = false;
        
    }
    if (storageLocated > totalQuantity)
    {
        divErrors.textContent = "Ошибка. Количество техники на склад больше изначального"
        displayError();
        inputStorage.style.border = '5px solid red';
        submitHardware.disabled = true;
        addLocationBtn.disabled = true;
        removeLocationBtn.disabled = true;
        return;
    }
    if (Number(totalLocated) > totalQuantity)
    {
        quantityError();
        divErrors.textContent = "Ошибка. Кол-во распределённой техники по помещениям больше общего.";
        displayError();
        inputQuantity.style.border = "5px solid red";
        return;
    }
    if (Number(totalLocated) < totalQuantity)
    {
        divErrors.style.display = "none";
        divErrors.classList.remove("show");
        addLocationBtn.disabled = false;
        removeLocationBtn.disabled = false;
        inputQuantity.style.border = "none";
    }
    
}