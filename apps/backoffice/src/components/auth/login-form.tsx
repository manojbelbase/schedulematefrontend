"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { options } from "@ui/lib/utils";

import {
  useBackofficeAuthControllerLogin,
  type BackofficeAuthResponse,
} from "@repo/services/backoffice";

import { useAuthStore } from "@/zustand/auth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please fill up this field." })
    .email("Please enter a valid email"),
  password: z.string().min(1, { message: "Please fill up this field." }),
});

type TFormSchema = z.infer<typeof formSchema>;

const LoginForm = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const { setUser, setToken } = useAuthStore();

  const { mutate, isPending } = useBackofficeAuthControllerLogin(
    options(form.setError, async (data) => {
      const res = data as BackofficeAuthResponse;
      setUser(res.data.user);
      setToken(res.data.accessToken, res.data.refreshToken);
      router.push(redirect);
    }),
  );

  const onSubmit = (values: TFormSchema) => {
    mutate({ body: { email: values.email, password: values.password } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  className="h-11"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full h-11">
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default function LoginFormWrapper() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
