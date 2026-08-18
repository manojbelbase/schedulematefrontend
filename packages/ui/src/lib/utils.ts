import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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