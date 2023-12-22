"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OtpInput from "react-otp-input";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  async function onSubmit(event) {
    setIsLoading(true);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="otp">
              OTP
            </Label>
            <div className="flex items-center justify-center gap-2">
              <OtpInput
                id="otp"
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    disabled={isLoading}
                    className="border-2 border-gray-300 bg-white h-10  p-7 gap-3 mx-2 rounded-lg text-sm focus:outline-none"
                  />
                )}
              />
            </div>
          </div>
          <Button disabled={isLoading}>Sign In with OTP</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Welcome to Shuhd Love
          </span>
        </div>
      </div>
    </div>
  );
}
