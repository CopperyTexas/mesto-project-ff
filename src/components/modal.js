// Функция открытия popup
const openModal = function(element) {
	// Задаем плавную анимацию открытия окна
	element.classList.add("popup_is-animated");
	setTimeout(() =>{
		element.classList.add('popup_is-opened');
		element.classList.add("popup_is-animated");
	},
	0);
	// по Esc можно выйти из popup
	document.addEventListener("keydown", closeModalKeyEsc);
};
// Функции закрытия popup
const closeModal = function(element) {
	element.classList.remove("popup_is-opened");
	document.addEventListener("keydown", closeModalKeyEsc);
};
// Функция закрытия popup по клику в оверлей
const closeModalClickOut = function(evt) {
	if (evt.target === evt.currentTarget) {
		closeModal(evt.currentTarget);
	}
};
// Функция закрытия popup по клику Esc
const closeModalKeyEsc = function(evt) {
	const thisModal = document.querySelector(".popup_is-opened");
	if (evt.key === "Escape") {
		closeModal(thisModal);
	}
};

export {
	openModal,
	closeModal,
	closeModalClickOut
};