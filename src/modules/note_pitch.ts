export const note_pitches = ["c", "d", "e", "f", "g", "a", "h"] as const;

export type NotePitch = (typeof note_pitches)[number];
