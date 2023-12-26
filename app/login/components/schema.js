"use client";
import * as z from "zod";

// Define Zod schema for the form data
export const schema = z.object({
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be exactly 10 digits.")
    .refine(
      (value) => /^\d{0,10}$/.test(value),
      "Mobile number must only contain up to 10 digits."
    ),
  otp: z
    .string()
    .min(4, "OTP must be exactly 4 digits.")
    .refine(
      (value) => /^\d{0,4}$/.test(value),
      "OTP must only contain up to 4 digits."
    ),
});
