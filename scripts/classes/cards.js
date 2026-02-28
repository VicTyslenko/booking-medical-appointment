export const cardsWrapper = document.querySelector('.main-cards');
const noItem = document.createElement('div');

// Base class for all appointment visit cards
export class Visit {
    constructor({id, doctor, purpose, description, urgency, fullName, status}) {
        this.status = status;
        this.id = id;
        this.doctor = doctor;
        this.purpose = purpose;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
        this.card = document.createElement('div')
    }

    // Renders the card into the given parent element
    render(parent) {
        this.card.insertAdjacentHTML('beforeend', `
        <div id="card-action" class="d-flex align-items-center card-action${this.status}">
            <button type="button" class="btn btn${this.status}"><span id="statusDone"><i class="fa-solid fa-check"></i> Done</span></button>
            <div class="d-flex align-items-center">
                <button type="button" class="btn edit-visit-btn" id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="deleteBtn btn-close me-2" aria-label="Close" id="deleteBtn"></button>
            </div>
        </div>
        <div class="card-body pb-0">
            <h5 class="card-title">${this.fullName}</h5>
            <h6 class="card-subtitle mb-2 text-light"><i class="fa-solid fa-user-doctor text-light"></i> ${this.doctor} <span class='card-status'>/ Status: ${this.status}</span></h6> 
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

// Dentist appointment card — adds date of last visit field
export class VisitDentist extends Visit {
    constructor({status, id, doctor, purpose, description, urgency, fullName, dateOfLastVisit}) {
        super({status, id, doctor, purpose, description, urgency, fullName});
        this.dateOfLastVisit = dateOfLastVisit;
    }

    render(parent) {
        super.render(parent);
        this.card.classList.add('bg-dentist')
        this.card.querySelector('.accordion-collapse').classList.add('bg-dentist')
        this.cardList.insertAdjacentHTML("beforeend", `<li class="card-list-item list-group-item">Date of last visit: <br>${this.dateOfLastVisit}</li>`)
        parent.append(this.card);
    }
}

// Therapist appointment card — adds patient age field
export class VisitTherapist extends Visit {
    constructor({status, id, doctor, purpose, description, urgency, fullName, age}) {
        super({status, id, doctor, purpose, description, urgency, fullName});
        this.age = age;
    }

    render(parent) {
        super.render(parent);
        this.card.classList.add('bg-therapist')
        this.card.querySelector('.accordion-collapse').classList.add('bg-therapist')
        this.cardList.insertAdjacentHTML("beforeend", `<li class="card-list-item list-group-item">Age: ${this.age}</li>`)
        parent.append(this.card);
    }
}

// Cardiologist appointment card — adds pressure, BMI, age, and cardiovascular disease fields
export class VisitCardiologist extends Visit {
    constructor({status, id, doctor, purpose, description, urgency, fullName, systolicPressure, diastolicPressure, bmi, cardiovascularDiseases, age}) {
        super({status, id, doctor, purpose, description, urgency, fullName});
        this.systolicPressure = systolicPressure;
        this.diastolicPressure = diastolicPressure;
        this.bmi = bmi;
        this.cardiovascularDiseases = cardiovascularDiseases;
        this.age = age;
    }

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

// Shows an empty-state message when there are no cards to display
export function noItems(cardsArray) {
    if (cardsArray.length === 0) {
        noItem.innerHTML = `
        <p id="empty" class="text-white fw-bold fs-1">No items have been added</p>
        `;
        cardsWrapper.append(noItem);
    }
}

// Renders all cards from the provided array into the cards wrapper
export function renderCards(cardsArray) {
    cardsArray.forEach(visit => {
        if (visit.doctor === "Dentist") {
            new VisitDentist(visit).render(cardsWrapper);
        } else if (visit.doctor === "Cardiologist") {
            new VisitCardiologist(visit).render(cardsWrapper);
        } else if (visit.doctor === "Therapist") {
            new VisitTherapist(visit).render(cardsWrapper);
        }
    });
}

// Renders a single newly created or updated card and removes the empty-state message
export function renderNewCard(card) {
    if (card.doctor === "Dentist") {
        new VisitDentist(card).render(cardsWrapper);
    } else if (card.doctor === "Cardiologist") {
        new VisitCardiologist(card).render(cardsWrapper);
    } else if (card.doctor === "Therapist") {
        new VisitTherapist(card).render(cardsWrapper);
    }
    noItem.remove();
}
