function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = old;
    }
  }
  return row[b.length];
}
export function fuzzyScore(query: string, text: string): number {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  const q = normalize(query).trim();
  const t = normalize(text);
  if (!q) return 1;
  if (t.includes(q)) return 100;
  const words = t.split(/[^a-z0-9@]+/);
  let score = 0;
  for (const token of q.split(/\s+/)) {
    if (t.includes(token)) {
      score += 10;
      continue;
    }
    const allowance = token.length >= 8 ? 2 : token.length >= 4 ? 1 : 0;
    const best = Math.min(
      ...words
        .filter((w) => Math.abs(w.length - token.length) <= allowance)
        .map((w) => distance(token, w)),
    );
    if (best > allowance) return 0;
    score += 5 - best;
  }
  return score;
}
