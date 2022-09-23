
//  Фiльтрацiя карток 
import {cardsWrapper,VisitDentist,VisitCardiologist,VisitTherapist,renderCards}  from "../classes/cards.js";

export default function searchFilter(array){
    
    const status = document.querySelector('.status')
    const urgency = document.querySelector('.urgency')
    const mainSection= document.querySelector('.main-section');
    const inputTitle = document.getElementById('input-title');
    const sortingForm = document.querySelector('#sorting-form');
    
    sortingForm.addEventListener('change',(event)=>{
        let target = event.target;
       
        if(target === status){
         
        if(status.value === 'open'){

        }
        
        };
        if(target === inputTitle){

            if(inputTitle.value === 'Cardiologist'){
                if(urgency.value === 'high'){
                    let filteredArray = array.filter(card=>card.doctor === 'Cardiologist' && card.urgency === 'high')
                    console.log(filteredArray);
                    cardsWrapper.innerHTML = '';
                 renderCards(filteredArray)
                }
            }

        };
        if(target === urgency){
         
        }
    })
};


//    sortingForm.addEventListener('change',(event)=>{

//     if(event.target.value === 'open'){
        
//         // Кардiолог  фiльтр
//      if(inputTitle.value === 'Cardiologist'){
//        if(urgency.value == 'high'){
//            let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'high')
//            cardsWrapper.innerHTML = '';
//            filteredArray.forEach(card => {
//                const visit = new VisitCardiologist(card)
//                visit.render(cardsWrapper)
//            });
//        }
//        else if(urgency.value === 'middle'){
//            let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'middle')
//            cardsWrapper.innerHTML = '';
//            filteredArray.forEach(card => {
//                const visit = new VisitCardiologist(card)
//                visit.render(cardsWrapper)
//            });
//        }
//        else if(urgency.value === 'low'){
//            let filteredArray = array.filter(card => card.doctor === 'Cardiologist' && card.urgency === 'low')
//            cardsWrapper.innerHTML = '';
//            filteredArray.forEach(card => {
//                const visit = new VisitCardiologist(card)
//                visit.render(cardsWrapper)
//            });
//        }
//      }
// //    //   Терапевт фiльтр
// //      if(inputTitle.value === 'Therapist'){
// //        if(urgency.value === 'high'){
// //            let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'high')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitTherapist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //        else if(urgency.value === 'middle'){
// //            let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'middle')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitTherapist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //        else if(urgency.value === 'low'){
// //            let filteredArray = array.filter(card => card.doctor === 'Therapist' && card.urgency === 'low')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitTherapist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //      }
   
// //    //   Дантист фiльтр
// //      if(inputTitle.value === 'Dentist'){
// //        if(urgency.value == 'high'){
// //            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'high')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitDentist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //        else if(urgency.value === 'middle'){
// //            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'middle')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitDentist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //        else if(urgency.value === 'low'){
// //            let filteredArray = array.filter(card => card.doctor === 'Dentist' && card.urgency === 'low')
// //            cardsWrapper.innerHTML = '';
// //            filteredArray.forEach(card => {
// //                const visit = new VisitDentist(card)
// //                visit.render(cardsWrapper)
// //            });
// //        }
// //      }
   
//          }
//     //      else{
             
//     //        cardsWrapper.innerHTML = '<p class="visits-done">all visits are done</p>'
   
//     //    }

//    })

   














