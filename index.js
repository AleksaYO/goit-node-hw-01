const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      return contacts;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      return contact;

    case "add":
      const newContac = await addContact(name, email, phone);
      console.log(newContac);
      break;

    case "remove":
      const newContacts = await removeContact(id);
      console.log(newContacts);
      return newContacts;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// Получить список контактов
// invokeAction({ action: "list" });

// Найти контакт по id
// invokeAction({ action: "get", id: "e6ywwRe4jcqxXfCZOj_1e" });

//Удалить контакт по id
// invokeAction({ action: "remove", id: "f2bd53f7-2619-4af3-ac81-3567b1000c91" });

// Добавить новый контакт
// invokeAction({
//   action: "add",
//   name: "Sam Winchester",
//   phone: "(123) 124-1234",
//   email: "Sam.winchester@gmail.com",
// });
