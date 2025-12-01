<script lang="ts">
    type Columns = {
        id: string;
        header: string;
        highlight?: boolean;
        isFeatureColumn?: boolean;
    };

    const columns: Columns[] = [
        {
            id: "feature",
            header: "",
            isFeatureColumn: true,
        },
        {
            id: "radiant",
            header: "RADIANT",
            highlight: true,
        },
        {
            id: "other",
            header: "Other AI SOC platforms",
        },
        {
            id: "soar",
            header: "SOAR",
        },
    ];

    type Rows = {
        feature: string;
        radiant: string;
        other: string;
        soar: string;
    };

    const rows: Rows[] = [
        {
            feature: "Automation",
            radiant: "Enrichment, triage, investigation, and response",
            other: "Enrichment, triage",
            soar: "Manual enrichment and response",
        },
        {
            feature: "Security use-case",
            radiant: "Agnostic",
            other: "6 types",
            soar: "Enrichment and response",
        },
        {
            feature: "Technology",
            radiant: "Adaptive security research agent",
            other: "Limited pre-training questions",
            soar: "Zapier for security",
        },
        {
            feature: "Alert types",
            radiant: "Any security tool",
            other: "Limited",
            soar: "Anything users define",
        },
        {
            feature: "Vendor support",
            radiant: "Any vendor",
            other: "Limited",
            soar: "100s of integrations",
        },
        {
            feature: "Incident response",
            radiant: "Any vendor",
            other: "Manual",
            soar: "Anything users define",
        },
        {
            feature: "Pricing",
            radiant: "Predictable, by security use-case",
            other: "By volume, unexpected billing surprise",
            soar: "Volume-based, by action ran",
        },
    ];
</script>

<div class="w-full overflow-x-auto">
    <table class="w-full border-collapse">
        <thead>
            <tr>
                {#each columns as column}
                    <th
                        class="p-6 text-left align-top {column.isFeatureColumn
                            ? 'w-48'
                            : ''} {column.highlight
                            ? 'bg-indigo-50'
                            : 'bg-white'}"
                    >
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl font-bold tracking-wide">
                                {#each column.header.split("") as char, i}
                                    <span
                                        class={i === 1
                                            ? "text-pink-500"
                                            : "text-gray-900"}
                                    >
                                        {char}
                                    </span>
                                {/each}
                            </span>
                        </div>
                        <div class="text-xl font-bold text-gray-900">
                            {column.header}
                        </div>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rows as row, rowIndex}
                <tr class="border-t border-gray-200">
                    {#each columns as column}
                        <td
                            class="p-6 align-top {column.isFeatureColumn
                                ? 'font-medium text-gray-900'
                                : 'text-gray-700'} {column.highlight &&
                            !column.isFeatureColumn
                                ? 'bg-indigo-50'
                                : 'bg-white'} {column.highlight &&
                            !column.isFeatureColumn &&
                            row[column.id]?.length > 50
                                ? 'bg-gray-100'
                                : ''}"
                        >
                            <div
                                class={column.isFeatureColumn
                                    ? "text-base"
                                    : "text-sm leading-relaxed"}
                            >
                                {row[column.id]}
                            </div>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
