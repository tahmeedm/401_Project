"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Dumbbell } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Logging in user:", values.email);
    try {
      const res = await fetch(`http://localhost:80/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Invalid credentials");
      }
  
      const data = await res.json();
      localStorage.setItem("fitmate_token", data.token);
  
      toast({ title: "Success!", description: "Welcome back to FitMate." });
      router.push("/dashboard");
    } catch (error) {
      toast({ title: "Login failed", description: "Invalid Creds", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }
  
  
  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex items-center gap-2 font-bold text-xl mb-8">
        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-primary to-cyber-teal flex items-center justify-center shadow-glow">
          <Dumbbell className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal text-2xl">
          FitMate
        </span>
      </div>

      <Card className="max-w-md w-full glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyber-teal">
            Login to FitMate
          </CardTitle>
          <CardDescription>Enter your credentials to access your fitness dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} className="glass-effect border-white/10" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} className="glass-effect border-white/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-cyber-teal hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

