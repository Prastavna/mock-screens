interface Screen {
  isExtended?: boolean;
}

interface ScreenDetailed extends Screen {
  isInternal: boolean;
  isPrimary: boolean;
}

export interface ScreenDetails {
  screens: ScreenDetailed[];
  currentScreen: ScreenDetailed;

  onscreenschange: ((this: ScreenDetails, ev: Event) => any) | null;
  oncurrentscreenchange: ((this: ScreenDetails, ev: Event) => any) | null;

  addEventListener(
    type: "screenschange" | "currentscreenchange",
    listener: (this: ScreenDetails, ev: Event) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener(
    type: "screenschange" | "currentscreenchange",
    listener: (this: ScreenDetails, ev: Event) => any,
    options?: boolean | EventListenerOptions,
  ): void;
}

declare global {
  interface Window {
    getScreenDetails?(): Promise<ScreenDetails>;
    _isScreenMocked?: boolean;
  }
}


