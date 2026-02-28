import { getToken, sendCard, deleteCard, getCards, editCard } from "./functions/send-request.js";
import { ModalLogin, ModalAddCard, ModalEditCard } from "./classes/modal.js";
import { renderCards, noItems, renderNewCard } from "./classes/cards.js";
import formToObj from "./functions/form-to-obj.js";
import dragAndDrop from "./functions/drag-and-drop.js";
import searchFilter from "./functions/search-filter.js";

const API = "https://ajax.test-danit.com/api/v2/cards";
let visitsCollection = [];

let entryModal;
let keyToken;
let newVisitModal;
let editVisitModal;

// --- UI helpers ---

function showAuthenticatedUI() {
  document.querySelector("#entry-btn").classList.add("hidden");
  document.querySelector("#visit-btn").classList.remove("hidden");
  document.querySelector("#logout-btn").classList.remove("hidden");
  document.querySelector("#sorting-form").classList.remove("hidden");
}

// --- Event handlers ---

function handleLoginBtnClick() {
  entryModal = new ModalLogin();
  entryModal.render();
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const login = document.querySelector("#inputEmail").value;
  const password = document.querySelector("#inputPassword").value;

  if (!login.includes("@") || !password) {
    entryModal.invalid();
    return;
  }

  try {
    const token = await getToken(API, login, password);
    if (token && typeof token !== "object") {
      localStorage.setItem("token", token);
      keyToken = localStorage.getItem("token");
      entryModal.close();
    } else {
      entryModal.invalid();
    }
  } catch (err) {
    console.error(err.message);
  }

  if (!keyToken) return;

  showAuthenticatedUI();

  const cardsList = await getCards(API, keyToken);
  localStorage.setItem("allVisits", JSON.stringify(cardsList));
  visitsCollection = JSON.parse(localStorage.getItem("allVisits"));

  searchFilter(visitsCollection);
  renderCards(visitsCollection);
  noItems(visitsCollection);
}

function handleNewVisitBtnClick() {
  newVisitModal = new ModalAddCard();
  newVisitModal.render();
}

async function handleCreateVisit(e) {
  e.preventDefault();
  const form = document.querySelector("#newVisitForm");
  form.classList.add("was-validated");
  if (!form.checkValidity()) return;

  const visitData = formToObj(new FormData(form));
  visitData.status = "Open";
  newVisitModal.close();

  const card = await sendCard(API, keyToken, visitData);
  visitsCollection.push(card);
  localStorage["allVisits"] = JSON.stringify(visitsCollection);
  renderNewCard(card);
}

async function handleDeleteCard(e) {
  const card = e.target.closest(".visit-card");
  const cardId = card.getAttribute("data-id");

  const response = await deleteCard(API, keyToken, cardId);
  if (!response) return;

  const cardIndex = visitsCollection.findIndex((v) => v.id == cardId);
  if (cardIndex !== -1) {
    visitsCollection.splice(cardIndex, 1);
    localStorage["allVisits"] = JSON.stringify(visitsCollection);
  }
  card.remove();
  noItems(visitsCollection);
}

function handleEditBtnClick(e) {
  const visit = visitsCollection.find(
    (v) => v.id === +e.target.closest(".visit-card").dataset.id
  );
  editVisitModal = new ModalEditCard(visit);
  editVisitModal.render();
}

async function handleSaveChanges(e) {
  e.preventDefault();
  const form = document.querySelector("#editVisitForm");
  form.classList.add("was-validated");
  if (!form.checkValidity()) return;

  const visitData = formToObj(new FormData(form));
  visitData.status = "Open";
  editVisitModal.close();

  const card = await editCard(API, keyToken, editVisitModal.id, visitData);

  const index = visitsCollection.findIndex((v) => v.id === card.id);
  visitsCollection[index] = card;
  localStorage["allVisits"] = JSON.stringify(visitsCollection);

  document.querySelectorAll(".visit-card").forEach((el) => {
    if (+el.dataset.id === card.id) el.remove();
  });
  renderNewCard(card);
}

function handleLogout() {
  localStorage.clear();
  location.reload();
}

function handleShowMore(e) {
  e.target.closest(".visit-card").classList.toggle("card-border-radius");
  e.target.closest(".visit-card").classList.toggle("card-z-index");
}

async function handleStatusDone(e) {
  const card = e.target.closest(".visit-card");
  const cardAction = card.querySelector("#card-action");
  const cardId = +card.getAttribute("data-id");
  const cardStatus = card.querySelector(".card-status");
  const visitData = visitsCollection.find((v) => v.id === cardId);
  visitData.status = "Done";

  const updatedCard = await editCard(API, keyToken, cardId, visitData);
  cardStatus.innerHTML = "Status: Done";
  e.target.classList.add("btnDone");
  cardAction.classList.add("justify-content-end");
  const index = visitsCollection.findIndex((v) => v.id === cardId);
  visitsCollection[index] = updatedCard;
  localStorage["allVisits"] = JSON.stringify(visitsCollection);
}

// --- Initialisation ---

window.addEventListener("load", () => {
  keyToken = localStorage.getItem("token");
  if (!keyToken) return;

  showAuthenticatedUI();
  visitsCollection = JSON.parse(localStorage.getItem("allVisits"));
  searchFilter(visitsCollection);
  renderCards(visitsCollection);
  noItems(visitsCollection);
});

// Single delegated click handler — dispatches to named handlers above
document.addEventListener("click", async (e) => {
  if (e.target.id === "entry-btn")       return handleLoginBtnClick();
  if (e.target.id === "login-btn")       return handleLoginSubmit(e);
  if (e.target.id === "visit-btn")       return handleNewVisitBtnClick();
  if (e.target.id === "create-btn")      return handleCreateVisit(e);
  if (e.target.id === "deleteBtn")       return handleDeleteCard(e);
  if (e.target.id === "editBtn")         return handleEditBtnClick(e);
  if (e.target.id === "saveChanges-btn") return handleSaveChanges(e);
  if (e.target.id === "logout-btn")      return handleLogout();
  if (e.target.id === "showMore")        return handleShowMore(e);
  if (e.target.id === "statusDone")      return handleStatusDone(e);
});

dragAndDrop();
