  
//  Фiльтрацiя карток 
  import {cardsWrapper,VisitDentist,VisitCardiologist,VisitTherapist}  from "../classes/cards.js";
  export default function searchFilter(array){

    const status = document.querySelector('.status')
    const urgency = document.querySelector('.urgency')
    const mainSection= document.querySelector('.main-section');
    const inputTitle = document.getElementById('input-title');


    if(status.value === 'open'){
        // Кардiолог  фiльтр
          if(inputTitle.value === 'Cardiologist'){
              if(urgency.value === 'high'){
              array.filter(card =>{
                      
                      if(card.doctor === 'Cardiologist' && card.urgency === 'high'){
                          cardsWrapper.innerHTML = '';
                          const visit = new VisitCardiologist(card)
                          console.log(visit);
                          visit.render(mainSection)
                      }
                  })
              }
                  
              else if(urgency.value === 'middle'){
                  array.filter(card =>{
                      
                      if(card.doctor === 'Cardiologist' && card.urgency === 'middle'){
                          cardsWrapper.innerHTML = '';
                          const visit = new VisitCardiologist(card)
                          console.log(visit);
                          visit.render(mainSection)
                      }
                  })
              } 
              else if(urgency.value === 'low'){
                  
                  array.filter(card =>{
                      
                      if(card.doctor === 'Cardiologist' && card.urgency === 'low'){
                          cardsWrapper.innerHTML = '';
                          const visit = new VisitCardiologist(card)
                          console.log(visit);
                          visit.render(mainSection)
                  
                      }
              
                  })
                  
              }
          }   
          // Дантист фiльтр
          else if(inputTitle.value === 'Dentist'){
              if(urgency.value === 'high'){
                  array.filter(card =>{
                          
                          if(card.doctor === 'Dentist' && card.urgency === 'high'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitDentist(card)
                              console.log(visit);
                              visit.render(mainSection)
                          }
                      })
                  }
                      
                  else if(urgency.value === 'middle'){
                      array.filter(card =>{
                          
                          if(card.doctor === 'Dentist' && card.urgency === 'middle'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitDentist(card)
                              console.log(visit);
                              visit.render(mainSection)
                          }
                      })
                  } 
                  else if(urgency.value === 'low'){
                      
                      array.filter(card =>{
                          
                          if(card.doctor === 'Dentist' && card.urgency === 'low'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitDentist(card)
                              console.log(visit);
                              visit.render(mainSection)
                      
                          }
                  
                      })
                      
                  }
          }
          // Терапевт фiльтр
          else if(inputTitle.value === 'Therapist'){
              if(urgency.value === 'high'){
                  array.filter(card =>{
                          
                          if(card.doctor === 'Therapist' && card.urgency === 'high'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitTherapist(card)
                              console.log(visit);
                              visit.render(mainSection)
                          }
                      })
                  }
                      
                  else if(urgency.value === 'middle'){
                      array.filter(card =>{
                          
                          if(card.doctor === 'Therapist' && card.urgency === 'middle'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitDentist(card)
                              console.log(visit);
                              visit.render(mainSection)
                          }
                      })
                  } 
                  else if(urgency.value === 'low'){
                      
                      array.filter(card =>{
                          
                          if(card.doctor === 'Therapist' && card.urgency === 'low'){
                              cardsWrapper.innerHTML = '';
                              const visit = new VisitDentist(card)
                              console.log(visit);
                              visit.render(mainSection)
                      
                          }
                  
                      })
                      
                  }
          }
      
      }
      else{
          
          cardsWrapper.innerText = 'all visits are done'
// cardsWrapper.innerHTML = '';
          // noItems(visitsCollection)
      }

};

