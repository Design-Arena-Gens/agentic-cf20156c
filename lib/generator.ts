import { Platform } from './utils';

const buzz = [
  'Top tips', 'Behind the scenes', 'How to', 'Quick guide', 'Trends', 'Did you know', 'Story time', 'Before & after', 'Design inspo', 'Mini case study'
];

const emojis = ['??','??','?','??','??','??','?','??','??','??'];

export function generateCaption(category: string, topic: string) {
  const opener = buzz[Math.floor(Math.random()*buzz.length)];
  const em = emojis[Math.floor(Math.random()*emojis.length)];
  return `${opener}: ${capitalize(topic)} for ${category}. ${em} Save this for later!`;
}

export function generateHashtags(category: string, topic: string, platforms: Platform[]) {
  const base = sanitize(topic).split('-').join('').split(' ').filter(Boolean);
  const core = Array.from(new Set([
    category, ...base, ...base.map(w => `${w}s`), 'tips','guide','learn','creator','marketing','growth','viral','content'
  ]));
  const map = (t: string) => `#${sanitize(t)}`;
  const tags = core.slice(0, 12).map(map);
  // platform specific boost
  if (platforms.includes('instagram')) tags.unshift('#reels');
  if (platforms.includes('pinterest')) tags.unshift('#pinterestinspired');
  if (platforms.includes('facebook')) tags.unshift('#facebookcommunity');
  return tags.slice(0, 15);
}

function sanitize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'');
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
