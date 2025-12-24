"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AddClassBody() {
  const pathname = usePathname();

  useEffect(() => {
    const bodyElement = document.querySelector("body");

    if (bodyElement) {
      // Remove all theme-specific classes
      bodyElement.classList.remove(
        "homepage1-body",
        "homepage2-body",
        "homepage3-body",
        "homepage4-body",
        "homepage5-body",
        "homepage6-body",
        "homepage7-body",
        "homepage8-body",
        "homepage9-body",
        "homepage10-body"
      );

      // Always use homepage8-body since we're using Header8/Footer8 globally
      // This ensures consistent styling across all pages
      const className = "homepage8-body";
      bodyElement.classList.add(className);
    }

    // Scroll to the top of the page with a slight delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // Optional for smooth scrolling
      });
    }, 0);
  }, [pathname]);

  return null;
}
