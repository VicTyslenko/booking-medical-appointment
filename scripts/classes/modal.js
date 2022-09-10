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
    constructor (title = 'Create new card') {
        super(title)
        this.body = `
        
        `
    }

   
}