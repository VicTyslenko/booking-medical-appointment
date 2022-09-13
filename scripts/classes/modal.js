export class Modal {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    render () {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="modal" tabindex="-1" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${this.body}
                    </div>
                </div>
            </div>
        </div>
        `);
        // додаємо в об'єкт класу змінну (з документації bootstrap), яка керує модальним вікном
        this.modal = new bootstrap.Modal('#myModal', { 
            keyboard: false
        });
        // викликаємо модальне вікно
        this.modal.show();
        // видалення елементу вікна з DOM після його закривання
        this.modal._element.addEventListener('hidden.bs.modal', event => event.target.remove());
    }
    
    close() {
        // метод закривання вікна
        this.modal.hide();
    }
}


export class ModalLogin extends Modal {
    constructor (email = '', password = '', title = 'Enter your login and password') {
        super(title)
        this.email = email;
        this.password = password;
        this.body = `
        <form id="login-form">
            <div class="mb-3 form-floating">
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="name@example.com" required value="${this.email}">
                <label for="inputEmail" class="form-label">Email address</label>
            </div>
            <div class="mb-3 form-floating">
                <input type="password" class="form-control" id="inputPassword" value="${this.password}" placeholder="password" required autocomplete="on">
                <label for="inputPassword" class="form-label">Password</label>
            </div>
            <div class="mb-3 d-flex justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" id="login-btn" class="btn btn-primary ms-3">Login</button>
            </div>
        </form>
        `
    }
}


export class ModalAddCard extends Modal {
    constructor (title = 'Create new visit') {
        super(title)
        this.body = `
        <form id="newVisitForm" class="g-3 needs-validation" novalidate>
            <!-- always visible -->
            <div class="mb-2 col-12">
                <select id="selectDoctor" class="form-select" aria-label="Status" name="doctor">
                    <option selected disabled>Chose doctor</option>
                    <option value="cardiologist">Cardiologist</option>
                    <option value="dentist">Dentist</option>
                    <option value="therapist">Therapist</option>
                </select>
            </div>
            <!-- for all doctors -->
            <div class="row hidden" id="forAllDoctors">
                <div class="col-md-6 col-sm-12">
                    <div class="mb-2 form-floating">
                        <input type="text" class="form-control" id="visitsPurpose" name="purpose" placeholder="Purpose of the visit" required>
                        <label for="visitsPurpose" class="form-label">Purpose of the visit</label>
                        <div class="invalid-feedback">
                            Can't be empty!
                        </div>
                    </div>
                    <div class="mb-2 ">
                        <select id="select-urgency" class="form-select" required aria-label="Urgency" name="urgency">
                            <option value="" selected disabled>Urgency</option>
                            <option value="high">High</option>
                            <option value="middle">Middle</option>
                            <option value="low">Low</option>
                        </select>
                        <div class="invalid-feedback">Choose one</div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="mb-2 form-floating">
                        <textarea class="form-control" id="shortDescription" required name="description" placeholder="Short description of the visit" style="height: 104px"></textarea>
                        <label for="shortDescription" class="form-label">Short description of the visit</label>
                        <div class="invalid-feedback">
                            Can't be empty!
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="mb-2 form-floating">
                        <input type="text" class="form-control" id="userName" name="fullName" placeholder="Name and Surname" required>
                        <label for="userName" class="form-label">Name and Surname</label>
                        <div class="invalid-feedback">
                            Please enter your name!
                        </div>
                    </div>
                </div>
            </div>

            <!-- додаткові поля -->
            <div class="row" id="additional"></div>
            
            
            <!-- кнопки -->
            <div class="mb-3 d-flex justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" id="create-btn" class="btn btn-primary ms-3 hidden">Create new visit</button>
            </div>
        </form>
        `
    }

    render () {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="modal" tabindex="-1" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${this.body}
                    </div>
                </div>
            </div>
        </div>
        `);
        // додаємо в об'єкт класу змінну (з документації bootstrap), яка керує модальним вікном
        this.modal = new bootstrap.Modal('#myModal', { 
            keyboard: false
        });
        // викликаємо модальне вікно
        this.modal.show();

        // шукаємо форму
        const form = document.querySelector('#newVisitForm');
        // шукаємо прихований блок
        const allDoctorsBlock = form.querySelector('#forAllDoctors');
         // шукаємо блок з додатковими полями залежно від лікаря
        const additionalBlock = form.querySelector('#additional');

        const saveBtn = form.querySelector('#create-btn');
        // навішуємо обробник на форму і по вибору лікаря відкриваємо потрібні поля
        form.addEventListener('change', (e) => {
            if(e.target === form.querySelector('#selectDoctor')) {
                // відслідковуємо зміну в select 
                if(e.target.value === 'cardiologist') {
                    allDoctorsBlock.classList.remove('hidden');
                    saveBtn.classList.remove('hidden');
                    // додаємо у форму блок інпутів для кардіолога
                    additionalBlock.innerHTML = `
                        <!-- Cardoilogist -->
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-2 form-floating">
                                <input type="number" required class="form-control" name="age" id="age" placeholder="Age" min="1" max="110">
                                <label for="age" class="form-label">Age</label>
                                <div class="invalid-feedback">
                                    Enter your age
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-2 form-floating">
                                <input type="number" required class="form-control" name="bmi" id="bmi" placeholder="Body mass index" min="18" max="55">
                                <label for="bmi" class="form-label">Body mass index</label>
                                <div class="invalid-feedback">
                                    Enter a number
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Normal pressure</span>
                                <input type="number" required id="Systolic" placeholder="Systolic" name="systolicPressure" class="form-control" min="70" max="170">
                                <input type="number" required id="Diastolic" placeholder="Diastolic" name="diastolicPressure" class="form-control" min="50" max="110">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-2 form-floating">
                                <input type="text" required class="form-control" name="cardiovascularDiseases" id="diseases" placeholder="Cardiovascular diseases">
                                <label for="diseases" class="form-label">Cardiovascular diseases</label>
                                <div class="invalid-feedback">
                                    Can't be empty!
                                </div>
                            </div>
                        </div>
                    `
                } else if(e.target.value === 'dentist') {
                    allDoctorsBlock.classList.remove('hidden');
                    saveBtn.classList.remove('hidden');
                    additionalBlock.innerHTML = `
                        <!-- Dentist -->
                        <div class="col-12">
                            <div class="mb-2 form-floating">
                                <input type="date" required class="form-control" name="dateOfLastVisit" id="date" placeholder="Date of last visit">
                                <label for="date" class="form-label">Date of last visit</label>
                                <div class="invalid-feedback">
                                    Choose a date
                                </div>
                            </div>
                        </div>
                    `
                } else if(e.target.value === 'therapist') {
                    allDoctorsBlock.classList.remove('hidden');
                    saveBtn.classList.remove('hidden');
                    additionalBlock.innerHTML = `
                    <!-- Therapist -->
                    <div class="col-12">
                        <div class="mb-2 form-floating">
                            <input type="number" required class="form-control" name="age" id="age" placeholder="Age" min="1" max="110">
                            <label for="age" class="form-label">Age</label>
                            <div class="invalid-feedback">
                                Enter your age
                            </div>
                        </div>
                    </div>
                    `
                }
            }
        })
        // видалення елементу вікна з DOM після його закривання
        this.modal._element.addEventListener('hidden.bs.modal', event => event.target.remove());
    }
   
}