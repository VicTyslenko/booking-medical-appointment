import {getToken, sendCard, deleteCard, getCards, getCard, editCard} from './functions/send-request.js';
import {Modal, ModalLogin, ModalAddCard, ModalEditCard} from './classes/modal.js';
import {renderCards, Visit, VisitCardiologist, noItems, renderNewCard } from './classes/cards.js';
import formToObj from './functions/form-to-obj.js';
import dragAndDrop from './functions/drag-and-drop.js';


// тут будуть глобальні змінні
const API = 'https://ajax.test-danit.com/api/v2/cards';
let visitsCollection = [];    // масив усіх візитів



// змінні щоб їх було видно для всіх функцій нижче Типу глобальні змінні, але ще в процесі тестування і можливо їх не буде в фінальному білді
let entryModal; // обєкт з вікном входу
let keyToken; // сюди записується токен  Наступні функції запиту на сервер (для отримання карток чи ін) слід викликати з перевіркою if(keyToken)
let newVisitModal; // обєкт з вікном створення нового візиту
let editVisitModal; // обєкт з вікном редагування візиту

window.addEventListener("load", () => { // функція, яка виконується після завантаження сторінки
    keyToken = localStorage.getItem('token'); 
    if (keyToken) {
        document.querySelector('#entry-btn').classList.add('hidden');
        document.querySelector('#visit-btn').classList.remove('hidden');
        document.querySelector('#logout-btn').classList.remove('hidden');
        document.querySelector('#sorting-form').classList.remove('hidden');

        visitsCollection = JSON.parse(localStorage.getItem('allVisits')) 
        
        renderCards(visitsCollection);
        noItems(visitsCollection);

    } 
});
    
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
                
                if (token && typeof token !== 'object') { // перевірка на зміст токена
                    localStorage.setItem('token', token) // зберегли токен у локальному сховищі
                    keyToken = localStorage.getItem('token') // дістали токен зі сховища та записали у змінну
                    entryModal.close()                       // видаляємо модальне вікно
                } else {                                     // якщо невірний логін або пароль
                    // показуємо попередження
                    entryModal.invalid();
                }
            })
            .catch(e => console.log(e.message))     // тут буде обробка помилки
                
        } else {                       // якщо введено не коректні дані, можна буде потім виводити це повідомлення в межах модального вікна
            entryModal.invalid();
        }
        // if(typeof keyToken === 'string') {  // поправив перевірку, бо попередня не працювала
        if(keyToken) {  // можна так, бо localStorage повертає по дефолту строку
            // міняємо кнопки
            document.querySelector('#entry-btn').classList.add('hidden');
            document.querySelector('#visit-btn').classList.remove('hidden');
            document.querySelector('#logout-btn').classList.remove('hidden');
            // показуємо форму пошуку
            document.querySelector('#sorting-form').classList.remove('hidden');

            // отримання всіх карток
            await getCards(API, keyToken).then(cardsList => {
                localStorage.setItem('allVisits', JSON.stringify(cardsList)) // явно переводимо масив візитів у строку інакше буде [object Object]
                // розбираємо строку з localStorage для перетворення у масив з об'єктами та записуємо результат у visitsCollection
                visitsCollection = JSON.parse(localStorage.getItem('allVisits'))
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
                localStorage['allVisits'] = JSON.stringify(visitsCollection); // перезаписуємо в localStorage наші зміни
                console.log(visitsCollection);

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
                            localStorage['allVisits'] = JSON.stringify(visitsCollection);  // перезаписуємо в localStorage наші зміни
                            console.log(visitsCollection);
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

                localStorage['allVisits'] = JSON.stringify(visitsCollection);  // перезаписуємо в localStorage наші зміни
                
                /*
                // Спосіб замінення редагованої картки перерендером всіх карток
                // Так зберігається порядок карток і виглядає красивіше
                document.querySelector('.main-cards').innerHTML = '';
                renderCards(visitsCollection);
                 */
                
                // Спосіб замінення редагованої картки без перерендеру всіх карток
                // Так не збивається Drag'n'Drop
            
                // видалення відредагованої картки з дом
                document.querySelectorAll('.visit-card').forEach(el => {
                    if(+el.dataset.id === card.id) {
                        el.remove();
                    }
                })
                
                // відображення в дом 
                renderNewCard(card);
                
            });
        }
    } else if (e.target.id === 'logout-btn') { 
        localStorage.clear();    //стираємо дані з локального сховища   
        location.reload()       //оновлюємо сторінку
    }  else if (e.target.id === 'showMore') {
        e.target.closest('.visit-card').classList.toggle('card-border-radius')
        e.target.closest('.visit-card').classList.toggle('card-z-index')
    }
})

dragAndDrop()
