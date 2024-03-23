import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access: string;
    refresh: string;
    expires: number;
  }
}

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    name: string;
    access: string;
    refresh: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
    };
    access: string;
    refresh: string;
    expires: number;
  }
}

export interface Inventory {
  id: number;
  count: number;
  status: number;
  name: string;
}

export enum InventoryStatus {
  available = 0,
  running_low,
  out_of_stock,
}
