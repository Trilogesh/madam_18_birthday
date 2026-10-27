export interface PageDefinition {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  isSkipped?: boolean;
}

export const ROADMAP_PAGES: PageDefinition[] = [
  {
    id: 1,
    slug: 'universe',
    title: 'A place that exists because of you',
    subtitle: 'The cosmic opening & stardust awakening',
  },
  {
    id: 2,
    slug: 'garden',
    title: 'The things about her that the world might overlook',
    subtitle: 'An enchanted twilight garden of personal discoveries',
  },
  {
    id: 3,
    slug: 'poetry',
    title: 'A personal poem collection',
    subtitle: 'Seven handwritten manuscripts by candlelight',
  },
  {
    id: 4,
    slug: 'memories-museum',
    title: 'A museum of your memories',
    subtitle: 'Intentionally skipped',
    isSkipped: true,
  },
  {
    id: 5,
    slug: 'secret-chamber',
    title: 'A secret room containing letters',
    subtitle: 'A moonlit chamber & five hanging letters',
  },
  {
    id: 6,
    slug: 'final-reveal',
    title: 'The final reveal',
    subtitle: 'A quiet, heartfelt birthday message',
  },
];

export const ACTIVE_PAGE_IDS = [1, 2, 3, 5, 6] as const;
export type ActivePageId = (typeof ACTIVE_PAGE_IDS)[number];

export function getNextPageId(currentId: number): ActivePageId | null {
  const currentIndex = ACTIVE_PAGE_IDS.indexOf(currentId as ActivePageId);
  if (currentIndex === -1 || currentIndex === ACTIVE_PAGE_IDS.length - 1) {
    return null;
  }
  return ACTIVE_PAGE_IDS[currentIndex + 1];
}

export function getPrevPageId(currentId: number): ActivePageId | null {
  const currentIndex = ACTIVE_PAGE_IDS.indexOf(currentId as ActivePageId);
  if (currentIndex <= 0) {
    return null;
  }
  return ACTIVE_PAGE_IDS[currentIndex - 1];
}

export function getPageDefinition(id: number): PageDefinition | undefined {
  return ROADMAP_PAGES.find((p) => p.id === id);
}
