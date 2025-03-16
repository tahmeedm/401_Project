"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle login with an API
    console.log("Login data:", formData)
    // Redirect to dashboard after login
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="rounded-2xl bg-gray-800/30 p-8 backdrop-blur">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
              <p className="text-gray-400">Log in to continue your fitness journey</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-purple-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-6 text-lg font-semibold hover:opacity-90"
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-400 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

