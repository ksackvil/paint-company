"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import * as api from "@/lib/api";
import { extractSessionToken } from "@/lib/utils";
import { Inventory } from "@/lib/types";

export default function useInventory(session: Session) {
  // Chats in ordered from most recent to oldest
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    if (session?.access) {
      // Initial fetch
      fetchInventory();

      // Polling interval in milliseconds (e.g., every 5 seconds)
      const pollingInterval = 1000;

      // Polling function
      const intervalId = setInterval(fetchInventory, pollingInterval);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }

    // Line below allows us to have fetchInventory outside of useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function fetchInventory() {
    try {
      const response = await api.getInventory(extractSessionToken(session));
      console.log(response);
      setInventory(response);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  }
  return { inventory };
}
