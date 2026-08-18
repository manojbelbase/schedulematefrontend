"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@ui/components/ui/button";

import { webApiBaseUrl } from "@/config/api";

export default function AuthStatus() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    fetch(`${webApiBaseUrl}/api/auth/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (active) setAuthenticated(res.ok);
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (authenticated !== true) {
    return null;
  }

  return (
    <Button variant="outline" asChild>
      <Link href="/auth/logout">Logout</Link>
    </Button>
  );
}
