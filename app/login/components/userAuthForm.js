import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import OtpInput from "react-otp-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define Zod schema for the form data
const schema = z.object({
  mobileNumber: z.string().min(10).max(10),
  otp: z.string().min(4).max(4),
});

export function UserAuthForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState("mobile"); // "mobile" or "otp"

  const onSubmit = async (data) => {
    if (currentStep === "mobile") {
      const isValid = await trigger("mobileNumber");
      console.log("Is mobile number valid?", isValid);

      if (isValid) {
        setCurrentStep("otp");
      }
    } else {
      // Handle OTP submission
      console.log("Form data submitted:", data);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {currentStep === "mobile" && (
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
                <span className="text-red-500">
                  {errors.mobileNumber.message}
                </span>
              )}
            </div>
          )}

          {currentStep === "otp" && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="otp">
                OTP
              </Label>
              <div className="flex items-center justify-center gap-2">
                <OtpInput
                  value={""}
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
                      }}
                      name={`otp_${index}`}
                    />
                  )}
                />
              </div>
              {errors && errors.otp && (
                <span className="text-red-500">{errors.otp.message}</span>
              )}
            </div>
          )}

          <Button type="submit" disabled={isLoading}>
            {currentStep === "mobile"
              ? "Submit Mobile Number"
              : "Sign In with OTP"}
          </Button>
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
