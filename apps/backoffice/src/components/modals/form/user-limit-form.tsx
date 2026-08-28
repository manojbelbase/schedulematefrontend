"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Switch } from "@ui/components/ui/switch";
import { options } from "@ui/lib/utils";
import type { _TModalProps } from "@ui/types/globals";

import {
  useBackofficeControllerUpdateUserLimit,
  type PublicUser,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";
import {
  UpdateUserLimitSchema,
  type TUpdateUserLimitSchema,
} from "@/schema/user.schema";

import { FormButtons } from "./form-footer-buttons";

type TProps = {
  user?: PublicUser;
};

export default function SetUserLimitForm({
  close,
  data,
  setForm,
}: _TModalProps<TProps>) {
  const user = data?.user;
  const queryClient = useQueryClient();

  const form = useForm<TUpdateUserLimitSchema>({
    resolver: zodResolver(
      UpdateUserLimitSchema,
    ) as Resolver<TUpdateUserLimitSchema>,
    mode: "onChange",
    values: {
      apiRequestLimit: user?.apiRequestLimit ?? 0,
      resetUsed: false,
    },
  });

  const { handleSubmit, reset } = form;

  const { mutate: updateLimit, isPending } =
    useBackofficeControllerUpdateUserLimit(
      options(undefined, async () => {
        await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
        handleExit();
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

  const onSubmit = (data: TUpdateUserLimitSchema) => {
    if (!user) return;
    updateLimit({
      pathParams: { id: user.id },
      body: {
        apiRequestLimit: data.apiRequestLimit,
        ...(data.resetUsed ? { resetUsed: true } : {}),
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto flex flex-col gap-4">
          <FormField
            control={form.control}
            name="apiRequestLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="Enter request limit"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Max API requests allowed for{" "}
                  <span className="font-medium text-foreground">
                    {user?.email || user?.name || "this user"}
                  </span>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resetUsed"
            render={({ field }) => (
              <FormItem className="flex  flex-row items-center justify-between rounded-sm border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Reset used count</FormLabel>
                  <FormDescription className="mt-1">
                    Set {user?.apiRequestsUsed ?? 0} used requests back to 0.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormButtons
            name="Limit"
            actionType="Edit"
            form={form}
            disabled={
              !form.formState.isValid || !form.formState.isDirty || isPending
            }
          />
        </div>
      </form>
    </Form>
  );
}
