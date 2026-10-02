import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect, type ReactNode } from "react";

import { ArrowRight, Search, MessageSquare, AlertTriangle, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import appCss from "../styles.css?url";

import { reportLovableError } from "../lib/lovable-error-reporting";

import { trackDigitalPresence } from "../trackDigitalPresence";

import { ModalProvider } from "@/components/modals/ModalContext";

import { GlobalModals } from "@/components/modals/GlobalModals";

import { Header } from "@/components/layout/Header";

import { Footer } from "@/components/layout/Footer";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

import { PageQuickBar } from "@/components/layout/PageQuickBar";

import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

import { RoboticsAssistant } from "@/components/chatbot/RoboticsAssistant";

import { companyConfig } from "@/data/config";

import { IntelligenceProvider, useIntelligence } from "@/components/intelligence/IntelligenceProvider";
import { GeoGreetingBar } from "@/components/intelligence/GeoGreetingBar";
import { WelcomeBanner } from "@/components/intelligence/WelcomeBanner";
import { ChatBot } from "@/components/intelligence/ChatBot";
import { ExitIntentPopup } from "@/components/intelligence/ExitIntentPopup";
import { ThemeToggle } from "@/components/intelligence/ThemeToggle";

/* =====================================================
   PROFESSIONAL 404 COMPONENT
===================================================== */

function NotFoundComponent() {
  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({
        type: "general",
      }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-lg border border-border bg-card p-8 text-center shadow-xl sm:p-12">
        <span className="font-display text-7xl font-bold text-signal">404</span>

        <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you're looking for may have moved, been renamed, or no longer exists on the INDUS
          digital engineering platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
          >
            <Link to="/">
              <Home size={14} className="mr-1.5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-none border-border font-bold uppercase"
          >
            <Link to="/products">
              Explore Products
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-none border-border font-bold uppercase"
          >
            <Link to="/search">
              <Search size={14} className="mr-1.5" />
              Search
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={handleWhatsApp}
            className="rounded-none border-border font-bold uppercase"
          >
            <MessageSquare size={14} className="mr-1.5 text-signal" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   PROFESSIONAL ERROR COMPONENT
===================================================== */

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({
        type: "general",
      }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-lg border border-destructive/40 bg-card p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center bg-destructive/15 text-destructive">
          <AlertTriangle size={28} />
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          System Execution Error
        </h1>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          An unexpected exception occurred while rendering this page component. You can reload the
          view or contact our engineering support team.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
          >
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-none border-border font-bold uppercase"
          >
            <a href="/">Go Home</a>
          </Button>

          <Button
            variant="outline"
            onClick={handleWhatsApp}
            className="rounded-none border-border font-bold uppercase"
          >
            <MessageSquare size={14} className="mr-1.5 text-signal" />
            WhatsApp Support
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ROOT ROUTE
===================================================== */

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },

      {
        title: "Indus Robotics",
      },

      {
        name: "description",
        content:
          "Indus Robotics delivers robotic components, precision reducers, actuators, motion control, and connected automation platforms for manufacturing.",
      },

      {
        name: "author",
        content: "Indus Robotics",
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },

      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap",
      },

      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  }),

  shellComponent: RootShell,

  component: RootComponent,

  notFoundComponent: NotFoundComponent,

  errorComponent: ErrorComponent,
});

/* =====================================================
   ROOT SHELL
===================================================== */

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-signal selection:text-signal-foreground">
        {children}

        <Scripts />
      </body>
    </html>
  );
}

/* =====================================================
   ROOT COMPONENT
   DIGITAL PRESENCE TRACKING
===================================================== */

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  /* ---------------------------------------------
     GET CURRENT PAGE PATH
  --------------------------------------------- */

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  /* ---------------------------------------------
     PAGE VIEW + SESSION START
  --------------------------------------------- */

  useEffect(() => {
    trackDigitalPresence("page_view", "page", pathname);

    const sessionStarted = sessionStorage.getItem("indus_session_started");

    if (!sessionStarted) {
      trackDigitalPresence("session_start", "session", "New website session");

      sessionStorage.setItem("indus_session_started", "true");
    }
  }, [pathname]);

  /* ---------------------------------------------
     CLICK TRACKING
  --------------------------------------------- */

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      const interactive = target.closest("a, button, [role='button']") as HTMLElement | null;

      if (!interactive) {
        return;
      }

      const label = (interactive.textContent || "").trim().replace(/\s+/g, " ").substring(0, 150);

      const href = interactive instanceof HTMLAnchorElement ? interactive.href : "";

      const text = `${label} ${href}`.toLowerCase();

      /* -----------------------------------------
         WHATSAPP
      ----------------------------------------- */

      if (text.includes("whatsapp") || text.includes("wa.me")) {
        trackDigitalPresence("contact", label || "WhatsApp", href || "WhatsApp action");

        return;
      }

      /* -----------------------------------------
         DOWNLOADS
      ----------------------------------------- */

      if (href && /\.(pdf|doc|docx|xls|xlsx|zip)(\?|$)/i.test(href)) {
        trackDigitalPresence("download", label || "Download", href);

        return;
      }

      /* -----------------------------------------
         EXTERNAL LINKS
      ----------------------------------------- */

      if (href) {
        try {
          const linkUrl = new URL(href, window.location.href);

          if (linkUrl.origin !== window.location.origin) {
            trackDigitalPresence("external_link_click", label || "External Link", href);

            return;
          }
        } catch {
          // Ignore invalid URLs.
        }
      }

      /* -----------------------------------------
         CTA DETECTION
      ----------------------------------------- */

      const ctaWords = [
        "contact",
        "talk to",
        "request",
        "quote",
        "enquiry",
        "inquiry",
        "get started",
        "explore products",
        "learn more",
        "consult",
        "engineer",
        "download catalogue",
        "download catalog",
      ];

      const isCTA = ctaWords.some((word) => text.includes(word));

      if (isCTA) {
        trackDigitalPresence("cta_click", label || "CTA", href || "CTA button");

        return;
      }

      /* -----------------------------------------
         INTERNAL NAVIGATION
      ----------------------------------------- */

      if (interactive.tagName === "A" && href) {
        trackDigitalPresence("navigation_click", label || "Navigation", href);

        return;
      }

      /* -----------------------------------------
         GENERAL BUTTON
      ----------------------------------------- */

      if (interactive.tagName === "BUTTON" || interactive.getAttribute("role") === "button") {
        trackDigitalPresence("button_click", label || "Button", "Button interaction");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  /* ---------------------------------------------
     FORM SUBMISSION TRACKING
  --------------------------------------------- */

  useEffect(() => {
    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;

      if (!form) {
        return;
      }

      const formName =
        form.getAttribute("name") || form.id || form.getAttribute("aria-label") || "Website Form";

      trackDigitalPresence("form_submission", formName, "Form submitted");
    };

    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  /* ---------------------------------------------
     SCROLL DEPTH TRACKING
  --------------------------------------------- */

  useEffect(() => {
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;

      const viewportHeight = window.innerHeight;

      const scrollTop = window.scrollY;

      const maxScroll = documentHeight - viewportHeight;

      if (maxScroll <= 0) {
        return;
      }

      const percentage = Math.round((scrollTop / maxScroll) * 100);

      const depths = [25, 50, 75, 100];

      depths.forEach((depth) => {
        if (percentage >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);

          trackDigitalPresence(`scroll_${depth}`, "page", `${depth}% scroll depth`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  /* ---------------------------------------------
     WEBSITE UI
     EXISTING UI UNCHANGED
  --------------------------------------------- */

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <IntelligenceProvider>
          <IntelligenceLayout>
            <div className="flex min-h-screen flex-col">
              <GeoGreetingBar visitorData={null} />
              <Header />

              <Breadcrumbs />

              <main className="flex-1 pb-16 md:pb-0">
                <Outlet />
              </main>

              <PageQuickBar />

              <Footer />

              <WhatsAppButton />

              <GlobalModals />

              {/* Intelligence Layer */}
              <WelcomeBanner />
              <ExitIntentPopup />
            </div>
          </IntelligenceLayout>
        </IntelligenceProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

// Inner component so it can use useIntelligence hook
function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  const { visitor } = useIntelligence();
  return (
    <>
      {children}
      <ChatBot visitorData={visitor} />
    </>
  );
}
