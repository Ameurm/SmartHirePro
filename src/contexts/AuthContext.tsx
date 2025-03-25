import { createContext, useContext, useEffect, useState } from 'react';
import { getSession, onAuthStateChange } from '../lib/auth';

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ session }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    let subscription: { unsubscribe: () => void } | null = null;

    onAuthStateChange((session) => {
      setUser(session?.user ?? null);
    }).then(({ data }) => {
      subscription = data.subscription;
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}