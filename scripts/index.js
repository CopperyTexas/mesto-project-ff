// @todo: Темплейт карточки

const cardInformation = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки

function deleteList(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

// @todo: Функция создания карточки

function addLink({ name, link }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteList);
  return cardList.append(cardElement);
}

// @todo: Вывести карточки на страницу

function addCard() {
  cardInformation.forEach(addLink);
}
addCard();
