<script>
    import { Notes } from '@components/Notes.js';
    import { get } from 'svelte/store';

    export let note_course;
    export let note_id;
    export let note_text;
    export let note_time;

    let date = new Date(note_time);
    let date2 = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    let output = note_course.replace(/[^a-zäö\s]/gi, "");
    output = output[0].toUpperCase() + output.slice(1);

    function delete_div(e) {
        let del_id = e.target.getAttribute('data');
        let current_list = get(Notes);
        let newlist = [];

        current_list.forEach(note => {
            if(del_id != note.id)
            {
                newlist.push(note);
            }
        });

        Notes.set(newlist);
    }

</script>

<div id="main_list_box">
    <div id="time_list_box">{date2}</div>
    <div id="course_list_box">{output} (id {note_id.slice(0,-1)})</div>
    <button id="course_list_delete" on:click={delete_div}><p data={note_id.slice(0,-1)}>x</p></button>
    <div id="text_list_box">{note_text.slice(0,-1)}</div>
</div>


<style>
    #main_list_box {
        border-radius: 5px;
        border-width: 3px;
        border-style: solid;
        margin-top: 10px;
        margin-bottom: 10px;
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-columns: 100px auto 20px;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.082);
    }
    #text_list_box {
        grid-column: 1/4;
        padding-top: 5px;
        word-break: break-all;
    }
    #course_list_delete {
        border: none;
        background: none;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        cursor: pointer;
    }
    #course_list_delete:hover {
        font-size: 30px;
    }
    #course_list_delete p{
        height: 20px;
        width: 20px;
        margin-top: 0;
        margin-bottom: 0;
        line-height: 20px;
    }
</style>