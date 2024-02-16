const notes = ["c", "d", "e", "f", "g", "a", "h"] as const;

export type Note = typeof notes;
