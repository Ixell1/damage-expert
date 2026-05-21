// Realne okvirne cene za prosečno putničko vozilo u Srbiji (2025-2026)
// Cene obuhvataju deo + rad limara/farbara/montaže. Disclaimer ostaje na sajtu.
// Izvori: javno dostupni cenovnici limarsko-farbarskih radova, MD Auto, Lav Auto,
// znam-majstora, telegraf (LED farovi premium markama), Auto Dragstor, Polovni Automobili.

export type DamageLevel = 'lakse' | 'srednje' | 'tesko';

export interface Part {
  id: string;
  name: string;
  description: string;
  // Min/Max okvirno (limarsko-farbarski + deo) u RSD za "srednje" oštećenje na popularnim modelima
  range: { min: number; max: number };
  multiplier: Record<DamageLevel, number>;
  category: 'prednji' | 'zadnji' | 'bocni' | 'gornji' | 'donji' | 'enterijer';
}

export const PARTS: Part[] = [
  {
    id: 'prednji-branik',
    name: 'Prednji branik',
    description: 'Plastični branik, popravka pukotina ili kompletna zamena sa farbanjem.',
    range: { min: 12000, max: 65000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'prednji',
  },
  {
    id: 'zadnji-branik',
    name: 'Zadnji branik',
    description: 'Zamena i farbanje plastičnog branika, eventualno parking senzori.',
    range: { min: 11000, max: 60000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'zadnji',
  },
  {
    id: 'hauba',
    name: 'Hauba (poklopac motora)',
    description: 'Ispravljanje, antikorozivna zaštita i farbanje haube. Zamena kod jakog oštećenja.',
    range: { min: 18000, max: 90000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'gornji',
  },
  {
    id: 'gepek-vrata',
    name: 'Gepek vrata',
    description: 'Vrata prtljažnika, popravka udubljenja i farbanje, eventualno zamena.',
    range: { min: 18000, max: 95000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'zadnji',
  },
  {
    id: 'krov',
    name: 'Krov vozila',
    description: 'Limarsko ispravljanje udubljenja i kompletno farbanje krova.',
    range: { min: 22000, max: 110000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.6 },
    category: 'gornji',
  },
  {
    id: 'prednja-leva-vrata',
    name: 'Prednja leva vrata',
    description: 'Ispravljanje udubljenja ili kompletna zamena vrata sa farbanjem.',
    range: { min: 16000, max: 75000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'bocni',
  },
  {
    id: 'prednja-desna-vrata',
    name: 'Prednja desna vrata',
    description: 'Ispravljanje udubljenja ili kompletna zamena vrata sa farbanjem.',
    range: { min: 16000, max: 75000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'bocni',
  },
  {
    id: 'zadnja-leva-vrata',
    name: 'Zadnja leva vrata',
    description: 'Ispravljanje udubljenja ili kompletna zamena vrata sa farbanjem.',
    range: { min: 15000, max: 70000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'bocni',
  },
  {
    id: 'zadnja-desna-vrata',
    name: 'Zadnja desna vrata',
    description: 'Ispravljanje udubljenja ili kompletna zamena vrata sa farbanjem.',
    range: { min: 15000, max: 70000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.7 },
    category: 'bocni',
  },
  {
    id: 'prednji-levi-blatobran',
    name: 'Prednji levi blatobran',
    description: 'Ispravljanje, antikorozivna zaštita i farbanje blatobrana.',
    range: { min: 12000, max: 50000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'bocni',
  },
  {
    id: 'prednji-desni-blatobran',
    name: 'Prednji desni blatobran',
    description: 'Ispravljanje, antikorozivna zaštita i farbanje blatobrana.',
    range: { min: 12000, max: 50000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'bocni',
  },
  {
    id: 'levi-far',
    name: 'Levi far',
    description: 'Halogeni far 8.000–30.000 RSD, LED/Bi-Xenon premium markama može i preko 100.000 RSD.',
    range: { min: 8000, max: 180000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2.2 },
    category: 'prednji',
  },
  {
    id: 'desni-far',
    name: 'Desni far',
    description: 'Halogeni far 8.000–30.000 RSD, LED/Bi-Xenon premium markama može i preko 100.000 RSD.',
    range: { min: 8000, max: 180000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2.2 },
    category: 'prednji',
  },
  {
    id: 'leva-stop-lampa',
    name: 'Leva stop lampa',
    description: 'Zamena kompletne zadnje stop lampe.',
    range: { min: 5000, max: 28000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2 },
    category: 'zadnji',
  },
  {
    id: 'desna-stop-lampa',
    name: 'Desna stop lampa',
    description: 'Zamena kompletne zadnje stop lampe.',
    range: { min: 5000, max: 28000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2 },
    category: 'zadnji',
  },
  {
    id: 'levi-retrovizor',
    name: 'Levi retrovizor',
    description: 'Kompletan retrovizor sa kućištem (mehanički ili električni).',
    range: { min: 4500, max: 35000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'bocni',
  },
  {
    id: 'desni-retrovizor',
    name: 'Desni retrovizor',
    description: 'Kompletan retrovizor sa kućištem (mehanički ili električni).',
    range: { min: 4500, max: 35000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'bocni',
  },
  {
    id: 'vetrobransko-staklo',
    name: 'Vetrobransko staklo',
    description: 'Zamena vetrobranskog stakla, eventualno sa senzorima (ADAS kalibracija).',
    range: { min: 12000, max: 110000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.5 },
    category: 'prednji',
  },
  {
    id: 'zadnje-staklo',
    name: 'Zadnje staklo',
    description: 'Zamena zadnjeg stakla, eventualno sa grejačem.',
    range: { min: 9000, max: 60000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.5 },
    category: 'zadnji',
  },
  {
    id: 'bocna-stakla',
    name: 'Bočno staklo',
    description: 'Zamena bočnog stakla na prednjim ili zadnjim vratima.',
    range: { min: 4500, max: 25000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.5 },
    category: 'bocni',
  },
  {
    id: 'felne',
    name: 'Felna (alu/čelična)',
    description: 'Ravnanje ili zamena felne, eventualno sa balansiranjem.',
    range: { min: 3500, max: 45000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 1.8 },
    category: 'donji',
  },
  {
    id: 'pragovi',
    name: 'Pragovi',
    description: 'Ispravljanje pragova, antikorozivna zaštita i farbanje.',
    range: { min: 9000, max: 55000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2 },
    category: 'donji',
  },
  {
    id: 'sasija-podvozje',
    name: 'Šasija / podvozje',
    description: 'Procena deformacije šasije, ravnanje na specijalnoj rampi.',
    range: { min: 25000, max: 250000 },
    multiplier: { lakse: 0.4, srednje: 1, tesko: 2.5 },
    category: 'donji',
  },
];

export const DAMAGE_LABEL: Record<DamageLevel, string> = {
  lakse: 'Lakše oštećenje',
  srednje: 'Srednje oštećenje',
  tesko: 'Teško oštećenje',
};

export const DAMAGE_DESC: Record<DamageLevel, string> = {
  lakse: 'Manje ogrebotine, mala udubljenja, površinska oštećenja laka.',
  srednje: 'Vidljiva deformacija lima, više ogrebotina, polomljen plastični deo.',
  tesko: 'Velike deformacije, potrebna zamena dela, eventualno strukturna šteta.',
};
