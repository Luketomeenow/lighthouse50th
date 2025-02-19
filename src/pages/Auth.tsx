
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (session?.user) {
        await checkUserRole(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data: userRole, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (roleError) {
        console.error("Error fetching user role:", roleError);
        throw roleError;
      }

      console.log("User role:", userRole);
      if (userRole?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      toast.error("Error verifying user role. Please try again.");
    }
  };

  const checkUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error checking user:", userError);
        return;
      }

      if (user) {
        console.log("User found:", user.id);
        await checkUserRole(user.id);
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Create user role after successful signup
        if (data.user) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: data.user.id, role: 'user' }
            ]);

          if (roleError) {
            console.error("Error creating user role:", roleError);
          }
        }

        toast.success("Check your email to confirm your account!");
      } else {
        console.log("Attempting sign in...");
        const { error: signInError, data: { user } } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (user) {
          console.log("User signed in:", user.id);
          await checkUserRole(user.id);
          toast.success("Successfully logged in!");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isSignUp ? "Please sign up for an account" : "Please sign in to your account"}
            </p>
          </div>
          
          <form onSubmit={handleAuth} className="mt-6 md:mt-8 space-y-4 md:space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (isSignUp ? "Sign up" : "Sign in")}
            </Button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Cover Image */}
      <div className="w-full h-48 md:h-auto md:w-1/2">
        <img 
          src="/lovable-uploads/55b6eb21-e93e-4b8d-8242-7f8904b099eb.png"
          alt="Lighthouse BBC 50th Anniversary"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Auth;
