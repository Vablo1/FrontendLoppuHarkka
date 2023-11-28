<script>
    export let note_text;

</script>

<div id="main_list_box">
    <div id="text_list_box">{note_text}</div>
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
        grid-template-columns: 100px auto;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.082);
    }
    #text_list_box {
        grid-column: 1/3;
    }
</style>