import { Card } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Panel Principal</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clientes
              </p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <UserCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Clientes Activos
              </p>
              <h3 className="text-2xl font-bold">1,021</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-full">
              <UserX className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Clientes Inactivos
              </p>
              <h3 className="text-2xl font-bold">213</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}