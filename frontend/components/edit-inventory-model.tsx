"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Inventory, InventoryStatus } from "@/lib/types";

interface EditInventoryModelProps {
  selectedPaints: Inventory[];
  setSelectedPaints: Dispatch<SetStateAction<Inventory[]>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  updateInventory: (
    id: number,
    newCount: number | undefined,
    newStatus: InventoryStatus | undefined
  ) => Promise<void>;
}
export default function EditInventoryModel({
  selectedPaints,
  setSelectedPaints,
  setIsVisible,
  updateInventory,
}: EditInventoryModelProps) {
  const [count, setCount] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>();

  // Function to generate the editing title
  function generateListOfPaintNames() {
    // Extract paint names from the paints array
    const paintNames = selectedPaints.map((paint) => paint.name);
    return paintNames.join(", ");
  }

  function handleClose() {
    setIsVisible(false);
  }

  function handleSave() {
    selectedPaints.forEach((paint) => {
      updateInventory(paint.id, count, status);
    });
    setSelectedPaints([]);
    setIsVisible(false);
  }

  return (
    <div>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Editing {generateListOfPaintNames()}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 mb-5 md:p-5 space-y-4 w-80 h-40">
            {/* Input field for count */}
            <div>
              <label
                htmlFor="count"
                className="block text-sm font-medium text-gray-700"
              >
                Count
              </label>
              <input
                type="number"
                id="count"
                name="count"
                value={count}
                placeholder="Keep the same"
                onChange={(e) => setCount(Number(e.target.value))}
                min={0}
                max={100}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Dropdown for status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) =>
                  setStatus(Number(e.target.value) as InventoryStatus)
                }
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value={undefined}>Keep the same</option>
                <option value={InventoryStatus.available}>Available</option>
                <option value={InventoryStatus.running_low}>Running Low</option>
                <option value={InventoryStatus.out_of_stock}>
                  Out of Stock
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              onClick={handleSave}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
