import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { ArrowLeft, Loader, Mail, Send } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@repo/ui/components/button";
import { Link } from "react-router-dom";
import type { EmailData } from "@repo/zod";

const ResendVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>();

  const isLoading = false;

  const onSubmit: SubmitHandler<EmailData> = async (data) => {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-slate-300  text-slate-900 shadow-md">
          <CardHeader className="text-center p-5">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Resend verification email
            </CardTitle>
            <CardDescription className="text-slate-500">
              Enter your email to receive a new verification link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="ram@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md bg-white text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-600"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <p className="text-xs text-slate-500 mt-1">
                  Enter the email address you used to register your account.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer py-3 bg-violet-700 hover:bg-violet-800 text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Verification Email
                  </>
                )}
              </Button>
            </form>

            <div className="text-center space-y-1">
              <p className="text-slate-500 text-sm">
                <Link
                  to="/signin"
                  className="hover:text-violet-700 inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </p>
              <p className="text-slate-500 text-sm pb-3">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-slate-900 font-medium hover:underline hover:text-violet-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResendVerification;
