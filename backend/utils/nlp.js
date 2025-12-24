// backend/utils/nlp.js
export const SCALP_TYPES = ["oily","dry","normal","sensitive","combination","flaky"];
export const HAIR_TYPES = ["straight","wavy","curly","coily","fine","thick","colored","color-treated"];
export const CONCERNS = ["dandruff","hair fall","breakage","frizz","split ends","itchy","build-up","heat damage","oily roots","dry ends","volume","shine"];
export const SENSITIVITIES = ["sulfates","parabens","silicones","fragrance","alcohol"];

const SYNONYMS = {
  oily:["greasy","oily"],
  dry:["dry","dehydrated"],
  sensitive:["sensitive","itchy"],
  flaky:["flaky","flakes"],
  straight:["straight"],
  wavy:["wavy"],
  curly:["curly"],
  coily:["coily"],
  fine:["fine","thin"],
  thick:["thick","dense"],
  colored:["colored","dyed"],
  "color-treated":["color-treated","treated"]
};

const normalize = (s) => s.toLowerCase();
const anyMatch = (text, list) => list.some(x => text.includes(normalize(x)));

// Regex patterns for special cases like combination scalp
const COMBINATION_PATTERNS = [/oily roots.*dry ends/, /dry ends.*oily roots/];

export function extractFromFreeText(textRaw) {
  const text = normalize(textRaw);
  const foundScalp = new Set(), foundHair = new Set(), foundConcerns = new Set(), foundAvoid = new Set();

  // Match synonyms
  Object.entries(SYNONYMS).forEach(([label, words]) => {
    if (anyMatch(text, words)) {
      if (SCALP_TYPES.includes(label)) foundScalp.add(label);
      if (HAIR_TYPES.includes(label)) foundHair.add(label);
      if (CONCERNS.includes(label)) foundConcerns.add(label);
    }
  });

  // Detect concerns from text
  CONCERNS.forEach(c => {
    if (text.includes(normalize(c))) foundConcerns.add(c);
  });

  // Detect sensitivities/ingredients to avoid
  SENSITIVITIES.forEach(s => {
    if (text.includes(normalize(s))) foundAvoid.add(s);
  });

  // Special case: combination scalp via regex
  COMBINATION_PATTERNS.forEach((regex) => {
    if (regex.test(text)) foundScalp.add("combination");
  });

  return {
    scalpTypes: [...foundScalp],
    hairTypes: [...foundHair],
    concerns: [...foundConcerns],
    avoid: [...foundAvoid]
  };
}
