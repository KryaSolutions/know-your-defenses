import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Add smooth scrolling CSS to html element
        document.documentElement.style.scrollBehavior = "smooth";

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

    const scrollToSection = (event: React.MouseEvent, sectionId: string) => {
        event.preventDefault();
        const section = document.querySelector(sectionId) as HTMLElement;
        if (section) {
            // Calculate offset to account for fixed navbar
            const navbarHeight = 80; // h-20 = 80px
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md bg-white/5 transition-transform duration-300 shadow-lg ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a
                            href="https://kryasolutions.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity duration-200"
                        >
                            <img
                                src="/krya.svg"
                                alt="Krya Logo"
                                className="h-10 sm:h-12 w-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="https://kyd.kryasolutions.com/newsletters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            CyberSec Insights
                        </a>
                        <a
                            href="#calcs-section"
                            onClick={(e) => scrollToSection(e, "#calcs-section")}
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            SecOps
                        </a>
                        <a
                            href="#survey-section"
                            onClick={(e) => scrollToSection(e, "#survey-section")}
                            className="text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium"
                        >
                            Know Your Defenses
                        </a>
                        <button
                            onClick={(e) => scrollToSection(e, "#contact-section")}
                            className="bg-[var(--brand-orange)] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Contact Us
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 backdrop-blur-md bg-white/5">
                    <div className="px-4 py-4 space-y-3">
                        <a
                            href="https://kyd.kryasolutions.com/newsletters"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium py-2"
                        >
                            CyberSec Insights
                        </a>
                        <a
                            href="#calcs-section"
                            onClick={(e) => scrollToSection(e, "#calcs-section")}
                            className="block text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium py-2"
                        >
                            SecOps
                        </a>
                        <a
                            href="#survey-section"
                            onClick={(e) => scrollToSection(e, "#survey-section")}
                            className="block text-white hover:text-[var(--brand-orange)] transition-colors duration-200 font-medium py-2"
                        >
                            Know Your Defenses
                        </a>
                        <button
                            onClick={(e) => scrollToSection(e, "#contact-section")}
                            className="w-full bg-[var(--brand-orange)] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
