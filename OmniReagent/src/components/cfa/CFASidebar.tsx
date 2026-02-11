import { useCFA, CFAView } from "@/contexts/CFAContext";
import { 
  LayoutDashboard, 
  Pickaxe, 
  Search, 
  Workflow,
  Shield,
  FileText,
  AlertTriangle,
  CloudCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  id: CFAView;
  label: string;
  icon: React.ElementType;
  description: string;
  badge?: number;
  badgeType?: "default" | "warning" | "success";
}

export function CFASidebar() {
  const { currentView, setCurrentView, setDashboardFilter, stats, documents, rfiTasks, cloudProviders } = useCFA();

  const connectedProvidersCount = cloudProviders.filter(p => p.connected).length;

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Compliance overview"
    },
    {
      id: "archaeologist",
      label: "The Alchemist",
      icon: Pickaxe,
      description: "Transform docs to intelligence",
      badge: documents.filter(d => d.status === "pending" || d.status === "processing").length || undefined,
      badgeType: "default"
    },
    {
      id: "sync-configuration",
      label: "Sync Configuration",
      icon: CloudCog,
      description: "Cloud storage connections",
      badge: connectedProvidersCount > 0 ? connectedProvidersCount : undefined,
      badgeType: "success"
    },
    {
      id: "detective",
      label: "The Detective",
      icon: Search,
      description: "Analysis & gap detection",
      badge: stats.dataGaps > 0 ? stats.dataGaps : undefined,
      badgeType: "warning"
    },
    {
      id: "orchestrator",
      label: "The Orchestrator",
      icon: Workflow,
      description: "Actions & outreach",
      badge: rfiTasks.filter(t => t.status === "pending").length || undefined,
      badgeType: "default"
    }
  ];

  const getBadgeClass = (type?: string) => {
    switch (type) {
      case "warning": return "bg-amber-500 text-white border-0";
      case "success": return "bg-status-success text-white border-0";
      default: return "bg-primary text-primary-foreground border-0";
    }
  };

  return (
    <aside className="w-64 bg-sidebar flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-sm">Compliance</h1>
            <p className="text-xs text-sidebar-foreground/70">Forensic Agent</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-3">
          Agent Modes
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {item.label}
                  </p>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge className={cn("h-5 min-w-5 px-1.5 text-xs", getBadgeClass(item.badgeType))}>
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className={cn(
                  "text-xs truncate",
                  isActive ? "text-primary-foreground/90" : "text-sidebar-foreground/70"
                )}>
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setCurrentView("archaeologist")}
            className="bg-sidebar-accent rounded-lg p-3 hover:bg-sidebar-accent/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs text-sidebar-foreground/70">Docs</span>
            </div>
            <p className="text-lg font-bold text-sidebar-foreground mt-1">{stats.documentsIngested}</p>
          </button>
          <button 
            onClick={() => {
              setDashboardFilter({ type: "gaps" });
              setCurrentView("detective");
            }}
            className="bg-sidebar-accent rounded-lg p-3 hover:bg-sidebar-accent/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-sidebar-foreground/70">Gaps</span>
            </div>
            <p className="text-lg font-bold text-amber-400 mt-1">{stats.dataGaps}</p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-xs font-medium text-sidebar-foreground/90">System Status</span>
          </div>
          <p className="text-xs text-sidebar-foreground/70">All agents operational</p>
          <p className="text-xs text-sidebar-foreground/70">Last sync: 2 min ago</p>
        </div>
      </div>
    </aside>
  );
}
