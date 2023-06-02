import { getAndShowAllUsers } from './funcs/users.js';
import { removeUser } from './funcs/users.js';

window.removeUser = removeUser;

window.addEventListener('load', () => {
	getAndShowAllUsers();
});
