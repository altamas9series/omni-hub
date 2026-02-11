import { API_BASE_URL } from "@/config";

const API_BASE = `${API_BASE_URL}/api/v1`;

export interface DashboardMetricsResponse {
  total_documents: number;
  indexed_documents: number;
  total_substances: number;
  high_risk_substances: number;
  total_gaps: number;
  gaps_pending_rfi: number;
  total_rfis_sent: number;
  rfis_responded: number;
}

export interface DashboardGraphDataPoint {
  month: string;
  year: number;
  documents_processed: number;
  risks_identified: number;
}

export interface DashboardGraphResponse {
  data: DashboardGraphDataPoint[];
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("auth_token");
  const headers: HeadersInit = { accept: "application/json" };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetricsResponse> => {
    const response = await fetch(`${API_BASE}/dashboard/metrics`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard metrics: ${response.statusText}`);
    }
    return response.json();
  },

  getGraph: async (months = 6): Promise<DashboardGraphResponse> => {
    const params = new URLSearchParams({ months: months.toString() });
    const response = await fetch(`${API_BASE}/dashboard/graph?${params.toString()}`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard graph: ${response.statusText}`);
    }
    return response.json();
  },
};
