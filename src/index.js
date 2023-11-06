//------------------------------ Imports --------------------------------
import "./index.css";
import { initialCards } from "./components/cards.js";
import { createCard,likeCard, deleteCard} from "./components/card.js";
import {openModal,closeModal,closeModalClickOut} from "./components/modal.js";

// ----------------------------- Const ----------------------------------

const popupEdit = document.querySelector('.popup_type_edit');
const cardList = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelectorAll('.popup__close');

const popupEditForm = document.forms['edit-profile'];
const popupNewCardForm = document.forms['new-place'];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageCard = document.querySelector('.popup_type_image');
const imageCard = popupImageCard.querySelector('.popup__image');
const captionCard = popupImageCard.querySelector('.popup__caption');

//-------------------- Функции для работы с карточками ---------------------

// Функция добавления карточки в список
function renderCard(info, list){
    list.prepend(createCard(info, deleteCard ,likeCard, openPopup));
}

// Функция добавления новой карточки
function addNewCard(evt){
    // Отменяем поведение браузера по умолчанию
      evt.preventDefault();
    // Создаем новую карточку с введеными данными от пользователя
      const newCardInfo = {
        name: popupNewCardForm.elements['place-name'].value,
        link: popupNewCardForm.elements.link.value,
      };
    // Добавляем карточку в список
      renderCard(newCardInfo, cardList);
    // Закрываем окно после добавления
      closeModal(popupNewCard);
    }
    // Сохраняем данные в новой карточке 
    popupNewCardForm.addEventListener('submit', addNewCard);

// Команда показа списка карточек
initialCards.forEach((el) =>{
	renderCard(el, cardList)
});

//----------------------------- Открытие popup --------------------------------------

// Открытие popup профиля по кнопке
editProfileButton.addEventListener("click", () => {
    // Заполнили popup данными
    popupCompleteEdit(popupEditForm, nameInput.textContent, jobInput.textContent);
    // Только потом открыли popup
    openModal(popupEdit);
   });

// Заполнение popup профиля уже имеющимися данными
 const popupCompleteEdit = function (form, inputName, inputJob) {
     form.elements.name.value = inputName;
     form.elements.description.value = inputJob;
   };

// Функция сохранения введенных данных
 function handleFormSubmit(evt) {
    // Отменяем поведение браузера по умолчанию
     evt.preventDefault();
    // Вводим данные от пользователя
     nameInput.textContent = popupEditForm.name.value;
     jobInput.textContent = popupEditForm.description.value;
    // Закрываем окно после добавления
     closeModal(popupEdit);
      }

 // Сохранение данных профиля
 popupEditForm.addEventListener("submit", handleFormSubmit);

// Открытие popup дополнения новой карточки
addCardButton.addEventListener('click', () => {
    // Сброс ранее вводимых данных формы добавления карточки
    popupNewCardForm.reset();
    // Только потом открываем popup
    openModal(popupNewCard); 
});

// Функция открытия popup карточки
function openPopup(evt){
  imageCard.src = evt.target.src;
  captionCard.textContent = evt.target.alt.slice(15);// Используем slice() для того чтобы убрать "На изображении"
  imageCard.alt = evt.target.alt;
  openModal(popupImageCard);
}

//----------------------------- Закрытие popup различными способами ----------------------

// ----------- Закрытие любого окна по крестику
// Функция закрытия окна
function closePopupWindow(evt){
    // Ищем и закрываем родителя по селектору
    const windowPopup = evt.target.closest('.popup');
    closeModal(windowPopup);
}
// Закрываем нажатием на крестик
popupClose.forEach((element)=> {
    element.addEventListener('click', closePopupWindow);
});

// Закрытие окна новой карточки, профиля, открытой карточки, по клику оверлей
popupNewCard.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
popupEdit.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});
popupImageCard.addEventListener("click", (evt) => {
  closeModalClickOut(evt);
});