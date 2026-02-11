import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useCFA } from "@/contexts/CFAContext";
import { chemicalService, ApiChemical, SUBSTANCE_STATUS_LABELS, type GapLevel } from "@/services/chemicals";
import { fileService } from "@/services/files";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileText,
  ExternalLink,
  Send,
  X,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...Object.entries(SUBSTANCE_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

export function DetectiveView() {
  const {
    setInvestigationDrawerOpen,
    investigationDrawerOpen,
    investigationChemicalId,
    setInvestigationChemicalId,
    dashboardFilter,
    setDashboardFilter,
  } = useCFA();

  // Local state for API data
  const [chemicals, setChemicals] = useState<ApiChemical[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalGapsDetected, setTotalGapsDetected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedChemicalDetails, setSelectedChemicalDetails] = useState<ApiChemical | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [appliedSearch, setAppliedSearch] = useState("");

  const fetchChemicals = useCallback(async () => {
    setLoading(true);
    try {
      let minRisk = 0;
      let maxRisk = 100;
      if (riskFilter === "high") {
        minRisk = 80;
      } else if (riskFilter === "medium") {
        minRisk = 40;
        maxRisk = 79;
      } else if (riskFilter === "low") {
        maxRisk = 39;
      }

      const response = await chemicalService.getChemicals({
        search: appliedSearch.trim() || undefined,
        status: statusFilter === "all" ? undefined : parseInt(statusFilter, 10),
        min_risk_score: minRisk,
        max_risk_score: maxRisk,
        page: currentPage,
        size: itemsPerPage,
      });
      setChemicals(response.items);
      setTotalItems(response.total);
      setTotalGapsDetected(response.total_gaps_detected ?? null);
    } catch (error) {
      console.error("Error fetching chemicals:", error);
      toast.error("Failed to load investigation data");
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, statusFilter, riskFilter, currentPage]);

  useEffect(() => {
    fetchChemicals();
  }, [fetchChemicals]);

  // When dashboard opens drawer with a specific chemical id, load it
  useEffect(() => {
    if (investigationDrawerOpen && investigationChemicalId != null) {
      chemicalService.getChemicalDetails(investigationChemicalId).then(setSelectedChemicalDetails).catch(() => {
        toast.error("Failed to load chemical details");
      }).finally(() => {
        setInvestigationChemicalId(null);
      });
    }
  }, [investigationDrawerOpen, investigationChemicalId, setInvestigationChemicalId]);

  // Debounce search: apply searchQuery to appliedSearch after 400ms
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setAppliedSearch(searchQuery);
      setCurrentPage(1);
      searchDebounceRef.current = null;
    }, 400);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setStatusFilter("all");
    setRiskFilter("all");
    setDashboardFilter({ type: null });
    setCurrentPage(1);
  };

  const handleOpenInvestigation = async (chemicalId: number) => {
    try {
      setInvestigationDrawerOpen(true);
      // Optimistically find in list first
      const partial = chemicals.find(c => c.id === chemicalId);
      if (partial) setSelectedChemicalDetails(partial);

      const details = await chemicalService.getChemicalDetails(chemicalId);
      setSelectedChemicalDetails(details);
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Failed to load details");
    }
  };

  const handleViewOriginal = async () => {
    if (!selectedChemicalDetails?.file?.id) return;

    try {
      const blob = await fileService.viewFile(selectedChemicalDetails.file.id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      // Clean up the URL object after a short delay to allow the new window to load
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error viewing file:", error);
      toast.error("Failed to open file preview");
    }
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) return { className: "bg-rose-100 text-rose-700 border-rose-200", label: "High" };
    if (score >= 40) return { className: "bg-amber-100 text-amber-700 border-amber-200", label: "Medium" };
    return { className: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Low" };
  };

  const getStatusBadge = (status: number) => {
    const label = SUBSTANCE_STATUS_LABELS[status] ?? "Unknown";
    const statusStyles: Record<number, string> = {
      0: "bg-violet-100 text-violet-700 border-violet-200",
      1: "bg-emerald-100 text-emerald-700 border-emerald-200",
      2: "bg-amber-100 text-amber-700 border-amber-200",
      3: "bg-blue-100 text-blue-700 border-blue-200",
      4: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return { className: statusStyles[status] ?? "bg-slate-100 text-slate-700 border-slate-200", label };
  };

  const getGapLevelBadge = (level: GapLevel) => {
    switch (level) {
      case "CRITICAL":
        return { className: "bg-red-100 text-red-700 border-red-200", label: "Critical" };
      case "HIGH":
        return { className: "bg-orange-100 text-orange-700 border-orange-200", label: "High" };
      case "MEDIUM":
        return { className: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Medium" };
      case "LOW":
        return { className: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Low" };
      default:
        return { className: "bg-slate-100 text-slate-700 border-slate-200", label: level };
    }
  };

  const getRecommendedAction = (level: GapLevel): string => {
    switch (level) {
      case "CRITICAL":
        return "Missing chemical identity. Obtain name/CAS before reporting.";
      case "HIGH":
        return "Missing quantities or dates. Collect concentration, quantity, or document date.";
      case "MEDIUM":
        return "Missing supplier or use info. Add supplier details or use category.";
      case "LOW":
        return "All important fields present. No immediate action required.";
      default:
        return "Review checklist and fill any missing fields.";
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const gapCount = totalGapsDetected ?? chemicals.filter(c => c.gap_level === "CRITICAL" || c.gap_level === "HIGH").length;
  const hasActiveFilters = searchQuery || statusFilter !== "all" || riskFilter !== "all";

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            The Detective
          </h2>
          <p className="text-slate-500 mt-1">Analyze extracted data, identify gaps, and assess PFAS risks</p>
        </div>

        {/* Filters */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search by product, CAS #, or supplier..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-40 bg-white border-slate-200 text-slate-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={(v) => { setRiskFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-36 bg-white border-slate-200 text-slate-700">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-slate-600 hover:text-slate-900">
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center justify-between">
              <span>Identified Substances ({totalItems})</span>
              <Badge className={cn("border", gapCount > 0 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-600 border-slate-200")}>
                {gapCount} Gaps
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-slate-500">Loading...</div>
            ) : chemicals.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="font-medium text-slate-700">No substances found</p>
                <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query</p>
                {hasActiveFilters && (
                  <Button variant="link" onClick={handleClearFilters} className="mt-2 text-primary">
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">CAS Number</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Score</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gap Level</th>
                        <th className="py-3 px-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {chemicals.map((record, index) => {
                        const risk = getRiskBadge(record.risk_score);
                        const status = getStatusBadge(record.status);
                        const gapBadge = getGapLevelBadge(record.gap_level);

                        return (
                          <tr
                            key={record.id}
                            className={cn(
                              "border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer",
                              index % 2 === 1 && "bg-slate-50/50"
                            )}
                            onClick={() => handleOpenInvestigation(record.id)}
                          >
                            <td className="py-3 px-4">
                              <span className="text-sm font-medium text-slate-800">{record.product_name}</span>
                            </td>
                            <td className="py-3 px-4">
                              <code className="text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">{record.cas_number}</code>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                              {record.file?.document_date ? new Date(record.file.document_date).getFullYear() : "—"}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="truncate max-w-32">{record.file?.filename ?? "—"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={cn("border font-medium", risk.className)}>
                                {record.risk_score}/100 ({risk.label})
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={cn("border font-medium", status.className)}>
                                {status.label}
                                {record.status === 2 && <AlertTriangle className="w-3 h-3 ml-1" />}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={cn("border font-medium", gapBadge.className)}>
                                {gapBadge.label}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {/* Note: API Pagination is server-side, so we trigger fetch by changing page state */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="border-slate-200 text-slate-600"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="border-slate-200 text-slate-600"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-slate-600 px-3">
                        {currentPage} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="border-slate-200 text-slate-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="border-slate-200 text-slate-600"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Investigation Drawer */}
        <Sheet open={investigationDrawerOpen} onOpenChange={setInvestigationDrawerOpen}>
          <SheetContent className="w-[480px] sm:max-w-[480px] bg-white overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-slate-900">
                <Search className="w-5 h-5 text-primary" />
                Investigation Detail
              </SheetTitle>
            </SheetHeader>

            {selectedChemicalDetails ? (
              <div className="mt-6 space-y-5">
                {/* Chemical Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-slate-900">{selectedChemicalDetails.product_name}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">CAS Number</p>
                      <code className="font-mono text-slate-800">{selectedChemicalDetails.cas_number}</code>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Year Detected</p>
                      <p className="font-medium text-slate-800">
                        {selectedChemicalDetails.file?.document_date
                          ? new Date(selectedChemicalDetails.file.document_date).getFullYear()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {(() => {
                      const risk = getRiskBadge(selectedChemicalDetails.risk_score);
                      return (
                        <Badge className={cn("border", risk.className)}>
                          Risk: {selectedChemicalDetails.risk_score}/100
                        </Badge>
                      );
                    })()}
                    {(() => {
                      const status = getStatusBadge(selectedChemicalDetails.status);
                      return (
                        <Badge className={cn("border", status.className)}>
                          {status.label}
                        </Badge>
                      );
                    })()}
                  </div>
                </div>

                {/* Gap checklist */}
                {selectedChemicalDetails.gap_checklist && (
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <span className="text-sm font-medium text-slate-600 block mb-2">Data checklist</span>
                    <ul className="space-y-1.5 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_chemical_id ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Chemical ID (name/CAS)
                      </li>
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_quantities ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Quantities
                      </li>
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_dates ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Dates
                      </li>
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_supplier ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Supplier
                      </li>
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_use_info ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Use info
                      </li>
                      <li className="flex items-center gap-2">
                        {selectedChemicalDetails.gap_checklist.have_documents ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                        Documents
                      </li>
                    </ul>
                  </div>
                )}

                {/* Supplier Info */}
                <div className="border border-slate-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">Supplier</span>
                  </div>
                  <p className="text-sm text-slate-800 font-medium">{selectedChemicalDetails.supplier?.name ?? "—"}</p>
                  {selectedChemicalDetails.supplier?.contact_email && (
                    <p className="text-sm text-slate-600 mt-1">{selectedChemicalDetails.supplier.contact_email}</p>
                  )}
                  {selectedChemicalDetails.concentration && (
                    <p className="text-sm text-slate-600 mt-1">Concentration: {selectedChemicalDetails.concentration}</p>
                  )}
                  {selectedChemicalDetails.use_category && (
                    <p className="text-sm text-slate-600 mt-1">Use category: {selectedChemicalDetails.use_category}</p>
                  )}
                </div>

                {/* Source Document */}
                <div className="border border-slate-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">Source Document</span>
                  </div>
                  <p className="text-sm text-slate-800 break-all">{selectedChemicalDetails.file?.filename ?? "—"}</p>
                  {selectedChemicalDetails.file?.id && (
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-primary"
                      onClick={handleViewOriginal}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Original
                    </Button>
                  )}
                </div>

                {/* Recommendation */}
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Send className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h5 className="font-semibold text-primary">Recommended Action</h5>
                      <p className="text-sm text-primary mt-1">
                        {getRecommendedAction(selectedChemicalDetails.gap_level)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Verify Record
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                {loading ? "Loading details..." : "Select a chemical to view details"}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
