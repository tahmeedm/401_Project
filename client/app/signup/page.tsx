"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle signup with an API
    console.log("Signup data:", formData)
    // Redirect to profile creation after signup
    router.push("/create-profile")
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
              <h1 className="mb-2 text-3xl font-bold">Create your account</h1>
              <p className="text-gray-400">Join FitFuture and start your fitness journey</p>
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

              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-700 bg-gray-800/50 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-6 text-lg font-semibold hover:opacity-90"
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

