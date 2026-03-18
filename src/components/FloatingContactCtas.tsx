import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/src/siteConfig";

const smsHref = `sms:${siteConfig.contactPhoneHref}`;

export function FloatingContactCtas() {
  return (
    <div className="floating-contact-shell" aria-label="Quick contact actions">
      <div className="floating-contact-mobile">
        <a href={`tel:${siteConfig.contactPhoneHref}`} className="floating-contact-action is-primary">
          <Phone size={18} strokeWidth={2.2} />
          <span>Call Peter</span>
        </a>
        <a href={smsHref} className="floating-contact-action is-secondary">
          <MessageCircle size={18} strokeWidth={2.2} />
          <span>Text Peter</span>
        </a>
      </div>

      <div className="floating-contact-desktop">
        <a href={`tel:${siteConfig.contactPhoneHref}`} className="floating-contact-action is-primary">
          <Phone size={18} strokeWidth={2.2} />
          <span>Call Peter</span>
        </a>
        <a href={smsHref} className="floating-contact-action is-secondary">
          <MessageCircle size={18} strokeWidth={2.2} />
          <span>Text Peter</span>
        </a>
      </div>
    </div>
  );
}
