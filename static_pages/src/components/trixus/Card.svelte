<script lang="ts">
    export let title: string = "";
    export let description: string = "";
</script>

<div class="w-full max-w-3xl mx-auto py-8">
    <h2
        class="text-transparent text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-4"
    >
        {title}
    </h2>

    <p
        class="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed tracking-wide text-justify"
    >
        {description}
    </p>
</div>
