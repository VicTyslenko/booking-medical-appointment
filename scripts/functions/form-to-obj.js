// приймає у себе new FormData() та повертає звичайний обєкт 
export default function formToObject(formData) {
            let obj = {};
            for(let [name, value] of formData) {
                if(value) {
                    obj[name] = value;
                }
            }
            return obj
        }