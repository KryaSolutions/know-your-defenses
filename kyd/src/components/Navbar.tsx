import { useState, useEffect } from "react";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const scrollToSection = (sectionId: string) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-[var(--brand-blue)] border-b border-white/10 backdrop-blur-sm transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a
                            href="https://kryasolutions.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/krya.svg"
                                alt="Krya Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <a
                            href="https://kyd.kryasolutions.com/newsletters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            CyberSec Insights
                        </a>
                        <button
                            onClick={() => scrollToSection("#calcs-section")}
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            SecOps
                        </button>
                        <button
                            onClick={() => scrollToSection("#survey-section")}
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            Know Your Defenses
                        </button>
                        <button
                            onClick={() => scrollToSection("#contact-section")}
                            className="bg-[var(--brand-orange)] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
