"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackTicketClick } from "@/lib/shared/analytics";

export default function Popup() {
  const pathname = usePathname();
  const segment = pathname.split("/").find(Boolean);
  const yearFromPath = segment && /^\d{4}$/.test(segment) ? segment : new Date().getFullYear().toString();

  useEffect(() => {
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-popup");
    const noThanksBtn = document.querySelector(".no-thanks");

    if (popup) {
      setTimeout(() => {
        popup.style.display = "flex";
      }, 100);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (popup) {
          popup.style.display = "none";
        }
      });
    }

    if (noThanksBtn) {
      noThanksBtn.addEventListener("click", () => {
        if (popup) {
          popup.style.display = "none";
        }
      });
    }

    return () => {
      if (closeBtn) {
        closeBtn.removeEventListener("click", () => {});
      }
      if (noThanksBtn) {
        noThanksBtn.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" id="close-popup">
          ×
        </span>
        <div className="popup-icon">
          <img src="/assets/img/logo/popup-logo.png" alt="" />
        </div>
        <div className="space32" />
        <div className="heading2">
          <h2>Grow your business with our agency</h2>
          <div className="space8" />
          <ul>
            <li>
              <img src="/assets/img/icons/check3.svg" alt="Elevate User Experience Expertise" />
              Elevate User Experience Expertise
            </li>
            <li>
              <img src="/assets/img/icons/check3.svg" alt="Elevate Your UI/UX Skills Designer" /> Elevate Your UI/UX Skills Designer
            </li>
            <li>
              <img src="/assets/img/icons/check3.svg" alt="Join Leading UI/UX Event the Year" />
              Join Leading UI/UX Event the Year
            </li>
          </ul>
        </div>
        <div className="space50" />
        <Link className="vl-btn2" href="/contact" onClick={() => trackTicketClick("popup", yearFromPath)}>
          <span className="demo">Buy Ticket Now</span>
          <span className="arrow">
            <i className="fa-solid fa-arrow-right" />
          </span>
        </Link>
        <p className="no-thanks">No thanks</p>
      </div>
    </div>
  );
}
