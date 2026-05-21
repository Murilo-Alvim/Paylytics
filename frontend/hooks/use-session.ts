"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/types";

export function useSession(redirectTo?: string) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data: { user: SessionUser | null }) => {
        if (cancelled) return;
        setUser(data.user);
        setLoading(false);
        if (!data.user && redirectTo) router.replace(redirectTo);
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
        setLoading(false);
        if (redirectTo) router.replace(redirectTo);
      });
    return () => {
      cancelled = true;
    };
  }, [redirectTo, router]);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.replace("/login");
    router.refresh();
  }

  return { user, loading, signOut };
}
