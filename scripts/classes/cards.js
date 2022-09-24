// import { getToken, sendCard, deleteCard, getCards, getCard, editCard } from '../functions/send-request.js';
// import { keyToken, API } from '../index.js';

const cardsWrapper = document.querySelector('.main-cards');
const noItem = document.createElement('div');
//Основний клас карток візитів
export class Visit {
    constructor({id, doctor, purpose, description, urgency, fullName}) {
        this.id = id;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
        this.card = document.createElement('div')
    }

    //Відображення карток на сторінці
    render(parent) {
        this.card.insertAdjacentHTML('beforeend', `
        <div id="card-action" class="d-flex justify-content-end align-items-center">
            <button type="button" class="btn edit-visit-btn" id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="deleteBtn btn-close me-2" aria-label="Close" id="deleteBtn"></button>
        </div>
        <div class="card-body pb-0">
            <h5 class="card-title">${this.fullName}</h5>
            <h6 class="card-subtitle mb-2 text-light"><i class="fa-solid fa-user-doctor text-light"></i> ${this.doctor}</h6>
            <div class="accordion accordion-flush" id="accordionFlush">
                <button id="showMore" class="accordion-button collapsed rounded-top show-more-btn mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${this.id}" aria-expanded="false" aria-controls="flush-collapseOne">
                    Show more
                </button>
                <div id="collapse-${this.id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <ul class="card-list list-group list-group-flush rounded-bottom">
                        <li class="card-list-item list-group-item">Urgency: ${this.urgency}</li>
                        <li class="card-list-item list-group-item">Purpose: ${this.purpose}</li>
                        <li class="card-list-item list-group-item">Description: ${this.description}</li>
                    </ul>
                </div>
             </div>
        </div>
        `)
       
        this.cardList = this.card.querySelector('.card-list')
        this.card.dataset.id = this.id;
        this.card.id = 'visit-card'
        this.card.classList.add('visit-card', 'card', 'draggable')
        this.card.draggable = 'true'
        parent.append(this.card)
    }
}

//Дочірній клас візиту Дантист
export class VisitDentist extends Visit {
    constructor({id, doctor, purpose, description, urgency, fullName, dateOfLastVisit}) {
        super({id, doctor, purpose, description, urgency, fullName});
        this.dateOfLastVisit = dateOfLastVisit;
    }
    //Відображення Дантиста на сторінці
    render(parent) {
        super.render(parent);
        
        this.card.classList.add('bg-dentist')
        this.card.querySelector('.accordion-collapse').classList.add('bg-dentist')
        this.cardList.insertAdjacentHTML("beforeend", `<li class="card-list-item list-group-item">Date of last visit: <br>${this.dateOfLastVisit}</li>`)
         parent.append(this.card);
    }
}

//Дочірній клас візиту Терапевт 
export class VisitTherapist extends Visit {
    constructor({id, doctor, purpose, description, urgency, fullName, age}) {
        super({id, doctor, purpose, description, urgency, fullName});
        this.age = age;
    }

    //Відображення Терапевтa на сторінці
    render(parent) {
        super.render(parent);

        this.card.classList.add('bg-therapist')
        this.card.querySelector('.accordion-collapse').classList.add('bg-therapist')
        this.cardList.insertAdjacentHTML("beforeend", `<li class="card-list-item list-group-item">Age: ${this.age}</li>`)
        parent.append(this.card);
    }
}

//Дочірній клас візиту Кардіолога 
export class VisitCardiologist extends Visit {
    constructor({id, doctor, purpose, description, urgency, fullName, systolicPressure, diastolicPressure, bmi, cardiovascularDiseases, age}) {
        super({id, doctor, purpose, description, urgency, fullName});
        this.systolicPressure = systolicPressure;
        this.diastolicPressure = diastolicPressure;
        this.bmi = bmi;
        this.cardiovascularDiseases = cardiovascularDiseases;
        this.age = age;
    }

    //Відображення Кардіолога на сторінці
    render(parent) {
        super.render(parent);
        this.card.classList.add('bg-cardiologist')
        this.card.querySelector('.accordion-collapse').classList.add('bg-cardiologist')
        this.cardList.insertAdjacentHTML("beforeend", `
        <li class="card-list-item list-group-item">Basic pressure: ${this.systolicPressure}/${this.diastolicPressure}</li>
        <li class="card-list-item list-group-item">Body mass index: ${this.bmi}</li>
        <li class="card-list-item list-group-item">Cardiovascular diseases: ${this.cardiovascularDiseases}</li>
        <li class="card-list-item list-group-item">Age: ${this.age}</li>
        `)
        parent.append(this.card);
    }
}
// Функція для відображення тексту при відсутності карток
export function noItems(cardsArray) {
    if(cardsArray.length === 0) {
        noItem.innerHTML = `
        <p id="empty" class="text-white fw-bold fs-1">No items have been added</p>
        `;
        cardsWrapper.append(noItem);
    }
}

// Функція відображення усіх карток користувача з сервера
export function renderCards(cardsArray) {
    // console.log(cardsArray);

        cardsArray.forEach(visit => {
            if (visit.doctor === "Dentist") {
                const visitCard = new VisitDentist(visit);
                visitCard.render(cardsWrapper);
            } else if (visit.doctor === "Cardiologist") {
                const visitCard = new VisitCardiologist(visit);
                visitCard.render(cardsWrapper);
            } else if (visit.doctor === "Therapist") {
                const visitCard = new VisitTherapist(visit);
                visitCard.render(cardsWrapper);
            }
        });
    
};

export function renderNewCard(card) {
    if (card.doctor === "Dentist") {
        const visitCard = new VisitDentist(card);
        visitCard.render(cardsWrapper);
        noItem.remove();
    } else if (card.doctor === "Cardiologist") {
        const visitCard = new VisitCardiologist(card);
        visitCard.render(cardsWrapper);
        noItem.remove();
    } else if (card.doctor === "Therapist") {
        const visitCard = new VisitTherapist(card);
        visitCard.render(cardsWrapper);
        noItem.remove();
    }
}
