import create from "zustand";

export interface State {
  loggedIn: boolean;
  userId: string | undefined;
  setLoggedIn: (newState: boolean) => void;
  setUserId: (newId: string | undefined) => void;
}

export const useAuth = create<State>((set, get) => ({
  userId: document.cookie
    .split("; ")
    .find((str) => str.split("=")[0] === "c_usr")
    ?.split("=")[1],
  loggedIn: !!document.cookie
    .split("; ")
    .find((str) => str.split("=")[0] === "c_usr"),
  setLoggedIn: (newState: boolean) =>
    set((_) => {
      return !newState
        ? { loggedIn: false, userId: undefined }
        : { loggedIn: true };
    }),
  setUserId: (newId: string | undefined) => set((state) => ({ userId: newId })),
}));
