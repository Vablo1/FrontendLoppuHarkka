<script>
    export let href;
    export let text;
</script>

<a href={href} class="box">
    {text}
</a>


<style>
    .box {
        display: inline-block;
        border: 1px solid black;
        border-radius: 3px;
        padding: 5px;
        text-decoration: none;
        color: #f1f1f1;
        background-color: #353535;
    }
    .box:hover {
        background-color: rgb(102, 102, 102);
    }
</style>