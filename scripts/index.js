import {getToken, sendCard, deleteCard, getCards, getCard, editCard} from './functions/send-request.js';
import {Modal, ModalLogin} from './classes/modal.js';
import {renderCards } from './cards.js';

// тут будуть глобальні змінні
const API = 'https://ajax.test-danit.com/api/v2/cards';


// змінні щоб їх було видно для всіх функцій нижче Типу глобальні змінні, але ще в процесі тестування і можливо їх не буде в фінальному білді
let entryModal; // обєкт з вікном входу
let keyToken; // сюди записується токен  Наступні функції запиту на сервер (для отримання карток чи ін) слід викликати з перевіркою if(keyToken)






// Загальний обробник подій
// Вішаємо один обробник кліків, який просто перевіряє event.targer і залежно від цього виконує потрібні функції
document.addEventListener('click', async (e) => {
    if (e.target.id === 'entry-btn') {              // якщо нажати кнопку входу
        entryModal = new ModalLogin();
        entryModal.render();
        console.log(entryModal);
    } else if (e.target.id === 'login-btn') {       //якщо нажати кнопку на формі відправки логіна та пароля
        e.preventDefault();
        let login = document.querySelector('#inputEmail').value;
        let password = document.querySelector('#inputPassword').value;
        // проста валідація введених даних
        if(login && login.includes('@') && password) {
            // якщо дані пройшли валідацію, запит на сервер для отримання токена
            await getToken(API, login, password)
            .then(token => {
                    keyToken = token;
                    renderCards()
                })
                .catch(e => console.log(e.message))     // тут буде обробка помилки
                .finally(() => {entryModal.close()});   // закриваємо модальне вікно після відправки даних
                
            } else {                       // якщо введено не коректні дані, можна буде потім виводити це повідомлення в межах модального вікна
            console.log('Wrong values!');
        }
        if(keyToken) {
            document.querySelector('#entry-btn').classList.add('invisible');
            document.querySelector('#visit-btn').classList.remove('hidden');
        }

        
        // тут потім треба додати заміну кнопки входу на кнопку створення нової каркти
    }


})
export {keyToken}
// Залишив старий код з функціями щоб можна було підглядати в разі потреби

/*
змінні для тестування роботи функцій
let testKey;
let cardId; 

Тестова асинхронна функція для перевірки 
const authorize = async () => {
    // авторизація, запис токена у глобальну змінну testKey
    // await getToken(API, '20059997@i.ua', '333').then(token => testKey = token);
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

*/