"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import OtpInput from "react-otp-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { schema } from "./schema";

export function UserAuthForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const otp = watch("otp", "");

  const [isLoading, setIsLoading] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState("mobile");

  const validateMobile = async () => {
    const isValidate = await trigger("mobileNumber");
    if (isValidate) {
      setCurrentStep("otp");
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {currentStep === "mobile" && (
            <>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="mobileNumber">
                  Mobile Number
                </Label>
                <div className="flex items-center justify-center gap-2">
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    {...register("mobileNumber")}
                    required
                  />
                </div>
                {errors && errors.mobileNumber && (
                  <span className="text-red-500 text-center">
                    {errors.mobileNumber.message}
                  </span>
                )}
              </div>
              <Button disabled={isLoading} onClick={validateMobile}>
                Submit Mobile Number
              </Button>
            </>
          )}

          {currentStep === "otp" && (
            <>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="otp">
                  OTP
                </Label>
                <div className="flex items-center justify-center gap-2">
                  <OtpInput
                    value={otp}
                    onChange={(otp) => setValue("otp", otp)}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(inputProps, index) => (
                      <input
                        {...inputProps}
                        style={{
                          padding: "8px",
                          borderRadius: "5px",
                          maxWidth: "40px",
                          minHeight: "40px",
                          border: "1px solid #D1D5DB",
                          color: "black",
                        }}
                        name={`otp_${index}`}
                      />
                    )}
                  />
                </div>
                {errors && errors.otp && (
                  <span className="text-red-500 text-center">
                    {errors.otp.message}
                  </span>
                )}
              </div>
              <Button disabled={true} type="submit">
                Sign In with OTP
              </Button>
              <Button onClick={() => setCurrentStep("mobile")}>Back</Button>
            </>
          )}
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
