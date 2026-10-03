import React from "react";
import { Link } from "@tanstack/react-router";
import { Move3d, ArrowRight, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export function Footer() {
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  const navLinkClass = "text-surface-foreground/65 transition-colors hover:text-surface-foreground";

  return (
    <footer className="border-t border-border/30 bg-surface-dark text-surface-foreground">
      {/* Top Banner CTA */}
      <div className="border-b border-border/20 bg-surface-elevated/40 px-5 py-12 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Engineering Co-Development
            </p>
            <h3 className="mt-1 font-display text-3xl uppercase tracking-tight text-surface-foreground sm:text-4xl">
              Tell Us What You're Building
            </h3>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-surface-foreground/60 sm:text-sm">
              From mechanical joint calculations to full automation cell integration, share your
              application requirements with our engineering team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-none bg-signal px-6 font-display text-sm uppercase tracking-wider text-signal-foreground hover:bg-signal/90"
            >
              <Link to="/contact/engineering-enquiry">
                Tell Us What You're Building <ArrowRight size={16} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleWhatsApp}
              className="h-12 rounded-none border-surface-foreground/25 bg-transparent px-5 font-display text-sm uppercase tracking-wider text-surface-foreground hover:bg-surface-elevated hover:text-signal"
            >
              <MessageSquare size={16} className="mr-2 text-signal" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">

          {/* PRODUCTS COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Products</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="/products/actuators" className={navLinkClass}>Actuators</a></li>
              <li><a href="/products/precision-reducers" className={navLinkClass}>Precision Reducers</a></li>
              <li><a href="/products/robotic-wheels" className={navLinkClass}>Robotic Wheels</a></li>
              <li><a href="/products/robotic-arms" className={navLinkClass}>Robotic Arms</a></li>
              <li><a href="/products/industrial-robots" className={navLinkClass}>Industrial Robots</a></li>
              <li><a href="/products/control-systems" className={navLinkClass}>Control Systems</a></li>
              <li className="pt-2">
                <Link to="/products" className="font-bold uppercase text-signal hover:underline">
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* SOLUTIONS COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Solutions</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="/solutions/factory-automation" className={navLinkClass}>Factory Automation</a></li>
              <li><a href="/solutions/robotic-automation" className={navLinkClass}>Robotic Automation</a></li>
              <li><a href="/solutions/motion-control" className={navLinkClass}>Motion Control</a></li>
              <li><a href="/solutions/mobile-robotics" className={navLinkClass}>Mobile Robotics</a></li>
              <li><a href="/solutions/smart-manufacturing" className={navLinkClass}>Smart Manufacturing</a></li>
              <li><a href="/solutions/material-handling" className={navLinkClass}>Material Handling</a></li>
              <li><a href="/solutions/custom-robotics" className={navLinkClass}>Custom Robotics</a></li>
            </ul>
          </div>

          {/* APPLICATIONS COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Applications</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="/applications/automotive" className={navLinkClass}>Automotive</a></li>
              <li><a href="/applications/electronics" className={navLinkClass}>Electronics</a></li>
              <li><a href="/applications/manufacturing" className={navLinkClass}>Manufacturing</a></li>
              <li><a href="/applications/warehousing" className={navLinkClass}>Warehousing</a></li>
              <li><a href="/applications/logistics" className={navLinkClass}>Logistics</a></li>
              <li><a href="/applications/food-packaging" className={navLinkClass}>Food &amp; Packaging</a></li>
              <li><a href="/applications/pharmaceuticals" className={navLinkClass}>Pharmaceuticals</a></li>
              <li><a href="/applications/inspection" className={navLinkClass}>Inspection &amp; Quality</a></li>
            </ul>
          </div>

          {/* TECHNOLOGY COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Technology</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="/technology/robotics" className={navLinkClass}>Robotics</a></li>
              <li><a href="/technology/motion-control" className={navLinkClass}>Motion Control</a></li>
              <li><a href="/technology/servo" className={navLinkClass}>Servo Technology</a></li>
              <li><a href="/technology/automation" className={navLinkClass}>Industrial Automation</a></li>
              <li><a href="/technology/sensors" className={navLinkClass}>Sensors &amp; Feedback</a></li>
              <li><a href="/technology/ai-robotics" className={navLinkClass}>AI Robotics</a></li>
              <li><a href="/technology/industry-4" className={navLinkClass}>Industry 4.0</a></li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Resources</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="/resources?type=catalogue" className={navLinkClass}>Catalogues</a></li>
              <li><a href="/resources?type=datasheet" className={navLinkClass}>Datasheets</a></li>
              <li><a href="/resources?type=app-note" className={navLinkClass}>Application Notes</a></li>
              <li><a href="/resources?type=case-study" className={navLinkClass}>Case Studies</a></li>
              <li><a href="/resources?type=article" className={navLinkClass}>Technical Articles</a></li>
              <li>
                <Link to="/resources/faqs" className={navLinkClass}>FAQs &amp; Knowledge Base</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY & CONTACT */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Company</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><Link to="/about" className={navLinkClass}>About Indus Robotics</Link></li>
              <li><Link to="/about/engineering" className={navLinkClass}>Engineering Approach</Link></li>
              <li><Link to="/careers" className={navLinkClass}>Careers &amp; Profiles</Link></li>
              <li><Link to="/contact" className={navLinkClass}>Contact Hub</Link></li>
              <li><Link to="/contact/engineering-enquiry" className={navLinkClass}>Engineering RFQ Form</Link></li>
              <li>
                <button
                  onClick={() => openModal("engineer")}
                  className={`text-left ${navLinkClass}`}
                >
                  Consult an Engineer
                </button>
              </li>
            </ul>

            <div className="mt-6 border-t border-border/20 pt-4 text-xs text-surface-foreground/60 space-y-2">
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-signal" />
                <span>{companyConfig.salesEmail}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface-foreground/15 pt-8 text-[11px] uppercase tracking-wider text-surface-foreground/45 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-6 place-items-center border border-signal text-signal">
              <Move3d size={14} />
            </span>
            <span>© 2026 Indus Robotics. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span>Precision</span>
            <span>Motion</span>
            <span>Control</span>
            <span>Reliability</span>
            <span>Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
