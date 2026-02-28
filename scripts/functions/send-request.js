// Universal HTTP request helper
const sendRequest = async (API, point = '', method = 'GET', config) => {
    return await fetch(`${API}${point}`, {
        method,
        ...config
    }).then(response => {
        if (response.ok) {
            if (point === '/login') {
                return response.text();
            } else {
                return method === 'DELETE' ? response : response.json();
            }
        } else {
            return new Error('Something went wrong');
        }
    });
};

// Returns a promise that resolves to an auth token string
const getToken = (API, email, password) => sendRequest(API, '/login', 'POST', {
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
});

// Creates a new card on the server; resolves to the created card object (including its id)
const sendCard = (API, token, cardData) => sendRequest(API, '', 'POST', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
});

// Deletes a card by id; resolves to the raw Response (check response.ok for success)
const deleteCard = (API, token, cardId) => sendRequest(API, `/${cardId}`, 'DELETE', {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});

// Fetches all cards for the authenticated user; resolves to an array of card objects
const getCards = (API, token) => sendRequest(API, ...[,,], {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});

// Fetches a single card by id; resolves to a card object
const getCard = (API, token, cardId) => sendRequest(API, `/${cardId}`, ...[,], {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});

// Updates a card by id; resolves to the updated card object
const editCard = (API, token, cardId, cardData) => sendRequest(API, `/${cardId}`, 'PUT', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
});

export { getToken, sendCard, deleteCard, getCards, getCard, editCard };
