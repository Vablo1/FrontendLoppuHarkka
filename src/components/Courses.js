import { writable } from 'svelte/store';


const createLocalStore = (key) => {

  let value;
  if (typeof localStorage !== 'undefined')
  {
    value = JSON.parse(localStorage.getItem(key));
  }
  else
  {
    value = '';
  }
  

  const { subscribe, set } = writable(value);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      subscribe (current => {
        if (typeof localStorage !== 'undefined')
        {
          localStorage.setItem(key, JSON.stringify(current));
        }
      });
    }
  };
};

export const Courses = createLocalStore ('Courses');