
//  Фiльтрацiя карток 
import {cardsWrapper,VisitDentist,VisitCardiologist,VisitTherapist,renderCards, noItems,renderNewCard}  from "../classes/cards.js";

const status = document.getElementById('status')
const urgency = document.getElementById('sorting-urgency')
const mainSection= document.querySelector('.main-section');
const inputTitle = document.getElementById('input-title');
const sortingForm = document.querySelector('#sorting-form');


// Функцiя фiльтрацiй по параметрам вводу

function changeHandle(array){
    if(sortingForm.status.value === 'open'){
        // Терапевт фiльтр
        if(sortingForm.title.value === 'Therapist' || sortingForm.title.value === 'therapist'){
            
if(sortingForm.urgency.value === 'high'){
    let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'high')
               cardsWrapper.innerHTML = '';
               filteredArray.forEach(card => {
                   const visit = new VisitTherapist(card)
                   visit.render(cardsWrapper)
               });
} 
else if(sortingForm.urgency.value === 'middle'){
    let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'middle')
               cardsWrapper.innerHTML = '';
               filteredArray.forEach(card => {
                   const visit = new VisitTherapist(card)
                   visit.render(cardsWrapper)
               });
}
 else if(sortingForm.urgency.value === 'low'){
    let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'low')
               cardsWrapper.innerHTML = '';
               filteredArray.forEach(card => {
                   const visit = new VisitTherapist(card)
                   visit.render(cardsWrapper)
               });
}
}
                //    Кардiолог фiльтр
else if(sortingForm.title.value === 'Cardiologist' || sortingForm.title.value === 'cardiologist'){
            
    if(sortingForm.urgency.value === 'high'){
        let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'high')
                   cardsWrapper.innerHTML = '';
                   filteredArray.forEach(card => {
                       const visit = new VisitCardiologist(card)
                       visit.render(cardsWrapper)
                   });
    }
    else if(sortingForm.urgency.value === 'middle'){
        let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'middle')
                   cardsWrapper.innerHTML = '';
                   filteredArray.forEach(card => {
                       const visit = new VisitCardiologist(card)
                       visit.render(cardsWrapper)
                   });
    }
     else if(sortingForm.urgency.value === 'low'){
        let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'low')
                   cardsWrapper.innerHTML = '';
                   filteredArray.forEach(card => {
                       const visit = new VisitCardiologist(card)
                       visit.render(cardsWrapper)
                   });
    }
    }
                //    Дантист фiльтр
    else if(sortingForm.title.value === 'Dentist' || sortingForm.title.value === 'dentist'){
            
        if(sortingForm.urgency.value === 'high'){
            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'high')
                       cardsWrapper.innerHTML = '';
                       filteredArray.forEach(card => {
                           const visit = new VisitDentist(card)
                           visit.render(cardsWrapper)
                       });
        }
        else if(sortingForm.urgency.value === 'middle'){
            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'middle')
                       cardsWrapper.innerHTML = '';
                       filteredArray.forEach(card => {
                           const visit = new VisitDentist(card)
                           visit.render(cardsWrapper)
                       });
        }
         else if(sortingForm.urgency.value === 'low'){
            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'low')
                       cardsWrapper.innerHTML = '';
                       filteredArray.forEach(card => {
                           const visit = new VisitDentist(card)
                           visit.render(cardsWrapper)
                       });
        }
        }
}
else if(sortingForm.status.value === 'done'){
   
cardsWrapper.innerHTML =''
cardsWrapper.insertAdjacentHTML('afterbegin','<h1 class="done-text"> All visits are done</h1>')

// if()
}



}
  



// Функцiя перевiрки змiн у полях вводу
export default function searchFilter(array){
   
     inputTitle.addEventListener('input',()=>{
        changeHandle(array)
     })
        status.addEventListener('change',()=>{
            changeHandle(array)
        })
        urgency.addEventListener('change',()=>{
            changeHandle(array)
        })
    
    };
   














