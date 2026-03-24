import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Building2, LayoutDashboard, Settings, Users, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col pt-6 z-10 relative">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Nexus SaaS
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group">
            <Users className="w-5 h-5 group-hover:text-primary transition-colors" />
            Users
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group">
            <Settings className="w-5 h-5 group-hover:text-primary transition-colors" />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
              {session.user.name?.[0] || 'U'}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{session.user.name || session.user.email}</span>
              <span className="text-xs text-muted-foreground truncate opacity-80">Tenant ID: {session.user.tenantId}</span>
            </div>
          </div>
          <a href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive/80 hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
