"use client";
import * as z from "zod";

export const schema = z.object({
  mobileNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Mobile number must be exactly 10 digits and contain only digits.",
  }),
  otp: z.string().refine((value) => /^\d{4}$/.test(value), {
    message: "OTP must be exactly 4 digits and contain only digits.",
  }),
});
