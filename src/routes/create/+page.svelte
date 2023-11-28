<script>
    import { Courses } from '@components/Courses.js';
    import { Notes } from '@components/Notes.js';
    import ListBoxSimple from '@components/ListBoxSimple.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    Courses.useLocalStorage();
    Notes.useLocalStorage();

    let selected_course_name;
    let input_note;

    let select_obj;

    const added_list = writable([]); 

    function AddNote() {

        if(!input_note ?? '') return

        select_obj.disabled = true;

        const current_Notes = get(Notes);

        let selected_course = get(Courses).find(current_courses => current_courses.name === selected_course_name);

        let max = 0;

        current_Notes.forEach(note => {
            if(note.id > max)
            {
                max = note.id;
            }
        });

        const temp_added_list = get(added_list)

        temp_added_list.forEach(note => {
            if(note.id > max)
            {
                max = note.id;
            }
        });

        let new_note = {
            id: max+1,
            text: input_note,
            course: selected_course,
            timestamp: GetTime()
        };

        input_note = '';
        added_list.update(list => [...list, new_note]);
    }

    function GetTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    function SaveNotes() {
        let current_notes = get(Notes);
        
        Notes.set(current_notes.concat(get(added_list)))

        added_list.set([])
        select_obj.disabled = false;
        input_note = '';
    }
</script>

<p>Add new notes to course</p><br>

<label for="courses_dropdown_list">Course: </label>
<select name="Courses" id="courses_dropdown_list" bind:value={selected_course_name} bind:this={select_obj}>
    {#if $Courses && $Courses.length > 0}
        {#each $Courses as course}
        <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
        {/each}    
    {/if}
</select><br>

<textarea name="note_input" id="note_input" bind:value={input_note}/>

<button on:click={AddNote}>Add</button>
<button on:click={SaveNotes}>Save</button><br>

{#each $added_list as note }
    <ListBoxSimple note_text={note.text}/>
{/each}

<style>
    #courses_dropdown_list {
        text-align: right;
    }
    #note_input {
        display: block;
        width: 40%;
        height: 100px;
        margin: 10px 0;
        border-width: 0;
        resize: none;
        font-family: 'Roboto', sans-serif;
        border: none;
        outline: none;
        background-color: rgb(156, 156, 156);
    }
</style>