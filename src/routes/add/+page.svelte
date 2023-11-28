<script>
    import { Courses } from '@components/Courses.js';
    import { Notes } from '@components/Notes.js';
    import ListBoxSimple from '@components/ListBoxSimple.svelte';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    Courses.useLocalStorage();
    Notes.useLocalStorage();

    const added_courses = writable([]);

    let input_text;

    function AddToList() {

        if(!input_text.replace(/\s+/g, '') ?? '')
        {
            return
        }

        const current_courses = get(Courses);

        let max = 0;

        for(let i = 0; i < current_courses.length; i++) {
            if(current_courses[i].id > max) max = current_courses[i].id;
            if(current_courses[i].name == input_text) return;
        }

        const new_course = {
            id: max+1,
            name: input_text
        }

        if(current_courses.length > 0)
        {
            Courses.set(current_courses.concat(new_course));
        }
        else
        {
            Courses.set([new_course]);
        }
        
        added_courses.update(list => [...list, new_course]);
    }

</script>


<p>Add courses</p>
<textarea type="text" id="course_input" bind:value={input_text}/><br>
<button on:click={AddToList}>save</button>

{#each $added_courses as course}
    <ListBoxSimple note_text={`Opintojakso ${course.name} lisätty id:llä ${course.id}`}/>
{/each}


<style>
    textarea {
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