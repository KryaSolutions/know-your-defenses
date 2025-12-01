import { useState, useMemo, useEffect } from "react";
import {
    Search,
    Filter,
    AlertCircle,
    Plus,
    Edit2,
    Trash2,
    TrendingUp,
    AlertTriangle,
    Target,
    Calendar,
} from "lucide-react";
import EmailDialog from "./EmailDialog";

const apiUrl: string =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_URL
        : import.meta.env.VITE_PROD_URL;

export interface Control {
    id: number;
    control: string;
    description: string;
    framework: string;
    status: string;
    priority: string;
    riskLevel: string;
    category: string;
    owner: string;
    dueDate: string;
}

import StatusBadge from "./compliance/StatusBadge";
import PriorityBadge from "./compliance/PriorityBadge";
import InsightCard from "./compliance/InsightCard";
import FilterDropdown from "./compliance/FilterDropdown";
import EmptyState from "./compliance/EmptyState";
import ControlModal from "./compliance/ControlModal";
import PieDonut from "./compliance/PieDonut";

const Compliance = () => {
    const [controls, setControls] = useState<Control[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        framework: "All",
        status: "All",
        priority: "All",
        riskLevel: "All",
        category: "All",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [editingControl, setEditingControl] = useState<Control | null>(null);

    useEffect(() => {
        setControls([]);
    }, []);

    const frameworks = [
        "All",
        "SOC 2",
        "ISO 27001",
        "GDPR",
        "HIPAA",
        "PCI DSS",
        "NIST CSF",
        "CIS Controls",
    ];
    const statuses = [
        "All",
        "Compliant",
        "Partial Gap",
        "Non-Compliant",
        "In-Progress",
        "Not Assessed",
    ];
    const priorities = ["All", "Critical", "High", "Medium", "Low"];
    const riskLevels = ["All", "Critical", "High", "Medium", "Low"];

    const categories = {
        "SOC 2": [
            "Access Control",
            "Data Security",
            "Monitoring",
            "Incident Management",
            "Governance",
            "Change Management",
        ],
        "ISO 27001": [
            "Access Control",
            "Asset Management",
            "Business Continuity",
            "Compliance Management",
            "Information Security Policy",
            "Human Resources Security",
            "Physical Security",
            "Supplier Relationships",
        ],
        GDPR: [
            "Privacy",
            "Data Management",
            "Data Security",
            "Incident Management",
            "Third Party",
            "Governance",
        ],
        HIPAA: [
            "Access Control",
            "Data Security",
            "Privacy",
            "Incident Management",
            "Risk Management",
            "Technical Security",
        ],
        "PCI DSS": [
            "Network Security",
            "Access Control",
            "Data Security",
            "Monitoring",
            "Compliance Management",
        ],
        "NIST CSF": ["Identify", "Protect", "Detect", "Respond", "Recover"],
        "CIS Controls": [
            "Inventory and Control of Assets",
            "Data Protection",
            "Access Control Management",
            "Continuous Vulnerability Management",
            "Incident Response",
            "Security Awareness and Training",
        ],
    };

    const filteredData = useMemo(() => {
        return controls.filter((item) => {
            const matchesSearch =
                searchTerm === "" ||
                item.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                item.owner.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFramework =
                filters.framework === "All" ||
                item.framework === filters.framework;
            const matchesStatus =
                filters.status === "All" || item.status === filters.status;
            const matchesPriority =
                filters.priority === "All" ||
                item.priority === filters.priority;
            const matchesRisk =
                filters.riskLevel === "All" ||
                item.riskLevel === filters.riskLevel;
            const matchesCategory =
                filters.category === "All" ||
                item.category === filters.category;
            return (
                matchesSearch &&
                matchesFramework &&
                matchesStatus &&
                matchesPriority &&
                matchesRisk &&
                matchesCategory
            );
        });
    }, [controls, searchTerm, filters]);

    const stats = useMemo(() => {
        const total = filteredData.length;
        return {
            compliant: filteredData.filter((d) => d.status === "Compliant")
                .length,
            partialGap: filteredData.filter((d) => d.status === "Partial Gap")
                .length,
            nonCompliant: filteredData.filter(
                (d) => d.status === "Non-Compliant"
            ).length,
            inProgress: filteredData.filter((d) => d.status === "In-Progress")
                .length,
            total,
        };
    }, [filteredData]);

    const insights = useMemo(() => {
        const total = controls.length;
        if (total === 0) return null;
        const criticalItems = controls.filter(
            (c) => c.priority === "Critical" && c.status !== "Compliant"
        ).length;
        const highRiskItems = controls.filter(
            (c) => c.riskLevel === "Critical" || c.riskLevel === "High"
        ).length;
        const overdueCtrls = controls.filter((c) => {
            const dueDate = new Date(c.dueDate);
            if (c.status === "Compliant") {
                return false;
            } else if (
                c.status === "In-Progress" ||
                c.status === "Partial Gap"
            ) {
                return dueDate < new Date();
            }
            return dueDate < new Date();
        }).length;
        const complianceRate = ((stats.compliant / total) * 100).toFixed(0);
        return {
            criticalItems,
            highRiskItems,
            overdueCtrls,
            complianceRate,
        };
    }, [controls, stats]);

    const handleAddControl = (controlData: Omit<Control, "id">) => {
        if (editingControl) {
            setControls((prev) =>
                prev.map((c) =>
                    c.id === editingControl.id
                        ? { ...controlData, id: c.id }
                        : c
                )
            );
            setEditingControl(null);
        } else {
            setControls((prev) => [
                ...prev,
                { ...controlData, id: Date.now() },
            ]);
        }
    };

    const handleEditControl = (control: Control) => {
        setEditingControl(control);
        setIsModalOpen(true);
    };

    const handleDeleteControl = (id: number) => {
        if (window.confirm("Are you sure you want to delete this control?")) {
            setControls((prev) => prev.filter((c) => c.id !== id));
        }
    };

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            framework: "All",
            status: "All",
            priority: "All",
            riskLevel: "All",
            category: "All",
        });
        setSearchTerm("");
    };

    const activeFilterCount = Object.values(filters).filter(
        (v) => v !== "All"
    ).length;

    const openModal = () => {
        setEditingControl(null);
        setIsModalOpen(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            setEditingControl(null);
        }, 500);
    };

    const modalAnimationClass = isClosing
        ? "animate-fadeOut"
        : "animate-fadeIn";

    return (
        <div className="min-h-screen bg-(--brand-blue) p-6 mt-20 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between animate-slideIn">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Compliance Gap Analysis
                        </h1>
                        <p className="text-white/60 mt-1">
                            Monitor and manage compliance controls across
                            frameworks
                        </p>
                    </div>

                    <div className="flex items-end gap-6">
                        <button
                            onClick={openModal}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-(--brand-orange) hover:scale-105 text-white rounded-lg font-medium transition duration-300 animate-fadeIn"
                        >
                            <Plus className="w-5 h-5" />
                            Add Control
                        </button>
                        <EmailDialog
                            triggerButtonText="Get an AI-powered Report"
                            title="Generate Your Efficiency Report"
                            onSubmit={() => {}}
                            apiRoute={`${apiUrl}/api/evaluateControls`}
                            blob={controls}
                        />
                    </div>
                </div>

                {/* Show empty state if no controls */}
                {controls.length === 0 ? (
                    <EmptyState onAddControl={openModal} />
                ) : (
                    <>
                        {/* Dashboard: Pie chart (left) + Insight cards (right) */}
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Actionable Insights
                            </h2>
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10 animate-slideIn">
                                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                    {/* Left: Pie / Donut chart */}
                                    <div className="w-full md:w-1/2 flex items-center justify-center animate-fadeIn">
                                        <div className="w-full max-w-sm">
                                            <PieDonut
                                                data={[
                                                    {
                                                        label: "Compliant",
                                                        value: stats.compliant,
                                                        color: "#10B981",
                                                    },
                                                    {
                                                        label: "Partial Gap",
                                                        value: stats.partialGap,
                                                        color: "#F59E0B",
                                                    },
                                                    {
                                                        label: "Non-Compliant",
                                                        value: stats.nonCompliant,
                                                        color: "#EF4444",
                                                    },
                                                    {
                                                        label: "In Progress",
                                                        value: stats.inProgress,
                                                        color: "#60A5FA",
                                                    },
                                                ]}
                                                height={260}
                                            />
                                            {/* Legend */}
                                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/80 animate-slideIn">
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="w-3 h-3 rounded"
                                                        style={{
                                                            background:
                                                                "#10B981",
                                                        }}
                                                    />{" "}
                                                    Compliant
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="w-3 h-3 rounded"
                                                        style={{
                                                            background:
                                                                "#F59E0B",
                                                        }}
                                                    />{" "}
                                                    Partial Gap
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="w-3 h-3 rounded"
                                                        style={{
                                                            background:
                                                                "#EF4444",
                                                        }}
                                                    />{" "}
                                                    Non-Compliant
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="w-3 h-3 rounded"
                                                        style={{
                                                            background:
                                                                "#60A5FA",
                                                        }}
                                                    />{" "}
                                                    In Progress
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right: 2x2 grid of Insight cards */}
                                    <div className="w-full md:w-1/2 animate-slideIn">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <InsightCard
                                                icon={AlertTriangle}
                                                title="Critical Priority Items"
                                                value={
                                                    insights?.criticalItems ?? 0
                                                }
                                                description="Non-compliant critical controls need immediate attention"
                                                color="text-red-400"
                                                className="animate-fadeIn"
                                            />
                                            <InsightCard
                                                icon={Target}
                                                title="High Risk Controls"
                                                value={
                                                    insights?.highRiskItems ?? 0
                                                }
                                                description="Controls with high or critical risk levels"
                                                color="text-orange-400"
                                                className="animate-slideIn"
                                            />
                                            <InsightCard
                                                icon={Calendar}
                                                title="Overdue Controls"
                                                value={
                                                    insights?.overdueCtrls ?? 0
                                                }
                                                description="Past due date and not yet compliant"
                                                color="text-purple-400"
                                                className="animate-fadeIn"
                                            />
                                            <InsightCard
                                                icon={TrendingUp}
                                                title="Compliance Rate"
                                                value={`${insights?.complianceRate ?? "0"}`}
                                                description="Overall compliance across all controls"
                                                color="text-emerald-400"
                                                className="animate-slideIn"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-4 animate-fadeIn">
                            <div className="relative animate-slideIn">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Search by control ID, description, or owner..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                                />
                            </div>
                            <div className="flex flex-wrap gap-3 animate-slideIn">
                                <FilterDropdown
                                    label="Framework"
                                    value={filters.framework}
                                    options={frameworks}
                                    onChange={(val: string) =>
                                        handleFilterChange("framework", val)
                                    }
                                    icon={Filter}
                                />
                                <FilterDropdown
                                    label="Status"
                                    value={filters.status}
                                    options={statuses}
                                    onChange={(val: string) =>
                                        handleFilterChange("status", val)
                                    }
                                    icon={Filter}
                                />
                                <FilterDropdown
                                    label="Priority"
                                    value={filters.priority}
                                    options={priorities}
                                    onChange={(val: string) =>
                                        handleFilterChange("priority", val)
                                    }
                                    icon={Filter}
                                />
                                <FilterDropdown
                                    label="Risk"
                                    value={filters.riskLevel}
                                    options={riskLevels}
                                    onChange={(val: string) =>
                                        handleFilterChange("riskLevel", val)
                                    }
                                    icon={Filter}
                                />
                                <FilterDropdown
                                    label="Frameworks"
                                    value={filters.category}
                                    options={Object.keys(categories)}
                                    onChange={(val: string) =>
                                        handleFilterChange("category", val)
                                    }
                                    icon={Filter}
                                />
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/80 transition-colors animate-fadeIn"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                            <div className="text-white/60 text-sm animate-slideIn">
                                Showing{" "}
                                <span className="text-white font-medium">
                                    {filteredData.length}
                                </span>{" "}
                                of{" "}
                                <span className="text-white font-medium">
                                    {controls.length}
                                </span>{" "}
                                controls
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden animate-fadeIn">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5 border-b border-white/10 animate-slideIn">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Control
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Framework
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Priority
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Owner
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Due Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {filteredData.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-white/5 transition-colors animate-slideIn"
                                                style={{
                                                    animationDelay: `${index * 0.05}s`,
                                                }}
                                            >
                                                <td className="px-4 py-3 text-sm font-mono text-white animate-fadeIn">
                                                    {item.control}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white/80 max-w-xs truncate">
                                                    {item.description}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white/80">
                                                    {item.framework}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white/60">
                                                    {item.category}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <StatusBadge
                                                        status={item.status}
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <PriorityBadge
                                                        priority={item.priority}
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white/80">
                                                    {item.owner}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-white/60">
                                                    {item.dueDate}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEditControl(
                                                                    item
                                                                )
                                                            }
                                                            className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors animate-fadeIn"
                                                            title="Edit control"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteControl(
                                                                    item.id
                                                                )
                                                            }
                                                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors animate-slideIn"
                                                            title="Delete control"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredData.length === 0 && (
                                <div className="py-12 text-center animate-fadeIn">
                                    <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-3 animate-slideIn" />
                                    <p className="text-white/60">
                                        No controls match your filters
                                    </p>
                                    <button
                                        onClick={resetFilters}
                                        className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/80 transition-colors animate-fadeIn"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Add/Edit Modal */}
                <ControlModal
                    isOpen={isModalOpen || isClosing}
                    onClose={closeModal}
                    onSave={handleAddControl}
                    control={editingControl}
                    frameworks={frameworks}
                    statuses={statuses}
                    priorities={priorities}
                    riskLevels={riskLevels}
                    categories={categories}
                    animationClass={modalAnimationClass}
                />
            </div>
        </div>
    );
};

export default Compliance;
