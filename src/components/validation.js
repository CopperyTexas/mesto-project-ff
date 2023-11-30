// ---------------------- export ---------------------

export { enableValidation, clearValidation };

// ------------------------- Функции валидации ---------------------------

//------------------------ Функция показа ошибки -------------------------

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  // Выбираем элемент ошибки на основе уникального класса
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  // Заменим содержимое span с ошибкой на переданный параметр
  inputError.textContent = errorMessage;
  // Функция добавляет класс с ошибкой
  inputElement.classList.add(inputErrorClass);
  inputError.classList.add(errorClass);
}

//----------------------- Функция скрытия ошибки ------------------------

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  // Выбираем элемент ошибки на основе уникального класса
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  // Функция удаляет класс с ошибкой
  inputElement.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  // Очистим ошибку
  inputError.textContent = "";
}

//------------------ Функция проверки валидности поля -------------------

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//-------------------------- Проверка валидности всех input ---------------------

// Функция принимает массив полей
function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

//------------------------- Блокируем кнопку отправки формы -----------------------------

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, button, inactiveButtonClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}

//------------------- Добавление обработчиков всем формам ----------------------

function enableValidation(validationConfig) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(
    document.querySelectorAll(`${validationConfig.formSelector}`)
  );
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(
      formElement,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
}

//----------------------- Добавление обработчиков всем полям формы ----------------

function setEventListeners(
  formElement,
  inputSelector,
  submitbuttonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );
  // Найдём в текущей форме кнопку отправки
  const submitButton = formElement.querySelector(submitbuttonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, submitButton, inactiveButtonClass);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, input, inputErrorClass, errorClass);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
}

//------------------ Функция очистки ошибок валидации ------------------------

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((input) => {
    hideInputError(
      formElement,
      input,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });

  submitButton.classList.add(validationConfig.inactiveButtonClass);
}
