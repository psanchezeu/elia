// Authentication Types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'commercial';
  name: string;
}

// Client Types
export interface Client {
  id: string;
  razonSocial: string;
  actividadPrincipal: string;
  paginaWeb: string;
  ventas: number;
  municipio: string;
  direccion: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  nif: string;
  empleados: number;
  personaContacto: string;
  createdAt: string;
  updatedAt: string;
}

// Table Types
export interface SortingState {
  id: string;
  desc: boolean;
}

export interface FilterState {
  id: string;
  value: string;
}

// Auth Context Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}