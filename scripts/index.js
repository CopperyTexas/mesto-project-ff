// @todo: Темплейт карточки

const cardsInformation = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки

function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

// @todo: Функция создания карточки

function createCard({ name, link }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector('.card__image').alt = `На изображении ${name} `;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}
function addCard(el){
  cardList.append(createCard(el, deleteCard));
};

// @todo: Вывести карточки на страницу

function renderInitialCards() {
  cardsInformation.forEach(addCard);
}
renderInitialCards();
