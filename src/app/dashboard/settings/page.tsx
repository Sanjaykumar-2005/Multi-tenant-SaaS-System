import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Settings, Save, Bell, Shield, Key } from "lucide-react";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  return (
    <div className="flex-1 overflow-auto bg-background/50 h-full w-full">
      <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-xl flex items-center px-8 sticky top-0 z-20">
        <h1 className="text-xl font-semibold text-foreground">Tenant Settings</h1>
      </header>

      <div className="p-8 max-w-4xl mx-auto space-y-8">
        
        <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> General Information
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your tenant workspace configuration.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Tenant ID</label>
                <div className="w-full px-4 py-2.5 rounded-lg bg-muted text-muted-foreground border border-input text-sm cursor-not-allowed font-mono">
                  {session.user.tenantId}
                </div>
                <p className="text-xs text-muted-foreground mt-2">This is your globally unique tenant identifier. It cannot be changed.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Acme Corp" 
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/50 border-t border-border/50 flex justify-end">
             <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
               <Save className="w-4 h-4" /> Save Changes
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-4">
               <Key className="w-5 h-5 text-indigo-500" /> API Keys
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Generate API keys for your tenant workspace to interact with the SaaS programmatically.</p>
            <button className="px-4 py-2 hover:bg-muted text-sm font-medium rounded-lg border border-input transition-colors">
              Generate New Key
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <h3 className="text-md font-semibold flex items-center gap-2 mb-4">
               <Bell className="w-5 h-5 text-amber-500" /> Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Email Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary" />
                <span className="text-sm font-medium">Slack Integration</span>
              </label>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
