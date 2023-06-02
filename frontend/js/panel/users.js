import { getAndShowAllUsers } from './funcs/users.js';
import { removeUser, banUser } from './funcs/users.js';

window.removeUser = removeUser;
window.banUser = banUser

window.addEventListener('load', () => {
	getAndShowAllUsers();
});
