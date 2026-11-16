import { copyFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../ui/src");
const target = process.argv[2];
if (!target)
  throw Error("Usage: node scripts/sync-profile-ui.mjs /path/to/d3/src");
const files = [
  "components/layout/account-menu.tsx",
  "components/admin/password-dialog.tsx",
  "features/profile/profile-avatar.tsx",
  "features/profile/profile-boundary.tsx",
  "features/profile/avatar-editor.tsx",
  "features/profile/profile-dialog.tsx",
  "services/profile-service.ts",
  "stores/profile-store.ts",
];
for (const file of files) {
  const output = resolve(target, file);
  await mkdir(dirname(output), { recursive: true });
  await copyFile(resolve(root, file), output);
}
console.log("Shared profile modules synchronized:", files.length);
