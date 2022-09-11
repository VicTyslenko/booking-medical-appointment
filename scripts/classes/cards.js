import { getToken, sendCard, deleteCard, getCards, getCard, editCard } from '../functions/send-request.js';
import { keyToken } from '../index.js';
const API = 'https://ajax.test-danit.com/api/v2/cards';

const cardsWrapper = document.querySelector('.main-cards');

//Основний клас карток візитів
export class Visit {
    constructor(visit) {
        this.id = visit.id;
        this.doctor = visit.doctor;
        this.purpose = visit.purpose;
        this.desc = visit.desc;
        this.priority = visit.priority;
        this.fullName = visit.fullName;
        this.card = document.createElement('div')
    }

    //Відображення карток на сторінці
    render(parent) {
        this.card.insertAdjacentHTML('beforeend', `
        <div class="d-flex justify-content-end align-items-center">
            <button type="button" class="btn btn-light">Edit</button>
            <button type="button" class="deleteBtn btn-close" aria-label="Close"></button>
        </div>
        <div class="card-body">
            <h5 class="card-title">${this.fullName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${this.doctor}</h6>
            <ul class="card-list list-group list-group-flush collapse">
                <li class="list-group-item">${this.priority}</li>
                <li class="list-group-item">${this.purpose}</li>
                <li class="list-group-item">${this.desc}</li>
            </ul>
            <button class="showMoreBtn btn btn-light">Show more</button>
            <button class="hideBtn btn btn-light collapse">Hide</button>
       </div>
        `)
    
        this.cardList = this.card.querySelector('.card-list')
        this.card.dataset.id = this.id;
        this.card.style.minWidth = "250px";
        this.card.classList.add('visit-card', 'card')
    }

    showMore() {
        console.log(this.card);

        this.card.addEventListener('click', (e) => {
            const showMoreBtn = this.card.querySelector('.showMoreBtn');
            const hideBtn = this.card.querySelector('.hideBtn')
            
            if (e.target === showMoreBtn) {
                this.cardList.classList.remove('collapse');
                showMoreBtn.classList.add('collapse')
                hideBtn.classList.remove('collapse')
            } 
            if (e.target === hideBtn) {
                this.cardList.classList.add('collapse')
                showMoreBtn.classList.remove('collapse')
                hideBtn.classList.add('collapse')
            }
        })
    }
   
    delete() {

        this.card.addEventListener("click", async (e) => {
            const deleteBtn = this.card.querySelector('.deleteBtn ')
            if(e.target === deleteBtn) {
                const response = await deleteCard(API, keyToken, this.id);
                if (response.ok) {
                    this.card.remove();
                    const allVisits = document.querySelectorAll(".visit-card");
                    if (!allVisits || allVisits.length === 0) {
                        const noItem = document.createElement('p');
                        noItem.id = "empty";
                        noItem.textContent = "No item has been added";
                        cardsWrapper.append(noItem);
                    }
                }
            }
        });
    }
}

//Дочірній клас візиту Дантист
export class VisitDentist extends Visit {
    constructor(visit) {
        super(visit);
        this.lastDateVisit = visit.lastDateVisit;
    }
    //Відображення Дантиста на сторінці
    render(parent) {
        super.render(parent);
        
        this.cardList.insertAdjacentHTML("beforeend", `<li class="list-group-item">${this.lastDateVisit}</li>`)
        this.showMore()
        this.delete()

        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

//Дочірній клас візиту Терапевт 
export class VisitTherapist extends Visit {
    constructor(visit) {
        super(visit);
        this.age = visit.age;
    }

    //Відображення Терапевтa на сторінці
    render(parent) {
        super.render(parent);

        this.cardList.insertAdjacentHTML("beforeend", `<li class="list-group-item">${this.age}</li>`)
        this.showMore()
        this.delete()

        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

//Дочірній клас візиту Кардіолога 
export class VisitCardiologist extends Visit {
    constructor(visit) {
        super(visit);
        this.bp = visit.bp;
        this.weight = visit.weight;
        this.heartIllness = visit.heartIllness;
        this.age = visit.age;
    }

    //Відображення Кардіолога на сторінці
    render(parent) {
        super.render(parent);

        this.cardList.insertAdjacentHTML("beforeend", `
        <li class="list-group-item">${this.bp}</li>
        <li class="list-group-item">${this.weight}</li>
        <li class="list-group-item">${this.heartIllness}</li>
        <li class="list-group-item">${this.age}</li>
        `)
        this.showMore()
        this.delete()

        if (parent) {
            parent.append(this.card);
        } else {
            return this.card;
        }
    }
}

// Функція відображення усіх карток користувача з сервера
export function renderCards() {
    getCards(API, keyToken)
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                const noItem = document.createElement('p');
                noItem.innerText = "No item has been added";
                noItem.id = "empty";
                cardsWrapper.append(noItem);

            } else {
                data.map(visit => {
                    if (visit.doctor === "Дантист" || visit.doctor === "Dantist") {
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
        });
}
