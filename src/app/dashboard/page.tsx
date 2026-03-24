import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Database, TrendingUp, Users, Activity } from "lucide-react";

async function getDashboardData(tenantId: string) {
  try {
    const resources = await prisma.resource.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    const usersCount = await prisma.user.count({ where: { tenantId } });
    const resourcesCount = await prisma.resource.count({ where: { tenantId } });
    return { resources, usersCount, resourcesCount, error: null };
  } catch (error) {
    return { resources: [], usersCount: 0, resourcesCount: 0, error: "Database connection failed. Please ensure your database is running and seeded." };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const { resources, usersCount, resourcesCount, error } = await getDashboardData(session.user.tenantId);

  return (
    <div className="flex-1 overflow-auto bg-background/50 h-full w-full">
      <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-xl flex items-center px-8 sticky top-0 z-20">
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
      </header>

      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
            <Database className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-foreground">{usersCount}</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +12% this month
              </p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database className="w-24 h-24 text-indigo-500" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-1">Isolated Resources</p>
              <h3 className="text-3xl font-bold text-foreground">{resourcesCount}</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +5% this month
              </p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 border border-border/50 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Activity className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-white/80 mb-1">Tenant Status</p>
              <h3 className="text-3xl font-bold">Active</h3>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Isolated Environment
              </div>
            </div>
          </div>
        </div>

        {/* Data List */}
        <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Resources</h2>
            <div className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              Tenant ID: {session.user.tenantId}
            </div>
          </div>
          <div className="p-0">
            {resources.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                <Database className="w-12 h-12 mb-4 opacity-20" />
                <p>No isolated resources found for this tenant.</p>
                <p className="text-sm mt-1 opacity-70">Add some data to your database to see it here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border/50">
                {resources.map((res) => (
                  <li key={res.id} className="p-4 sm:px-6 hover:bg-muted/50 transition-colors flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{res.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">{res.data}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
