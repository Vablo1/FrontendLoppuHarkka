import { Courses } from './components/Courses.js';
import { Notes } from './components/Notes.js';
import { get } from 'svelte/store';

Courses.useLocalStorage();
Notes.useLocalStorage();

fetch ( 'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/notes')
  .then(response => response.json())
  .then(data => {

    if(Array.isArray(data))
    {
      data.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"text\",\"course\",\"timestamp\"]")
        {
          data.splice(index,1);
        }
      })
    }

    let notes = get(Notes);

    if(Array.isArray(notes))
    {
      notes.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"text\",\"course\",\"timestamp\"]")
        {
          notes.splice(index,1);
        }
      })
    }
    
    if(!Array.isArray(notes)) 
    {
      Notes.set(data);
    } 
    else if(Array.isArray(data))
    {
      data.forEach((item) => {
        if(!notes.some(dict => JSON.stringify(dict) === JSON.stringify(item)))
        {
          notes.push(item);
        }
      })
      Notes.set(notes);
    }
  })
  .catch(error => {
    if(!get(Notes)) Notes.set([]);
  });

fetch ( 'https://luentomuistiinpano-api.netlify.app:443/.netlify/functions/courses')
  .then(response => response.json())
  .then(data => {

    if(Array.isArray(data))
    {
      data.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"name\"]")
        {
          data.splice(index,1);
        }
      })
    }

    let courses = get(Courses);

    if(Array.isArray(courses))
    {
      courses.forEach((item, index) => {
        if(JSON.stringify(Object.keys(item)) !== "[\"id\",\"name\"]")
        {
          courses.splice(index,1);
        }
      })
    }

    if(!Array.isArray(courses)) 
    {
      Courses.set(data);
    } 
    else if(Array.isArray(data))
    {
      data.forEach((item) => {
        if(!courses.some(dict => JSON.stringify(dict) === JSON.stringify(item)))
        {
          courses.push(item);
        }
      })
      Courses.set(courses);
    }
  })
  .catch(error => {
    if(!get(Courses)) Courses.set([]);
  });