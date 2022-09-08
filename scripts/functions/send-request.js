// уніерсальна функція-запит
const sendRequest = async (API, point = '', method = 'GET', config) => {
    return await fetch(`${API}${point}`, {
        method,
        ...config
    }).then(response => {
        if(response.ok) {
            if (point === '/login') {
                return response.text();
            } else {
                return method === 'DELETE' ? response : response.json();
            }
        } else {
            return new Error('Something goes wrong');
        }
    })
}


// функція авторизації, повертає проміс із токеном
const getToken = (API, email, password) => sendRequest(API, '/login', 'POST',    {
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ email: `${email}`, password: `${password}`})
    });

// функція відправки новоствореної картки на сервер, повертає проміс із об'єктом картки включно з id
const sendCard = (API, token, cardData) => sendRequest(API, '', 'POST', {  //cardData is an object {}
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    body: JSON.stringify(cardData)
    });

// функція видалення картки з сервера, повертає responce. Можна перевіряти responce.ok або responce.status 
const deleteCard = (API, token, cardId) => sendRequest(API, `/${cardId}`, 'DELETE', {  
    headers: {
        'Authorization': `Bearer ${token}`
        }
    });

// функція отримання всіх карток з сервера, повертає проміс із масивом об'єктів. 
const getCards = (API, token) => sendRequest(API, ...[,,], {
    headers: {
        'Authorization': `Bearer ${token}`
      }
    });

// функція отримання конкретної картки з сервера, повертає проміс із об'єктом.     
const getCard = (API, token, cardId) => sendRequest(API, `/${cardId}`, ...[,], {
    headers: {
        'Authorization': `Bearer ${token}`
      }
    });

// функція редагування картки, повертає проміс із об'єктом зміненої картки 
const editCard = (API, token, cardId, cardData) => sendRequest(API, `/${cardId}`, 'PUT', {  
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    body: JSON.stringify(cardData)
    });

    export {getToken, sendCard, deleteCard, getCards, getCard, editCard};