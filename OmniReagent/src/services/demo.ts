import { API_BASE_URL } from "@/config";

export interface ScheduleDemoPayload {
  full_name: string;
  work_email: string;
  company: string;
  phone_number: string | null;
  message: string | null;
  recaptcha_token: string;
}

export interface ValidationErrorItem {
  [field: string]: string;
}

export interface ScheduleDemoValidationError {
  errors: ValidationErrorItem[];
}

export interface ScheduleDemoServiceError {
  detail: string;
}

export type ScheduleDemoResult =
  | { success: true }
  | { success: false; status: 400; detail: string }
  | { success: false; status: 422; errors: Record<string, string> }
  | { success: false; status: 503; detail: string }
  | { success: false; status: number; detail?: string };

export async function scheduleDemo(payload: ScheduleDemoPayload): Promise<ScheduleDemoResult> {
  const response = await fetch(`${API_BASE_URL}/api/v1/demo/schedule-demo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.status === 204) {
    return { success: true };
  }

  let body: ScheduleDemoValidationError | ScheduleDemoServiceError | undefined;
  try {
    body = await response.json();
  } catch {
    return {
      success: false,
      status: response.status,
      detail: "Something went wrong. Please try again later.",
    };
  }

  if (response.status === 400 && body && "detail" in body) {
    return { success: false, status: 400, detail: body.detail };
  }

  if (response.status === 422 && body && "errors" in body) {
    const errors: Record<string, string> = {};
    for (const item of body.errors) {
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") errors[key] = value;
      }
    }
    return { success: false, status: 422, errors };
  }

  if (response.status === 503 && body && "detail" in body) {
    return { success: false, status: 503, detail: body.detail };
  }

  return {
    success: false,
    status: response.status,
    detail: body && "detail" in body ? body.detail : "Something went wrong. Please try again later.",
  };
}
