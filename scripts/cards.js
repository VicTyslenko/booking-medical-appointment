import { getToken, sendCard, deleteCard, getCards, getCard, editCard } from './functions/send-request.js';
let token = 'ea86ac58-76f5-487a-95bd-ed2022f2148f';
const API = 'https://ajax.test-danit.com/api/v2/cards';

export const cardsWrapper = document.querySelector('.main-section')

//Основний клас карток візитів
export class Visit {
    constructor(visit) {
        this.id = visit.id;
        this.doctor = visit.doctor;
        this.purpose = visit.purpose;
        this.desc = visit.desc;
        this.priority = visit.priority;
        this.fullName = visit.fullName;
        this.elem = {
            card: document.createElement("div"),
            cardItems: document.createElement("ul"),
            fullName: document.createElement("h5"),
            doctor: document.createElement("h6"),
            priority: document.createElement("li"),
            purpose: document.createElement("li"),
            desc: document.createElement("li"),
            topButtons: document.createElement("div"),
            showMoreBtn: document.createElement("button"),
            hideBtn: document.createElement("button"),
            editBtn: document.createElement("button"),
            deleteBtn: document.createElement("button")
        };
    }

    //Відображення карток на сторінці
    render(parent) {
        this.elem.fullName.textContent = `ПІБ: ${this.fullName}`;
        this.elem.doctor.textContent = `Лікар: ${this.doctor}`;
        this.elem.priority.textContent = `Терміновість: ${this.priority}`;
        this.elem.purpose.textContent = `Ціль візиту: ${this.purpose}`;
        this.elem.desc.textContent = `Короткий опис візиту: ${this.desc}`;
        this.elem.showMoreBtn.textContent = "Показати";
        this.elem.hideBtn.textContent = "Приховати";
        this.elem.hideBtn.style.display = 'none';
        this.elem.editBtn.textContent = "Edit";
        // this.elem.deleteBtn.textContent = "Видалити";

        this.elem.card.classList.add("card","w-25", "p-3", "container-sm", "position-relative");
        this.elem.cardItems.classList.add("list-group", "list-group-flush")
        this.elem.fullName.classList.add("card-title", "mt-10");
        this.elem.doctor.classList.add("card-subtitle", "mb-2");
        this.elem.priority.classList.add("list-group-item");
        this.elem.purpose.classList.add("list-group-item");
        this.elem.desc.classList.add("list-group-item");
        this.elem.showMoreBtn.classList.add("btn", "btn-light");
        this.elem.hideBtn.classList.add("btn", "btn-light");
        this.elem.topButtons.classList.add("d-flex", "align-items-center", "justify-content-end")
        this.elem.editBtn.classList.add("btn", "btn-light", "w-25", "inline");
        this.elem.deleteBtn.classList.add("btn-close", "inline-block");

        this.elem.card.dataset.id = this.id;
        this.elem.card.style.minWidth = "250px";
        this.elem.card.style.height = "50%";
        this.elem.card.style.overflow = "overlay";

        this.elem.cardItems.append(this.elem.priority, this.elem.purpose, this.elem.desc)
        console.log(this.elem.cardItems);
        this.elem.topButtons.append(this.elem.editBtn, this.elem.deleteBtn)
        this.elem.card.append(this.elem.topButtons, this.elem.fullName, this.elem.doctor, this.elem.showMoreBtn, this.elem.hideBtn,);

    }

    showMore() {
        const info = [];

        for (let key in this.elem) {
            if (key === "cardItems") {
                info.push(this.elem[key]);
            }
        }
       
        info.forEach(item => {
            this.elem.card.insertBefore(item, this.elem.showMoreBtn);
        });

        this.elem.showMoreBtn.style.display = 'none';
        this.elem.hideBtn.style.display = 'inline-block';
    }
    hide() {
        this.elem.card.removeChild(this.elem.cardItems);
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
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
        this.elem.lastDateVisit = document.createElement("li");

        this.elem.lastDateVisit.textContent = `Дата останнього візиту: ${this.lastDateVisit}`;

        this.elem.lastDateVisit.classList.add("list-group-item");

        this.elem.cardItems.append(this.elem.lastDateVisit)

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.card);
        } else {
            return this.elem.card;
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
        this.elem.age = document.createElement("li");

        this.elem.age.textContent = `Вік: ${this.age}`;

        this.elem.age.classList.add("list-group-item");

        this.elem.cardItems.append(this.elem.age)

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });
        
        if (parent) {
            parent.append(this.elem.card);
        } else {
            return this.elem.card;
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
        this.elem.bp = document.createElement("li");
        this.elem.weight = document.createElement("li");
        this.elem.heartIllness = document.createElement("li");
        this.elem.age = document.createElement("li");

        this.elem.age.textContent = `Вік: ${this.age}`;
        this.elem.bp.textContent = `Середній тиск: ${this.bp}`;
        this.elem.weight.textContent = `Вага: ${this.weight}кг`;
        this.elem.heartIllness.textContent = `Раніше перенесені серцево-судинні захворювання: ${this.heartIllness}`;

        this.elem.age.classList.add("list-group-item");
        this.elem.bp.classList.add("list-group-item");
        this.elem.weight.classList.add("list-group-item");
        this.elem.heartIllness.classList.add("list-group-item");

        this.elem.cardItems.append(this.elem.age, this.elem.bp, this.elem.weight, this.elem.heartIllness)

        this.elem.showMoreBtn.addEventListener("click", () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener("click", () => {
            this.hide();
        });

        if (parent) {
            parent.append(this.elem.card);
        } else {
            return this.elem.card;
        }
    }
}

// Функція для відображення карток візитів із сервера
export function renderCards(container) {
    getCards(API, token)
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                const noItem = document.createElement('p');
                noItem.innerText = "No item has been added";
                noItem.id = "empty";
                container.append(noItem);
            } else {
                 data.map(visit => {
                    if (visit.doctor === "Дантист" || visit.doctor === "Dentist") {
                        const visitCard = new VisitDentist(visit);
                        visitCard.render(container);
                        
                    } else if (visit.doctor === "Кардіолог" || visit.doctor === "Cardiologist") {
                        const visitCard = new VisitCardiologist(visit);
                        visitCard.render(container);
                        
                    } else if (visit.doctor === "Терапевт" || visit.doctor === "Therapist") {
                        const visitCard = new VisitTherapist(visit);
                        visitCard.render(container);
                        
                    }
                });
                
            }
        });
}

