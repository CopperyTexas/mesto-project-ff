export {
	createCard,
	likeCard,
	deleteCard
};
// Функция создания карточки
function createCard(cardInfo, deleteCard, likeCard, openPopup) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	cardImage.src = cardInfo.link;
	cardTitle.textContent = cardInfo.name;
	cardImage.alt = `На изображении ${
		cardInfo.name
	}`;
	cardDeleteButton.addEventListener('click', deleteCard);
	cardLikeButton.addEventListener('click', likeCard);
	cardImage.addEventListener('click', openPopup);
	return cardElement;
}
// Функция like карточки
function likeCard(evt) {
	evt.target.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
function deleteCard(event) {
	const listItem = event.target.closest(".places__item");
	listItem.remove();
}
