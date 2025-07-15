"use client";

import React, { useState, useTransition } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/actions/auth";
import { registerSchema } from "@/lib/validations/auth";
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

export const RegisterForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setFormMessage("");
        startTransition(async () => {
            const result = await registerAction(values);
            if (result.success) {
                setFormMessage(result.message);
                form.reset();
            } else {
                setFormMessage(result.message);
            }
        });
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-surface-900 mb-6">
                Create your account
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-surface-700">Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-surface-700">Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                <FormLabel className="text-surface-700">Password</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-surface-700">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agreeToTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-surface-700">
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="text-primary-600 hover:text-primary-700"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-primary-600 hover:text-primary-700"
                                        >
                                            Privacy Policy
                                        </a>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    {formMessage && (
                        <p
                            className={`text-sm ${formMessage.includes("successful")
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {formMessage}
                        </p>
                    )}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Creating Account..." : "Create Account"}
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
