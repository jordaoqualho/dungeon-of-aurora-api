export type SpellFilters = {
  name?: string;
  level?: number;
  school?: string;
  classes?: string;
};

export function buildSpellQuery(filters: SpellFilters): any {
  const query: any = {};

  if (filters.name) {
    query.name = { $regex: new RegExp(`^${filters.name}`, 'i') };
  }
  if (filters.level) {
    query.level = filters.level;
  }
  if (filters.school) {
    query.school = filters.school;
  }
  if (filters.classes) {
    const classesArray = filters.classes
      .split(',')
      .map((cls: string) => cls.trim());
    const regexPattern = classesArray
      .map((cls: string) => `(?=.*\\b${cls}\\b)`)
      .join('');
    query.classes = { $regex: new RegExp(regexPattern, 'i') };
  }

  return query;
}
