import * as path from "https://deno.land/std/path/mod.ts";
import { exists, existsSync } from "https://deno.land/std/fs/mod.ts";

/** Identifies the location of "cscript.exe" on the PC where deno-adodb is launched. */
export async function cscript(): Promise<String> {
  const systemRoot: string = Deno.env.get("SYSTEMROOT") ||
    Deno.env.get("WINDIR") || "C:/WINDOWS";
  const cscript_SysWOW64: string = path.join(
    systemRoot,
    "SysWOW64",
    "cscript.exe",
  );
  const cscript_System32: string = path.join(
    systemRoot,
    "System32",
    "cscript.exe",
  );
  const version: string = await exists(cscript_SysWOW64)
    ? cscript_SysWOW64
    : await exists(cscript_System32)
    ? cscript_System32
    : "none";
  return version;
}

/** Identifies the location of "cscript.exe" on the PC where deno-adodb is launched. */
export function cscriptSync(): string {
  const systemRoot: string = Deno.env.get("SYSTEMROOT") ||
    Deno.env.get("WINDIR") || "C:/WINDOWS";
  const cscript_SysWOW64: string = path.join(
    systemRoot,
    "SysWOW64",
    "cscript.exe",
  );
  const cscript_System32: string = path.join(
    systemRoot,
    "System32",
    "cscript.exe",
  );
  const version: string = existsSync(cscript_SysWOW64)
    ? cscript_SysWOW64
    : existsSync(cscript_System32)
    ? cscript_System32
    : "none";
  return version;
}
