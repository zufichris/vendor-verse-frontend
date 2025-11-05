"use client";
import React, { useState, useTransition } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/lib/actions/auth";
import { loginSchema } from "@/lib/validations/auth";
import { SocialButton, socialButtons } from "./social-buttons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth";
import Link from "next/link";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const {init:initAuthUser} = useAuthStore()

  const [showPassword, setShowPassword] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setFormMessage("");
    startTransition(async () => {
      const result = await loginAction({...values, callbackUrl});
      if (result.success) {
        await initAuthUser()
        setFormMessage(result.message);
        form.reset();
        router.replace(callbackUrl);
      } else {
        setFormMessage(result.message);
        if (result.status.toString() === '403') {
          const params = searchParams.toString()+ `&email=${values.email}`
          router.replace(`/auth/verify-otp?${params.startsWith('&') ? params.replace('&', ''): params}`);
        }
      }
    });
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-surface-900 mb-6">Welcome back</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-surface-700">
                  Email address
                </FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-surface-700">Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                id="remember-me"
                checked={form.watch("rememberMe")} // Using watch to track the checkbox state
                onCheckedChange={(checked) =>
                  form.setValue("rememberMe", !!checked)
                }
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel htmlFor="remember-me" className="text-surface-700">
                Remember me
              </FormLabel>
            </div>
          </FormItem>

          {formMessage && (
            <p
              className={`text-sm ${
                formMessage.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formMessage}
            </p>
          )}
          <Button
            type="submit"
            className="w-full py-2.5 transition-colors focus:outline-none"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-surface-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {socialButtons.map((button, index) => (
            <SocialButton key={index} {...button} />
          ))}
        </div>
      </div>
    </>
  );
};
