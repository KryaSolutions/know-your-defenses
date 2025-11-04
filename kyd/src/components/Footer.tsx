import axios from "axios";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

const apiUrl: string =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_URL
        : import.meta.env.VITE_PROD_URL;

const Footer = () => {
    type FormData = {
        name: string;
        email: string;
        mobile: string;
        thought: string;
    };

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        mobile: "",
        thought: "",
    });

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await axios.post(`${apiUrl}/api/sendEmail`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            setStatus("success");
            setFormData({ name: "", email: "", mobile: "", thought: "" });
        } catch (error: any) {
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <footer
            id="contact-section"
            className="w-full bg-[var(--brand-blue)] py-12 px-6 text-white"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col justify-center text-center md:text-left space-y-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Protect your data, infrastructure, and operations.
                    </h2>
                    <p className="text-slate-200 text-lg">
                        Partner with{" "}
                        <span className="font-semibold text-white">
                            Krya Solutions
                        </span>{" "}
                        for end-to-end cyber protection tailored to your needs.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:justify-start justify-center gap-4 mt-2 text-slate-100">
                        <a
                            href="tel:+914466692727"
                            className="flex items-center justify-center gap-2 hover:text-[var(--brand-orange)] transition"
                        >
                            <Phone className="w-5 h-5" />
                            <span>+91 44 6669 2727</span>
                        </a>
                        <a
                            href="mailto:ks-info@kryasolutions.com"
                            className="flex items-center justify-center gap-2 transition hover:text-[var(--brand-orange)]"
                        >
                            <Mail className="w-5 h-5" />
                            <span>ks-info@kryasolutions.com</span>
                        </a>
                    </div>
                </div>

                {/* Right Section - Contact Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-xl font-semibold mb-4 text-white text-center md:text-left">
                        Contact Us
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1 text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:border-white text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:border-white text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-white">
                                Mobile No.
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:border-white text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-white">
                                Share your thoughts
                            </label>
                            <textarea
                                name="thought"
                                rows={4}
                                value={formData.thought}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:border-white text-white resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-[var(--brand-orange)] text-white py-2 rounded-md font-medium transition-transform duration-300 disabled:opacity-60 hover:scale-105"
                        >
                            {status === "loading"
                                ? "Sending..."
                                : status === "success"
                                  ? "Sent!"
                                  : "Submit"}
                        </button>

                        {status === "success" && (
                            <p className="text-green-400 text-sm text-center mt-2">
                                Message sent successfully!
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center mt-2">
                                Failed to send. Please try again.
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="mt-12 border-t border-slate-700 pt-4 text-center text-sm text-slate-300">
                © {new Date().getFullYear()} Krya Solutions. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;
