<script>
  import { Courses } from '@components/Courses.js';
  import { Notes } from '@components/Notes.js';
  import ListBox from '@components/ListBox.svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  Courses.useLocalStorage();
  Notes.useLocalStorage(); 

  let selected;
  
  let Selected_List = get(Notes);

  let Error_text;

  Notes.subscribe(value => {
    UpdateList();
  })
  onMount(() => {
    UpdateList();
  });
  function UpdateList() {
    let Full_list = get(Notes);
    let Temp_list = [];

    if(!Array.isArray(Full_list))
    {
      Full_list = [];
    }

    Full_list.forEach(note => {
      if(selected === 'all' || note.course.name === selected)
      {
        Temp_list.push(note);
      }
    });

    try {
      if(Temp_list.length == 0)
      {
        Error_text.innerText = 'Ei muistiinpanoja!';
      }
      else
      {
        Error_text.innerHTML = '';
      }
    } catch {}

    Selected_List = Temp_list;
  }
</script>

<label for="notes_dropdown_list">Course: </label>
<select name="Courses" id="notes_dropdown_list" bind:value={selected} on:change={UpdateList}>
    <option value="all">All</option>
    {#if $Courses && $Courses.length > 0}
      {#each $Courses as course}
        <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
      {/each}
    {/if}
</select><br>

<p bind:this={Error_text}></p>

{#each Selected_List as note (note.id)}
  <ListBox note_course={note.course.name}, note_id={note.id}, note_text={note.text}, note_time={note.timestamp} />
{/each}

<style>
  #notes_dropdown_list {
    text-align: right;
  }
</style>