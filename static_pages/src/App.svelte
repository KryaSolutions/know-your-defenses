<script lang="ts">
    import Router from "svelte-spa-router";
    import Newsletters from "./routes/Newsletters.svelte";
    import Trixus from "./routes/Trixus.svelte";
    const routes = {
        "/newsletters": Newsletters,
        "/trixus": Trixus,
    };
</script>

<main>
    <Router {routes} useHash={true} />
</main>
