import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "Email es obligatorio").email("Email no válido"),
    name: z.string().min(1, "Tu nombre no puede ser vacío"),
    password: z.string().min(8, "Contraseña debe tener al menos 6 caracteres"),
    password_confirmation: z
      .string()
      .min(8, "Contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vacio" }),
});

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .length(6, { message: "Token no valido" });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});
export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
});
export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({
    expenses: true,
  })
);

export const passwordValidationSchema = z
  .string()
  .min(1, { message: "La contraseña es obligatoria" });

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const SuccessSchema = z.string();

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const UpdatePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "El Password no puede ir vacio" }),
    password: z.string().min(8, {
      message: "El Nuevo Password debe ser de al menos 8 caracteres",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const ProfileFormSchema = z.object({
  name: z.string().min(1, { message: "Tu Nombre no puede ir vacio" }),
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
});
export type User = z.infer<typeof UserSchema>;

// user: {
//   user: {
//       email: string;
//       name: string;
//       id: number;
//   };
//   isAuth: boolean;
// }

export const userSchemaUpdate = z.object({
  user: z.object({
    email: z.string(),
    name: z.string(),
    id: z.number(),
  }),
  isAuth: z.boolean(),
});

export type UserProfile = z.infer<typeof userSchemaUpdate>;

export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>;
