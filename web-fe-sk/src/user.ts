import { writable } from 'svelte/store';

type userType = {
  firstname: string;
  lastname: string;
};
const user = writable<userType | null>(null);

export default user;
