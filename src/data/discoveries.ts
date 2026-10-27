export interface Discovery {
  id: number;
  symbol: 'star' | 'flower' | 'crescent' | 'constellation' | 'leaf' | 'heart' | 'sparkle';
  title: string;
  locationHint: string;
  sealColor: string;
  xPercent: number;
  yPercent: number;
  content: string[];
}

export const DISCOVERIES: Discovery[] = [
  {
    id: 1,
    symbol: 'heart',
    title: 'The Heart That Feels Everything',
    locationHint: 'Hidden beneath the tender golden petals',
    sealColor: '#b45309',
    xPercent: 18,
    yPercent: 38,
    content: [
      `In a world that often rushes past feelings, you carry a heart that feels everything so deeply.`,
      `You care about people with a sincerity that is rare. When you are emotional, it is never a weakness or a flaw—it is proof of just how tender and genuine your soul truly is.`,
      `Never apologize for feeling so much, Madamm. That softness in you is one of the most beautiful things in this universe.`,
    ],
  },
  {
    id: 2,
    symbol: 'sparkle',
    title: 'The Little Things That Are You',
    locationHint: 'Resting near the glowing twilight spring',
    sealColor: '#d97706',
    xPercent: 78,
    yPercent: 32,
    content: [
      `The world sees the surface, but I treasure the little details that belong only to you.`,
      `The gentle melody of your voice that instantly calms my mind. That laugh of yours that lights up the quietest hours. Your sleepy face when the day is ending, and that sweet, innocent, childish behaviour of yours that makes my heart melt every single time.`,
      `These aren't just little things, madamm. They are the little wonders that make you my favorite person.`,
    ],
  },
  {
    id: 3,
    symbol: 'constellation',
    title: 'Closer Than Distance',
    locationHint: 'Sheltered along the star-dusted path',
    sealColor: '#4338ca',
    xPercent: 34,
    yPercent: 62,
    content: [
      `Even though you are physically far away, you have made me feel closer than anybody else.`,
      `Even you are at that long from me in distance youh are the only one who made me feel closer than anybody else ik.`,
      `Miles and oceans cannot diminish the warmth you bring into my life. When I think of you, distance simply forgets to matter.`,
    ],
  },
  {
    id: 4,
    symbol: 'crescent',
    title: 'The Art of Disappearing and Returning',
    locationHint: 'Tucked behind the shimmering silver ferns',
    sealColor: '#6366f1',
    xPercent: 62,
    yPercent: 58,
    content: [
      `Sometimes you suddenly disappear into your own quiet space, and then, just as softly, you come right back.`,
      `I smile whenever it happens. It is your own little quirk, your quiet pause from the world, and I hold it with so much affection and gentleness.`,
      `Take all the time you ever need, Madamm. Whenever you return, you will always find me right here, waiting with a smile.`,
    ],
  },
  {
    id: 5,
    symbol: 'leaf',
    title: 'The Things You Carry in Silence',
    locationHint: 'Resting quietly beneath the ancient weeping willow',
    sealColor: '#059669',
    xPercent: 24,
    yPercent: 76,
    content: [
      `I know you handle so many difficult things in silence. You carry weight on your shoulders that the rest of the world never even suspects.`,
      `I wish so deeply that you could share your troubles with me. You don't have to carry every storm alone.`,
      `I want to help bear your burdens, to make your days lighter, and to sit beside you in the quiet until things feel easier again.`,
    ],
  },
  {
    id: 6,
    symbol: 'star',
    title: 'The Questions That Meant Everything',
    locationHint: 'Glowing at the sanctuary of the garden heart',
    sealColor: '#e11d48',
    xPercent: 50,
    yPercent: 25,
    content: [
      `You always check whether I've eaten. You ask what I'm having, and whether I'm eating healthily and on time.`,
      `To someone else walking by, that might sound like a simple, ordinary question. But to me, it meant everything in the world.`,
      `Nobody else had ever cared for me like that. That simple tenderness touched a place in my heart that had never been reached before. Thank you, Madamm.`,
    ],
  },
  {
    id: 7,
    symbol: 'flower',
    title: 'Beyond What the World Sees',
    locationHint: 'Hidden beside the blooming midnight roses',
    sealColor: '#9333ea',
    xPercent: 72,
    yPercent: 80,
    content: [
      `There are people who don't understand you properly. Some might misunderstand your actions or think they are fake, without ever knowing the battles you fight or what you are quietly going through.`,
      `Please remember this: other people's misunderstandings do not define who you are.`,
      `I know your heart. I see your authenticity, your strength, and your gentleness. You are genuine, you are real, and you are deeply cherished just as you are.`,
    ],
  },
];
