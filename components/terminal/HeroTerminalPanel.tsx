"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Terminal, { TerminalContextProvider } from "@zqui/react-terminal";
import { commands, directoryStructure, monoTheme, welcomeMessage } from "./terminalConfig";
import { themeBridge } from "./themeBridge";

export default function HeroTerminalPanel({ onClose }: { onClose: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  console.log(welcomeMessage)

  // Expose next-themes' setter to the terminal's `theme` command, which is a
  // plain function and can't use the hook itself.
  useEffect(() => {
    themeBridge.setSiteTheme = setTheme;
    return () => {
      themeBridge.setSiteTheme = null;
    };
  }, [setTheme]);

  // Esc closes the terminal and returns to the hero.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // The library auto-scrolls after each command — and once on mount for the
  // welcome message — by calling `scrollDiv.scrollIntoView()`. That bubbles to
  // every scrollable ancestor (including the document), so the whole page
  // jumps. We override the anchor's scrollIntoView to scroll ONLY the
  // terminal's own container (.main-terminal).
  //
  // This MUST be a layout effect: all layout effects run before any passive
  // useEffect, including the library's mount-time scroll. A plain useEffect
  // here would run after it (child effects fire before parent effects), and
  // the very first scroll-on-open would slip through. Remove once the library
  // itself is patched.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const patch = () => {
      const anchor = root.querySelector<HTMLElement>(".scroll-div");
      const scroller = root.querySelector<HTMLElement>(".main-terminal");
      if (!anchor || !scroller) return false;
      anchor.scrollIntoView = () => {
        scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
      };
      return true;
    };

    // DOM is committed before layout effects, so this normally succeeds
    // synchronously; retry next frame only as a safety net.
    if (!patch()) requestAnimationFrame(patch);
  }, []);

  return (
    <div
      ref={rootRef}
      className="h-[clamp(380px,58vh,560px)] w-full overflow-hidden rounded-[16px] border border-line bg-[color-mix(in_srgb,var(--fg)_2%,transparent)] font-mono"
    >
      <TerminalContextProvider>
        <Terminal
          prompt="zaid@portfolio:"
          theme={monoTheme}
          welcomeMessage={"Type 'help' for a list of available commands"}
          commands={commands}
          directoryStructure={directoryStructure}
          showTopBarPrompt={false}
          topBarHeight={"5%"}
          height="100%"
          width="100%"
          borderRadius="16px"
          // The red top-bar dot closes the terminal (mac-window affordance).
          btn1Callback={onClose}
        />
      </TerminalContextProvider>
    </div>
  );
}
