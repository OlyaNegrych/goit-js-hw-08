import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const inputEmail = document.querySelector('[name="email"]');
const textarea = document.querySelector('[name="message"]');
const formData = {};
const STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', throttle(gatherDataFn, 500));
form.addEventListener("submit", onFormSubmit);

populateEmailOutput();
populateMassageOutput();

function gatherDataFn(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
}

function onFormSubmit(evt) {
    evt.preventDefault();
    const formDataForConsole = new FormData(evt.currentTarget);

    formDataForConsole.forEach((name, value) => {
        formData[value] = name;
    })

    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    evt.currentTarget.reset();
}

function populateEmailOutput() {
 const savedEmail = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedEmail) {
      inputEmail.value = savedEmail.email;
    }
}

function populateMassageOutput() {
 const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage) {
      textarea.value = savedMessage.message;
    }
}
