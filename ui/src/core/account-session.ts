let principal: string | null = null;
let revision = 0;
export const accountSession = {
  get: () => ({ username: principal, revision }),
  activate(username: string) {
    principal = username;
    const current = ++revision;
    return () => {
      if (revision === current) {
        principal = null;
        revision++;
      }
    };
  },
};
