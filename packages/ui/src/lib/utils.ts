import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { UseMutationOptions } from "@tanstack/react-query";
import clsx, { type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TOpts = {
  successMessage?: string;
  disableDefaultToast?: boolean;
  disableErrorToast?: boolean;
  errorCallback?: (error: unknown) => void | Promise<void>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationHandlerOptions = Omit<
  UseMutationOptions<any, any, any, unknown>,
  "mutationFn"
>;

export const getBackendErrorMessage = (error: unknown): string => {
  const e = error as {
    status?: number | string;
    statusCode?: number;
    message?: unknown;
    payload?: {
      statusCode?: number;
      message?: unknown;
    };
  };
  const raw = e?.payload?.message ?? e?.message;
  return typeof raw === "string" && raw ? raw : "Something went wrong.";
};

export const options = <T, Output>(
  setError?: UseFormSetError<T extends FieldValues ? T : FieldValues>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successCallback?: (data: Output, variables: any) => void | Promise<void>,
  opts?: TOpts,
): MutationHandlerOptions => ({
  onSuccess(data, variables) {
    if (!opts?.disableDefaultToast) {
      const message = opts?.successMessage || data?.message;
      if (message) toast.success(message);
    }
    if (successCallback) {
      void successCallback(data, variables);
    }
  },
  onError(data) {
    const error = data as {
      status?: number | string;
      statusCode?: number;
      message?: unknown;
      payload?: {
        statusCode?: number;
        message?: unknown;
      };
    };

    const message = error?.payload?.message ?? error?.message;

    if (setError && typeof message === "object" && message !== null) {
      parseBackendValidation(message as Record<string, unknown>, setError);
      if (!opts?.disableErrorToast) {
        toast.error("Validation error occurred!");
      }
      return;
    }

    if (!opts?.disableErrorToast) {
      toast.error(getBackendErrorMessage(data));
    }

    if (opts?.errorCallback) {
      void opts.errorCallback(data);
    }
  },
});

export const parseBackendValidation = <T extends FieldValues>(
  res: Record<string, unknown>,
  setErrors: UseFormSetError<T>,
): void => {
  Object.entries(res).forEach(([key, value]) => {
    setErrors(
      key as Path<T>,
      {
        type: "manual",
        message:
          Array.isArray(value) && value.length === 1
            ? value.toString()
            : "Invalid value.",
      },
      {
        shouldFocus: true,
      },
    );
  });
};

export function formatNumber(
  e: React.KeyboardEvent<HTMLInputElement>,
  decimal?: number,
  maxVal?: number,
  ignorePriceLimit?: boolean,
  preventNegativeValues?: boolean,
): false | void {
  const [int, dec] = e.currentTarget.value.split(".");
  const hasDecimal = e.currentTarget.valueAsNumber;

  const formedValue = Number(e.currentTarget.value + e.key) * 100;

  if (
    decimal &&
    e.currentTarget.value.includes(".") &&
    (dec?.length || 0) > decimal &&
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key)
  ) {
    return e.preventDefault();
  }

  if (
    maxVal &&
    !hasDecimal &&
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key) &&
    Number(int + e.key) > maxVal
  ) {
    return e.preventDefault();
  }

  if (
    maxVal &&
    hasDecimal &&
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key) &&
    formedValue > maxVal * 100
  ) {
    return e.preventDefault();
  }

  if (Number(e.currentTarget.value + e.key) > 9999999 && !ignorePriceLimit) {
    return e.preventDefault();
  }

  if (Number(e.currentTarget.value + e.key) < -9999999 && !ignorePriceLimit) {
    return e.preventDefault();
  }

  if (preventNegativeValues && e.key === "-") {
    return e.preventDefault();
  }

  return ["e", "E", "+"].includes(e.key) && e.preventDefault();
}

export const objectToQueryString = (
  obj: Record<string, string | string[] | undefined>,
) => {
  return (
    "?" +
    Object.entries(obj)
      .map(([key, value]) => {
        if (value === undefined) return;
        if (key === "raw") {
          return value;
        }
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        } else {
          return `${key}=${encodeURIComponent(value)}`;
        }
      })
      .join("&")
  );
};

export function unique<T>(arr: T[], byKey?: keyof T): T[] {
  if (byKey == null) {
    return Array.from(new Set(arr));
  } else {
    return [...new Map(arr.map((item) => [item[byKey], item])).values()];
  }
}

export const parsePrice = (
  price?: string | number | null,
  isCent: boolean = false,
) => {
  let parsedPrice: number | null = null;

  if (price === null) {
    parsedPrice = null;
  } else if (typeof price === "string") {
    if (price === "") {
      parsedPrice = null;
    } else {
      parsedPrice = Number.isNaN(Number(price))
        ? 0
        : Number(price) / (isCent ? 100 : 1);
    }
  } else if (typeof price === "number") {
    parsedPrice = price / (isCent ? 100 : 1);
  }

  return {
    value: price === null ? null : Number(parsedPrice?.toFixed(2)),
    toCent: function () {
      return this.value !== null ? Math.round(this.value * 100) : null;
    },
    toDollar: function () {
      return this.value;
    },
    toAddComa: function () {
      const rs = new Intl.NumberFormat("en-US").format(this.value || 0);
      return rs;
    },
  };
};

export const copyToclipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
