<script lang="ts">
    import Router from "svelte-spa-router";
    import Newsletters from "./routes/Newsletters.svelte";
    const routes = {
        "/newsletters": Newsletters,
    };
</script>

<main>
    <Router {routes} useHash={true} />
</main>
