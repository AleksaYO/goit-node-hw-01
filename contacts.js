const path = require("path");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

// Функцияя получения полного списка контактов
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } else {
    console.log("Номер с таким id не найден");
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  // Добавил такое условие, иначе код зацикливаеться и постоянно добавляет один и тот же обьект
  if (contacts.some((item) => item.phone === newContact.phone)) {
    console.log("Такой контакт уже существует");
    return;
  } else {
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
