import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#F63232] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(246,50,50,0.4)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      title="Back to top"
    >
      <FiArrowUp className="text-xl" />
    </button>
  );
}

export default BackToTop;
