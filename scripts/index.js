import {getToken, sendCard, deleteCard, getCards, getCard, editCard} from './functions/send-request.js';
import {Modal, ModalLogin, ModalAddCard, ModalEditCard} from './classes/modal.js';
import {renderCards, Visit, VisitCardiologist, noItems, renderNewCard } from './classes/cards.js';
import formToObj from './functions/form-to-obj.js';


// тут будуть глобальні змінні
const API = 'https://ajax.test-danit.com/api/v2/cards';
let visitsCollection = [];    // масив усіх візитів



// змінні щоб їх було видно для всіх функцій нижче Типу глобальні змінні, але ще в процесі тестування і можливо їх не буде в фінальному білді
let entryModal; // обєкт з вікном входу
let keyToken; // сюди записується токен  Наступні функції запиту на сервер (для отримання карток чи ін) слід викликати з перевіркою if(keyToken)
let newVisitModal; // обєкт з вікном створення нового візиту
let editVisitModal; // обєкт з вікном редагування візиту



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
        if(login.includes('@') && password) {
            // якщо дані пройшли валідацію, запит на сервер для отримання токена
            await getToken(API, login, password)
            .then(token => {
                    keyToken = token;
                    
                })
                .catch(e => console.log(e.message))     // тут буде обробка помилки
                .finally(() => {entryModal.close()});   // закриваємо модальне вікно після відправки даних
                
            } else {                       // якщо введено не коректні дані, можна буде потім виводити це повідомлення в межах модального вікна
            console.log('Wrong values!');
        }
        if(typeof keyToken === 'string') {  // поправив перевірку, бо попередня не працювала
            // міняємо кнопки
            document.querySelector('#entry-btn').classList.add('invisible');
            document.querySelector('#visit-btn').classList.remove('hidden');

            // показуємо форму пошуку
            document.querySelector('#sorting-form').classList.remove('hidden');

            // отримання всіх карток
            await getCards(API, keyToken).then(cardsList => {
                visitsCollection = cardsList;
            });
            
            renderCards(visitsCollection);
            noItems(visitsCollection);
            
        }

        
    } else if (e.target.id === 'visit-btn') {                // якщо натиснути кнопку виклику вікна створення нового візиту
        newVisitModal = new ModalAddCard();
        newVisitModal.render();
    } else if (e.target.id === 'create-btn') {                 // якщо натиснути кнопку створити новий візит
        e.preventDefault();
        const form = document.querySelector('#newVisitForm');
        form.classList.add('was-validated');  // клас bs5 для красивих стилів під час валідації
        // перевіряємо чи всі необхідні поля заповнено
        if(form.checkValidity()) {
            // отримуємо дані з форми 
            let formData = new FormData(form)
            // обєкт із всіма заповненими полями форми
            let visitData = formToObj(formData); 
            // закриваємо модальне вікно
            newVisitModal.close();
            
            // відправляємо створений візит на сервер
            await sendCard(API, keyToken, visitData).then(card => {
                visitsCollection.push(card);

                // Функція що відображає візит на сторінці 
                renderNewCard(card);
            });
        }
        
    } else if (e.target.id === 'deleteBtn') {                    // якщо натиснути кнопку видалення візиту
        const card = e.target.closest('.visit-card')
        const cardId = card.getAttribute('data-id')
        await deleteCard(API, keyToken, cardId)
            .then(response => {
                if(response) {
                    visitsCollection.forEach(data => {
                        const cardIndex = visitsCollection.indexOf(data)
                        if (data.id == cardId) {
                            visitsCollection.splice(cardIndex, 1)
                        }
                    })
                    card.remove()
                    noItems(visitsCollection);
                }
            })
    } else if (e.target.id === 'editBtn') {                       // якщо натиснути кнопку редагування візиту
        // Фільтруємо масив візитів по id і отримуємо на виході обєкт візиту, по картці якого клікнули
        let visit = visitsCollection.filter(visit => visit.id === +e.target.closest('.visit-card').dataset.id)[0];
        
        editVisitModal = new ModalEditCard(visit);
        editVisitModal.render();
    } else if (e.target.id === 'saveChanges-btn') {               // якщо натиснути кнопку зберегти зміни під час редагування
        e.preventDefault();
        const form = document.querySelector('#editVisitForm');
        form.classList.add('was-validated');  
        // валідація форми
        if(form.checkValidity()) {
            let formData = new FormData(form)
            let visitData = formToObj(formData); 
            // закриваємо модальне вікно
            editVisitModal.close();
            
            // відправляємо зміни на сервер
            await editCard(API, keyToken, editVisitModal.id, visitData).then(card => {
                // Код що заміняє візит на редагований в масиві
                // Наче працює як очікувалось, за можливості пошукати простішу альтернативу
                let editedVidit = visitsCollection.find(visit => visit.id === card.id);
                let index = visitsCollection.indexOf(editedVidit);
                visitsCollection[index] = card;

                // Спосіб замінення редагованої картки перерендером всіх карток
                // Так зберігається порядок карток і виглядає красивіше
                document.querySelector('.main-cards').innerHTML = '';
                renderCards(visitsCollection);

                /* 
                Спосіб замінення редагованої картки без перерендеру всіх карток

                // видалення відредагованої картки з дом
                document.querySelectorAll('.visit-card').forEach(el => {
                    if(+el.dataset.id === card.id) {
                        el.remove();
                    }
                })

                // відображення в дом 
                renderNewCard(card);
                */
            });
        }
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

// 