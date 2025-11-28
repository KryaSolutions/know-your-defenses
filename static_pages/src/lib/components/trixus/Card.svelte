<script lang="ts">
    export let title: string = "";
    export let description: string = "";
</script>

<div class="w-full max-w-3xl mx-auto py-8">
    <h2
        class="text-(--brand-blue) text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
    >
        {title}
    </h2>

    <p
        class="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed tracking-wide text-justify"
    >
        {description}
    </p>
</div>
