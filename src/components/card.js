// ---------------------- import ---------------------

import { likeCard, disLikeCard } from "./api";

// ---------------------- export ---------------------
export { createCard, controlLikeCard };

// Мой Id чтобы не потерять
//'60e7261cd2fd63e1c3f2033b'

//-------------------------- Функция создания карточки -------------------------

function createCard(cardInfo, deleteFunction, likeFunction, openPopup, myId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const compareID = cardInfo.likes.find((element) => element["_id"] === myId);

  // Каждому элементу присваиваем свой id
  cardElement.id = cardInfo["_id"];

  cardImage.src = cardInfo.link;
  cardTitle.textContent = cardInfo.name;
  cardImage.alt = `На изображении ${cardInfo.name}`;
  cardLikeCount.textContent = cardInfo.likes.length;

  cardImage.addEventListener("click", openPopup);

  // Если карточка не моя, кнопка удаления не отображается
  if (cardInfo.owner["_id"] != myId) {
    cardDeleteButton.style.display = "none";
  } else {
    //	Иначе вешаем слушатель на кнопку
    cardDeleteButton.addEventListener("click", () => {
      deleteFunction(cardElement.id);
    });
  }

  if (compareID) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeFunction(cardLikeButton, cardLikeCount, cardElement.id);
  });

  return cardElement;
}

// Функция управления like/dislike/count карточки
function controlLikeCard(likeButton, likeCountElement, cardId) {
  // Пыроверяем стоит лайк или нет
  if (likeButton.classList.contains("card__like-button_is-active")) {
    disLikeCard(cardId)
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = data.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    likeCard(cardId)
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = data.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
