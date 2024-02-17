export const restValues = ["w", "h", "q", "e", "s"] as const;

export type RestValue = (typeof restValues)[number];
