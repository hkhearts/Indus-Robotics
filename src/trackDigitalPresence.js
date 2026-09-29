const SESSION_KEY = "indus_session_id";

function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId =
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10);

    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

function getDevice() {
  const width = window.innerWidth;

  if (width <= 768) return "Mobile";
  if (width <= 1024) return "Tablet";

  return "Desktop";
}

export async function trackDigitalPresence(
  event = "page_view",
  element = "",
  details = ""
) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname,
        url: window.location.href,
        event,
        element,
        details,
        device: getDevice(),
        screen: `${window.screen.width}x${window.screen.height}`,
        sessionId: getSessionId(),
        referrer: document.referrer,
        visitorType: sessionStorage.getItem("indus_visited")
          ? "Returning Visitor"
          : "New Visitor",
      }),
    });

    sessionStorage.setItem("indus_visited", "true");
  } catch (error) {
    console.error("Digital presence tracking failed:", error);
  }
}
