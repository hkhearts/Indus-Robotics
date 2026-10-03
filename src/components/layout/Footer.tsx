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
            <h4 className="font-display text-base uppercase tracking-wider text-signal">
              Products
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/products/actuators"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Actuators
                </Link>
              </li>
              <li>
                <Link
                  to="/products/precision-reducers"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Precision Reducers
                </Link>
              </li>
              <li>
                <Link
                  to="/products/robotic-wheels"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Robotic Wheels
                </Link>
              </li>
              <li>
                <Link
                  to="/products/robotic-arms"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Robotic Arms
                </Link>
              </li>
              <li>
                <Link
                  to="/products/industrial-robots"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Industrial Robots
                </Link>
              </li>
              <li>
                <Link
                  to="/products/control-systems"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Control Systems
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/products" className="font-bold uppercase text-signal hover:underline">
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* SOLUTIONS COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/solutions/factory-automation"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Factory Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/robotic-automation"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Robotic Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/motion-control"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Motion Control
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/mobile-robotics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Mobile Robotics
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/smart-manufacturing"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Smart Manufacturing
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/material-handling"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Material Handling
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/custom-robotics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Custom Robotics
                </Link>
              </li>
            </ul>
          </div>

          {/* APPLICATIONS COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">
              Applications
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/applications/automotive"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Automotive
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/electronics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/manufacturing"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/warehousing"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Warehousing
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/logistics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Logistics
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/food-packaging"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Food & Packaging
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/pharmaceuticals"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Pharmaceuticals
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/inspection"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Inspection & Quality
                </Link>
              </li>
            </ul>
          </div>

          {/* TECHNOLOGY COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">
              Technology
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/technology/robotics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Robotics
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/motion-control"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Motion Control
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/servo"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Servo Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/automation"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Industrial Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/sensors"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Sensors & Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/ai-robotics"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  AI Robotics
                </Link>
              </li>
              <li>
                <Link
                  to="/technology/industry-4"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Industry 4.0
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">
              Resources
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/resources?type=catalogue"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Catalogues
                </Link>
              </li>
              <li>
                <Link
                  to="/resources?type=datasheet"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Datasheets
                </Link>
              </li>
              <li>
                <Link
                  to="/resources?type=app-note"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Application Notes
                </Link>
              </li>
              <li>
                <Link
                  to="/resources?type=case-study"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/resources?type=article"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Technical Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/faqs"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  FAQs & Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY & CONTACT */}
          <div>
            <h4 className="font-display text-base uppercase tracking-wider text-signal">Company</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link
                  to="/about"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  About Indus Robotics
                </Link>
              </li>
              <li>
                <Link
                  to="/about/engineering"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Engineering Approach
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Careers & Profiles
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Contact Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/contact/engineering-enquiry"
                  className="text-surface-foreground/65 transition-colors hover:text-surface-foreground"
                >
                  Engineering RFQ Form
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openModal("engineer")}
                  className="text-left text-surface-foreground/65 transition-colors hover:text-surface-foreground"
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
