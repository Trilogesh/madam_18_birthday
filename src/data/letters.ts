export interface ChamberLetter {
  id: number;
  romanId: string;
  title: string;
  purpose: string;
  symbol: 'ask' | 'heavy' | 'moon' | 'worth' | 'future';
  branchPosition: { x: number; y: number }; // Percentage position on tree
  salutation: string;
  paragraphs: string[];
  highlight?: string;
  signoff: string;
  signature: string;
}

export const CHAMBER_LETTERS: ChamberLetter[] = [
  {
    id: 1,
    romanId: 'I',
    title: 'IF I COULD ASK YOU AGAIN',
    purpose: 'A romantic love letter and proposal',
    symbol: 'ask',
    branchPosition: { x: 22, y: 32 },
    salutation: 'My Madamm,',
    paragraphs: [
      `If I were given a thousand chances to choose someone to love, I wonder how many times my heart would find its way back to you. Perhaps a thousand. Perhaps more. Because somehow, without asking my permission, you've become the person my heart looks for in every little thing.`,
      `You're beautiful in ways I could spend my whole life trying to describe. Even the moon, with all its borrowed silver light, could envy the way you shine on your own. But it's not only your beauty, your eyes, your hair, or that lovely presence of yours that has me so deeply in love. It's you. The way you are, the way you care, the way you feel, and all those little things that make you my Madamm.`,
      `I never knew I could fall this deeply for someone. I can't even explain how it happened. I only know that loving you has become one of the most natural things my heart has ever done.`,
      `So, if I could stand before you with all my fears put aside, I'd ask you this: Will you let me keep loving you? Will you let me be the one who shares your laughter, listens to your worries, celebrates your smallest victories, and stands beside you as life unfolds?`,
      `I don't promise to be perfect. I promise to keep learning how to love you better, to listen when you need to speak, and to care for the heart you've trusted me with.`,
    ],
    highlight: `Madamm, if my heart could choose its answer all over again, it would still choose you. Would you choose me, too?`,
    signoff: `With all the love I struggle to put into words,`,
    signature: `Yours, always. ❤️`,
  },
  {
    id: 2,
    romanId: 'II',
    title: 'FOR THE DAYS THAT FEEL TOO HEAVY',
    purpose: 'Open when you are sad',
    symbol: 'heavy',
    branchPosition: { x: 74, y: 30 },
    salutation: 'My precious Madamm,',
    paragraphs: [
      `If you're reading this on a difficult day, I wish I could be beside you right now. I wish I could see your face, hold your hand, and let you rest for a little while without having to explain everything that's hurting you.`,
      `I know you carry things that aren't always easy to talk about. You handle so much, and sometimes I wonder how many difficult things you keep inside that the world never sees. I wish I could take every burden from your shoulders, but since I cannot, please let me remind you of something: you don't have to be strong every single moment.`,
      `You can cry. You can feel tired. You can have a day when nothing makes sense. You don't have to pretend you're okay just to make everyone else comfortable. And you don't have to find the perfect words before you tell me something is wrong.`,
      `I may not always know how to fix everything, but I want to listen. I want to understand. Even if all you can say is that today hurts, that is enough for me to sit with you in that feeling.`,
      `And please, my love, don't forget to take care of yourself. Eat something, drink some water, rest when you're tired. The same heart that worries about whether I've eaten deserves that same tenderness in return.`,
      `You matter on your happiest days, but you matter just as much on the days you feel like you've got nothing left to give.`,
      `So breathe, Madamm. Take your time. You don't have to solve your entire world tonight.`,
    ],
    highlight: `If today is too heavy, let it be a day you survive gently—not a day you have to win.`,
    signoff: `I'm sending you the softest hug my words can carry.`,
    signature: `Your person, who wants to understand. 🫂`,
  },
  {
    id: 3,
    romanId: 'III',
    title: 'MEET ME BENEATH THE MOON',
    purpose: 'Open when you miss me',
    symbol: 'moon',
    branchPosition: { x: 48, y: 20 },
    salutation: 'My Madamm,',
    paragraphs: [
      `If there's a night when you miss me so much that you don't know what to do with the feeling, go outside for a moment and look at the moon.`,
      `Somewhere beneath that same moon, I'll be looking at it too. Maybe from a window, maybe from a quiet road, maybe on a night when I can't quite explain why I miss you more than usual. And for that little moment, even if we're miles apart, we'll have one thing in common: we're looking at the same sky, carrying the same wish to be a little closer.`,
      `Isn't it strange, love? The moon doesn't know how far apart we are. It doesn't know what our day was like, what words we couldn't say, or how much we wish we could simply sit beside each other. It just keeps shining over both of us, as though distance were only a small thing beneath such a vast sky.`,
      `And Madamm, if one day you miss me but don't know how to reach me, if our conversations have gone quiet or life has placed silence between us, you can post a little moon on your story. No long explanation needed. Just the moon.`,
      `If I see it, and if I can reach you, I'll come to you. Not because a story can solve everything, but because I want you to know that you don't have to find the perfect words to tell me you're missing me.`,
      `And even if I don't see it, please remember that you are allowed to miss someone without carrying that feeling alone. You can write to me, save your thoughts, or simply sit beneath the sky until your heart feels a little lighter.`,
      `So whenever the night feels too wide between us, look up, my love. Find the brightest part of the moon and imagine me looking at it, too.`,
    ],
    highlight: `Different places, one sky, two hearts wishing they could close the distance.`,
    signoff: `Until the day I can look at that moon with you instead of from somewhere far away,`,
    signature: `I'll meet you there, Madamm. 🌙`,
  },
  {
    id: 4,
    romanId: 'IV',
    title: 'YOU ARE MORE THAN YOU SEE',
    purpose: 'Remind her of her worth',
    symbol: 'worth',
    branchPosition: { x: 30, y: 55 },
    salutation: 'My beautiful Madamm,',
    paragraphs: [
      `I wish, just for a moment, you could borrow my eyes and see yourself the way I see you.`,
      `I wonder if you'd finally understand why I call you beautiful so often. Not just because of your face, your eyes, your hair, or the way the smallest things about you can steal my attention. I'd want you to see the whole of yourself: the heart that feels deeply, the care you give, the tenderness you carry, and the strength it takes to keep going through things other people may never understand.`,
      `You sometimes see yourself as so small, as though your worth could fit inside the limits you've placed around yourself. But, Madamm, you are so much more than the little version of yourself you sometimes believe in.`,
      `No comparison could measure you. No passing opinion could define you. And no person's inability to understand you could make your heart any less valuable.`,
      `The world might not always notice the things I notice. It might overlook the way you care, misunderstand your intentions, or fail to see what you've had to carry. But their inability to see all of you doesn't mean those parts of you aren't real.`,
      `You don't have to become more beautiful to deserve love. You don't have to become less emotional to deserve understanding. You don't have to prove that you're strong by carrying everything alone.`,
      `I hope you learn to speak to yourself with the same kindness you give to the people you care about. I hope you look in the mirror one day and see someone worth protecting, appreciating, and being proud of.`,
      `Because that girl looking back at you, Madamm? She's not ordinary just because she's used to being herself. She's someone with a heart, a story, a thousand little details, and a future that deserves to be lived fully.`,
    ],
    highlight: `Please don't make yourself smaller just because the world hasn't learned how to see your size.`,
    signoff: `If you ever forget your worth, come back to these words. You were always worth so much more than you imagined.`,
    signature: `Please learn to see her, too. ❤️`,
  },
  {
    id: 5,
    romanId: 'V',
    title: 'A LITTLE LIFE CALLED OURS',
    purpose: 'Open when you dream about our future',
    symbol: 'future',
    branchPosition: { x: 68, y: 56 },
    salutation: 'My Madamm,',
    paragraphs: [
      `Sometimes I imagine a future that doesn't need anything extraordinary to be beautiful. Just you and me, a home we've made our own, and the peaceful feeling of finally being able to share the little things instead of describing them through a screen.`,
      `I imagine our dream house, a place where your things and mine belong together. A place filled with ordinary mornings, silly conversations, your laughter coming from another room, and evenings when neither of us has to say goodbye because the day is ending.`,
      `And, of course, I imagine the cars we've dreamed about, and that R15 bike waiting for our night rides. Just you and me on quiet roads, the city lights passing by, stopping somewhere for chocolate ice cream because somehow a simple little thing tastes better when I'm sharing it with you.`,
      `Imagine us coming home after one of those rides, still talking about nothing and everything. Maybe we'll have our favourite drinks together late at night, sitting comfortably, laughing about the day's nonsense, planning tomorrow, or simply enjoying the fact that we're finally in the same place.`,
      `I want those grand dreams, too. The house, the cars, the adventures. But do you know which part I keep coming back to?`,
      `It's the ordinary part.`,
      `You asking what we're eating. Me asking how your day went. You stealing my attention when I'm supposed to be doing something else. The two of us choosing a film and spending more time talking than watching it. The comfort of knowing that after a long day, there's someone waiting to hear about it.`,
      `I know the future won't always follow the pictures we create in our minds. Plans can change, life can surprise us, and we'll have things to figure out along the way. But I hope we keep dreaming, keep laughing, and keep making room for the little moments that turn a house into a home.`,
      `So here's one of my favourite dreams, Madamm: someday, when we look back at these messages and all the things we imagined, I hope we'll smile at how much we wanted to experience together. And maybe we'll be on one of those night rides when it happens, sharing chocolate ice cream, arguing playfully about where to go next, and having nowhere urgent to be.`,
    ],
    highlight: `I don't just dream of a beautiful life. I dream of the little life that becomes beautiful because it's you and me living it.`,
    signoff: `Until then, I'll keep dreaming of our little world.`,
    signature: `Your future night-ride partner, chocolate-ice-cream thief, and hopeful co-dreamer. 🏡🏍️🍦`,
  },
];

export const FINAL_REVEAL_CONTENT = {
  salutation: 'My dearest Madamm,',
  bodyParagraphs: [
    `If only you could see yourself through my eyes, you'd understand why the moon envies your beauty, why your little habits mean so much to me, and why even the smallest moments with you become precious in my heart.`,
    `You are so much more wonderful than you sometimes believe, and I hope life gives you a thousand reasons to smile, a thousand dreams to chase, and all the happiness your beautiful heart deserves. And if I could ask for one little thing, it would be to share more of those smiles, dreams, and ordinary little moments with you.`,
    `No universe could ever hold all the words I have for you, but my heart will keep finding new ways to say them.`,
  ],
  birthdayGreeting: 'Happy Birthday, Madam Ji! ❤️🌙',
  finalEndingLine: 'You are loved, Madamm.',
};
