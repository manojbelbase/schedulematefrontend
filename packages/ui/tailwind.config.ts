import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/web/src/**/*.{js,ts,jsx,tsx}",
    "../../apps/backoffice/src/**/*.{js,ts,jsx,tsx}",
    "../../apps/website/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#DC2626",
      },
    },
  },
  plugins: [],
};

export default config;