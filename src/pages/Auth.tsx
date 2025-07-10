
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

  // Check for existing session and role on component mount
  useEffect(() => {
    const checkSessionAndRole = async () => {
      console.log("Checking session and role...");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log("Found existing session:", session.user.email);
        // Check user role
        const { data: role, error: roleError } = await supabase.rpc('get_user_role', {
          user_id: session.user.id
        });
        
        console.log("User role check result:", { role, error: roleError });
        
        if (roleError) {
          console.error("Error checking role:", roleError);
          return;
        }

        // Redirect based on role
        if (role === 'admin') {
          console.log("Redirecting to admin panel");
          navigate('/admin');
        } else {
          console.log("Redirecting to user dashboard");
          navigate('/dashboard');
        }
      } else {
        console.log("No existing session found");
      }
    };

    checkSessionAndRole();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user.email);
      
      if (session) {
        // Check user role when auth state changes
        const { data: role, error: roleError } = await supabase.rpc('get_user_role', {
          user_id: session.user.id
        });
        
        console.log("Auth state change role check:", { role, error: roleError });

        if (roleError) {
          console.error("Error checking role on auth state change:", roleError);
          return;
        }
        
        // Redirect based on role
        if (role === 'admin') {
          console.log("Auth state change: Redirecting to admin");
          navigate('/admin');
        } else {
          console.log("Auth state change: Redirecting to dashboard");
          navigate('/dashboard');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Attempting login for email:", email);

    try {
      // Attempt sign in
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Sign in error details:", signInError);
        if (signInError.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before logging in");
        } else {
          toast.error("Invalid login credentials. Please check your email and password.");
        }
        throw signInError;
      }

      if (data.user) {
        console.log("Login successful for user:", data.user.email);
        
        // Check user role after successful login
        const { data: role, error: roleError } = await supabase.rpc('get_user_role', {
          user_id: data.user.id
        });

        console.log("Login role check result:", { role, error: roleError });

        if (roleError) {
          console.error("Error checking role:", roleError);
          toast.error("Error checking user permissions");
          return;
        }

        toast.success("Successfully logged in!");
        
        // Redirect based on role
        if (role === 'admin') {
          console.log("Login success: Redirecting to admin");
          navigate('/admin');
        } else {
          console.log("Login success: Redirecting to dashboard");
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error("Full authentication error:", error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col-reverse md:flex-row">
        {/* Left side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-600">
                Please sign in to your account
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
                {isLoading ? "Processing..." : "Sign in"}
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Don't have an account? Register on homepage
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

    </>
  );
};

export default Auth;
