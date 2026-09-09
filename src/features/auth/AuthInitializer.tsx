import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/supabase";
import { authSlice } from "@/store/slices/authSlice";
import authMapper from "@/store/mappers/authMapper";

interface AuthInitializerProps {
  children: React.ReactNode;
}
function AuthInitializer({ children }: AuthInitializerProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { setUser } = authSlice.actions;
  const { logout } = authSlice.actions;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          dispatch(setUser(authMapper(session.user)));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.log("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();

    // Listen for future authentication changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser(authMapper(session.user)));
      } else {
        dispatch(logout());
      }
    });

    // Cleanup listener when provider unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, setUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default AuthInitializer;
