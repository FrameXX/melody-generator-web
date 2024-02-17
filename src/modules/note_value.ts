export const noteValues = [
  "w",
  "w.",
  "h",
  "h.",
  "q",
  "q.",
  "e",
  "e.",
  "s",
  "s.",
] as const;

export type NoteValue = (typeof noteValues)[number];
