import {getToken, sendCard, deleteCard, getCards, getCard, editCard} from './functions/send-request.js';
import {Modal, ModalLogin, ModalAddCard} from './classes/modal.js';
import {renderCards } from './classes/cards.js';

// тут будуть глобальні змінні
const API = 'https://ajax.test-danit.com/api/v2/cards';
let visitsCollection = [];                                  // масив усіх візитів



// змінні щоб їх було видно для всіх функцій нижче Типу глобальні змінні, але ще в процесі тестування і можливо їх не буде в фінальному білді
let entryModal; // обєкт з вікном входу
let keyToken; // сюди записується токен  Наступні функції запиту на сервер (для отримання карток чи ін) слід викликати з перевіркою if(keyToken)
let newVisitModal; // обєкт з вікном створення нового візиту


// Тест елементів форми
// // шукаємо форму
// const form = document.querySelector('#newVisitForm');
// // шукаємо всі приховані блоки
// const allDoctorsBlock = form.querySelector('#forAllDoctors');
// const cardiologistBlock = form.querySelector('#forCardiologist');
// const dentistBlock = form.querySelector('#forDentist');
// const therapistBlock = form.querySelector('#forTherapist');
// const saveBtn = form.querySelector('#create-btn');
// // навішуємо обробник на форму і по вибору лікаря відкриваємо потрібні поля
// form.addEventListener('change', (e) => {
//     if(e.target === form.querySelector('#selectDoctor')) {
//         console.log(e.target.value);
//         if(e.target.value === 'cardiologist') {
//             allDoctorsBlock.classList.remove('hidden');
//             cardiologistBlock.classList.remove('hidden');
//             saveBtn.classList.remove('hidden');
//             dentistBlock.classList.add('hidden');
//             therapistBlock.classList.add('hidden');
//         } else if(e.target.value === 'dentist') {
//             allDoctorsBlock.classList.remove('hidden');
//             dentistBlock.classList.remove('hidden');
//             saveBtn.classList.remove('hidden');
//             cardiologistBlock.classList.add('hidden');
//             therapistBlock.classList.add('hidden');
//         } else if(e.target.value === 'therapist') {
//             allDoctorsBlock.classList.remove('hidden');
//             therapistBlock.classList.remove('hidden');
//             saveBtn.classList.remove('hidden');
//             cardiologistBlock.classList.add('hidden');
//             dentistBlock.classList.add('hidden');
//         }
//     }
// })

// form.addEventListener('submit', function (event) { 
//     if (!form.checkValidity()) { 
//       event.preventDefault()
//       event.stopPropagation()
//     }

//     form.classList.add('was-validated')
//   }, false)



// Загальний обробник подій
// Вішаємо один обробник кліків, який просто перевіряє event.targer і залежно від цього виконує потрібні функції
document.addEventListener('click', async (e) => {
    if (e.target.id === 'entry-btn') {              // якщо нажати кнопку входу
        entryModal = new ModalLogin();
        entryModal.render();
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
            // міняємо кнопки
            document.querySelector('#entry-btn').classList.add('invisible');
            document.querySelector('#visit-btn').classList.remove('hidden');

            // показуємо форму пошуку
            document.querySelector('#sorting-form').classList.remove('hidden');

            // тут також має бути функція отримання всіх карток
            await getCards(API, keyToken).then(cardsList => visitsCollection = cardsList);
            // і функція рендеру всіх наявних карток, яка приймає масив усіх карток і створює по класу нові картки і виводить їх на екран
            // щось типу такого visitsRender(visitsCollection)
        }

        
    } else if (e.target.id === 'visit-btn') {                // якщо натиснути кнопку виклику вікна створення нового візиту
        newVisitModal = new ModalAddCard();
        newVisitModal.render();
    } else if (e.target.id === 'create-btn') {                 // якщо натиснути кнопку створити новий візит
        e.preventDefault();
        
        // валідація форми по документації bootstrap
        const form = document.querySelector('#newVisitForm');
        if (!form.checkValidity()) {  // не впевнений що цей блок працює як треба
            e.preventDefault()
            e.stopPropagation()
            
        } 
        form.classList.add('was-validated')

        
            // блок ще в роботі)
            // тут буде функція створення нової картки і відправка на сервер
            console.log(form);

        
        
    }


})
export {keyToken, API}
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