"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import type { _TModalProps } from "@ui/types/globals";

import { UserSchema, type TUserSchema } from "@/schema/user.schema";

import { FormButtons } from "./form-footer-buttons";

export default function AddUserForm({ close, setForm }: _TModalProps) {
  const form = useForm<TUserSchema>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      username: "",
    },
  });

  const { handleSubmit, reset } = form;

  const handleExit = (): void => {
    reset();
    close();
  };

  useEffect(() => {
    if (setForm && form) {
      setForm(form);
    }
  }, [JSON.stringify(form.formState.dirtyFields)]);

  const onSubmit = () => {
    toast.info("Create user endpoint is not wired yet.");
    handleExit();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="new-email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButtons
            name="User"
            form={form}
            disabled={!form.formState.isValid}
          />
        </div>
      </form>
    </Form>
  );
}
