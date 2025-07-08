'use client';

import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authAPI } from '@/services/auth';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const mutateSignIn = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authAPI.login(data.email, data.password),
    onSuccess: () => {
      toast.success('Sign in successfully');
      router.push('/admin/dashboard');
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Sign in failed', {
        description: error?.message || 'An unexpected error occurred',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateSignIn.mutate({ email, password });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-center font-bold text-2xl">
          Admin Login
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="w-full"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              type="text"
              value={email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                className="w-full pr-10"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
                type="button"
                variant="ghost"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label className="font-normal text-sm" htmlFor="remember">
                Remember me
              </Label>
            </div>
            <Button className="px-0 font-normal text-sm" variant="link">
              Forgot password?
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={mutateSignIn.isPending}
            type="submit"
          >
            {mutateSignIn.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
