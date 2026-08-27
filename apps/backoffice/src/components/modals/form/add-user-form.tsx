"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

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
import type { _TModalProps } from "@ui/types/globals";

import { useBackofficeControllerAddUser } from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";
import { AddUserSchema, type TAddUserSchema } from "@/schema/user.schema";

import { FormButtons } from "./form-footer-buttons";

export default function AddUserForm({ close, setForm }: _TModalProps) {
  const queryClient = useQueryClient();

  const form = useForm<TAddUserSchema>({
    resolver: zodResolver(AddUserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { handleSubmit, reset } = form;

  const addUser = useBackofficeControllerAddUser(
    options(undefined, async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users,
      });
    }),
  );

  const handleExit = (): void => {
    reset();
    close();
  };

  useEffect(() => {
    if (setForm && form) {
      setForm(form);
    }
  }, [JSON.stringify(form.formState.dirtyFields)]);

  const onSubmit = (data: TAddUserSchema) => {
    addUser.mutate(
      { body: { email: data.email, name: data.name || undefined } },
      { onSuccess: () => handleExit() },
    );
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
                  <Input placeholder="Enter Name (optional)" {...field} />
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

          <FormButtons
            name="User"
            form={form}
            disabled={!form.formState.isValid || addUser.isPending}
          />
        </div>
      </form>
    </Form>
  );
}
