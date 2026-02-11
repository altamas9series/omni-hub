import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { CFAProvider, useCFA } from "@/contexts/CFAContext";
import { CFASidebar } from "@/components/cfa/CFASidebar";
import { CFAHeader } from "@/components/cfa/CFAHeader";
import { CFADashboard } from "@/components/cfa/views/CFADashboard";
import { ArchaeologistView } from "@/components/cfa/views/ArchaeologistView";
import { DetectiveView } from "@/components/cfa/views/DetectiveView";
import { OrchestratorView } from "@/components/cfa/views/OrchestratorView";
import { SyncConfigurationView } from "@/components/cfa/views/SyncConfigurationView";

function CFAContent() {
  const { currentView } = useCFA();

  const views: Record<string, React.ReactNode> = {
    dashboard: <CFADashboard />,
    archaeologist: <ArchaeologistView />,
    detective: <DetectiveView />,
    orchestrator: <OrchestratorView />,
    "sync-configuration": <SyncConfigurationView />
  };

  return <>{views[currentView] || <CFADashboard />}</>;
}

export default function Platform() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const syncSuccessShown = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    const syncSuccess = searchParams.get("sync_success");
    if (syncSuccess === "true" && !syncSuccessShown.current) {
      syncSuccessShown.current = true;
      toast.success("Google Drive connected successfully", {
        description: "You can now select files from this drive.",
      });
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("sync_success");
        return next;
      }, { replace: true });
    }
  }, [isAuthenticated, isLoading, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <CFAProvider>
      <div className="fixed inset-0 z-50 bg-slate-50 flex">
        <CFASidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <CFAHeader />
          <main className="flex-1 overflow-auto">
            <CFAContent />
          </main>
        </div>
      </div>
    </CFAProvider>
  );
}
