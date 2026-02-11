import { useState, useCallback, useRef, useEffect } from "react";
import { useCFA, UploadedFile, ProcessingStatus, Document } from "@/contexts/CFAContext";
import { fileService, ApiFile, FileStatus, FileSource, ExtractedDataResponse, ExtractedSubstanceMetadata, ExtractedSubstance, ExtractedDataNotReadyError, ExtractedDataNotFoundError } from "@/services/files";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  Eye,
  Sparkles,
  FileSearch,
  Cloud,
  Archive,
  ChevronRight,
  ChevronLeft,
  Search,
  CloudCog,
  Info,
  Mail,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Source name mapping - only two types now
const sourceDisplayNames: Record<string, string> = {
  "cloud-storage": "Cloud Storage",
  "legacy-archive": "Legacy Archive",
};

// Provider icons for syncedFrom tooltip
const syncedFromColors: Record<string, string> = {
  "Google Drive": "bg-blue-500",
  "Dropbox": "bg-sky-500",
  "OneDrive": "bg-indigo-500",
  "Box": "bg-blue-600",
  "SharePoint": "bg-primary",
  "AWS S3": "bg-orange-500",
};

const apiStatusToLabel: Record<FileStatus, string> = {
  [FileStatus.PENDING]: "pending",
  [FileStatus.PROCESSING]: "processing",
  [FileStatus.INDEXED]: "indexed",
  [FileStatus.VERIFIED]: "verified",
  [FileStatus.FAILED]: "Failed",
  [FileStatus.IRRELEVANT]: "Irrelevant",
};

const apiSourceToDisplay: Record<FileSource, { label: string; isCloud: boolean }> = {
  [FileSource.LEGACY_ARCHIVE]: { label: "Legacy Archive", isCloud: false },
  [FileSource.CLOUD_STORAGE]: { label: "Cloud Storage", isCloud: true },
  [FileSource.EMAIL]: { label: "Email", isCloud: false },
};


export function ArchaeologistView() {
  const {
    uploadedFiles,
    setUploadedFiles,
    selectedFile,
    setSelectedFile,
    addAuditEntry,
    documents,
    setDocuments,
    setChemicalRecords,
    cloudProviders,
    setCurrentView,
    openAlchemistToDocumentLibrary,
    setOpenAlchemistToDocumentLibrary,
  } = useCFA();

  const [isDragging, setIsDragging] = useState(false);
  const [documentFilter, setDocumentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [libraryItems, setLibraryItems] = useState<ApiFile[]>([]);
  const [libraryTotal, setLibraryTotal] = useState(0);
  const [libraryPage, setLibraryPage] = useState(1);
  const libraryPageSize = 30;
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [alchemistTab, setAlchemistTab] = useState<"upload" | "documents">("upload");
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<ApiFile | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedDataResponse | null>(null);
  const [extractedLoading, setExtractedLoading] = useState(false);
  const [extractedError, setExtractedError] = useState<string | null>(null);
  const [extractedErrorIsNotReady, setExtractedErrorIsNotReady] = useState(false);
  const [queueExtractedData, setQueueExtractedData] = useState<ExtractedDataResponse | null>(null);
  const [queueExtractedLoading, setQueueExtractedLoading] = useState(false);
  const [queueExtractedError, setQueueExtractedError] = useState<string | null>(null);
  const queuePollingRef = useRef<{ timeoutId: ReturnType<typeof setTimeout> | null; fileId: number }>({ timeoutId: null, fileId: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLibraryIds, setSelectedLibraryIds] = useState<Set<number>>(new Set());
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const connectedProviders = cloudProviders.filter(p => p.connected);

  const toggleLibrarySelection = useCallback((id: number) => {
    setSelectedLibraryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleSelectAllLibraryOnPage = useCallback(() => {
    const pageIds = libraryItems.map((item) => item.id);
    setSelectedLibraryIds((prev) => {
      const allSelected = pageIds.length > 0 && pageIds.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        pageIds.forEach((id) => next.delete(id));
        return next;
      }
      return new Set([...prev, ...pageIds]);
    });
  }, [libraryItems]);

  const simulateProcessing = useCallback((file: UploadedFile) => {
    const stages: ProcessingStatus[] = ["uploading", "ocr", "extracting", "complete"];
    let currentStage = 0;
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;

      if (progress >= 100) {
        progress = 100;
        currentStage++;

        if (currentStage >= stages.length) {
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f =>
            f.id === file.id
              ? {
                ...f,
                status: "complete",
                progress: 100,
                extractedData: {
                  date: "2012-04-12",
                  supplier: "ChemCorp",
                  chemical: "Polytetrafluoroethylene",
                  casNumber: "9002-84-0"
                }
              }
              : f
          ));
          addAuditEntry({
            action: "Document Processed",
            user: "System",
            details: `${file.name} successfully processed via OCR`,
            type: "extraction"
          });
          return;
        }
        progress = 0;
      }

      setUploadedFiles(prev => prev.map(f =>
        f.id === file.id
          ? { ...f, status: stages[currentStage], progress }
          : f
      ));
    }, 200);
  }, [setUploadedFiles, addAuditEntry]);

  const statusFilterToApi = (filter: string): number | undefined => {
    if (filter === "all") return undefined;
    if (filter === "pending") return FileStatus.PENDING;
    if (filter === "processing") return FileStatus.PROCESSING;
    if (filter === "indexed") return FileStatus.INDEXED;
    if (filter === "verified") return FileStatus.VERIFIED;
    if (filter === "failed") return FileStatus.FAILED;
    if (filter === "irrelevant") return FileStatus.IRRELEVANT;
    return undefined;
  };

  const fetchLibrary = useCallback(async () => {
    setLibraryLoading(true);
    try {
      const res = await fileService.getFiles(libraryPage, libraryPageSize, searchQuery, statusFilterToApi(documentFilter));
      setLibraryItems(res.items);
      setLibraryTotal(res.total);
    } catch (err) {
      console.error("Failed to fetch document library", err);
      toast.error("Failed to load document library");
      setLibraryItems([]);
      setLibraryTotal(0);
    } finally {
      setLibraryLoading(false);
    }
  }, [searchQuery, documentFilter, libraryPage]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  useEffect(() => {
    if (openAlchemistToDocumentLibrary) {
      setAlchemistTab("documents");
      setOpenAlchemistToDocumentLibrary(false);
    }
  }, [openAlchemistToDocumentLibrary, setOpenAlchemistToDocumentLibrary]);

  useEffect(() => {
    setLibraryPage(1);
  }, [searchQuery, documentFilter]);

  const runBulkProcessLibrary = useCallback(async () => {
    const ids = Array.from(selectedLibraryIds).slice(0, 100);
    if (ids.length === 0) return;
    const selectedItems = libraryItems.filter((i) => selectedLibraryIds.has(i.id));
    setBulkSubmitting(true);
    try {
      const res = await fileService.bulkProcess(ids);
      const newQueueFiles: UploadedFile[] = selectedItems.map((i) => ({
        id: String(i.id),
        name: i.filename,
        size: i.file_size,
        status: "extracting",
        progress: 50,
      }));
      setUploadedFiles((prev) => [...prev, ...newQueueFiles]);
      setAlchemistTab("upload");
      setSelectedLibraryIds(new Set());
      toast.success(res.message ?? `Processing ${res.accepted_file_ids.length} file(s)…`);
      ids.forEach((id) => {
        fileService.pollUntilIndexedOrExtracted(id).then(() => {
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === String(id) ? { ...f, status: "complete", progress: 100 } : f))
          );
          fetchLibrary();
        }).catch(() => {
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === String(id) ? { ...f, status: "complete", progress: 100 } : f))
          );
          fetchLibrary();
        });
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk process failed");
    } finally {
      setBulkSubmitting(false);
    }
  }, [selectedLibraryIds, libraryItems, setUploadedFiles, fetchLibrary]);

  const runBulkDeleteLibrary = useCallback(async () => {
    const ids = Array.from(selectedLibraryIds);
    if (ids.length === 0) return;
    setBulkDeleting(true);
    try {
      const res = await fileService.deleteFiles(ids);
      toast.success(res.message ?? `Deleted ${res.deleted_ids.length} file(s).`);
      setSelectedLibraryIds(new Set());
      fetchLibrary();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBulkDeleting(false);
    }
  }, [selectedLibraryIds, fetchLibrary]);

  useEffect(() => {
    if (!selectedLibraryItem) {
      setExtractedData(null);
      setExtractedError(null);
      setExtractedErrorIsNotReady(false);
      return;
    }
    setExtractedLoading(true);
    setExtractedError(null);
    setExtractedErrorIsNotReady(false);
    fileService
      .getExtractedData(selectedLibraryItem.id)
      .then(setExtractedData)
      .catch((err) => {
        if (err instanceof ExtractedDataNotFoundError) {
          setExtractedError("File not found");
          setExtractedErrorIsNotReady(false);
        } else if (err instanceof ExtractedDataNotReadyError) {
          setExtractedError(err.messageFromServer);
          setExtractedErrorIsNotReady(true);
        } else {
          setExtractedError(err?.message ?? "Failed to load extracted data");
          setExtractedErrorIsNotReady(false);
        }
        setExtractedData(null);
      })
      .finally(() => setExtractedLoading(false));
  }, [selectedLibraryItem]);

  useEffect(() => {
    if (!selectedFile) {
      if (queuePollingRef.current.timeoutId) {
        clearTimeout(queuePollingRef.current.timeoutId);
        queuePollingRef.current.timeoutId = null;
      }
      setQueueExtractedData(null);
      setQueueExtractedError(null);
      setQueueExtractedLoading(false);
      return;
    }
    const fileId = Number(selectedFile.id);
    if (Number.isNaN(fileId) || fileId <= 0) {
      setQueueExtractedData(null);
      setQueueExtractedError(null);
      setQueueExtractedLoading(false);
      return;
    }
    if (queuePollingRef.current.timeoutId) {
      clearTimeout(queuePollingRef.current.timeoutId);
      queuePollingRef.current.timeoutId = null;
    }
    queuePollingRef.current.fileId = fileId;
    setQueueExtractedError(null);
    setQueueExtractedLoading(true);

    const pollIntervalMs = 2500;
    const maxAttempts = 48; // ~2 minutes

    const tryFetch = (attempt: number) => {
      if (queuePollingRef.current.fileId !== fileId) return;
      fileService
        .getExtractedData(fileId)
        .then((data) => {
          if (queuePollingRef.current.fileId !== fileId) return;
          setQueueExtractedData(data);
          setQueueExtractedError(null);
          setQueueExtractedLoading(false);
        })
        .catch((err) => {
          if (queuePollingRef.current.fileId !== fileId) return;
          if (err instanceof ExtractedDataNotFoundError) {
            setQueueExtractedError("File not found");
            setQueueExtractedData(null);
            setQueueExtractedLoading(false);
            return;
          }
          if (err instanceof ExtractedDataNotReadyError) {
            if (attempt >= maxAttempts) {
              setQueueExtractedError("Extraction is taking longer than usual. Try the Document Library in a few minutes.");
              setQueueExtractedData(null);
              setQueueExtractedLoading(false);
              return;
            }
            queuePollingRef.current.timeoutId = setTimeout(() => tryFetch(attempt + 1), pollIntervalMs);
            return;
          }
          setQueueExtractedError(err?.message ?? "Failed to load extracted data");
          setQueueExtractedData(null);
          setQueueExtractedLoading(false);
        });
    };

    tryFetch(0);
    return () => {
      if (queuePollingRef.current.timeoutId) {
        clearTimeout(queuePollingRef.current.timeoutId);
        queuePollingRef.current.timeoutId = null;
      }
    };
  }, [selectedFile]);

  const processFiles = useCallback(async (files: File[]) => {
    for (const file of files) {
      try {
        const apiFile = await fileService.uploadFile(file);
        const newFile: UploadedFile = {
          id: String(apiFile.id),
          name: apiFile.filename,
          size: apiFile.file_size,
          status: "extracting",
          progress: 50
        };
        setUploadedFiles(prev => [...prev, newFile]);
        fileService.pollUntilIndexedOrExtracted(apiFile.id).then(() => {
          setUploadedFiles(prev => prev.map(f => f.id === String(apiFile.id) ? { ...f, status: "complete", progress: 100 } : f));
          fetchLibrary();
        }).catch(() => {
          setUploadedFiles(prev => prev.map(f => f.id === String(apiFile.id) ? { ...f, status: "complete", progress: 100 } : f));
          fetchLibrary();
        });
        fetchLibrary();
      } catch (err) {
        console.error("Upload failed", err);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  }, [setUploadedFiles, fetchLibrary]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) processFiles(files);
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
      e.target.value = "";
    }
  }, [processFiles]);

  const handleMockUpload = () => {
    const mockFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: "2011-2015_Purchase_Orders.pdf",
      size: 2458624,
      status: "uploading",
      progress: 0,
      source: "upload"
    };
    setUploadedFiles(prev => [...prev, mockFile]);
    simulateProcessing(mockFile);
  };

  const handleApproveAndIndex = (file: UploadedFile) => {
    if (!file.extractedData) return;

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: "pdf",
      size: file.size,
      uploadedAt: new Date(),
      processedAt: new Date(),
      status: "indexed",
      source: "legacy-archive",
      extractedChemicals: 1,
      extractedData: file.extractedData
    };

    setDocuments(prev => [newDocument, ...prev]);

    const newChemical = {
      id: `chem-${Date.now()}`,
      productName: file.extractedData.chemical,
      casNumber: file.extractedData.casNumber || "Unknown",
      yearDetected: parseInt(file.extractedData.date.split("-")[0]),
      sourceDocument: file.name,
      sourceDocumentId: newDocument.id,
      riskScore: 75,
      status: "pending-review" as const,
      supplier: file.extractedData.supplier,
    };

    setChemicalRecords(prev => [newChemical, ...prev]);
    setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
    setSelectedFile(null);

    addAuditEntry({
      action: "Document Indexed",
      user: "John Smith",
      details: `${file.name} approved and indexed with 1 chemical extracted`,
      type: "verification",
      relatedId: newDocument.id,
      relatedType: "document"
    });

    toast.success("Document indexed successfully", {
      description: `${file.extractedData.chemical} added to chemical registry`
    });
  };

  const getStatusLabel = (status: ProcessingStatus) => {
    switch (status) {
      case "uploading": return "Uploading...";
      case "ocr": return "OCR Scanning...";
      case "extracting": return "Extracting Entities...";
      case "complete": return "Complete";
      case "error": return "Error";
    }
  };

  const getStatusColor = (status: ProcessingStatus) => {
    switch (status) {
      case "uploading": return "text-blue-600";
      case "ocr": return "text-violet-600";
      case "extracting": return "text-amber-600";
      case "complete": return "text-emerald-600";
      case "error": return "text-rose-600";
    }
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case "indexed": return { className: "bg-blue-100 text-blue-700 border-blue-200", label: "Indexed" };
      case "verified": return { className: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Verified" };
      case "pending": return { className: "bg-amber-100 text-amber-700 border-amber-200", label: "Pending" };
      case "processing": return { className: "bg-violet-100 text-violet-700 border-violet-200", label: "Processing" };
      case "Failed": return { className: "bg-rose-100 text-rose-700 border-rose-200", label: "Failed" };
      case "Irrelevant": return { className: "bg-slate-100 text-slate-700 border-slate-200", label: "Irrelevant" };
      default: return { className: "bg-slate-100 text-slate-700 border-slate-200", label: status };
    }
  };
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              The Alchemist
            </h2>
            <p className="text-slate-500 mt-1">Transform raw documents into actionable PFAS intelligence</p>
          </div>
          <Button onClick={handleMockUpload} className="bg-primary hover:bg-primary/90 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Demo Upload
          </Button>
        </div>

        <Tabs value={alchemistTab} onValueChange={(v) => setAlchemistTab(v as "upload" | "documents")} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="upload" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Upload className="w-4 h-4" />
              Upload & Process
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <FileText className="w-4 h-4" />
              Document Library ({libraryTotal})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Zone - Manual Upload Only */}
              <Card className="bg-white border border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800">Manual Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="relative cursor-pointer group"
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <div
                      className={cn(
                        "pointer-events-none border-2 border-dashed rounded-xl p-12 text-center transition-all",
                        isDragging
                          ? "border-primary/50 bg-primary/10"
                          : "border-slate-300 group-hover:border-slate-400 bg-slate-50"
                      )}
                    >
                      <Upload className={cn("w-12 h-12 mx-auto mb-4", isDragging ? "text-primary" : "text-slate-400")} />
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        Drag & Drop Legacy Data
                      </h3>
                      <p className="text-slate-500 text-sm mb-4">
                        PDFs, CSVs, PST Archives, Excel files
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["PDF", "DOCX", "XLSX", "CSV", "PST", "TIFF"].map(format => (
                          <Badge key={format} variant="outline" className="bg-white border-slate-300 text-slate-600">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileInputChange}
                      multiple
                      accept=".pdf,.docx,.xlsx,.xls,.csv,.pst,.tiff,.tif,.jpg,.jpeg,.png"
                      aria-label="Choose files to upload"
                    />
                  </div>

                  {/* Cloud sync helper text */}
                  {connectedProviders.length > 0 ? (
                    <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-emerald-700 font-medium">Cloud drives sync automatically</p>
                        <p className="text-emerald-600 text-xs mt-0.5">
                          {connectedProviders.length} provider{connectedProviders.length > 1 ? "s" : ""} connected — files will appear in the Document Library based on your sync schedule.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <CloudCog className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-slate-700 font-medium">Enable automatic cloud sync</p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Connect cloud storage providers to automatically ingest files.{" "}
                          <button
                            onClick={() => setCurrentView("sync-configuration")}
                            className="text-primary hover:text-primary/90 underline"
                          >
                            Configure Sync →
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Processing Queue */}
              <Card className="bg-white border border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-primary" />
                    Processing Queue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p className="font-medium text-slate-700">No files in queue</p>
                      <p className="text-sm text-slate-500">Upload files to begin processing</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {uploadedFiles.map(file => (
                        <div
                          key={file.id}
                          className={cn(
                            "p-4 rounded-lg border transition-all cursor-pointer",
                            selectedFile?.id === file.id
                              ? "border-primary/50 bg-primary/10"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          )}
                          onClick={() => file.status === "complete" && setSelectedFile(file)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-slate-400" />
                              <div>
                                <p className="font-medium text-slate-800 text-sm">{file.name}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                            </div>
                            {file.status === "complete" ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Loader2 className="w-5 h-5 text-primary animate-spin" />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className={cn("font-medium", getStatusColor(file.status))}>
                                {getStatusLabel(file.status)}
                              </span>
                              {file.status !== "complete" && (
                                <span className="text-slate-500">{Math.round(file.progress)}%</span>
                              )}
                            </div>
                            {file.status !== "complete" && (
                              <Progress value={file.progress} className="h-1.5" />
                            )}
                          </div>

                          {file.status === "complete" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="mt-2 text-primary hover:text-primary/90 hover:bg-primary/10"
                              onClick={(e) => { e.stopPropagation(); setSelectedFile(file); }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Extracted Data
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Verification View */}
            {selectedFile && (queueExtractedData || selectedFile.extractedData || queueExtractedLoading || queueExtractedError) && (
              <Card className="bg-white border border-slate-200 shadow-sm animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800">Document Verification</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-100 rounded-lg p-4 min-h-96">
                      <div className="bg-white rounded border border-slate-200 p-6 h-full">
                        <div className="space-y-4 text-sm text-slate-600">
                          <div className="text-center border-b border-slate-200 pb-4 mb-4">
                            <h4 className="font-bold text-lg text-slate-800">
                              {queueExtractedData?.json_metadata?.document_type ?? "—"}
                            </h4>
                            <p className="text-slate-500">
                              {queueExtractedData?.json_metadata?.supplier_name ?? "—"}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold text-slate-700">Date:</p>
                              <p>{queueExtractedData?.json_metadata?.document_date ?? "—"}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-700">PO Number:</p>
                              <p>{queueExtractedData?.json_metadata?.po_number ?? "—"}</p>
                            </div>
                          </div>
                          {(queueExtractedData?.substances ?? queueExtractedData?.json_metadata?.substances ?? []).length > 0 ? (
                            <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                              <p className="font-semibold text-slate-700 mb-2">Substances:</p>
                              {(queueExtractedData?.substances ?? queueExtractedData?.json_metadata?.substances ?? []).map((sub: ExtractedSubstance | ExtractedSubstanceMetadata, i: number) => (
                                <div key={"id" in sub ? sub.id : i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                  <p className="mt-2">
                                    <span className="font-semibold text-slate-700">Chemical: </span>
                                    <span className="bg-amber-200 px-1 rounded font-medium text-slate-800">{sub.product_name}</span>
                                  </p>
                                  <p className="mt-1">
                                    <span className="font-semibold text-slate-700">CAS: </span>{sub.cas_number}
                                    {sub.concentration != null && sub.concentration !== "" && ` (${sub.concentration})`}
                                  </p>
                                  {"trade_names" in sub && sub.trade_names != null && sub.trade_names !== "" && (
                                    <p className="mt-1"><span className="font-semibold text-slate-700">Trade names: </span><span className="text-slate-800">{sub.trade_names}</span></p>
                                  )}
                                  {"physical_form" in sub && sub.physical_form != null && sub.physical_form !== "" && (
                                    <p className="mt-1"><span className="font-semibold text-slate-700">Physical form: </span><span className="text-slate-800">{sub.physical_form}</span></p>
                                  )}
                                  {"accession_number" in sub && sub.accession_number != null && sub.accession_number !== "" && (
                                    <p className="mt-1"><span className="font-semibold text-slate-700">Accession number: </span><span className="text-slate-800">{sub.accession_number}</span></p>
                                  )}
                                  {"molecular_structure" in sub && sub.molecular_structure != null && sub.molecular_structure !== "" && (
                                    <p className="mt-1"><span className="font-semibold text-slate-700">Molecular structure: </span><span className="text-slate-800">{sub.molecular_structure}</span></p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border-t border-slate-200 pt-4 mt-4">
                              <p className="text-slate-600">No PFAs found in processed document</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-violet-500" />
                        <h4 className="font-semibold text-slate-800">Extracted Intelligence</h4>
                        <Badge className="bg-violet-100 text-violet-700 border border-violet-200">AI Inferred</Badge>
                      </div>

                      {queueExtractedLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                          <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          <p className="text-sm text-slate-500">Processing…</p>
                        </div>
                      )}
                      {queueExtractedError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                          {queueExtractedError}
                        </div>
                      )}
                      {queueExtractedData?.message != null && queueExtractedData.message !== "" && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 mb-5">
                          {queueExtractedData.message}
                        </div>
                      )}
                      {queueExtractedData && !queueExtractedLoading && (
                        <>
                          <div className="space-y-3">
                            {queueExtractedData.json_metadata?.document_type && (
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                  <p className="text-xs text-slate-500 uppercase tracking-wide">Document type</p>
                                  <p className="font-medium text-slate-800">{queueExtractedData.json_metadata.document_type}</p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">98%</Badge>
                              </div>
                            )}
                            {queueExtractedData.json_metadata?.document_date && (
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                  <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
                                  <p className="font-medium text-slate-800">{queueExtractedData.json_metadata.document_date}</p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">98%</Badge>
                              </div>
                            )}
                            {queueExtractedData.json_metadata?.supplier_name && (
                              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                  <p className="text-xs text-slate-500 uppercase tracking-wide">Supplier</p>
                                  <p className="font-medium text-slate-800">{queueExtractedData.json_metadata.supplier_name}</p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">95%</Badge>
                              </div>
                            )}
                            {(queueExtractedData.substances ?? queueExtractedData.json_metadata?.substances ?? []).length > 0 && (
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
                                    {(queueExtractedData.substances ?? queueExtractedData.json_metadata?.substances ?? []).map((sub: ExtractedSubstance | ExtractedSubstanceMetadata, i: number) => (
                                      <tr key={"id" in sub ? sub.id : i} className="border-b border-slate-100 last:border-0">
                                        <td className="py-2 px-3 text-sm font-medium text-amber-700 bg-amber-100/50 rounded">{sub.product_name}</td>
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
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90 text-white"
                              onClick={() => handleApproveAndIndex(selectedFile)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve & Index
                            </Button>
                            <Button variant="outline" className="flex-1 border-slate-200 text-slate-700">
                              Edit Fields
                            </Button>
                          </div>
                        </>
                      )}
                      {!queueExtractedData && !queueExtractedLoading && !queueExtractedError && selectedFile.extractedData && (
                        <>
                          <div className="space-y-3">
                            {[
                              { label: "Date", value: selectedFile.extractedData.date, confidence: 98 },
                              { label: "Supplier", value: selectedFile.extractedData.supplier, confidence: 95 },
                              { label: "Chemical", value: selectedFile.extractedData.chemical, highlight: true, confidence: 92 },
                              { label: "CAS Number", value: selectedFile.extractedData.casNumber ?? "—", confidence: 89 }
                            ].map((field, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                  <p className="text-xs text-slate-500 uppercase tracking-wide">{field.label}</p>
                                  <p className={cn(
                                    "font-medium",
                                    field.highlight ? "text-amber-700 bg-amber-100 px-1 rounded inline" : "text-slate-800"
                                  )}>
                                    {field.value}
                                  </p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                                  {field.confidence}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90 text-white"
                              onClick={() => handleApproveAndIndex(selectedFile)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve & Index
                            </Button>
                            <Button variant="outline" className="flex-1 border-slate-200 text-slate-700">
                              Edit Fields
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents Library Tab */}
          <TabsContent value="documents">
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-slate-800">Document Library</CardTitle>
                  <div className="flex items-center gap-3">
                    {selectedLibraryIds.size > 0 && (
                      <>
                        <Button
                          onClick={runBulkProcessLibrary}
                          disabled={bulkSubmitting || bulkDeleting || selectedLibraryIds.size > 100}
                          title={selectedLibraryIds.size > 100 ? "Select up to 100 files" : undefined}
                          className="bg-primary hover:bg-primary/90 text-white"
                        >
                          {bulkSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                          Process Documents {selectedLibraryIds.size <= 100 ? `(${selectedLibraryIds.size})` : ""}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={runBulkDeleteLibrary}
                          disabled={bulkSubmitting || bulkDeleting}
                          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                        >
                          {bulkDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                          Delete ({selectedLibraryIds.size})
                        </Button>
                      </>
                    )}
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                    <Select value={documentFilter} onValueChange={setDocumentFilter}>
                      <SelectTrigger className="w-36 bg-white border-slate-200 text-slate-700">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="indexed">Indexed</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="irrelevant">Irrelevant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {libraryLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : libraryItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p className="font-medium text-slate-700">No documents found</p>
                    <p className="text-sm text-slate-500">Upload documents to get started</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <th className="w-10 py-3 px-4">
                            <Checkbox
                              checked={libraryItems.length > 0 && libraryItems.every((item) => selectedLibraryIds.has(item.id))}
                              onCheckedChange={toggleSelectAllLibraryOnPage}
                              aria-label="Select all on page"
                            />
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Document</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Source</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Uploaded</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Chemicals</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                          <th className="py-3 px-4 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {libraryItems.map((item, index) => {
                          const statusLabel = apiStatusToLabel[item.status as FileStatus] ?? "pending";
                          const status = getDocStatusBadge(statusLabel);
                          const sourceDisplay = apiSourceToDisplay[item.source as FileSource] ?? { label: "Legacy Archive", isCloud: false };
                          return (
                            <tr
                              key={item.id}
                              className={cn(
                                "border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors",
                                index % 2 === 1 && "bg-slate-50/50"
                              )}
                              onClick={() => setSelectedLibraryItem(item)}
                            >
                              <td className="py-3 px-4 w-10" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                  checked={selectedLibraryIds.has(item.id)}
                                  onCheckedChange={() => toggleLibrarySelection(item.id)}
                                  aria-label="Select document"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-slate-400" />
                                  <div>
                                    <p className="font-medium text-slate-800 text-sm">{item.filename}</p>
                                    <p className="text-xs text-slate-500">{formatFileSize(item.file_size)}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  {item.source === FileSource.CLOUD_STORAGE ? (
                                    <Cloud className="w-4 h-4 text-primary" />
                                  ) : item.source === FileSource.EMAIL ? (
                                    <Mail className="w-4 h-4 text-slate-400" />
                                  ) : (
                                    <Archive className="w-4 h-4 text-slate-400" />
                                  )}
                                  <span className={cn("text-sm", sourceDisplay.isCloud ? "text-slate-700 font-medium" : "text-slate-600")}>
                                    {sourceDisplay.label}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-600">
                                {formatDate(new Date(item.created_at))}
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="border-slate-200 text-slate-600">
                                  {item.chemicals_count} found
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Badge className={cn("border", status.className)}>
                                  {status.label}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-slate-600"
                                  onClick={() => setSelectedLibraryItem(item)}
                                  aria-label="View extracted data"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {!libraryLoading && libraryTotal > libraryPageSize && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      Showing {(libraryPage - 1) * libraryPageSize + 1} to {Math.min(libraryPage * libraryPageSize, libraryTotal)} of {libraryTotal}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLibraryPage((p) => Math.max(1, p - 1))}
                        disabled={libraryPage <= 1}
                        className="border-slate-200 text-slate-600"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                      <span className="text-sm text-slate-600 px-2">
                        Page {libraryPage} of {Math.max(1, Math.ceil(libraryTotal / libraryPageSize))}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLibraryPage((p) => p + 1)}
                        disabled={libraryPage >= Math.ceil(libraryTotal / libraryPageSize)}
                        className="border-slate-200 text-slate-600"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Sheet open={!!selectedLibraryItem} onOpenChange={(open) => !open && setSelectedLibraryItem(null)}>
          <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-none overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {selectedLibraryItem ? selectedLibraryItem.filename : "Extracted Data"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              {extractedLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}
              {extractedError && (
                <div className={cn(
                  "rounded-lg border p-4 text-sm",
                  extractedErrorIsNotReady
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-red-200 bg-red-50 text-red-700"
                )}>
                  {extractedError}
                </div>
              )}
              {!extractedLoading && !extractedError && extractedData?.message != null && extractedData.message !== "" && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 mb-5">
                  {extractedData.message}
                </div>
              )}
              {!extractedLoading && !extractedError && extractedData && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    <h4 className="font-semibold text-slate-800">Extracted Intelligence</h4>
                    <Badge className="bg-violet-100 text-violet-700 border border-violet-200">AI Inferred</Badge>
                  </div>
                  <div className="space-y-3">
                    {extractedData.json_metadata?.document_type && (
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">DOCUMENT TYPE</p>
                          <p className="font-medium text-slate-800">{extractedData.json_metadata.document_type}</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">98%</Badge>
                      </div>
                    )}
                    {extractedData.json_metadata?.document_date && (
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">DATE</p>
                          <p className="font-medium text-slate-800">{extractedData.json_metadata.document_date}</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">98%</Badge>
                      </div>
                    )}
                    {extractedData.json_metadata?.supplier_name && (
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">SUPPLIER</p>
                          <p className="font-medium text-slate-800">{extractedData.json_metadata.supplier_name}</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">95%</Badge>
                      </div>
                    )}
                    {(extractedData.substances ?? extractedData.json_metadata?.substances ?? []).length > 0 && (
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
                            {(extractedData.substances ?? extractedData.json_metadata?.substances ?? []).map((sub: ExtractedSubstance | ExtractedSubstanceMetadata, i: number) => (
                              <tr key={"id" in sub ? sub.id : i} className="border-b border-slate-100 last:border-0">
                                <td className="py-2 px-3 text-sm font-medium text-amber-700 bg-amber-100/50 rounded">{sub.product_name}</td>
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
