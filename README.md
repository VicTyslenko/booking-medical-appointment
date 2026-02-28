# Booking Medical Appointment

A vanilla JavaScript single-page application for managing medical appointment cards. Users can create, edit, delete, filter and drag-and-drop appointment cards for three types of doctors — with all data persisted via a REST API.

---

## Features

- **Authentication** — token-based login/logout via external API
- **Appointment cards** — create cards for three doctor types, each with specialist-specific fields:
  - **Dentist** — date of last visit
  - **Therapist** — patient age
  - **Cardiologist** — systolic/diastolic pressure, BMI, cardiovascular diseases, age
- **CRUD operations** — create, read, update and delete cards
- **Status management** — mark appointments as Open or Done
- **Search & filter** — filter cards by title, status and urgency level (High / Middle / Low)
- **Drag & Drop** — reorder cards freely using Interact.js
- **LocalStorage caching** — token and card list cached locally for fast reload

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3, Bootstrap 5.2 |
| Logic | Vanilla JavaScript (ES6+) |
| Modules | ES Modules (`type="module"`) |
| OOP | ES6 Classes & Inheritance |
| HTTP | Fetch API |
| UI | Bootstrap 5, Font Awesome 6 |
| Drag & Drop | Interact.js |
| Storage | LocalStorage |

---

## Project Structure

```
booking-medical-appointment/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── index.js                  # App entry point — event delegation, flow control
│   ├── classes/
│   │   ├── cards.js              # Visit, VisitDentist, VisitTherapist, VisitCardiologist
│   │   └── modal.js              # Modal, ModalLogin, ModalAddCard, ModalEditCard
│   └── functions/
│       ├── send-request.js       # API calls (getToken, getCards, sendCard, editCard, deleteCard)
│       ├── search-filter.js      # Real-time search and filter logic
│       ├── drag-and-drop.js      # Interact.js drag & drop setup
│       └── form-to-obj.js        # FormData → plain object helper
└── img/
```

---

## Getting Started

No build step is required — the app runs directly in the browser using ES Modules.

1. Clone the repository:
   ```bash
   git clone https://github.com/VicTyslenko/booking-medical-appointment.git
   cd booking-medical-appointment
   ```

2. Serve the files with any static server, for example:
   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

3. Open `http://localhost:3000` (or whatever port your server uses) in your browser.

> **Note:** Opening `index.html` directly via `file://` will not work due to ES Module CORS restrictions. A local server is required.

---

## Usage

1. **Register** an account at: https://ajax.test-danit.com/front-pages/cards-register.html
2. **Log in** using the button in the header
3. Click **"Create new visit"** to add an appointment card
4. Choose a doctor type — the form will show the relevant fields
5. Use the **search bar**, **status** and **urgency** dropdowns to filter cards
6. **Drag** cards to rearrange them
7. Click **Done** on a card to mark it as completed
8. Use the **edit** (pencil) or **delete** (×) buttons on each card

---

## Team

This was a collaborative step project built by:

| Developer | Contributions |
|---|---|
| **Victor Tyslenko** | API integration, Modal classes, search/filter logic, general design |
| **Oleh Verbynskyi** | Modal window design, form validation |
| **Denys Herashchenko** | Card classes & design, LocalStorage logic, Drag & Drop |

---

## License

This project was built as an educational exercise and is open for learning purposes.
