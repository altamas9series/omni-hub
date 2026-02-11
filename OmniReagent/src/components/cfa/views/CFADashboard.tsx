import React, { useEffect, useState, useCallback } from "react";
import { useCFA } from "@/contexts/CFAContext";
import { auditLogService, ApiAuditLogEntry } from "@/services/auditLogs";
import { chemicalService, type GapSummaryResponse } from "@/services/chemicals";
import {
  FileText,
  AlertTriangle,
  Search as SearchIcon,
  Send,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  AlertCircle,
  FileWarning,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

export function CFADashboard() {
  const {
    stats,
    chemicalRecords,
    chartData,
    setCurrentView,
    setDashboardFilter,
    setSelectedChemical,
    setInvestigationDrawerOpen,
    setInvestigationChemicalId,
    refreshDocuments,
    refreshDashboard
  } = useCFA();

  const [recentActivity, setRecentActivity] = useState<ApiAuditLogEntry[]>([]);
  const [recentActivityLoading, setRecentActivityLoading] = useState(true);
  const [gapSummary, setGapSummary] = useState<GapSummaryResponse | null>(null);
  const [gapSummaryLoading, setGapSummaryLoading] = useState(true);
  const [gapSummaryOpen, setGapSummaryOpen] = useState(true);

  const fetchRecentActivity = useCallback(async () => {
    setRecentActivityLoading(true);
    try {
      const res = await auditLogService.getAuditLogs(1, 5);
      setRecentActivity(res.items);
    } catch {
      setRecentActivity([]);
    } finally {
      setRecentActivityLoading(false);
    }
  }, []);

  const fetchGapSummary = useCallback(async () => {
    setGapSummaryLoading(true);
    try {
      const res = await chemicalService.getGapSummary();
      setGapSummary(res);
    } catch {
      setGapSummary(null);
    } finally {
      setGapSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDocuments();
    refreshDashboard();
  }, [refreshDocuments, refreshDashboard]);

  useEffect(() => {
    fetchRecentActivity();
  }, [fetchRecentActivity]);

  useEffect(() => {
    fetchGapSummary();
  }, [fetchGapSummary]);

  const handleStatClick = (type: "documents" | "pfas" | "gaps" | "rfis") => {
    setDashboardFilter({ type });

    switch (type) {
      case "documents":
        setCurrentView("archaeologist");
        break;
      case "pfas":
      case "gaps":
        setCurrentView("detective");
        break;
      case "rfis":
        setCurrentView("orchestrator");
        break;
    }
  };

  const handleChartClick = (data: any) => {
    if (data && data.activePayload) {
      const month = data.activePayload[0]?.payload?.month;
      if (month) {
        setDashboardFilter({ type: "month", month });
        setCurrentView("detective");
      }
    }
  };

  const handleActivityClick = (entry: ApiAuditLogEntry) => {
    const fileId = entry.metadata?.file_id as number | undefined;
    if (fileId != null) {
      setCurrentView("archaeologist");
    } else {
      setCurrentView("orchestrator");
    }
  };

  const handleHighRiskClick = (record: typeof chemicalRecords[0]) => {
    setSelectedChemical(record);
    setInvestigationDrawerOpen(true);
    setCurrentView("detective");
  };

  const handleTopGapClick = (chemicalId: number) => {
    setInvestigationChemicalId(chemicalId);
    setInvestigationDrawerOpen(true);
    setCurrentView("detective");
  };

  const statCards = [
    {
      title: "Documents Ingested",
      value: stats.documentsIngested.toString(),
      icon: FileText,
      trend: `+${stats.indexedDocuments} indexed`,
      trendUp: true,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      onClick: () => handleStatClick("documents"),
    },
    {
      title: "PFAS Candidates Found",
      value: stats.pfasCandidates.toString(),
      icon: AlertTriangle,
      trend: `${stats.highRiskSubstances} high risk`,
      trendUp: true,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      valueColor: "text-rose-600",
      onClick: () => handleStatClick("pfas"),
    },
    {
      title: "Data Gaps",
      value: stats.dataGaps.toString(),
      icon: SearchIcon,
      trend: `${stats.gapsPendingRfi} pending RFI`,
      trendUp: false,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
      onClick: () => handleStatClick("gaps"),
    },
    {
      title: "RFIs Sent",
      value: stats.rfisSent.toString(),
      icon: Send,
      trend: `${stats.rfisResponded} responded`,
      trendUp: true,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-600",
      onClick: () => handleStatClick("rfis"),
    }
  ];

  const getActivityIcon = (category: string) => {
    switch (category) {
      case "upload": return FileText;
      case "extraction": return Activity;
      case "pfas_identified": return AlertCircle;
      case "rfi": return Send;
      case "verification": return CheckCircle2;
      default: return AlertCircle;
    }
  };

  const getActivityColor = (category: string) => {
    switch (category) {
      case "upload": return "bg-blue-500";
      case "extraction": return "bg-violet-500";
      case "pfas_identified": return "bg-amber-500";
      case "rfi": return "bg-emerald-500";
      case "verification": return "bg-primary";
      default: return "bg-slate-500";
    }
  };

  const formatRelativeTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  const highRiskItems = chemicalRecords.filter(r => r.riskScore >= 80).slice(0, 5);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white border border-slate-200 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-slate-300"
              onClick={stat.onClick}
            >
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className={cn("text-3xl font-bold mt-1", stat.valueColor || "text-slate-900")}>
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trendUp ? (
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-amber-500" />
                      )}
                      <span className="text-xs text-slate-500">{stat.trend}</span>
                    </div>
                  </div>
                  <div className={cn("p-3 rounded-lg", stat.iconBg)}>
                    <Icon className={cn("w-5 h-5", stat.iconColor)} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">View details</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gap summary (one-page dashboard) – minimizable */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <Collapsible open={gapSummaryOpen} onOpenChange={setGapSummaryOpen}>
          <CardHeader className="pb-2">
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between text-left hover:opacity-80 transition-opacity"
              >
                <CardTitle className="text-base font-semibold text-slate-800">Gap summary</CardTitle>
                <ChevronDown
                  className={cn("h-4 w-4 text-slate-500 transition-transform", gapSummaryOpen && "rotate-180")}
                />
              </button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              {gapSummaryLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : gapSummary ? (
                <>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm text-slate-600">Total PFAS chemicals: <strong className="text-slate-900">{gapSummary.total_chemicals}</strong></span>
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">Total: {gapSummary.total_gaps_detected ?? gapSummary.total_chemicals}</Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">CRITICAL: {gapSummary.critical_count}</Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">HIGH: {gapSummary.high_count}</Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">MEDIUM: {gapSummary.medium_count}</Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">LOW: {gapSummary.low_count}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">Completeness</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { key: "chemical_id_pct", label: "Chemical ID" },
                        { key: "quantities_pct", label: "Quantities" },
                        { key: "dates_pct", label: "Dates" },
                        { key: "supplier_pct", label: "Supplier" },
                        { key: "use_info_pct", label: "Use category" },
                        { key: "documents_pct", label: "Documents" },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>{label}</span>
                            <span>{gapSummary.completeness[key as keyof typeof gapSummary.completeness]}%</span>
                          </div>
                          <Progress value={gapSummary.completeness[key as keyof typeof gapSummary.completeness]} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {gapSummary.top_gap_ids.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Top gaps to fix</p>
                      <div className="flex flex-wrap gap-2">
                        {gapSummary.top_gap_ids.map((id) => (
                          <Button
                            key={id}
                            variant="outline"
                            size="sm"
                            className="border-slate-200 text-slate-700 hover:bg-slate-50"
                            onClick={() => handleTopGapClick(id)}
                          >
                            Substance #{id}
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-500 py-4">Gap summary unavailable</p>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center justify-between">
              <span>Documents Processed vs. Risks Identified</span>
              <Badge variant="outline" className="text-xs font-normal text-slate-500 border-slate-300">
                Click bars to filter
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} onClick={handleChartClick}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                    labelStyle={{ color: "#334155", fontWeight: 600 }}
                    formatter={(value: number, name: string) => [
                      value,
                      name === "processed" ? "Documents Processed" : "Risks Identified"
                    ]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="processed"
                    radius={[4, 4, 0, 0]}
                    name="processed"
                    cursor="pointer"
                    fill="#0d9488"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="risks"
                    stroke="#e11d48"
                    strokeWidth={2}
                    dot={{ fill: "#e11d48", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#e11d48" }}
                    name="risks"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivityLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : recentActivity.length === 0 ? (
                <p className="text-sm text-slate-500 py-4">No recent activity</p>
              ) : (
                recentActivity.map((entry) => {
                  const Icon = getActivityIcon(entry.category);
                  const hasFileId = entry.metadata?.file_id != null;

                  return (
                    <button
                      key={entry.id}
                      className={cn(
                        "w-full flex items-start gap-3 text-left p-2.5 -mx-2 rounded-lg transition-colors",
                        hasFileId ? "hover:bg-slate-50 cursor-pointer" : "cursor-default"
                      )}
                      onClick={() => handleActivityClick(entry)}
                      disabled={!hasFileId}
                    >
                      <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0", getActivityColor(entry.category))}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{entry.title}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{entry.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-slate-400">{entry.actor_display_name}</span>
                          <span className="text-xs text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{formatRelativeTime(entry.created_at)}</span>
                          {hasFileId && (
                            <ExternalLink className="w-3 h-3 text-primary ml-auto" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-3 text-primary hover:text-primary/90 hover:bg-primary/10"
              onClick={() => setCurrentView("orchestrator")}
            >
              View Full Audit Log
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* High Risk Items */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-rose-500" />
              High-Priority Items Requiring Attention
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 border-slate-300 hover:bg-slate-50"
              onClick={() => {
                setDashboardFilter({ type: "pfas" });
                setCurrentView("detective");
              }}
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">CAS Number</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Score</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {highRiskItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      "border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors",
                      index % 2 === 1 && "bg-slate-50/50"
                    )}
                    onClick={() => handleHighRiskClick(item)}
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-slate-800">{item.productName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {item.casNumber}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600">{item.supplier}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn(
                        "font-medium",
                        item.riskScore >= 90
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      )}>
                        {item.riskScore}/100
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn(
                        "font-medium",
                        item.status === "evidence-gap"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : item.status === "verified"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-violet-100 text-violet-700 border border-violet-200"
                      )}>
                        {item.status === "evidence-gap" ? "Evidence Gap" :
                          item.status === "verified" ? "Verified" : "Pending Review"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
