import { useContext, createContext, useState, ReactNode } from "react";

interface DataType {
  id: number;
  title: string;
  description: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  quantity: number;
}
interface AuthType {
  isAuthed: boolean;
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
  orders?: DataType[][];
}
const AuthContext = createContext<AuthType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function Auth({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isAuthed, setIsAuthed, username: undefined, orders: undefined }}
    >
      {children}
    </AuthContext.Provider>
  );
}
