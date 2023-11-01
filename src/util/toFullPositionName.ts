export default function toFullPositionName(pos: string) {
  if (pos === undefined) return 'N/A';

  let fullPosition = '';

  for (const ch of pos) {
    if (ch === 'G') fullPosition += 'Guard';
    if (ch === 'F') fullPosition += 'Forward';
    if (ch === 'C') fullPosition += 'Center';
    if (ch === '-') fullPosition += '/';
  }

  return fullPosition;
}
