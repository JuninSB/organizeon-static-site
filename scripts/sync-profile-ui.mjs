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
  "features/profile/profile-card.tsx",
  "features/profile/profile-field-editor.tsx",
  "services/profile-service.ts",
  "stores/profile-store.ts",
  "services/account-api.ts",
  "services/messages-service.ts",
  "stores/messages-store.ts",
  "utils/account-roles.ts",
  "utils/unique-id.ts",
  "components/ui/popover.tsx",
  "components/ui/drawer.tsx",
  "components/ui/drawer.css",
  "components/ui/checkbox.tsx",
  "components/ui/portal-context.tsx",
  "features/messages/message-actions.tsx",
  "features/messages/message-composer.tsx",
  "features/messages/message-media.tsx",
  "features/messages/message-row.tsx",
  "features/messages/message-thread.tsx",
  "features/messages/messages-launcher.tsx",
  "features/messages/messages-notifications.tsx",
  "features/messages/messages-panel.tsx",
  "features/messages/messages-provider.tsx",
  "features/messages/messages-settings.tsx",
  "features/messages/new-conversation.tsx",
  "features/messages/requests-list.tsx",
  "features/messages/types.ts",
  "features/messages/use-message-gestures.ts",
];
for (const file of files) {
  const output = resolve(target, file);
  await mkdir(dirname(output), { recursive: true });
  await copyFile(resolve(root, file), output);
}
console.log("Shared profile modules synchronized:", files.length);
