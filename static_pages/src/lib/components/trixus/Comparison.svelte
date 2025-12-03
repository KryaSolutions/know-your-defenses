<script lang="ts">
    type Columns = {
        id: keyof Rows;
        header: string;
        highlight?: boolean;
        isFeatureColumn?: boolean;
    };

    const columns: Columns[] = [
        { id: "feature", header: "Feature", isFeatureColumn: true },
        { id: "krya", header: "Krya's SOC", highlight: true },
        { id: "others", header: "Other AI SOC platforms" },
    ];

    type Rows = {
        feature: string;
        krya: string;
        others: string;
    };

    const rows: Rows[] = [
        {
            feature: "Automation",
            krya: "Enrichment, triage, investigation, and response",
            others: "Enrichment, triage",
        },
        { feature: "Security use-case", krya: "Agnostic", others: "6 types" },
        {
            feature: "Technology",
            krya: "Adaptive security research agent",
            others: "Limited pre-training questions",
        },
        {
            feature: "Alert types",
            krya: "Any security tool",
            others: "Limited",
        },
        { feature: "Vendor support", krya: "Any vendor", others: "Limited" },
        { feature: "Incident response", krya: "Any vendor", others: "Manual" },
        {
            feature: "Pricing",
            krya: "Predictable, by security use-case",
            others: "By volume, unexpected billing surprise",
        },
    ];
</script>

<div class="w-full px-2 py-3">
    <div
        class="min-w-full inline-block rounded-lg overflow-hidden border border-gray-200 shadow-sm"
    >
        <table class="w-full border-collapse text-xs sm:text-sm">
            <thead>
                <tr>
                    {#each columns as column}
                        <th
                            class="px-2 py-2 text-center font-semibold text-slate-700 whitespace-nowrap
                            {column.isFeatureColumn ? 'w-28 sm:w-36' : ''}
                            {column.highlight
                                ? 'bg-indigo-50 text-(--brand-orange)'
                                : 'bg-white'}"
                        >
                            {column.header}
                        </th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each rows as row}
                    <tr class="border-t border-gray-200">
                        {#each columns as column}
                            <td
                                class="px-2 py-3 align-top whitespace-pre-line
                                {column.isFeatureColumn
                                    ? 'font-semibold text-(--brand-blue)'
                                    : 'text-(--slate-500)'}
                                {column.highlight && !column.isFeatureColumn
                                    ? 'bg-indigo-50'
                                    : 'bg-white'}"
                            >
                                {row[column.id]}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    table {
        table-layout: fixed; /* Forces compact sizing */
    }
</style>
