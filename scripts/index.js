import {getToken, sendCard, deleteCard, getCards, getCard, editCard} from './functions/send-request.js';

const API = 'https://ajax.test-danit.com/api/v2/cards';



// змінні для тестування роботи функцій
let testKey;
let cardId; 

//Тестова асинхронна функція для перевірки 
const authorize = async () => {
    // авторизація, запис токена у глобальну змінну testKey
    await getToken(API, '20059997@i.ua', '333').then(token => testKey = token);
    // карток нема
    await getCards(API, testKey).then(cardsList => console.log(cardsList))
    
    // створюємо одну картку
    await sendCard(API, testKey, {
        title: 'Візит до кардіолога',
        description: 'Плановий візит',
        doctor: 'Cardiologist',
        bp: '24',
        age: 23,
        weight: 70
    }).then(card => cardId = card.id);

    // бачимо її в масиві
    await getCards(API, testKey).then(cardsList => console.log(cardsList));

    // бачимо картку по id
    await getCard(API, testKey, cardId).then(response => console.log(response));

    // редагуємо картку
    await editCard(API, testKey, cardId, {
        id: cardId,
        title: 'Візит до стоматолога',
        description: 'Позачерговий візит',
        doctor: 'Dantist',
        bp: '24',
        age: 23,
        weight: 70
      }).then(response => console.log(response));

    // перевіряємо чи змінилась картка
    await getCards(API, testKey).then(cardsList => console.log(cardsList));

    // видаляємо картку
    await deleteCard(API, testKey, cardId).then(response => console.log(response));
    
    // карток знову нема
    await getCards(API, testKey).then(cardsList => console.log(cardsList))


}

authorize();


