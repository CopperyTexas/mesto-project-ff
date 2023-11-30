// //------------------------------ Imports --------------------------------
import "./index.css";
import { createCard, controlLikeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalClickOut,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  addNewCard,
  deleteCards,
  getProfileInfo,
  updateProfileInfo,
  updateAvatar,
} from "./components/api.js";

//---------------------------- Const --------------------------------
const cardList = document.querySelector(".places__list");
// Popups
const popupImageCard = document.querySelector(".popup_type_image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupEditProfile = document.querySelector(".popup_type_edit");
const imageCard = popupImageCard.querySelector(".popup__image");
const captionCard = popupImageCard.querySelector(".popup__caption");
// Forms
const popupEditForm = document.forms["edit-profile"];
const popupAvatarEditForm = document.forms["edit-avatar"];
const popupNewCardForm = document.forms["new-place"];
const popupDeleteCardForm = document.forms["delete-card"];
// Elements forms
const avatarFormInput = popupAvatarEditForm.elements.url;
const cardFormNameInput = popupNewCardForm.elements["place-name"];
const cardFormLinkInput = popupNewCardForm.elements.link;
// Buttons
const addCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__image-edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const cardFormSubmitButton = popupNewCardForm.querySelector(".popup__button");
const editFormSubmitButton = popupEditForm.querySelector(".popup__button");
const avatarFormSubmitButton = popupAvatarEditForm.querySelector(
  ".popup__button"
);
const cardDeleteFormButton = popupDeleteCardForm.querySelector(
  ".popup__button"
);
const buttonsClosePopup = document.querySelectorAll(".popup__close");
// Profile
const profileAvatar = document.querySelector(".profile__image");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");
// Id
let myId = "";
// Validation
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//--------------------------- Функции для работы с карточками -------------------------

// Функция добавления карточки в список
function renderCard(info, list) {
  list.append(
    createCard(info, deleteFunction, controlLikeCard, openImagePopup, myId)
  );
}

// Функция добавления новой карточки
function downloadNewCard(evt) {
  // Отменяем поведение браузера по умолчанию
  evt.preventDefault();
  // Меняем состояние кнопки
  cardFormSubmitButton.textContent = "Сохранение ... ";
  // Создаем новую карточку с введеными данными от пользователя
  const newCardData = {
    name: cardFormNameInput.value,
    link: cardFormLinkInput.value,
  };
  // Добавляем новую карточку
  addNewCard(newCardData.name, newCardData.link)
    .then((info) => {
      cardList.prepend(
        createCard(info, deleteFunction, controlLikeCard, openImagePopup, myId)
      );
      // Закрываем окно после добавления
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // Возвращаем состояние кнопки
      cardFormSubmitButton.textContent = "Сохранить";
    });
}
// Вешаем слушатель на форму
popupNewCardForm.addEventListener("submit", downloadNewCard);

// Функция удаления карточки
function removeCard(evt) {
  // Отменяем поведение браузера по умолчанию
  evt.preventDefault();

  const getIdCard = cardDeleteFormButton.dataset.id;
  // Удаляем карточку
  deleteCards(getIdCard)
    .then(() => {
      const deleteCard = document.querySelector(`[id='${getIdCard}']`);
      deleteCard.remove();
      // Закрываем окно после удаления
      closeModal(popupDeleteCard);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Вешаем слушатель на форму
popupDeleteCardForm.addEventListener("submit", removeCard);

//------------------------------ Функции работы с профилем пользователя --------------------

// Функция обновления данных пользователя
function updateFormProfile(evt) {
  // Отменяем поведение браузера по умолчанию
  evt.preventDefault();
  // Меняем состояние кнопки
  editFormSubmitButton.textContent = "Сохранение ... ";
  // Отправляем новые данные о пользователе на сервер
  updateProfileInfo(
    popupEditForm.elements.name.value,
    popupEditForm.elements.description.value
  )
    .then((info) => {
      nameInput.textContent = info.name;
      jobInput.textContent = info.about;
      // Закрываем окно после удаления
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // Возвращаем состояние кнопки
      editFormSubmitButton.textContent = "Сохранить";
    });
}
// Вешаем слушатель на форму
popupEditForm.addEventListener("submit", updateFormProfile);

// Функция обновления автара пользователя
function updateFormAvatar(evt) {
  // Отменяем поведение браузера по умолчанию
  evt.preventDefault();
  // Меняем состояние кнопки
  avatarFormSubmitButton.textContent = "Сохранение ... ";
  // Заменяем аватар пользователя
  updateAvatar(avatarFormInput.value)
    .then((info) => {
      profileAvatar.style.backgroundImage = `url('${info.avatar}')`;
      // Закрываем окно после удаления
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // Возвращаем состояние кнопки
      avatarFormSubmitButton.textContent = "Сохранить";
    });
}
// Вешаем слушатель на форму
popupAvatarEditForm.addEventListener("submit", updateFormAvatar);

Promise.all([getProfileInfo(), getInitialCards()]).then(() => {
  // Функция загрузки данных профиля на страницу с сервера
  getProfileInfo()
    .then((info) => {
      myId = info["_id"];
      nameInput.textContent = info.name;
      jobInput.textContent = info.about;
      profileAvatar.style.backgroundImage = `url('${info.avatar}')`;
    })
    .catch((error) => {
      console.log(error);
    });

  // Функция загрузки списка карточек
  getInitialCards()
    .then((info) => {
      // Вывод карточек с сервера на страницу
      info.forEach((el) => {
        renderCard(el, cardList);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//--------------------------- Открытие Popup -------------------------

// Открытие popup профиля по кнопке
avatarEditButton.addEventListener("click", () => {
  popupAvatarEditForm.reset();

  //очистка ошибок валидации
  clearValidation(popupAvatarEditForm, validationConfig);

  openModal(popupEditAvatar);
});

// Открытие popup профиля по кнопке
editProfileButton.addEventListener("click", () => {
  // Заполнили popup данными
  fillInEditProfilePopupInputs(
    popupEditForm,
    nameInput.textContent,
    jobInput.textContent
  );
  // Сбрасываем ошибки валидации
  clearValidation(popupEditForm, validationConfig);
  // Только потом открыли popup
  openModal(popupEditProfile);
});

// Заполнение popup профиля уже имеющимися данными
const fillInEditProfilePopupInputs = function (form, inputName, inputJob) {
  form.elements.name.value = inputName;
  form.elements.description.value = inputJob;
};

// Открытие popup дополнения новой карточки
addCardButton.addEventListener("click", () => {
  // Сброс ранее вводимых данных формы добавления карточки
  popupNewCardForm.reset();
  // Сбрасываем ошибки валидации
  clearValidation(popupNewCardForm, validationConfig);
  // Только потом открываем popup
  openModal(popupNewCard);
});

// Функция открытия popup карточки
function openImagePopup(imageUrl, imageAlt) {
  imageCard.src = imageUrl;
  captionCard.textContent = imageAlt.slice(15); // Используем slice() для того чтобы убрать "На изображении"
  imageCard.alt = imageAlt;
  openModal(popupImageCard);
}

// Функция удаления карточки по id
function deleteFunction(id) {
  // Присваиваем popup id удаляемой карточки
  cardDeleteFormButton.dataset.id = id;
  // Только потом открываем popup
  openModal(popupDeleteCard);
}

//--------------------------------- Закрытие popup различными способами ------------------
// ----------- Закрытие любого окна по крестику
// Функция закрытия окна
function closePopupWindow(evt) {
  // Ищем и закрываем родителя по селектору
  const windowPopup = evt.target.closest(".popup");
  closeModal(windowPopup);
}
// Закрываем нажатием на крестик
buttonsClosePopup.forEach((element) => {
  element.addEventListener("click", closePopupWindow);
});

// Закрытие окна новой карточки, профиля, открытой карточки, по клику оверлей
popupNewCard.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
popupEditProfile.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
popupImageCard.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
popupDeleteCard.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
//----------------------------------- Включаем валидацию ---------------------------ы
enableValidation(validationConfig);
