// Business Logic for AddressBook ---------

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------

function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.mAddress = {};
  this.currentId = 0;
  
}

Contact.prototype.addAddress = function(address) {
  address.id = this.assignId();
  this.mAddress[address.id] = address;
};

Contact.prototype.assignId = function() { 
  this.currentId += 1;
  return this.currentId;
};

Contact.prototype.findAddress = function(id) {
  if (this.mAddress[id] !== undefined) {
    return this.mAddress[id];
  }
  return false;
};

Contact.prototype.deleteAddress = function(id) {
  if (this.mAddress[id] === undefined) {
    return false;
  }
  delete this.mAddress[id];
  return true;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// Physical Address Business Logic

function Address(place, streetAddress, city, state, zipCode) {
  this.place = place
  this.streetAddress = streetAddress;
  this.city = city;
  this.state = state;
  this.zipCode = zipCode;
}

Address.prototype.place = function() {
  return this.place;
};

// User Interface Logic ---------

let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function listAddress(addressToDisplay) {
  let addressDiv = document.getElementById("address");
  addressDiv.innerText = "";
  const ul = document.createElement("ul");
  Object.keys(addressToDisplay.mAddress).forEach(function(key) {
    const address = addressToDisplay.findAddress(key);
    const li = document.createElement("li");
    li.append(address.place());
    li.setAttribute("id", address.id);
    ul.append(li);
  });
  addressDiv.append(ul)
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  // const address = contact.findAddress(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email").innerText = contact.emailAddress;
  listAddress(contact);
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailAddress = document.querySelector("input#new-email").value;
  const inputtedAddressType = document.querySelector("input#new-address-type").value;
  const inputtedStreetAddress = document.querySelector("input#new-address-streetAddress").value;
  const inputtedCity = document.querySelector("input#new-address-city").value;
  const inputtedState = document.querySelector("input#new-address-state").value;
  const inputtedZip = document.querySelector("input#new-address-zipCode").value;
  let newAddress = new Address(inputtedAddressType, inputtedStreetAddress, inputtedCity, inputtedState, inputtedZip);
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
  newContact.addAddress(newAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email").value = null;
  document.querySelector("input#new-address-type").value = null;
  document.querySelector("input#new-address-streetAddress").value = null;
  document.querySelector("input#new-address-city").value = null;
  document.querySelector("input#new-address-state").value = null;
  document.querySelector("input#new-address-zipCode").value = null;
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});