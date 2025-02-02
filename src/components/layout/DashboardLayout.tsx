import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Gestión de Clientes</h2>
            <p className="text-sm text-muted-foreground">Bienvenido, {user?.name}</p>
          </div>
          <nav className="px-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Panel Principal
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/clients')}
            >
              <Users className="mr-2 h-4 w-4" />
              Clientes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="h-16 border-b bg-card/50 flex items-center px-6">
            <h1 className="text-xl font-semibold">Sistema de Gestión de Clientes</h1>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}