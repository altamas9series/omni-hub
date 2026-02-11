import { API_BASE_URL } from "@/config";

const API_BASE = `${API_BASE_URL}/api/v1`;

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("auth_token");
  const headers: HeadersInit = { accept: "application/json" };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export interface GDriveStatusResponse {
  is_connected: boolean;
  account_email?: string;
  last_synced_at?: string | null;
  last_sync_new_files_count?: number;
  last_sync_message?: string | null;
  import_folder_id?: string | null;
  import_folder_name?: string | null;
}

export interface GDriveAuthUrlResponse {
  url: string;
}

export interface GDriveSyncResponse {
  message: string;
  status: string;
}

export interface GDriveDisconnectResponse {
  message: string;
}

export interface GDriveImportFolderResponse {
  message?: string;
}

export interface GDriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  isFolder: boolean;
  webViewLink?: string;
  modifiedTime?: string;
  size?: number | null;
}

export interface GDriveFilesResponse {
  files: GDriveFileItem[];
  nextPageToken: string | null;
}

export interface GDriveIngestResponse {
  status: string;
  message: string;
  app_file_id: number;
}

function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

export const gdriveService = {
  getStatus: async (): Promise<GDriveStatusResponse> => {
    const tz = getBrowserTimezone();
    const qs = tz ? `?timezone=${encodeURIComponent(tz)}` : "";
    const response = await fetch(`${API_BASE}/integrations/gdrive/status${qs}`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Failed to fetch status: ${response.statusText}`);
    }
    return response.json();
  },

  getAuthUrl: async (): Promise<GDriveAuthUrlResponse> => {
    const response = await fetch(`${API_BASE}/integrations/gdrive/auth-url`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Failed to get auth URL: ${response.statusText}`);
    }
    return response.json();
  },

  sync: async (): Promise<GDriveSyncResponse> => {
    const response = await fetch(`${API_BASE}/integrations/gdrive/sync`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Sync failed: ${response.statusText}`);
    }
    return response.json();
  },

  disconnect: async (): Promise<GDriveDisconnectResponse> => {
    const response = await fetch(`${API_BASE}/integrations/gdrive/disconnect`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Disconnect failed: ${response.statusText}`);
    }
    return response.json();
  },

  setImportFolder: async (
    folder_id: string | null,
    folder_name?: string
  ): Promise<GDriveImportFolderResponse> => {
    const body =
      folder_id === null
        ? { folder_id: null }
        : { folder_id, folder_name: folder_name ?? "" };
    const response = await fetch(`${API_BASE}/integrations/gdrive/import-folder`, {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json().catch(() => ({}));
      throw new Error(res.detail ?? `Failed to set import folder: ${response.statusText}`);
    }
    return response.json();
  },

  getFiles: async (params?: {
    parent_id?: string;
    page_token?: string;
    page_size?: number;
    query?: string;
  }): Promise<GDriveFilesResponse> => {
    const search = new URLSearchParams();
    if (params?.parent_id) search.set("parent_id", params.parent_id);
    if (params?.page_token) search.set("page_token", params.page_token);
    if (params?.page_size != null) search.set("page_size", String(params.page_size));
    if (params?.query) search.set("query", params.query);
    const qs = search.toString();
    const url = `${API_BASE}/integrations/gdrive/files${qs ? `?${qs}` : ""}`;
    const response = await fetch(url, { method: "GET", headers: authHeaders() });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail ?? `Failed to list Drive files: ${response.statusText}`);
    }
    return response.json();
  },

  ingest: async (fileId: string): Promise<GDriveIngestResponse> => {
    const response = await fetch(`${API_BASE}/integrations/gdrive/ingest`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ file_id: fileId }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const detail = body.detail ?? response.statusText;
      throw Object.assign(new Error(detail), { status: response.status, body });
    }
    return response.json();
  },
};
