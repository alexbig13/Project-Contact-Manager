"use strict";
//data scructure
const contacts = new Map();
//the id for the users map and checks if the inputed user is valid
let id = 1;

//elements
//the search elements
const searchBar = document.getElementById("contact-search");
const dropDownOptionsDiv = document.getElementById("options");
//add-contact elements
const formAddContact = document.getElementById("add-contact-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const selecetType = document.getElementById("contact-type");
const addContactBtn = document.getElementById("add-contact-btn");
//contact list elements
const contactsElement = document.getElementById("contacts");

//messages element
const message = document.getElementById("message");
//sections btn's
const contactListSectionBtn = document.getElementById("contact-list-btn");
const searchSectionBtn = document.getElementById("search-contact-btn");
const addNewContactSectionBtn = document.getElementById("add-new-contact-btn");
//the sections elements
const searchSection = document.getElementById("search-contact-section");
const addContactSection = document.getElementById("add-contact-section");
const contactListSection = document.getElementById("contacts-list-section");
//general functions
function displayMessage(msg) {
  message.textContent = msg;
}
function displayAlert(txt, className) {
  message.classList.remove("hidden");
  displayMessage(txt);
  message.classList.add(className);
  setTimeout(() => {
    message.classList.remove(className);
    message.classList.add("hidden");
  }, 3000);
}
//navigation
function toggleSection({
  show: [showSection, showBtn, showBtn2],
  hide: [hideSection, hideSection2, hideBtn],
}) {
  showSection.classList.remove("hidden");
  showBtn.classList.remove("hidden");
  showBtn2.classList.remove("hidden");
  hideSection.classList.add("hidden");
  hideSection2.classList.add("hidden");
  hideBtn.classList.add("hidden");
}
contactListSectionBtn.addEventListener("click", () => {
  toggleSection({
    show: [contactListSection, searchSectionBtn, addNewContactSectionBtn],
    hide: [searchSection, addContactSection, contactListSectionBtn],
  });
});
searchSectionBtn.addEventListener("click", () => {
  toggleSection({
    show: [searchSection, contactListSectionBtn, addNewContactSectionBtn],
    hide: [addContactSection, contactListSection, searchSectionBtn],
  });
});
addNewContactSectionBtn.addEventListener("click", () => {
  toggleSection({
    show: [addContactSection, contactListSectionBtn, searchSectionBtn],
    hide: [contactListSection, searchSection, addNewContactSectionBtn],
  });
});
//add contact
function addContact(name, email, phone, address, type) {
  if (!name || phone.length !== 10 || !type) {
    displayAlert(
      "you need to fill the name , phone must be 10 digits and choose a type",
      "error",
    );
  } else {
    return {
      fullName: name,
      email: email,
      phone: phone,
      address: address,
      type: type,
    };
  }
}
addContactBtn.addEventListener("click", () => {
  const contact = addContact(
    fullName.value,
    email.value,
    phone.value,
    address.value,
    selecetType.value,
  );
  if (contact) {
    displayAlert("Contact Created", "success");
    //saves the contact
    contacts.set(id, contact);
    id++;
    displayContacts(contacts);
  }
});

//shows contacts in the contact list
function hideOrShowBtn({ show: [...btns], hide: [...btns2] }) {
  btns.forEach((btn) => btn.classList.remove("hidden"));
  btns2.forEach((btn) => btn.classList.add("hidden"));
}
function createElement(element) {
  return document.createElement(element);
}
function displayContacts(map) {
  contactsElement.innerHTML = "";
  if (map.size === 0) return;
  for (const [key, { fullName, phone, email, type, address }] of map) {
    const div = createElement("div");
    const span = createElement("span");
    const btnDelete = createElement("button");
    const btnEdit = createElement("button");
    const btnConfirm = createElement("button");
    const hr = createElement("hr");
    const inputName = createElement("input");
    const inputEmail = createElement("input");
    const inputPhone = createElement("input");
    const inputAddress = createElement("input");
    const selectTypeLoop = createElement("select");
    const optionOne = createElement("option");
    const optionTwo = createElement("option");
    const optionThree = createElement("option");
    const optionFour = createElement("option");
    const optionFive = createElement("option");
    const divBtns = createElement("div");
    const inputWrapper = createElement("div");

    optionOne.value = `work`;
    optionOne.innerHTML = `work`;
    optionTwo.value = `friend`;
    optionTwo.innerHTML = `friend`;
    optionThree.value = `family`;
    optionThree.innerHTML = `family`;
    optionFour.value = `other`;
    optionFour.innerHTML = `other`;
    optionFive.value = type;
    optionFive.innerHTML = type;
    selectTypeLoop.append(
      optionFive,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
    );
    span.classList.add("contact-wrapper");
    inputWrapper.classList.add("input-wrapper");
    divBtns.classList.add("div-btns");
    btnDelete.classList.add("btn");
    btnDelete.dataset.id = key;
    btnEdit.dataset.id = key;
    btnConfirm.dataset.id = key;
    btnDelete.innerHTML = `Delete`;
    btnEdit.classList.add("btn");
    btnEdit.innerHTML = "Edit";
    btnConfirm.classList.add("btn");
    btnConfirm.innerHTML = `confirm`;
    btnConfirm.classList.add("hidden");
    span.innerHTML = `
    Contact Name: ${fullName} <br>
     Contact Email:${email} <br>
     Contact Phone:${phone}<br>
     Contact Type:${type} <br>
     Contact Address:${address}`;

    div.appendChild(span);
    div.appendChild(divBtns);
    divBtns.appendChild(btnDelete);
    divBtns.appendChild(btnEdit);
    divBtns.appendChild(btnConfirm);
    div.appendChild(hr);
    contactsElement.appendChild(div);
    btnDelete.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      contacts.delete(Number(id));
      displayContacts(contacts);
      displayAlert("the contact has been deleted", "warning");
    });

    btnEdit.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      hideOrShowBtn({ show: [btnConfirm], hide: [btnEdit, btnDelete] });
      inputName.value = fullName;
      inputEmail.value = email;
      inputPhone.value = phone;
      inputAddress.value = address;

      span.innerHTML = "";
      inputWrapper.append(
        inputName,
        inputEmail,
        inputPhone,
        inputAddress,
        selectTypeLoop,
      );
      span.appendChild(inputWrapper);
    });
    btnConfirm.addEventListener("click", (e) => {
      hideOrShowBtn({ show: [btnEdit, btnDelete], hide: [btnConfirm] });
      const id = e.target.dataset.id;
      contacts.set(Number(id), {
        fullName: inputName.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        address: inputAddress.value,
        type: selectTypeLoop.value,
      });
      displayContacts(contacts);
      displayAlert("Contact updated", "success");
    });
  }
}

searchBar.addEventListener("keyup", () => {
  dropDownOptionsDiv.innerHTML = "";
  if (searchBar.value === "") return;

  for (const [key, { fullName, email, phone, address, type }] of contacts) {
    if (
      fullName.includes(searchBar.value) ||
      email?.includes(searchBar.value) ||
      phone?.includes(searchBar.value) ||
      address?.includes(searchBar.value) ||
      type.includes(searchBar.value)
    ) {
      dropDownOptionsDiv.innerHTML += `Contact Name: ${fullName} Contact Email:${email} Contact Phone:${phone} Contact Type:${type} Contact Address:${address} 
      `;
    }
  }
});
