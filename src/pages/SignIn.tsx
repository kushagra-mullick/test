import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
});
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const {
    login,
    loginWithOAuth,
    isAuthenticated,
    isLoading: authLoading
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path from location state, or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, {
        replace: true
      });
    }
  }, [isAuthenticated, navigate, from]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      // Redirect happens automatically in the useEffect hook
    } catch (error) {
      // Error is already handled in the login function
    } finally {
      setIsLoading(false);
    }
  };
  const handleOAuthLogin = async (provider: 'google' | 'discord') => {
    try {
      await loginWithOAuth(provider);
    } catch (error) {
      // Error is already handled in the loginWithOAuth function
    }
  };
  return <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                Sign in to your Locnix.ai account to continue your learning journey
              </p>
            </div>
            
            <div className="w-full max-w-md space-y-6 mt-8">
              {/* Social login buttons */}
              <div className="space-y-3">
                
                
                
              </div>
              
              
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="password" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">Toggle password visibility</span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <>
                        <span className="animate-spin mr-2">◌</span> Signing in...
                      </> : <>
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                      </>}
                  </Button>
                </form>
              </Form>
              
              <div className="text-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    Sign up
                  </Link>
                </p>
                <p className="mt-2">
                  <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary">
                    Forgot your password?
                  </Link>
                </p>
              </div>
              
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-8">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default SignIn;