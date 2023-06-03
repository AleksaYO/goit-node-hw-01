const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return contacts;

    case "get":
      const contact = await getContactById(id);
      return contact;

    case "add":
      const newContact = await addContact(name, email, phone);
      return newContact;

    case "remove":
      const newContacts = await removeContact(id);
      return newContacts;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
