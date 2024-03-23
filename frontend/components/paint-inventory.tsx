"use client";

import { Session } from "next-auth";
import useInventory from "@/lib/hooks/use-inventory";
import { InventoryStatus } from "@/lib/types";

interface PaintInventoryProps {
  session: Session;
}
export default function PaintInventory({ session }: PaintInventoryProps) {
  const { inventory } = useInventory(session);

  // Organize paint inventory into swimlanes based on status
  const lanes = {
    available: inventory.filter(
      (paint) => paint.status === InventoryStatus.available
    ),
    running_low: inventory.filter(
      (paint) => paint.status === InventoryStatus.running_low
    ),
    out_of_stock: inventory.filter(
      (paint) => paint.status === InventoryStatus.out_of_stock
    ),
  };

  function formatLaneTitle(title: string) {
    /* Converts snake case lane title to title case */
    return title
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Paint Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Render lanes */}
        {Object.entries(lanes).map(([status, paints]) => (
          <div key={status}>
            <h2 className="text-xl font-semibold capitalize mb-2">
              {formatLaneTitle(status)}
            </h2>
            <div className="space-y-4">
              {/* Map through paints in the current lane */}
              {paints.map((paint, index) => (
                <div
                  key={index}
                  className="rounded-lg p-4 border border-gray-300 flex flex-col"
                >
                  <div className="flex items-center mb-2">
                    <div
                      className="w-6 h-6 mr-2 border border-black-300"
                      style={{ backgroundColor: paint.name.toLowerCase() }}
                    ></div>
                    <p className="text-lg font-semibold">{paint.name}</p>
                  </div>
                  <div>
                    <p className="text-sm">Count: {paint.count}</p>
                    <p className="text-sm">Status: {formatLaneTitle(status)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
