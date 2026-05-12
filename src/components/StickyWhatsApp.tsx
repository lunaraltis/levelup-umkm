"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { ContactSettings } from "@/lib/content-types";

export default function StickyWhatsApp({ contact }: { contact: ContactSettings }) {
  return (
    <>
      <Link
        href={`https://wa.me/${contact.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="sticky-wa"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky_mobile" })}
      >
        <MessageCircleMore size={20} />
        Chat WhatsApp
      </Link>

      <style jsx>{`
        .sticky-wa {
          position: fixed;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          z-index: 90;
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.95rem 1.25rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #111111, #2a2a2a);
          color: white;
          font-weight: 700;
          box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.35);
        }

        @media (max-width: 768px) {
          .sticky-wa {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
}
