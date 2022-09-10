import {cardsWrapper, Visit, VisitCardiologist, VisitDentist, VisitTherapist, renderCards} from "../cards.js"
const validation = () =>{
    const headWrapp = document.querySelector('.head-wrapp')
    const entryButton = document.querySelector('#entry-btn')
    entryButton.addEventListener('click',() =>{
  headWrapp.insertAdjacentHTML('afterbegin',`
  <form class="row g-3 valid-form">
  <div class="col-auto">
    <label for="staticEmail2" class="visually-hidden">Email</label>
    <input type="email" class="form-control" id="staticEmail2" placeholder ='email'>
  </div>
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-success">Confirm</button>
  </div>
</form>
  `)
        
    const validForm = document.querySelector('.valid-form')
    console.log(validForm);
    validForm.addEventListener("click", (e) => {
        e.preventDefault()
        const confirm = e.target.closest(".btn-success")
        // console.log(confirm);
        if (e.target === confirm) {
          validForm.style.display = "none";
          entryButton.style.display = "none";
          renderCards(cardsWrapper)
        }
      })
    });


    
    };
 export {validation}