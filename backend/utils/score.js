// backend/utils/score.js
const normalize = (s = "") => s.toLowerCase();

function productIngredientTouches(ingredient = "", avoidTag = "") {
  const s = normalize(ingredient);
  switch (avoidTag) {
    case "sulfates":
      return /sulfate/.test(s);
    case "parabens":
      return /paraben/.test(s);
    case "silicones":
      return /(cone|siloxane)/.test(s);
    case "fragrance":
      return /fragrance|parfum/.test(s);
    case "alcohol":
      return /alcohol/.test(s) && !/cetearyl|cetyl/.test(s);
    default:
      return false;
  }
}

function scoreProduct(profile, product) {
  const { scalpTypes = [], hairTypes = [], concerns = [], avoid = [], budget = "mid" } = profile || {};
  let score = 0;
  const reasons = [];

  const intersect = (a = [], b = []) => a.filter((x) => b.includes(x));

  const scalpHit = intersect(product?.suitability?.scalpTypes || [], scalpTypes).length;
  const hairHit = intersect(product?.suitability?.hairTypes || [], hairTypes).length;
  const concernHit = intersect(product?.suitability?.concerns || [], concerns).length;

  score += scalpHit * 3;
  score += hairHit * 2;
  score += concernHit * 4;

  if (concernHit) reasons.push(`Targets ${intersect(product.suitability.concerns || [], concerns).join(", ")}`);
  if (scalpHit) reasons.push(`Good for ${intersect(product.suitability.scalpTypes || [], scalpTypes).join(", ")} scalp`);
  if (hairHit) reasons.push(`Suited to ${intersect(product.suitability.hairTypes || [], hairTypes).join(", ")} hair`);

  // Avoid penalties
  const avoidHit = (product.ingredients || []).filter((ing) => avoid.some((a) => productIngredientTouches(ing, a))).length;
  if (avoidHit) {
    score -= avoidHit * 5;
    reasons.push("Contains ingredient(s) you prefer to avoid — check label.");
  }

  // Budget tiebreaker
  const budgetRank = (price = 0) => {
    if (budget === "low") return price <= 12 ? 0 : 1;
    if (budget === "mid") return price <= 18 ? 0 : 1;
    if (budget === "high") return 0;
    return 0;
  };

  return { score, reasons, budgetRank: budgetRank(product.price) };
}

export { scoreProduct };
