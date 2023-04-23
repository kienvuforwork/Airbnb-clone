import { PrismaClient } from "@prisma/client";

//When you refresh a page in a browser, the entire application is reloaded, including all JavaScript code that was previously executed. However, global objects created in previous sessions are not persisted across page reloads, and they are reset to their default state.
declare global {
  var prisma: PrismaClient | undefined;
}
//This technique ensures that there is only one instance of PrismaClient throughout the application's runtime.
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
