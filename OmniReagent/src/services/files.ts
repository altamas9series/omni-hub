import { API_BASE_URL } from "@/config";

export enum FileStatus {
    PENDING = 0, // Just uploaded
    PROCESSING = 1, // Currently being analyzed
    INDEXED = 2, // Analysis done, chemicals found
    VERIFIED = 3, // Reviewed by human
    FAILED = 4, // Error in processing
    IRRELEVANT = 5, // Irrelevant document
}

export enum FileSource {
    LEGACY_ARCHIVE = 1, // Manual Drag & Drop
    CLOUD_STORAGE = 2, // Synced from Drive/Dropbox
    EMAIL = 3, // Extracted from email attachments
}

export interface ApiFile {
    id: number;
    filename: string;
    file_size: number;
    status: FileStatus;
    source: FileSource;
    is_processed: boolean;
    chemicals_count: number;
    created_at: string;
    updated_at: string;
    content_type: string;
}

export interface PaginatedFilesResponse {
    total: number;
    page: number;
    size: number;
    items: ApiFile[];
}

export interface ExtractedSubstanceMetadata {
    product_name: string;
    cas_number: string;
    concentration: string | null;
    trade_names?: string | null;
    molecular_structure?: string | null;
    physical_form?: string | null;
    accession_number?: string | null;
    is_handwritten: boolean;
    context_snippet?: string;
}

export interface ExtractedJsonMetadata {
    document_type?: string;
    supplier_name?: string;
    document_date?: string;
    po_number?: string;
    substances?: ExtractedSubstanceMetadata[];
}

export interface ExtractedSubstance {
    id: number;
    product_name: string;
    cas_number: string;
    concentration: string | null;
    trade_names?: string | null;
    molecular_structure?: string | null;
    physical_form?: string | null;
    accession_number?: string | null;
    risk_score: number;
    status: number;
}

export interface ExtractedDataResponse {
    id: number | null;
    file_id: number;
    raw_text: string | null;
    json_metadata: ExtractedJsonMetadata | null;
    substances: ExtractedSubstance[];
    message?: string | null;
}

/** Response when GET extracted-data returns 202 (extraction not ready). */
export interface ExtractedDataNotReadyResponse {
    ready: false;
    message: string;
}

/** Thrown when GET extracted-data returns 202. */
export class ExtractedDataNotReadyError extends Error {
    readonly statusCode = 202;
    readonly messageFromServer: string;
    constructor(messageFromServer: string) {
        super("Extracted data not ready");
        this.name = "ExtractedDataNotReadyError";
        this.messageFromServer = messageFromServer;
    }
}

/** Thrown when GET extracted-data returns 404 (file missing or not owned). */
export class ExtractedDataNotFoundError extends Error {
    readonly statusCode = 404;
    constructor() {
        super("File not found");
        this.name = "ExtractedDataNotFoundError";
    }
}

export interface BulkProcessResponse {
    accepted_file_ids: number[];
    message: string;
}

export interface DeleteFilesResponse {
    deleted_ids: number[];
    message: string;
}

export const fileService = {
    uploadFile: async (file: File): Promise<ApiFile> => {
        const formData = new FormData();
        formData.append("file", file);

        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/upload`, {
            method: "POST",
            headers,
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return response.json();
    },

    getFiles: async (
        page = 1,
        size = 30,
        search = "",
        status?: number,
        source?: number
    ): Promise<PaginatedFilesResponse> => {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });
        if (search) params.append("search", search);
        if (status !== undefined) params.append("status", status.toString());
        if (source !== undefined) params.append("source", source.toString());

        const response = await fetch(`${API_BASE_URL}/api/v1/files/?${params.toString()}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch files: ${response.statusText}`);
        }

        return response.json();
    },

    getFile: async (id: number): Promise<ApiFile> => {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/${id}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        return response.json();
    },

    viewFile: async (fileId: number): Promise<Blob> => {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "*/*",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/${fileId}/view`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to open file preview: ${response.statusText}`);
        }

        return response.blob();
    },

    getExtractedData: async (fileId: number): Promise<ExtractedDataResponse> => {
        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/${fileId}/extracted-data`, {
            method: "GET",
            headers,
        });

        const body = await response.json().catch(() => ({}));

        if (response.status === 200) {
            return body as ExtractedDataResponse;
        }
        if (response.status === 202) {
            const msg = (body as ExtractedDataNotReadyResponse).message ?? "Please process the document to see the details";
            throw new ExtractedDataNotReadyError(msg);
        }
        if (response.status === 404) {
            throw new ExtractedDataNotFoundError();
        }
        throw new Error((body as { detail?: string })?.detail ?? response.statusText ?? "Failed to fetch extracted data");
    },

    bulkProcess: async (fileIds: number[]): Promise<BulkProcessResponse> => {
        if (fileIds.length === 0 || fileIds.length > 100) {
            throw new Error(fileIds.length === 0 ? "file_ids empty or invalid" : "Select up to 100 files");
        }

        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/bulk-process`, {
            method: "POST",
            headers,
            body: JSON.stringify({ file_ids: fileIds }),
        });

        if (response.status === 202) {
            return response.json();
        }
        if (response.status === 400) {
            const body = await response.json().catch(() => ({}));
            throw new Error((body as { detail?: string })?.detail ?? "file_ids empty or invalid");
        }
        if (response.status === 404) {
            const body = await response.json().catch(() => ({}));
            throw new Error((body as { detail?: string })?.detail ?? "No files found with the given IDs that belong to you");
        }
        const body = await response.json().catch(() => ({}));
        throw new Error((body as { detail?: string })?.detail ?? response.statusText ?? "Bulk process failed");
    },

    deleteFiles: async (fileIds: number[]): Promise<DeleteFilesResponse> => {
        if (fileIds.length === 0) {
            throw new Error("Select at least one file to delete");
        }

        const token = localStorage.getItem("auth_token");
        const headers: HeadersInit = {
            "accept": "application/json",
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/files/`, {
            method: "DELETE",
            headers,
            body: JSON.stringify({ file_ids: fileIds }),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error((body as { detail?: string })?.detail ?? response.statusText ?? "Delete failed");
        }
        return response.json();
    },

    pollUntilIndexedOrExtracted: async (
        fileId: number,
        options: { intervalMs?: number; maxAttempts?: number } = {}
    ): Promise<ExtractedDataResponse | null> => {
        const { intervalMs = 2000, maxAttempts = 60 } = options;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const extracted = await fileService.getExtractedData(fileId);
                return extracted;
            } catch (err) {
                if (err instanceof ExtractedDataNotFoundError) {
                    return null;
                }
                if (err instanceof ExtractedDataNotReadyError) {
                    // 202: not ready, continue polling
                } else {
                    // Other errors: continue polling (e.g. network)
                }
            }
            await new Promise((r) => setTimeout(r, intervalMs));
        }
        return null;
    },
};
