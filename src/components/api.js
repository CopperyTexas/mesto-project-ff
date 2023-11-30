//---------------------------------- Export ---------------------------

export {
  config,
  getInitialCards,
  addNewCard,
  deleteCards,
  likeCard,
  disLikeCard,
  getProfileInfo,
  updateProfileInfo,
  updateAvatar
};

//------------------------- Конфигурация обращения к api ---------------

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
        authorization: 'e40710ec-0de7-474b-aed9-eee34fca63e9',
        'Content-Type': 'application/json'
    }
}

//------------------------- Функции работы с карточками -----------------

//------------------------- Функция ответа сервера ----------------------

const responseFunction = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//---------------------- Загрузка карточек с сервера --------------------

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(responseFunction)
}
  
 //-------------------- Добавление новой карточки -----------------------

const addNewCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',  
      headers: config.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(responseFunction)
  
}
  
//-------------------- Добавление like карточке ------------------------

const likeCard = (cardId) => {
      return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',  
        headers: config.headers,
      })
      .then(responseFunction)
    
}
    
//---------------------- Dislike карточки ------------------------------

const disLikeCard = (cardId) => {
    
      return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',  
        headers: config.headers,
      })
      .then(responseFunction)
    
}

//---------------------- Удаление карточки -----------------------------

const deleteCards = (cardId) => {
  
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: config.headers,
    })
    .then(responseFunction)
  
}
  

//---------------- Функции работы с профилем пользователя ----------------

//----------------- Получение данных профиля с сервера ------------------

const getProfileInfo = () => {
  
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(responseFunction)
  
}
  
//---------------------- Редактирование профиля ------------------------

const updateProfileInfo = (profileName, profileJob) => {
    
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    })
    .then(responseFunction)
  
}
  
//--------------------- Обновление аватарки профиля -------------------

const updateAvatar = (avatarUrl) => {
  
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',  
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then(responseFunction)
  
}