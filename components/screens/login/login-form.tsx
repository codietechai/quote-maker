"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data)
    localStorage.setItem("userDetails", JSON.stringify(data.user));

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      alert(data.message || "Login successful!");
      router.push("/insurance-options");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 text-lg">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Step-like banner */}
        <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center size-10 rounded-full bg-blue-700 text-white font-bold text-lg">
            🔐
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            Secure Login
          </h2>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-3xl shadow-md p-6">
            <CardContent className="flex flex-col gap-6">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col gap-2"
              >
                <label className="text-slate-700 font-medium">Email</label>
                <div className="relative">
                  <Mail className="size-5 absolute left-3 top-3 text-blue-600" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 py-6 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col gap-2"
              >
                <label className="text-slate-700 font-medium">Password</label>
                <div className="relative">
                  <Lock className="size-5 absolute left-3 top-3 text-blue-600" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 py-6 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Button
                  className="w-full py-6 text-lg rounded-xl bg-blue-700 hover:bg-blue-800 transition-all duration-300"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login →"}
                </Button>
              </motion.div>

              {/* Forgot + Signup */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex justify-between text-sm text-blue-600 font-medium"
              >
                <button className="hover:underline">Forgot password?</button>
                <button
                  className="hover:underline"
                  onClick={() => router.push("/register")}
                >
                  Create account
                </button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
