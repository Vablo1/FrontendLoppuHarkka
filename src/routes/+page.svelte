<script>
    import Linkbox from '@components/linkbox.svelte';
    import { Courses } from '@components/Courses.js';
    import { Notes } from '@components/Notes.js';
    import { get } from 'svelte/store';

    Courses.useLocalStorage();
    Notes.useLocalStorage();
</script>

  

{#if $Courses && $Courses.length > 0}
    <Linkbox href="/create" text="Create notes for class" />
{/if}

<Linkbox href="/list" text="List notes" />
<Linkbox href="/add" text="Add courses" />