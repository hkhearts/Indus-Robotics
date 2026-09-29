/**
 * Jira Integration — Client-side caller
 *
 * Calls the Vercel serverless function at /api/jira
 * which creates a Jira Task + 3 subtasks:
 *   1. Review & Qualify Lead
 *   2. Technical Feasibility Check
 *   3. Follow Up with Customer
 *
 * The actual Jira API credentials live server-side only (env vars).
 */

export interface JiraFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  timeline?: string;
  requirements: string;
  formType?: string;
}

export interface JiraResult {
  success: boolean;
  issueKey?: string;
  issueUrl?: string;
  subtasks?: Array<{ key: string | null; summary: string }>;
  error?: string;
}

/**
 * createJiraTask
 * Sends form data to /api/jira and creates a Task + 3 subtasks in Jira.
 */
export async function createJiraTask(data: JiraFormData): Promise<JiraResult> {
  const response = await fetch("/api/jira", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as { error?: string }).error ||
        `Jira API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<JiraResult>;
}
