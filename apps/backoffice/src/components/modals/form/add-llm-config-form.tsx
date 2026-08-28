"use client";

import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import AsyncSelect, {
  type TOption,
} from "@ui/components/input/select/async-select";
import OptionSelect from "@ui/components/input/select/option-select";
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

import {
  fetchLlmConfigControllerListProviders,
  useLlmConfigControllerCreateConfig,
  useLlmConfigControllerListProviders,
} from "@repo/services/backoffice";

import { QUERY_KEYS } from "@/config/query-keys";
import {
  LlmConfigFormSchema,
  type TLlmConfigFormSchema,
} from "@/schema/llm-config.schema";

import { FormButtons } from "./form-footer-buttons";

export default function AddLlmConfigForm({ close, setForm }: _TModalProps) {
  const queryClient = useQueryClient();

  const { data: providersData } = useLlmConfigControllerListProviders({});
  const providers = useMemo(() => providersData?.data ?? [], [providersData]);

  const form = useForm<TLlmConfigFormSchema>({
    resolver: zodResolver(LlmConfigFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      activeProvider: "deepseek",
      apiKey: "",
      model: "",
    },
  });

  const { handleSubmit, reset, watch, setValue } = form;
  const selectedProvider = watch("activeProvider");
  const prevProvider = useRef(selectedProvider);

  const SelectedProviderOptions: TOption[] = useMemo(() => {
    if (!selectedProvider) return [];
    const provider = providers.find((p) => p.key === selectedProvider);
    return provider ? [{ label: provider.label, value: provider.key }] : [];
  }, [selectedProvider, providers]);

  const currentProvider = providers.find((p) => p.key === selectedProvider);

  const modelOptions = (currentProvider?.models ?? []).map((m) => ({
    label: m,
    value: m,
  }));

  useEffect(() => {
    if (prevProvider.current !== selectedProvider) {
      prevProvider.current = selectedProvider;
      const provider = providers.find((p) => p.key === selectedProvider);
      if (provider) {
        setValue("model", provider.defaultModel, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [selectedProvider, providers, setValue]);

  const handleExit = (): void => {
    reset();
    close();
  };

  const { mutate: createConfig, isPending: isCreating } =
    useLlmConfigControllerCreateConfig(
      options(undefined, async () => {
        await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.llmConfig });
        handleExit();
      }),
    );

  useEffect(() => {
    if (setForm && form) {
      setForm(form);
    }
  }, [JSON.stringify(form.formState.dirtyFields)]);

  const onSubmit = (data: TLlmConfigFormSchema) => {
    createConfig({
      body: {
        name: data.name,
        activeProvider: data.activeProvider,
        apiKey: data.apiKey,
        model: data.model,
      },
    });
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
                  <Input placeholder="e.g. Production" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activeProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider</FormLabel>
                <FormControl>
                  <AsyncSelect
                    type="single"
                    withSearch
                    isModal
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select provider"
                    options={SelectedProviderOptions}
                    fetcher={{
                      fn: fetchLlmConfigControllerListProviders,
                      queryKey: QUERY_KEYS.llmProviders,
                      withClientSearch: true,
                      renderables: {
                        getLabelFromItem(item) {
                          return item.label;
                        },
                        getValueFromItem(item) {
                          return item.key;
                        },
                      },
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <OptionSelect
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="Select model"
                    options={modelOptions}
                    disabledSearch={false}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="sk-..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButtons
            name="Configuration"
            actionType="Add"
            form={form}
            disabled={
              !form.formState.isValid || !form.formState.isDirty || isCreating
            }
          />
        </div>
      </form>
    </Form>
  );
}
