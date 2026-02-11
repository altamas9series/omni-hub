import { API_BASE_URL } from "@/config";

export interface ApiAuditLogEntry {
  id: number;
  user_id: number;
  actor_type: string;
  actor_id: number | null;
  actor_display_name: string;
  category: string;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface PaginatedAuditLogsResponse {
  total: number;
  page: number;
  size: number;
  items: ApiAuditLogEntry[];
}

export const auditLogService = {
  getAuditLogs: async (page = 1, size = 30): Promise<PaginatedAuditLogsResponse> => {
    const token = localStorage.getItem("auth_token");
    const headers: HeadersInit = {
      accept: "application/json",
    };
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/api/v1/audit-logs/?${params.toString()}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audit logs: ${response.statusText}`);
    }

    return response.json();
  },
};
