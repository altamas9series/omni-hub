import { useState, useEffect, useCallback } from "react";
import { useDemo, Document } from "@/contexts/DemoContext";
import {
  FileText,
  Search,
  Grid3X3,
  List,
  Eye,
  Download,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Copy,
  Clock,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  FileX,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fileService, ExtractedDataResponse, FileStatus, FileSource, ExtractedDataNotReadyError, ExtractedDataNotFoundError } from "@/services/files";

const STATUS_LABELS: Record<number, string> = {
  [FileStatus.PENDING]: "Pending",
  [FileStatus.PROCESSING]: "Processing",
  [FileStatus.INDEXED]: "Indexed",
  [FileStatus.VERIFIED]: "Verified",
  [FileStatus.FAILED]: "Failed",
  [FileStatus.IRRELEVANT]: "Irrelevant",
};

const SOURCE_LABELS: Record<number, string> = {
  [FileSource.LEGACY_ARCHIVE]: "Legacy Archive",
  [FileSource.CLOUD_STORAGE]: "Google Drive",
  [3]: "Email",
};

function apiFileToDocument(apiFile: {
  id: number;
  filename: string;
  file_size: number;
  status: number;
  source: number;
  chemicals_count: number;
  created_at: string;
  updated_at: string;
}): Document & { statusDisplay?: string; sourceDisplay?: string; chemicalsCount?: number } {
  let status: Document["status"] = "pending";
  if (apiFile.status === FileStatus.PROCESSING) status = "processing";
  else if (apiFile.status === FileStatus.INDEXED || apiFile.status === FileStatus.VERIFIED) status = "processed";
  else if (apiFile.status === FileStatus.FAILED) status = "exception";
  else if (apiFile.status === FileStatus.IRRELEVANT) status = "irrelevant";

  let source: Document["source"] = "upload";
  if (apiFile.source === FileSource.LEGACY_ARCHIVE) source = "legacy_archive";
  else if (apiFile.source === FileSource.CLOUD_STORAGE) source = "cloud_storage";

  let type: Document["type"] = "statement";
  const lower = apiFile.filename.toLowerCase();
  if (lower.includes("invoice") || lower.includes("inv")) type = "invoice";
  else if (lower.includes("contract")) type = "contract";
  else if (lower.includes("policy")) type = "policy";
  else if (lower.includes("form")) type = "form";
  else if (lower.includes("manual") || lower.includes("sheet")) type = "manual";

  return {
    id: String(apiFile.id),
    apiId: apiFile.id,
    name: apiFile.filename,
    type,
    status,
    confidence: apiFile.chemicals_count > 0 ? 100 : 0,
    uploadedAt: new Date(apiFile.created_at),
    processedAt: new Date(apiFile.updated_at),
    size: apiFile.file_size,
    source,
    statusDisplay: STATUS_LABELS[apiFile.status as keyof typeof STATUS_LABELS],
    sourceDisplay: SOURCE_LABELS[apiFile.source as keyof typeof SOURCE_LABELS],
    chemicalsCount: apiFile.chemicals_count,
  };
}

export function DocumentsView() {
  const { setActiveView } = useDemo();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [size] = useState(30);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<(Document & { statusDisplay?: string; sourceDisplay?: string; chemicalsCount?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const toggleSelection = useCallback((apiId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(apiId)) next.delete(apiId);
      else next.add(apiId);
      return next;
    });
  }, []);
  const toggleSelectAllOnPage = useCallback(() => {
    const pageIds = items.map((d) => d.apiId).filter((id): id is number => id != null);
    setSelectedIds((prev) => {
      const allSelected = pageIds.length > 0 && pageIds.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        pageIds.forEach((id) => next.delete(id));
        return next;
      }
      return new Set([...prev, ...pageIds]);
    });
  }, [items]);
  const runBulkProcess = useCallback(async () => {
    const ids = Array.from(selectedIds).slice(0, 100);
    if (ids.length === 0) return;
    setBulkSubmitting(true);
    try {
      const res = await fileService.bulkProcess(ids);
      toast.success(res.message ?? `Processing ${res.accepted_file_ids.length} file(s)…`);
      setSelectedIds(new Set());
      setTimeout(() => fetchFiles(), 3000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk process failed");
    } finally {
      setBulkSubmitting(false);
    }
  }, [selectedIds, fetchFiles]);

  const runBulkDelete = useCallback(async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setBulkDeleting(true);
    try {
      const res = await fileService.deleteFiles(ids);
      toast.success(res.message ?? `Deleted ${res.deleted_ids.length} file(s).`);
      setSelectedIds(new Set());
      fetchFiles();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBulkDeleting(false);
    }
  }, [selectedIds, fetchFiles]);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const statusNum = statusFilter === "all" ? undefined : Number(statusFilter);
      const sourceNum = sourceFilter === "all" ? undefined : Number(sourceFilter);
      const res = await fileService.getFiles(page, size, searchQuery.trim() || "", statusNum, sourceNum);
      setTotal(res.total);
      setItems(res.items.map(apiFileToDocument));
    } catch {
      setTotal(0);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [page, size, searchQuery, statusFilter, sourceFilter]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Library ({total})</h1>
          <p className="text-muted-foreground">{total} documents in your library</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <>
              <Button
                onClick={runBulkProcess}
                disabled={bulkSubmitting || bulkDeleting || selectedIds.size > 100}
                title={selectedIds.size > 100 ? "Select up to 100 files" : undefined}
              >
                {bulkSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Process Documents {selectedIds.size <= 100 ? `(${selectedIds.size})` : ""}
              </Button>
              <Button
                variant="outline"
                onClick={runBulkDelete}
                disabled={bulkSubmitting || bulkDeleting}
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
              >
                {bulkDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                Delete ({selectedIds.size})
              </Button>
            </>
          )}
          <Button onClick={() => setActiveView("upload")}>
            Upload New
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setPage(1)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={String(FileStatus.PENDING)}>Pending</SelectItem>
            <SelectItem value={String(FileStatus.PROCESSING)}>Processing</SelectItem>
            <SelectItem value={String(FileStatus.INDEXED)}>Indexed</SelectItem>
            <SelectItem value={String(FileStatus.VERIFIED)}>Verified</SelectItem>
            <SelectItem value={String(FileStatus.FAILED)}>Failed</SelectItem>
            <SelectItem value={String(FileStatus.IRRELEVANT)}>Irrelevant</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v); setPage(1); }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value={String(FileSource.LEGACY_ARCHIVE)}>Legacy Archive</SelectItem>
            <SelectItem value={String(FileSource.CLOUD_STORAGE)}>Google Drive</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-4">
          {items.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={() => setSelectedDoc(doc)}
              selected={doc.apiId != null && selectedIds.has(doc.apiId)}
              onToggleSelect={doc.apiId != null ? () => toggleSelection(doc.apiId!) : undefined}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-10 p-4">
                    <Checkbox
                      checked={items.length > 0 && items.every((d) => d.apiId != null && selectedIds.has(d.apiId))}
                      onCheckedChange={toggleSelectAllOnPage}
                      aria-label="Select all on page"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Document</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Confidence</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Uploaded</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Chemicals</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((doc) => (
                  <DocumentRow
                    key={doc.id}
                    document={doc}
                    onClick={() => setSelectedDoc(doc)}
                    selected={doc.apiId != null && selectedIds.has(doc.apiId)}
                    onToggleSelect={doc.apiId != null ? () => toggleSelection(doc.apiId!) : undefined}
                  />
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {!loading && total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * size + 1} to {Math.min(page * size, total)} of {total}
            {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {selectedDoc && (
        <DocumentDetailPanel
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}

type DocumentWithDisplay = Document & { statusDisplay?: string; sourceDisplay?: string; chemicalsCount?: number };

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function DocumentCard({ document, onClick, selected, onToggleSelect }: { document: DocumentWithDisplay; onClick: () => void; selected?: boolean; onToggleSelect?: () => void }) {
  return (
    <Card
      className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {onToggleSelect != null && (
              <div onClick={(e) => e.stopPropagation()} role="presentation">
                <Checkbox checked={selected} onCheckedChange={onToggleSelect} aria-label="Select document" />
              </div>
            )}
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
          <StatusBadge status={document.status} statusDisplay={document.statusDisplay} />
        </div>

        <h3 className="font-medium text-sm truncate mb-1">{document.name}</h3>
        <p className="text-xs text-muted-foreground mb-1">{formatFileSize(document.size)}</p>
        <p className="text-xs text-muted-foreground capitalize mb-3">{document.type}</p>

        {document.confidence > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  document.confidence >= 90 ? "bg-success" : document.confidence >= 70 ? "bg-warning" : "bg-destructive"
                )}
                style={{ width: `${document.confidence}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{document.confidence.toFixed(1)}%</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{document.sourceDisplay ?? document.source}</span>
          <span className="text-xs text-muted-foreground">{formatTimeAgo(document.uploadedAt)}</span>
        </div>
        {document.chemicalsCount != null && (
          <p className="text-xs text-muted-foreground mt-1">{document.chemicalsCount} found</p>
        )}
      </CardContent>
    </Card>
  );
}

function DocumentRow({ document, onClick, selected, onToggleSelect }: { document: DocumentWithDisplay; onClick: () => void; selected?: boolean; onToggleSelect?: () => void }) {
  return (
    <tr
      className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <td className="p-4 w-10" onClick={(e) => e.stopPropagation()}>
        {onToggleSelect != null && (
          <Checkbox checked={selected} onCheckedChange={onToggleSelect} aria-label="Select document" />
        )}
      </td>
      <td className="p-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{document.name}</span>
          <span className="text-xs text-muted-foreground">{formatFileSize(document.size)}</span>
        </div>
      </td>
      <td className="p-4">
        <Badge variant="outline" className="capitalize">{document.type}</Badge>
      </td>
      <td className="p-4">
        <StatusBadge status={document.status} statusDisplay={document.statusDisplay} />
      </td>
      <td className="p-4">
        {document.confidence > 0 ? (
          <span className={cn(
            "text-sm",
            document.confidence >= 90 ? "text-success" : document.confidence >= 70 ? "text-warning" : "text-destructive"
          )}>
            {document.confidence.toFixed(1)}%
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </td>
      <td className="p-4">
        <span className="text-sm">{document.sourceDisplay ?? document.source}</span>
      </td>
      <td className="p-4">
        <span className="text-sm text-muted-foreground">{formatTimeAgo(document.uploadedAt)}</span>
      </td>
      <td className="p-4">
        <span className="text-sm text-muted-foreground">
          {document.chemicalsCount != null ? `${document.chemicalsCount} found` : "—"}
        </span>
      </td>
      <td className="p-4 text-right">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          aria-label="View extracted data"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}

function StatusBadge({ status, statusDisplay }: { status: Document["status"]; statusDisplay?: string }) {
  const config = {
    processed: { icon: CheckCircle2, label: "Processed", className: "bg-success/10 text-success border-success/30" },
    processing: { icon: Loader2, label: "Processing", className: "bg-warning/10 text-warning border-warning/30" },
    pending: { icon: Clock, label: "Pending", className: "bg-info/10 text-info border-info/30" },
    exception: { icon: AlertTriangle, label: "Exception", className: "bg-warning/10 text-warning border-warning/30" },
    duplicate: { icon: Copy, label: "Duplicate", className: "bg-destructive/10 text-destructive border-destructive/30" },
    irrelevant: { icon: FileX, label: "Irrelevant", className: "bg-slate-100 text-slate-600 border-slate-200" },
  };

  const { icon: Icon, label, className } = config[status];
  const displayLabel = statusDisplay ?? label;

  return (
    <Badge variant="outline" className={cn("gap-1", className)}>
      <Icon className={cn("h-3 w-3", status === "processing" && "animate-spin")} />
      {displayLabel}
    </Badge>
  );
}

function DocumentDetailPanel({ document, onClose }: { document: Document; onClose: () => void }) {
  const [extracted, setExtracted] = useState<ExtractedDataResponse | null>(null);
  const [extractedLoading, setExtractedLoading] = useState(false);
  const [extractedError, setExtractedError] = useState<string | null>(null);

  const fetchExtracted = useCallback(() => {
    if (!document.apiId) return;
    setExtractedLoading(true);
    setExtractedError(null);
    fileService
      .getExtractedData(document.apiId)
      .then(setExtracted)
      .catch((err) => {
        if (err instanceof ExtractedDataNotFoundError) {
          setExtractedError("File not found");
        } else if (err instanceof ExtractedDataNotReadyError) {
          setExtractedError("Document is still being processed. Try again in a moment.");
        } else {
          setExtractedError(err?.message ?? "Failed to load extracted data");
        }
      })
      .finally(() => setExtractedLoading(false));
  }, [document.apiId]);

  useEffect(() => {
    if (document.apiId) {
      fetchExtracted();
    } else {
      setExtracted(null);
      setExtractedError(null);
    }
  }, [document.apiId, fetchExtracted]);

  const meta = extracted?.json_metadata;
  const substances = extracted?.substances ?? meta?.substances ?? [];

  return (
    <div className="fixed inset-y-0 right-0 w-1/2 min-w-[28rem] bg-card border-l border-border shadow-elevated z-50 animate-slide-in-right overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Document Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span className="sr-only">Close</span>
            ×
          </Button>
        </div>

        <div className="space-y-6">
          <div className="aspect-[3/4] bg-secondary/50 rounded-lg flex items-center justify-center">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">File Name</p>
              <p className="font-medium">{document.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <Badge variant="outline" className="mt-1 capitalize">{document.type}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="mt-1">
                  <StatusBadge status={document.status} />
                </div>
              </div>
            </div>
            {document.confidence > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Classification Confidence</p>
                <p className="font-medium">{document.confidence.toFixed(1)}%</p>
              </div>
            )}
          </div>

          {document.apiId && (
            <>
              {extractedLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {extractedError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {extractedError}
                </div>
              )}
              {!extractedLoading && !extractedError && extracted?.message != null && extracted.message !== "" && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 mb-5">
                  {extracted.message}
                </div>
              )}
              {!extractedLoading && !extractedError && extracted && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    <h4 className="font-semibold text-slate-800">Extracted Intelligence</h4>
                    <Badge className="bg-violet-100 text-violet-700 border border-violet-200">AI Inferred</Badge>
                  </div>
                  <div className="space-y-3">
                    {meta?.document_type && (
                      <ExtractedField label="DOCUMENT TYPE" value={meta.document_type} confidence={98} />
                    )}
                    {meta?.document_date && (
                      <ExtractedField label="DATE" value={meta.document_date} confidence={98} />
                    )}
                    {meta?.supplier_name && (
                      <ExtractedField label="SUPPLIER" value={meta.supplier_name} confidence={95} />
                    )}
                    {substances.length > 0 && (
                      <div className="rounded-lg border border-slate-200 overflow-x-auto">
                        <p className="text-xs text-slate-500 uppercase tracking-wide px-3 pt-3 pb-1">Identified chemicals</p>
                        <table className="w-full min-w-[640px]">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Chemical</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">CAS Number</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Concentration</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Trade names</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Physical form</th>
                              <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Accession number</th>
                            </tr>
                          </thead>
                          <tbody>
                            {substances.map((sub, i) => (
                              <tr key={"id" in sub ? sub.id : i} className="border-b border-slate-100 last:border-0">
                                <td className="py-2 px-3 text-sm font-medium text-amber-700 bg-amber-100/50 rounded">
                                  {sub.product_name}
                                </td>
                                <td className="py-2 px-3 text-sm text-slate-800">{sub.cas_number}</td>
                                <td className="py-2 px-3 text-sm text-slate-800">{sub.concentration ?? "—"}</td>
                                <td className="py-2 px-3 text-sm text-slate-800 max-w-[140px] truncate" title={"trade_names" in sub ? sub.trade_names ?? undefined : undefined}>{"trade_names" in sub ? (sub.trade_names ?? "—") : "—"}</td>
                                <td className="py-2 px-3 text-sm text-slate-800">{"physical_form" in sub ? (sub.physical_form ?? "—") : "—"}</td>
                                <td className="py-2 px-3 text-sm text-slate-800">{"accession_number" in sub ? (sub.accession_number ?? "—") : "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve & Index
                    </Button>
                    <Button variant="outline" className="flex-1 border-slate-200 text-slate-700">
                      Edit Fields
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {!document.apiId && document.extractedData && (
            <div>
              <h3 className="font-medium mb-3">Extracted Fields</h3>
              <div className="space-y-2">
                {Object.entries(document.extractedData).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 rounded bg-secondary/30">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Full
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExtractedField({
  label,
  value,
  confidence,
  highlight,
}: {
  label: string;
  value: string;
  confidence?: number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
        <p
          className={cn(
            "font-medium",
            highlight ? "text-amber-700 bg-amber-100 px-1 rounded inline" : "text-slate-800"
          )}
        >
          {value}
        </p>
      </div>
      {confidence != null && (
        <Badge className="bg-status-success-bg text-status-success-text border border-status-success/30">
          {confidence}%
        </Badge>
      )}
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
