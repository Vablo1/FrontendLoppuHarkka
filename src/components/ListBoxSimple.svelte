<script>
    export let note_text;

</script>


<div id="text_list_box">{note_text}</div>


<style>
    #text_list_box {
        border-radius: 5px;
        border-width: 3px;
        border-style: solid;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.082);
        word-break: break-all;
    }
</style>