import { useState, useEffect, useCallback } from "react";
import { Bell, CheckCheck, Cloud, FileText, FlaskConical, Mail, Settings, Workflow, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { auditLogService, ApiAuditLogEntry } from "@/services/auditLogs";
import { useCFA } from "@/contexts/CFAContext";

const NOTIFICATION_PAGE_SIZE = 50;
const LAST_SEEN_KEY = "cfa_audit_log_last_seen";

function getCategoryIcon(category: string): React.ElementType {
  switch (category) {
    case "drive_sync":
      return Cloud;
    case "upload":
    case "document_processed":
    case "document":
      return FileText;
    case "extraction":
      return Workflow;
    case "pfas_identified":
    case "pfas":
      return FlaskConical;
    case "rfi":
      return Send;
    case "verification":
      return CheckCircle2;
    default:
      return AlertCircle;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "drive_sync":
      return "bg-blue-100 text-blue-600";
    case "upload":
    case "document_processed":
    case "document":
      return "bg-emerald-100 text-emerald-600";
    case "extraction":
      return "bg-violet-100 text-violet-600";
    case "pfas_identified":
    case "pfas":
      return "bg-rose-100 text-rose-600";
    case "rfi":
      return "bg-amber-100 text-amber-600";
    case "verification":
      return "bg-primary/10 text-primary";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function NotificationPopover() {
  const { setCurrentView } = useCFA();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ApiAuditLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState<number>(() => {
    try {
      const v = localStorage.getItem(LAST_SEEN_KEY);
      return v ? parseInt(v, 10) : 0;
    } catch {
      return 0;
    }
  });

  const fetchAuditLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await auditLogService.getAuditLogs(1, NOTIFICATION_PAGE_SIZE);
      setItems(res.items);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  useEffect(() => {
    if (open) {
      fetchAuditLogs();
    }
  }, [open, fetchAuditLogs]);

  useEffect(() => {
    const interval = setInterval(fetchAuditLogs, 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAuditLogs]);

  const unreadCount = items.filter((entry) => new Date(entry.created_at).getTime() > lastSeenAt).length;

  const markAllAsRead = useCallback(() => {
    const now = Date.now();
    setLastSeenAt(now);
    try {
      localStorage.setItem(LAST_SEEN_KEY, String(now));
    } catch {
      // ignore
    }
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) {
        const now = Date.now();
        setLastSeenAt(now);
        try {
          localStorage.setItem(LAST_SEEN_KEY, String(now));
        } catch {
          // ignore
        }
      }
    },
    []
  );

  const handleViewAll = useCallback(() => {
    setOpen(false);
    setCurrentView("orchestrator");
  }, [setCurrentView]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 shadow-lg border border-slate-200"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="bg-rose-100 text-rose-700 border-0 text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary/90 font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading && items.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50 animate-pulse" />
              <p className="text-sm">Loading…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            items.map((entry) => {
              const Icon = getCategoryIcon(entry.category);
              const colorClass = getCategoryColor(entry.category);
              const isUnread = new Date(entry.created_at).getTime() > lastSeenAt;

              return (
                <div
                  key={entry.id}
                  className={cn(
                    "flex gap-3 p-4 border-b border-slate-50 last:border-0",
                    isUnread ? "bg-primary/5" : "bg-background"
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn(
                        "text-sm truncate",
                        isUnread ? "font-semibold text-slate-900" : "font-medium text-slate-700"
                      )}>
                        {entry.title}
                      </p>
                      {isUnread && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {entry.description}
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block">
                      {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={handleViewAll}
            className="w-full text-center text-sm text-primary hover:text-primary/90 font-medium py-1"
          >
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
