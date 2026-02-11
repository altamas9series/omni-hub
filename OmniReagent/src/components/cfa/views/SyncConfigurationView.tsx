import { useState, useEffect, useCallback } from "react";
import { useCFA, CloudProvider } from "@/contexts/CFAContext";
import {
  Cloud,
  Check,
  Link2,
  Unlink,
  RefreshCw,
  HardDrive,
  Building2,
  ExternalLink,
  Folder,
  ChevronRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { gdriveService, GDriveStatusResponse, GDriveFileItem } from "@/services/gdrive";
import { fileService } from "@/services/files";



// Mock file names for auto-sync simulation
const mockSyncedFiles = [
  { name: "Q4_2023_PFAS_Inventory.pdf", size: 234567 },
  { name: "Supplier_Compliance_Report.pdf", size: 456789 },
  { name: "Chemical_Safety_Data_Sheet.xlsx", size: 123456 },
  { name: "Manufacturing_Process_Docs.pdf", size: 345678 },
  { name: "Environmental_Audit_2024.pdf", size: 567890 },
  { name: "Vendor_PFAS_Declaration.pdf", size: 198765 },
  { name: "Product_Testing_Results.csv", size: 87654 },
  { name: "Regulatory_Compliance_Matrix.xlsx", size: 234567 },
];

// Provider logos and colors; iconSize optional (default w-6 h-6)
const providerConfig = {
  "google-drive": {
    name: "Google Drive",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
    color: "bg-[#4285f4]",
    bgLight: "bg-blue-50 hover:bg-blue-100",
    borderColor: "border-blue-200",
    iconSize: "w-6 h-6",
  },
  sharepoint: {
    name: "SharePoint",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/28/Microsoft_Office_SharePoint_%282025%E2%80%93present%29.svg",
    color: "bg-[#038387]",
    bgLight: "bg-primary/10 hover:bg-primary/20",
    borderColor: "border-primary/30",
    iconSize: "w-6 h-6",
  },
  onedrive: {
    name: "OneDrive",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/25/OneDrive_logo.svg",
    color: "bg-[#0078d4]",
    bgLight: "bg-indigo-50 hover:bg-indigo-100",
    borderColor: "border-indigo-200",
    iconSize: "w-6 h-6",
  },
  box: {
    name: "Box",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/Box%2C_Inc._logo.svg",
    color: "bg-[#0061d5]",
    bgLight: "bg-blue-50 hover:bg-blue-100",
    borderColor: "border-blue-200",
    iconSize: "w-7 h-7",
  },
  dropbox: {
    name: "Dropbox",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
    color: "bg-[#0061ff]",
    bgLight: "bg-sky-50 hover:bg-sky-100",
    borderColor: "border-sky-200",
    iconSize: "w-7 h-7",
  },
  "aws-s3": {
    name: "AWS S3",
    icon: "",
    color: "bg-[#ff9900]",
    bgLight: "bg-orange-50 hover:bg-orange-100",
    borderColor: "border-orange-200",
    iconSize: "w-6 h-6",
  },
};

export function SyncConfigurationView() {
  const { cloudProviders, setCloudProviders, addAuditEntry, setCurrentView, setOpenAlchemistToDocumentLibrary } = useCFA();
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const [oauthModalOpen, setOauthModalOpen] = useState(false);
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider | null>(null);

  const [gdriveStatus, setGdriveStatus] = useState<GDriveStatusResponse | null>(null);
  const [filesAvailableCount, setFilesAvailableCount] = useState<number>(0);
  const [gdriveLoading, setGdriveLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
  const [folderPickerOpen, setFolderPickerOpen] = useState(false);
  const [folderStack, setFolderStack] = useState<{ id: string; name: string }[]>([]);
  const [folderFiles, setFolderFiles] = useState<GDriveFileItem[]>([]);
  const [folderNextToken, setFolderNextToken] = useState<string | null>(null);
  const [folderLoading, setFolderLoading] = useState(false);
  const [importFolderLoading, setImportFolderLoading] = useState(false);

  const fetchGdriveStatus = useCallback(async () => {
    try {
      const status = await gdriveService.getStatus();
      setGdriveStatus(status);
    } catch {
      setGdriveStatus({ is_connected: false });
    } finally {
      setGdriveLoading(false);
    }
  }, []);

  const fetchFilesAvailableCount = useCallback(async () => {
    try {
      const res = await fileService.getFiles(1, 1, "", undefined, 2);
      setFilesAvailableCount(res.total);
    } catch {
      setFilesAvailableCount(0);
    }
  }, []);

  useEffect(() => {
    fetchGdriveStatus();
    fetchFilesAvailableCount();
  }, [fetchGdriveStatus, fetchFilesAvailableCount]);

  const loadFolderContents = useCallback(
    async (parentId?: string, pageToken?: string) => {
      setFolderLoading(true);
      try {
        const res = await gdriveService.getFiles({
          ...(parentId && { parent_id: parentId }),
          ...(pageToken && { page_token: pageToken }),
          page_size: 30,
        });
        if (pageToken) {
          setFolderFiles((prev) => [...prev, ...res.files]);
        } else {
          setFolderFiles(res.files);
        }
        setFolderNextToken(res.nextPageToken ?? null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to list folder");
        setFolderFiles([]);
        setFolderNextToken(null);
      } finally {
        setFolderLoading(false);
      }
    },
    []
  );

  const openFolderPicker = useCallback(() => {
    setFolderPickerOpen(true);
    setFolderStack([]);
    setFolderFiles([]);
    setFolderNextToken(null);
    loadFolderContents();
  }, [loadFolderContents]);

  const closeFolderPicker = useCallback(() => {
    setFolderPickerOpen(false);
    setFolderStack([]);
    setFolderFiles([]);
    setFolderNextToken(null);
  }, []);

  const handleFolderNavigate = useCallback(
    (item: GDriveFileItem) => {
      if (!item.isFolder) return;
      setFolderStack((prev) => [...prev, { id: item.id, name: item.name }]);
      loadFolderContents(item.id);
    },
    [loadFolderContents]
  );

  const handleFolderBack = useCallback(() => {
    setFolderStack((prev) => {
      const next = prev.slice(0, -1);
      if (next.length === 0) {
        loadFolderContents();
      } else {
        loadFolderContents(next[next.length - 1].id);
      }
      return next;
    });
  }, [loadFolderContents]);

  const handleUseThisFolder = useCallback(async () => {
    const current = folderStack[folderStack.length - 1];
    if (!current) return;
    setImportFolderLoading(true);
    try {
      await gdriveService.setImportFolder(current.id, current.name);
      toast.success("Import folder updated");
      closeFolderPicker();
      fetchGdriveStatus();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to set folder");
    } finally {
      setImportFolderLoading(false);
    }
  }, [folderStack, closeFolderPicker, fetchGdriveStatus]);

  const handleUseEntireDrive = useCallback(async () => {
    setImportFolderLoading(true);
    try {
      await gdriveService.setImportFolder(null);
      toast.success("Import from entire Drive");
      closeFolderPicker();
      fetchGdriveStatus();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to clear folder");
    } finally {
      setImportFolderLoading(false);
    }
  }, [closeFolderPicker, fetchGdriveStatus]);

  const handleLoadMoreFolders = useCallback(() => {
    const parentId = folderStack.length > 0 ? folderStack[folderStack.length - 1].id : undefined;
    if (folderNextToken) loadFolderContents(parentId, folderNextToken);
  }, [folderStack, folderNextToken, loadFolderContents]);

  const simulateAutoSync = useCallback((provider: CloudProvider) => {
    if (!provider.connected) return;
    const mockFile = mockSyncedFiles[Math.floor(Math.random() * mockSyncedFiles.length)];
    const providerName = providerConfig[provider.id as keyof typeof providerConfig]?.name || provider.name;
    setCloudProviders(prev => prev.map(p =>
      p.id === provider.id ? { ...p, lastSynced: new Date(), filesCount: (p.filesCount || 0) + 1 } : p
    ));
    addAuditEntry({
      action: "Auto-Sync Complete",
      user: "System",
      details: `${mockFile.name} synced from ${providerName}`,
      type: "system",
    });
    toast.success(`File synced from ${providerName}`, { description: mockFile.name });
  }, [setCloudProviders, addAuditEntry]);

  const handleConnect = (providerId: string) => {
    setConnectingProvider(providerId);
    setOauthModalOpen(true);
  };

  const handleAuthorizeAccess = async () => {
    if (!connectingProvider) return;
    if (connectingProvider === "google-drive") {
      try {
        const { url } = await gdriveService.getAuthUrl();
        window.location.href = url;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to get authorization URL");
      }
      return;
    }
    const config = providerConfig[connectingProvider as keyof typeof providerConfig];
    const mockEmails: Record<string, string> = {
      dropbox: "team@acmecorp.com",
      onedrive: "admin@acmecorp.onmicrosoft.com",
      box: "documents@acmecorp.com",
      sharepoint: "legal@acmecorp.onmicrosoft.com",
      "aws-s3": "aws-admin@acmecorp.com",
    };
    const newProvider: CloudProvider = {
      id: connectingProvider,
      name: config.name,
      connected: true,
      accountEmail: mockEmails[connectingProvider] || "user@company.com",
      lastSynced: new Date(),
      filesCount: Math.floor(Math.random() * 500) + 100,
      autoSyncEnabled: false,
    };
    setCloudProviders(prev => {
      const existing = prev.findIndex(p => p.id === connectingProvider);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newProvider;
        return updated;
      }
      return [...prev, newProvider];
    });
    addAuditEntry({
      action: "Cloud Storage Connected",
      user: "John Smith",
      details: `Connected ${config.name}`,
      type: "system",
    });
    setOauthModalOpen(false);
    setConnectingProvider(null);
    toast.success(`${config.name} connected successfully`, { description: "You can now select files from this drive" });
  };

  const handleDisconnect = (provider: CloudProvider) => {
    setSelectedProvider(provider);
    setDisconnectModalOpen(true);
  };

  const confirmDisconnect = async () => {
    if (!selectedProvider) return;
    if (selectedProvider.id === "google-drive") {
      setDisconnectLoading(true);
      try {
        await gdriveService.disconnect();
        setGdriveStatus({ is_connected: false });
        fetchFilesAvailableCount();
        addAuditEntry({
          action: "Cloud Storage Disconnected",
          user: "John Smith",
          details: "Disconnected Google Drive",
          type: "system",
        });
        setDisconnectModalOpen(false);
        setSelectedProvider(null);
        toast.success("Google Drive disconnected");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to disconnect");
      } finally {
        setDisconnectLoading(false);
      }
      return;
    }
    setCloudProviders(prev => prev.filter(p => p.id !== selectedProvider.id));
    addAuditEntry({
      action: "Cloud Storage Disconnected",
      user: "John Smith",
      details: `Disconnected ${selectedProvider.name}`,
      type: "system",
    });
    setDisconnectModalOpen(false);
    setSelectedProvider(null);
    toast.success(`${selectedProvider.name} disconnected`);
  };

  const handleSync = async (provider: CloudProvider) => {
    if (provider.id === "google-drive") {
      setSyncLoading(true);
      try {
        await gdriveService.sync();
        toast.info("Syncing…");
        await Promise.all([fetchGdriveStatus(), fetchFilesAvailableCount()]);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Sync failed");
      } finally {
        setSyncLoading(false);
      }
      return;
    }
    simulateAutoSync(provider);
  };



  const formatLastSynced = (date: Date | string | null | undefined) => {
    if (date == null) return "Never";
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return d.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
  };

  const connectedCount =
    (gdriveStatus?.is_connected ? 1 : 0) + cloudProviders.filter(p => p.id !== "google-drive" && p.connected).length;

  const goToDocumentLibrary = useCallback(() => {
    setOpenAlchemistToDocumentLibrary(true);
    setCurrentView("archaeologist");
  }, [setOpenAlchemistToDocumentLibrary, setCurrentView]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Cloud className="w-6 h-6 text-primary" />
            Sync Configuration
          </h2>
          <p className="text-slate-500 mt-1">
            Connect external drives to ingest documents directly
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Link2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{connectedCount}</p>
                  <p className="text-sm text-slate-500">Connected Providers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <HardDrive className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {filesAvailableCount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">Files Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-50">
                  <Building2 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">6</p>
                  <p className="text-sm text-slate-500">Supported Providers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provider Cards */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800">
              Cloud Storage Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(providerConfig).map(([id, config]) => {
                const isGoogleDrive = id === "google-drive";
                const gdriveConnected = isGoogleDrive && gdriveStatus?.is_connected === true;
                const provider = cloudProviders.find(p => p.id === id);
                const mockConnected = !isGoogleDrive && provider?.connected;
                const isConnected = isGoogleDrive ? gdriveConnected : mockConnected;
                const displayProvider: CloudProvider | null = isGoogleDrive
                  ? (gdriveStatus?.is_connected
                    ? {
                        id: "google-drive",
                        name: config.name,
                        connected: true,
                        accountEmail: gdriveStatus.account_email,
                        lastSynced: gdriveStatus.last_synced_at ? new Date(gdriveStatus.last_synced_at) : undefined,
                        filesCount: filesAvailableCount,
                      }
                    : null)
                  : provider ?? null;

                if (isGoogleDrive && gdriveLoading) {
                  return (
                    <div key={id} className="p-5 rounded-xl border-2 border-slate-200 bg-white animate-pulse">
                      <div className="h-10 rounded bg-slate-200 mb-4" />
                      <div className="h-8 rounded bg-slate-200 w-3/4" />
                    </div>
                  );
                }

                return (
                  <div
                    key={id}
                    className={cn(
                      "p-5 rounded-xl border-2 transition-all",
                      isConnected
                        ? "border-status-success/40 bg-status-success-bg/50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", config.bgLight, config.borderColor)}>
                          {config.icon ? (
                            <img
                              src={config.icon}
                              alt={config.name}
                              className={cn("object-contain", (config as { iconSize?: string }).iconSize ?? "w-6 h-6")}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Cloud className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{config.name}</h3>
                          {isConnected && (displayProvider?.accountEmail ?? provider?.accountEmail) && (
                            <p className="text-xs text-slate-500 truncate max-w-[150px]">
                              {(displayProvider?.accountEmail ?? provider?.accountEmail) ?? ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "border",
                          isConnected
                            ? "bg-status-success-bg text-status-success-text border-status-success/30"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}
                      >
                        {isConnected ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>

                    {isConnected && (displayProvider ?? provider) ? (
                      <div className="space-y-3">
                        {isGoogleDrive && gdriveStatus?.is_connected && (
                          <div className="text-sm text-slate-600">
                            Import from:{" "}
                            {gdriveStatus.import_folder_id
                              ? (gdriveStatus.import_folder_name ?? "Selected folder")
                              : "entire Drive"}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Last synced</span>
                          <span className="text-slate-700 font-medium">
                            {formatLastSynced(
                              isGoogleDrive ? gdriveStatus?.last_synced_at : (provider?.lastSynced ?? null)
                            )}
                          </span>
                        </div>
                        {isGoogleDrive && gdriveStatus?.last_sync_message && (
                          <p className="text-sm text-slate-600">
                            {gdriveStatus.last_sync_message}
                          </p>
                        )}
                        <div className="flex flex-col gap-2 pt-2">
                          {isGoogleDrive && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                              onClick={goToDocumentLibrary}
                            >
                              <FileText className="w-3.5 h-3.5 mr-1" />
                              See files
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                            onClick={() => handleSync(displayProvider ?? provider!)}
                            disabled={isGoogleDrive && syncLoading}
                          >
                            <RefreshCw className={cn("w-3.5 h-3.5 mr-1", isGoogleDrive && syncLoading && "animate-spin")} />
                            Sync Now
                          </Button>
                          {isGoogleDrive && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                              onClick={openFolderPicker}
                              disabled={importFolderLoading}
                            >
                              <Folder className="w-3.5 h-3.5 mr-1" />
                              {gdriveStatus?.import_folder_id ? "Change folder" : "Select folder"}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-rose-200 text-rose-600 hover:bg-rose-50"
                            onClick={() => handleDisconnect(displayProvider ?? provider!)}
                            disabled={isGoogleDrive && disconnectLoading}
                          >
                            <Unlink className="w-3.5 h-3.5 mr-1" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
                        onClick={() => handleConnect(id)}
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* OAuth Modal */}
        <Dialog open={oauthModalOpen} onOpenChange={setOauthModalOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-slate-900">
                Connect {connectingProvider && providerConfig[connectingProvider as keyof typeof providerConfig]?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Authorize access to ingest documents for PFAS compliance analysis
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="flex flex-col items-center gap-4">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center",
                  connectingProvider && providerConfig[connectingProvider as keyof typeof providerConfig]?.color
                )}>
                  {connectingProvider && providerConfig[connectingProvider as keyof typeof providerConfig]?.icon ? (
                    <img
                      src={providerConfig[connectingProvider as keyof typeof providerConfig].icon}
                      alt=""
                      className="w-10 h-10"
                    />
                  ) : (
                    <Cloud className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    PFAS Intelligence Platform is requesting permission to:
                  </p>
                  <ul className="text-sm text-left space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-status-success" />
                      View and download files
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-status-success" />
                      Access folder structure
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-status-success" />
                      Read file metadata
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setOauthModalOpen(false)}
                className="border-slate-200 text-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAuthorizeAccess}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Authorize Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Disconnect Confirmation Modal */}
        <Dialog open={disconnectModalOpen} onOpenChange={setDisconnectModalOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-slate-900">
                Disconnect {selectedProvider?.name}?
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                This will remove access to files from this storage provider.
                Previously indexed documents will remain in the system.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDisconnectModalOpen(false)}
                className="border-slate-200 text-slate-700"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDisconnect}
                className="bg-rose-600 hover:bg-rose-700"
                disabled={disconnectLoading}
              >
                <Unlink className="w-4 h-4 mr-2" />
                {disconnectLoading ? "Disconnecting…" : "Disconnect"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Google Drive folder picker (import root) */}
        <Dialog open={folderPickerOpen} onOpenChange={(open) => !open && closeFolderPicker()}>
          <DialogContent className="sm:max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="text-slate-900">
                Select import folder
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Choose a folder to sync from Google Drive, or use entire Drive.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 min-w-0 overflow-hidden">
              {folderStack.length > 0 && (
                <div className="flex items-center gap-1 text-sm text-slate-600 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-slate-600 shrink-0"
                    onClick={handleFolderBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <span className="truncate min-w-0">
                    {folderStack.map((s) => s.name).join(" / ")}
                  </span>
                </div>
              )}
              <ScrollArea className="h-[280px] min-w-0 rounded-md border border-slate-200 overflow-hidden">
                {folderLoading && folderFiles.length === 0 ? (
                  <div className="flex items-center justify-center h-full py-8 text-slate-500 text-sm">
                    Loading…
                  </div>
                ) : (
                  <div className="min-w-0 overflow-hidden">
                    <ul className="p-2 space-y-0.5 w-full min-w-0 overflow-hidden">
                    {folderFiles.map((item) => (
                      <li key={item.id} className="min-w-0 overflow-hidden">
                        <button
                          type="button"
                          title={item.name}
                          className={cn(
                            "w-full flex items-center gap-2 py-2 px-3 rounded-md text-left text-sm transition-colors min-w-0 overflow-hidden",
                            item.isFolder
                              ? "text-slate-700 hover:bg-slate-100"
                              : "text-slate-400 cursor-default"
                          )}
                          onClick={() => item.isFolder && handleFolderNavigate(item)}
                          disabled={!item.isFolder}
                        >
                          {item.isFolder ? (
                            <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
                          ) : (
                            <span className="w-4 shrink-0" />
                          )}
                          <Folder className="w-4 h-4 shrink-0 text-amber-500" />
                          <span className="flex-1 min-w-0 truncate block" title={item.name}>{item.name}</span>
                        </button>
                      </li>
                    ))}
                    </ul>
                  </div>
                )}
                {folderNextToken && !folderLoading && (
                  <div className="p-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-200 text-slate-700"
                      onClick={handleLoadMoreFolders}
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                variant="outline"
                onClick={closeFolderPicker}
                className="w-full sm:w-auto shrink-0 border-slate-200 text-slate-700"
              >
                Cancel
              </Button>
              {folderStack.length > 0 ? (
                <Button
                  className="w-full sm:w-auto shrink-0 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleUseThisFolder}
                  disabled={importFolderLoading}
                >
                  {importFolderLoading ? "Updating…" : "Use this folder"}
                </Button>
              ) : null}
              <Button
                variant="outline"
                className="w-full sm:w-auto shrink-0 border-slate-200 text-slate-700"
                onClick={handleUseEntireDrive}
                disabled={importFolderLoading}
              >
                {importFolderLoading ? "Updating…" : "Import from entire Drive"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
