export const MAIN_DINING_MENU = [
  {
    course: 'Appetizer',
    courseKey: 'appetizer' as const,
    courseKo: '전채',
    korean: 'Grilled Yam with Doenjang & Ginkgo Porridge',
    western: 'King Crab with Basil Herbs & Beluga Caviar',
    koreanId: 'app-korean',
    westernId: 'app-western',
  },
  {
    course: 'Main',
    courseKey: 'main' as const,
    courseKo: '주요리',
    korean: 'Bulgogi Muk-bap or Spicy Galbi-jjim',
    western: 'Jedong Hanwoo Sirloin (Custom Oven Roast)',
    koreanId: 'main-korean',
    westernId: 'main-western',
  },
  {
    course: 'Dessert',
    courseKey: 'dessert' as const,
    courseKo: '후식',
    korean: 'Hangwa, Chestnut Yanggaeng & Sujeonggwa',
    western: 'French Cheese Board & Häagen-Dazs Green Tea',
    koreanId: 'dessert-korean',
    westernId: 'dessert-western',
  },
] as const;

export type MenuTrack = 'korean' | 'western';

export const MENU_TRACK_META: Record<
  MenuTrack,
  { label: string; labelKo: string; description: string; color: string }
> = {
  korean: {
    label: 'Signature Korean Course',
    labelKo: '시그니처 한식 코스',
    description: '전채 · 주요리 · 후식 3코스 정찬',
    color: '#0055A5',
  },
  western: {
    label: 'Authentic Western Course',
    labelKo: '오리지널 양식 코스',
    description: 'Appetizer · Main · Dessert full course',
    color: '#C4A35A',
  },
};

export const MENU_TRACK_FOOD_IDS: Record<MenuTrack, string[]> = {
  korean: ['app-korean', 'main-korean', 'dessert-korean'],
  western: ['app-western', 'main-western', 'dessert-western'],
};

export type FoodCourse = 'appetizer' | 'main' | 'dessert' | 'snack';

export interface OrderableFood {
  id: string;
  label: string;
  description: string;
  course: FoodCourse;
  courseLabel: string;
  color: string;
}

export const ORDERABLE_FOOD: OrderableFood[] = [
  {
    id: 'app-korean',
    label: 'Grilled Yam & Ginkgo Porridge',
    description: 'Signature Korean · Doenjang',
    course: 'appetizer',
    courseLabel: 'Appetizer',
    color: '#0055A5',
  },
  {
    id: 'app-western',
    label: 'King Crab & Beluga Caviar',
    description: 'Western · Basil herbs',
    course: 'appetizer',
    courseLabel: 'Appetizer',
    color: '#0055A5',
  },
  {
    id: 'main-korean',
    label: 'Bulgogi Muk-bap / Galbi-jjim',
    description: 'Signature Korean · Chef’s choice',
    course: 'main',
    courseLabel: 'Main',
    color: '#C4A35A',
  },
  {
    id: 'main-western',
    label: 'Jedong Hanwoo Sirloin',
    description: 'Western · Custom oven roast',
    course: 'main',
    courseLabel: 'Main',
    color: '#C4A35A',
  },
  {
    id: 'dessert-korean',
    label: 'Hangwa & Sujeonggwa',
    description: 'Traditional Korean sweets',
    course: 'dessert',
    courseLabel: 'Dessert',
    color: '#2A9D8F',
  },
  {
    id: 'dessert-western',
    label: 'Cheese Board & Green Tea Ice Cream',
    description: 'Häagen-Dazs · French selection',
    course: 'dessert',
    courseLabel: 'Dessert',
    color: '#2A9D8F',
  },
  {
    id: 'snack-ramen',
    label: 'Luxury Late-Night Ramen',
    description: 'Pollack hangover ramen or jjamppong',
    course: 'snack',
    courseLabel: 'Snack',
    color: '#4A4D52',
  },
  {
    id: 'snack-noodle',
    label: 'Premium Jajangmyeon',
    description: 'In-flight limited black bean noodles',
    course: 'snack',
    courseLabel: 'Snack',
    color: '#4A4D52',
  },
  {
    id: 'snack-cookie',
    label: 'Fresh Baked Cookie Plate',
    description: 'Handmade chocolate chip · seasonal fruit',
    course: 'snack',
    courseLabel: 'Snack',
    color: '#4A4D52',
  },
  {
    id: 'snack-jerky',
    label: 'Hanwoo Jerky & Macadamia',
    description: 'Dry snack pairing set',
    course: 'snack',
    courseLabel: 'Snack',
    color: '#4A4D52',
  },
];

export const COURSE_FOOD = ORDERABLE_FOOD.filter((f) => f.course !== 'snack');
export const SNACK_FOOD = ORDERABLE_FOOD.filter((f) => f.course === 'snack');

export const FOOD_COURSE_META: { course: FoodCourse; label: string; color: string }[] = [
  { course: 'appetizer', label: 'Appetizer', color: '#0055A5' },
  { course: 'main', label: 'Main', color: '#C4A35A' },
  { course: 'dessert', label: 'Dessert', color: '#2A9D8F' },
  { course: 'snack', label: 'Snack', color: '#4A4D52' },
];

/** Legend for à la carte panel (no snacks) */
export const COURSE_FOOD_META = FOOD_COURSE_META.filter((m) => m.course !== 'snack');

export const QUICK_SNACK_ITEMS = [
  { foodId: 'snack-ramen', icon: '🍜', titleKo: '럭셔리 라면' },
  { foodId: 'snack-noodle', icon: '🍝', titleKo: '짜장면' },
  { foodId: 'snack-cookie', icon: '🍪', titleKo: '쿠키 & 과일' },
  { foodId: 'snack-jerky', icon: '🥩', titleKo: '육포 & 마카다미아' },
] as const;

export const SNACK_BAR_ITEMS = [
  {
    id: 'noodle',
    title: 'Noodle Collection',
    titleKo: '누들 컬렉션',
    desc: 'Pollack ramen, limited Jajangmyeon, Seafood Champong — one-touch order.',
    icon: '🍜',
  },
  {
    id: 'cookie',
    title: 'Cookies & Fruit',
    titleKo: '쿠키 & 과일',
    desc: 'Handmade chocolate chip cookies, seasonal fruit, Häagen-Dazs.',
    icon: '🍪',
  },
  {
    id: 'beer',
    title: 'Beer & Dry Snacks',
    titleKo: '비어 & 드라이 스낵',
    desc: 'Craft beers with Hanwoo jerky & macadamia sets.',
    icon: '🍺',
  },
] as const;

export const MIDNIGHT_SNACKS = [
  { id: 'shin', label: 'Custom Shin Ramen' },
  { id: 'jajang', label: 'Premium Black Bean Jajangmyeon' },
  { id: 'cookie', label: 'Fresh Baked Cookie' },
  { id: 'jerky', label: 'Aged Beef Jerky & Macadamia' },
] as const;

export type SpiceLevel = 0 | 1 | 2;

export const SPICE_LABELS = ['Mild', 'Medium', 'Spicy'] as const;

export const RAMEN_GARNISHES = [
  { id: 'scallion', label: 'Extra Scallion' },
  { id: 'sprouts', label: 'Bean Sprouts' },
  { id: 'chili', label: 'Spicy Chili Peppers' },
] as const;

export function getFoodById(id: string): OrderableFood | undefined {
  return ORDERABLE_FOOD.find((f) => f.id === id);
}
