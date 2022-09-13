// import { getToken, sendCard, deleteCard, getCards, getCard, editCard } from '../functions/send-request.js';
// import { keyToken, API } from '../index.js';

const cardsWrapper = document.querySelector('.main-cards');

//Основний клас карток візитів
export class Visit {
    constructor({id, doctor, purpose, desc, urgency, fullName}) {
        this.id = id;
        this.doctor = doctor;
        this.purpose = purpose;
        this.desc = desc;
        this.urgency = urgency;
        this.fullName = fullName;
        this.card = document.createElement('div')
    }

    //Відображення карток на сторінці
    render(parent) {
        this.card.insertAdjacentHTML('beforeend', `
        <div class="d-flex justify-content-end align-items-center">
            <button type="button" class="btn btn-light">Edit</button>
            <button type="button" class="deleteBtn btn-close" aria-label="Close" id="deleteBtn"></button>
        </div>
        <div class="card-body">
            <h5 class="card-title">${this.fullName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${this.doctor}</h6>
            <div class="accordion accordion-flush" id="accordionFlush">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${this.id}" aria-expanded="false" aria-controls="flush-collapseOne">
                    Show more
                </button>
                <div id="collapse-${this.id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <ul class="card-list list-group list-group-flush">
                        <li class="list-group-item">Терміновість: ${this.urgency}</li>
                        <li class="list-group-item">Ціль візиту: ${this.purpose}</li>
                        <li class="list-group-item">Короткий опис візиту: ${this.desc}</li>
                    </ul>
                </div>
             </div>
        </div>
        `)

        this.cardList = this.card.querySelector('.card-list')
        this.card.dataset.id = this.id;
        this.card.classList.add('visit-card', 'card')
        parent.append(this.card)
        console.log(this.card);
    }
}

//Дочірній клас візиту Дантист
export class VisitDentist extends Visit {
    constructor({id, doctor, purpose, desc, urgency, fullName, lastDateVisit}) {
        super({id, doctor, purpose, desc, urgency, fullName});
        this.lastDateVisit = lastDateVisit;
    }
    //Відображення Дантиста на сторінці
    render(parent) {
        super.render(parent);
        
        this.cardList.insertAdjacentHTML("beforeend", `<li class="list-group-item">Дата останнього візиту: ${this.lastDateVisit}</li>`)
        
        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

//Дочірній клас візиту Терапевт 
export class VisitTherapist extends Visit {
    constructor({id, doctor, purpose, desc, urgency, fullName, age}) {
        super({id, doctor, purpose, desc, urgency, fullName});
        this.age = age;
    }

    //Відображення Терапевтa на сторінці
    render(parent) {
        super.render(parent);

        this.cardList.insertAdjacentHTML("beforeend", `<li class="list-group-item">Вік: ${this.age}</li>`)

        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

//Дочірній клас візиту Кардіолога 
export class VisitCardiologist extends Visit {
    constructor({id, doctor, purpose, desc, urgency, fullName, systolic, diastolic, weight, heartIllness, age}) {
        super({id, doctor, purpose, desc, urgency, fullName});
        this.systolic = systolic;
        this.diastolic = diastolic;
        this.weight = weight;
        this.heartIllness = heartIllness;
        this.age = age;
    }

    //Відображення Кардіолога на сторінці
    render(parent) {
        super.render(parent);

        this.cardList.insertAdjacentHTML("beforeend", `
        <li class="list-group-item">Звичайний тиск: ${this.systolic}/${this.diastolic}</li>
        <li class="list-group-item">Вага: ${this.weight}</li>
        <li class="list-group-item">Раніше перенесені серцево-судинні захворювання: ${this.heartIllness}</li>
        <li class="list-group-item">Вік: ${this.age}</li>
        `)

        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

// Функція відображення усіх карток користувача з сервера
export function renderCards(cardsArray) {
    // console.log(cardsArray);

    if (cardsArray.length === 0) {
        const noItem = document.createElement('p');
        noItem.innerText = "No item has been added";
        noItem.id = "empty";
        cardsWrapper.append(noItem);

    } else {
        cardsArray.map(visit => {
            // console.log(visit);
            // console.log(visit.doctor);
            if (visit.doctor === "Дантист" || visit.doctor === "Dentist") {
                const visitCard = new VisitDentist(visit);
                visitCard.render(cardsWrapper);
            } else if (visit.doctor === "Кардіолог" || visit.doctor === "Cardiologist") {
                        const visitCard = new VisitCardiologist(visit);
                        visitCard.render(cardsWrapper);
            } else if (visit.doctor === "Терапевт" || visit.doctor === "Therapist") {
                const visitCard = new Visit(visit);
                visitCard.render(cardsWrapper);
            }
        });
    }
};