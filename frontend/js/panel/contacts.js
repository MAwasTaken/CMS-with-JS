import { getAndShowAllContacts, showContactBody } from './funcs/contacts.js';

window.showContactBody = showContactBody;

window.addEventListener('load', () => {
	getAndShowAllContacts();
});
