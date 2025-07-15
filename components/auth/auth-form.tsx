"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 p-4">
      <div className="w-full max-w-md shadow-md rounded-xl overflow-hidden">
        <div className="relative">
          <Link
            href="/"
            className="absolute top-4 left-4 text-surface-600 hover:text-surface-900"
          >
            <ArrowLeftIcon size={20} />
          </Link>
          <div className="flex border-b">
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === tab
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-surface-600 hover:text-surface-900"
                }`}
                onClick={() => setActiveTab(tab as "login" | "register")}
              >
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
        <p className="mt-4 p-4 text-center text-sm text-surface-600">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <Button
                variant={"ghost"}
                onClick={() => setActiveTab("register")}
                className="inline-flex h-auto p-0 text-primary-600 hover:text-primary font-medium hover:bg-transparent"
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-primary-600 hover:text-primary font-medium"
                onClick={() => setActiveTab("login")}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
