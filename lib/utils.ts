export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export const platforms = ['instagram', 'facebook', 'pinterest'] as const;
export type Platform = typeof platforms[number];
