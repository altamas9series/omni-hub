import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, User, Mail, Building2, Globe, Bell, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Berlin", label: "Central European Time (CET)" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form state
  const [fname, setFname] = useState(user?.fname || user?.fullName?.split(" ")[0] || "");
  const [lname, setLname] = useState(user?.lname || user?.fullName?.split(" ").slice(1).join(" ") || "");
  const [role, setRole] = useState(user?.designation || user?.role || "");
  const [organization, setOrganization] = useState(user?.organization || "");
  const [timezone, setTimezone] = useState(user?.timezone || "America/New_York");
  const [emailNotifications, setEmailNotifications] = useState(user?.notificationPreferences.email ?? true);
  const [pushNotifications, setPushNotifications] = useState(user?.notificationPreferences.push ?? true);
  const [digestNotifications, setDigestNotifications] = useState(user?.notificationPreferences.digest ?? false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Function call
    const result = await updateProfile({
      fname,
      lname,
      designation: role,
      role, // Update both for consistency
      organization,
      timezone,
      notificationPreferences: {
        email: emailNotifications,
        push: pushNotifications,
        digest: digestNotifications,
      },
    });

    setIsLoading(false);

    if (result.success) {
      setIsSaved(true);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
      setTimeout(() => setIsSaved(false), 2000);
    } else {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: result.error || "Could not save changes.",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/platform")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Profile Settings</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSave}>
          {/* Profile Info Card */}
          <div className="bg-card rounded-xl border border-border shadow-sm mb-6">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
              <p className="text-sm text-muted-foreground mt-1">Update your personal details</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Avatar and name */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Profile photo</p>
                  <Button type="button" variant="outline" size="sm">
                    Change photo
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fname" className="text-foreground">First Name</Label>
                    <Input
                      id="fname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lname" className="text-foreground">Last Name</Label>
                    <Input
                      id="lname"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email address
                    <span className="text-muted-foreground font-normal ml-2">(read-only)</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="h-11 pl-10 bg-muted text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-foreground">
                    Role (Designation)
                  </Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-foreground">Organization</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="timezone" className="text-foreground">Time Zone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="h-11">
                      <Globe className="w-4 h-4 text-muted-foreground mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-card rounded-xl border border-border shadow-sm mb-6">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Manage how you receive notifications</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">Email notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">Push notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">Daily digest</p>
                  <p className="text-sm text-muted-foreground">Receive a daily summary of activity</p>
                </div>
                <Switch
                  checked={digestNotifications}
                  onCheckedChange={setDigestNotifications}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/platform")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isSaved ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
