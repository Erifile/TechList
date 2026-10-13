const inputQuantity = document.querySelector("#quantity");
const inputStorage = document.querySelector("#storage");
const locations = document.querySelector(".locations");
const addLocationBtn = document.querySelector(".addLocation");
const removeLocationBtn = document.querySelector(".removeLocation");
const divErrors = document.querySelector(".errors");
const hardwareForm = document.querySelector("#addHardware");

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
                storageError();
            }
        if (storageQuantity < quantity)
            {
                addLocationBtn.disabled = false;
                removeLocationBtn.disabled = true;
            }
        if (storageQuantity > quantity)
            {
                storageError();
                divErrors.textContent = "Ошибка. Количество техники на склад больше изначального"
                displayError();
            }
    })


addLocationBtn.addEventListener('click', (e) =>
    {
        e.preventDefault();
        locCount++;
        if (locCount > 0) removeLocationBtn.disabled = false;

        const newLocation = `
            <div class="location-${locCount} location">

                <label for="location-${locCount}">Кабинет ${locCount}:</label>
                <input type="number" name="location-${locCount}" id="location-${locCount}" required placeholder="Номер кабинета ${locCount}">
                <input type="number" name="quantity-${locCount}" required placeholder="Кол-во в кабинет ${locCount}.."> 
                
            </div>
            `
        locations.insertAdjacentHTML('beforeend', newLocation);
    })
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
function storageError()
{
    let locationDivs = document.querySelectorAll(".location");
    locationDivs.forEach(div => {
        div.remove();
        locCount = 0;
    });
    addLocationBtn.disabled = true;
    removeLocationBtn.disabled = true;
}