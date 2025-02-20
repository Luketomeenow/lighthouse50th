
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import RegistrationForm from "@/components/RegistrationForm";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        // Check if user is admin using the is_admin function
        const { data: isAdmin, error: roleError } = await supabase
          .rpc('is_admin', { uid: data.user.id });

        if (roleError) throw roleError;

        toast.success("Successfully logged in!");
        
        // Redirect based on user role
        if (isAdmin) {
          toast.success("Welcome to the admin dashboard!");
          navigate('/admin');
        } else {
          navigate('/');
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
                  onClick={() => setIsSignUp(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Don't have an account? Sign up
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

      {/* Registration Form Dialog */}
      <RegistrationForm 
        open={isSignUp} 
        onOpenChange={(open) => setIsSignUp(open)} 
      />
    </>
  );
};

export default Auth;
