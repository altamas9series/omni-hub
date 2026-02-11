import { API_BASE_URL } from "@/config";

/** Substance status: 0=Pending Review, 1=Verified, 2=Evidence Gap, 3=Pending RFI, 4=Resolved */
export const SUBSTANCE_STATUS_LABELS: Record<number, string> = {
  0: "Pending Review",
  1: "Verified",
  2: "Evidence Gap",
  3: "Pending RFI",
  4: "Resolved",
};

export type GapLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface GapChecklist {
  have_chemical_id: boolean;
  have_quantities: boolean;
  have_dates: boolean;
  have_supplier: boolean;
  have_use_info: boolean;
  have_documents: boolean;
}

export interface ApiChemical {
  id: number;
  product_name: string;
  cas_number: string;
  concentration: string | null;
  quantity: string | null;
  use_category: string | null;
  trade_names: string | null;
  molecular_structure: string | null;
  physical_form: string | null;
  accession_number: string | null;
  risk_score: number;
  status: number;
  created_at: string;
  file: {
    id: number;
    filename: string;
    file_path: string;
    file_size: number;
    content_type: string;
    created_at: string;
    document_date: string;
  };
  supplier: {
    id: number;
    name: string;
    domain: string | null;
    contact_email: string | null;
  };
  gap_checklist: GapChecklist;
  gap_level: GapLevel;
}

export interface ApiChemicalsResponse {
  total: number;
  total_gaps_detected?: number;
  page: number;
  size: number;
  items: ApiChemical[];
}

export interface GapSummaryResponse {
  total_chemicals: number;
  total_gaps_detected?: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  completeness: {
    chemical_id_pct: number;
    quantities_pct: number;
    dates_pct: number;
    supplier_pct: number;
    use_info_pct: number;
    documents_pct: number;
  };
  top_gap_ids: number[];
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("auth_token");
  const headers: HeadersInit = { accept: "application/json" };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export interface ChemicalsListParams {
  search?: string;
  status?: number;
  min_risk_score?: number;
  max_risk_score?: number;
  page?: number;
  size?: number;
}

export const chemicalService = {
  async getChemicals(params: ChemicalsListParams = {}): Promise<ApiChemicalsResponse> {
    const {
      search,
      status,
      min_risk_score = 0,
      max_risk_score = 100,
      page = 1,
      size = 50,
    } = params;

    const q = new URLSearchParams({
      min_risk_score: String(min_risk_score),
      max_risk_score: String(max_risk_score),
      page: String(page),
      size: String(Math.min(100, Math.max(1, size))),
    });
    if (search != null && search.trim() !== "") {
      q.set("search", search.trim());
    }
    if (status != null && status >= 0) {
      q.set("status", String(status));
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/chemicals/?${q}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chemicals: ${response.statusText}`);
    }

    return response.json();
  },

  async getChemicalDetails(id: number): Promise<ApiChemical> {
    const response = await fetch(`${API_BASE_URL}/api/v1/chemicals/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chemical details: ${response.statusText}`);
    }

    return response.json();
  },

  async getGapSummary(): Promise<GapSummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/chemicals/gap-summary`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch gap summary: ${response.statusText}`);
    }

    return response.json();
  },
};
