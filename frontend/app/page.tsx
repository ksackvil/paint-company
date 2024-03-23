"use client";

import PaintInventory from "@/components/paint-inventory";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <PaintInventory session={session} />;
  }
}
