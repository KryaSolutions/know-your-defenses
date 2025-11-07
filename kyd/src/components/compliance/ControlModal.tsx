import React, { useState } from "react";
import type { Control } from "../Compliance";

type NewControl = Omit<Control, "id">;

interface ControlModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (controlData: NewControl) => void;
    control: Control | null;
    frameworks: string[];
    statuses: string[];
    priorities: string[];
    riskLevels: string[];
    categories: {
        [category: string]: string[];
    };
    animationClass?: string;
}

const ControlModal: React.FC<ControlModalProps> = ({
    isOpen,
    onClose,
    onSave,
    control,
    frameworks,
    statuses,
    priorities,
    riskLevels,
    categories,
    animationClass,
}) => {
    const getInitialCategory = (framework: string, category?: string) => {
        const frameworkCategories = categories[framework] || [];
        if (category && frameworkCategories.includes(category)) {
            return category;
        }
        return frameworkCategories[0] || "";
    };

    const initialForm: NewControl = control
        ? {
            control: control.control,
            description: control.description,
            framework: control.framework,
            category: getInitialCategory(control.framework, control.category),
            status: control.status,
            priority: control.priority,
            riskLevel: control.riskLevel,
            owner: control.owner,
            dueDate: control.dueDate,
        }
        : {
            control: "",
            description: "",
            framework: "SOC 2",
            category: getInitialCategory("SOC 2"),
            status: "Not Assessed",
            priority: "Medium",
            riskLevel: "Medium",
            owner: "",
            dueDate: "",
        };

    const [formData, setFormData] = useState<NewControl>(initialForm);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleChange = (field: keyof NewControl, value: string) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };
            if (field === "framework") {
                updated.category = getInitialCategory(value, prev.category);
            }
            return updated;
        });
    };

    const currentCategories = categories[formData.framework] || [];

    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${animationClass || ''}`}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {control ? "Edit Control" : "Add New Control"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">
                                    Control ID
                                </label>
                                <input
                                    type="text"
                                    value={formData.control}
                                    onChange={(e) =>
                                        handleChange("control", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                    placeholder="CTRL-0001"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Framework
                                </label>
                                <select
                                    value={formData.framework}
                                    onChange={(e) =>
                                        handleChange(
                                            "framework",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                >
                                    {frameworks
                                        .filter((f) => f !== "All")
                                        .map((f) => (
                                            <option
                                                key={f}
                                                value={f}
                                                className="text-gray-800 bg-white"
                                                style={{ color: "#0f172a" }}
                                            >
                                                {f}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                placeholder="Control requirement description"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        handleChange("category", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                    disabled={currentCategories.length === 0}
                                >
                                    {currentCategories.length > 0 ? (
                                        currentCategories.map((c) => (
                                            <option
                                                key={c}
                                                value={c}
                                                className="text-gray-800 bg-white"
                                                style={{ color: "#0f172a" }}
                                            >
                                                {c}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No categories available</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        handleChange("status", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                >
                                    {statuses
                                        .filter((s) => s !== "All")
                                        .map((s) => (
                                            <option
                                                key={s}
                                                value={s}
                                                className="text-gray-800 bg-white"
                                                style={{ color: "#0f172a" }}
                                            >
                                                {s}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) =>
                                        handleChange("priority", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                >
                                    {priorities
                                        .filter((p) => p !== "All")
                                        .map((p) => (
                                            <option
                                                key={p}
                                                value={p}
                                                className="text-gray-800 bg-white"
                                                style={{ color: "#0f172a" }}
                                            >
                                                {p}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Risk Level
                                </label>
                                <select
                                    value={formData.riskLevel}
                                    onChange={(e) =>
                                        handleChange(
                                            "riskLevel",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                >
                                    {riskLevels
                                        .filter((r) => r !== "All")
                                        .map((r) => (
                                            <option
                                                key={r}
                                                value={r}
                                                className="text-gray-800 bg-white"
                                                style={{ color: "#0f172a" }}
                                            >
                                                {r}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2">
                                    Owner
                                </label>
                                <input
                                    type="text"
                                    value={formData.owner}
                                    onChange={(e) =>
                                        handleChange("owner", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                    placeholder="Team or person name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) =>
                                        handleChange("dueDate", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--brand-blue)"
                                    placeholder="YYYY-MM-DD"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-(--brand-blue) hover:scale-105 text-white rounded-lg font-medium transition duration-300"
                            >
                                {control ? "Update Control" : "Add Control"}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-(--brand-blue) hover:scale-105 text-white rounded-lg font-medium transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ControlModal;
