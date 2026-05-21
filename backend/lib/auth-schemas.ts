import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail")
    .email("E-mail inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Informe seu nome")
      .max(80, "Nome muito longo"),
    email: z
      .string()
      .min(1, "Informe seu e-mail")
      .email("E-mail inválido"),
    password: z
      .string()
      .min(8, "Mínimo de 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos 1 número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
