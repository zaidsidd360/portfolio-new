// Bridges next-themes' `setTheme` (a React hook value) to the terminal's
// plain-function commands. HeroTerminalPanel populates this on mount; the
// `theme` command in terminalConfig reads it at call time.
type ThemeSetter = (theme: string) => void;

export const themeBridge: { setSiteTheme: ThemeSetter | null } = {
  setSiteTheme: null,
};
