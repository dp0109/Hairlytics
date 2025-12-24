// backend/routes/chatbotRoutes.js
import express from "express";
import axios from "axios";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { message, context } = req.body;

    // Default context if not provided
    let currentContext = context || {
      scalp: null,
      hair: null,
      concerns: []
    };

    if (!message || message.trim().length === 0) {
      return res.json({
        reply: "I'm listening...",
        context: currentContext,
        products: []
      });
    }

    message = message.trim();
    const lowerMsg = message.toLowerCase();

    // 1️⃣ Heuristic: Detect simple greetings/resets
    const greetings = ["hi", "hello", "hey", "hola", "start", "restart"];
    if (greetings.includes(lowerMsg)) {
      return res.json({
        reply: "Hello! I'm Dr. HairBot. I can help analyzing your hair health. To start, could you tell me about your scalp? (e.g., is it oily, dry, or normal?)",
        context: { scalp: null, hair: null, concerns: [] }, // Reset context
        products: []
      });
    }

    // 2️⃣ Call Python NLP Service
    // We send just the current message to detect NEW attributes
    let pyRes;
    try {
      pyRes = await axios.post("http://127.0.0.1:6000/predict", { text: message });
    } catch (error) {
      console.error("Python service error:", error.message);
      return res.json({
        reply: "I'm having trouble connecting to my hair analysis brain. Please try again in a moment.",
        context: currentContext,
        products: []
      });
    }

    const { scalp_type, hair_type, concerns } = pyRes.data;

    // 3️⃣ Merge new info into context
    if (scalp_type) currentContext.scalp = scalp_type;
    if (hair_type) currentContext.hair = hair_type;
    if (concerns && concerns.length > 0) {
      // Add unique concerns
      const unique = new Set([...currentContext.concerns, ...concerns]);
      currentContext.concerns = Array.from(unique);
    }

    // Also check for "normal" keyword explicitly for context override if not caught by ML
    if (lowerMsg.includes("normal scalp")) currentContext.scalp = "normal";
    if (lowerMsg.includes("normal hair")) currentContext.hair = "normal";


    // 4️⃣ Decision Logic: What to say next?
    let reply = "";
    let products = [];

    // Case A: Missing Scalp Info
    if (!currentContext.scalp) {
      reply = "Got it. And how would you describe your scalp? Is it oily, dry, or sensitive?";
      // If we detected hair but no scalp, acknowledge hair
      if (hair_type) reply = `Okay, ${hair_type} hair. ` + reply;
    }
    // Case B: Missing Hair Info
    else if (!currentContext.hair) {
      reply = `I see you have ${currentContext.scalp} scalp. Now, what about your hair type? (Straight, wavy, curly, etc.)`;
    }
    // Case C: Have Scalp & Hair -> Check Concerns
    else if (currentContext.concerns.length === 0 && !lowerMsg.includes("no") && !lowerMsg.includes("none")) {
      // If user just gave hair/scalp, ask for concerns
      if (concerns.length > 0) {
        // We just detected concerns, so we are good.
      } else {
        reply = `Okay, ${currentContext.scalp} scalp and ${currentContext.hair} hair. Do you have any specific concerns like dandruff, hair fall, or frizz? (Say 'none' if everything is fine)`;
        return res.json({ reply, context: currentContext, products: [] });
      }
    }

    // If we have enough info (Scalp + Hair), we can recommend.
    // (Concerns are optional, but better if we have them)
    if (currentContext.scalp && currentContext.hair) {
      // If we reached here, either we have concerns OR user said "none" (implied by falling through or explicit check)

      reply = `Based on your profile (${currentContext.scalp} scalp, ${currentContext.hair} hair), here are my top recommendations:`;

      // Database Query
      products = await Product.aggregate([
        {
          $addFields: {
            matchScore: {
              $add: [
                { $cond: [{ $in: [currentContext.scalp.toLowerCase(), "$suitability.scalpTypes"] }, 2, 0] }, // Scalp is high priority
                { $cond: [{ $in: [currentContext.hair.toLowerCase(), "$suitability.hairTypes"] }, 1, 0] },
                {
                  $size: {
                    $filter: {
                      input: "$suitability.concerns",
                      as: "c",
                      cond: { $in: ["$$c", currentContext.concerns.map(c => c.toLowerCase())] }
                    }
                  }
                }
              ]
            }
          }
        },
        { $sort: { matchScore: -1 } },
        { $limit: 4 } // Top 4
      ]);

      // Handle "No Matches" gracefully
      if (products.length === 0) {
        products = await Product.find().limit(3);
        reply = "I couldn't find exact matches for that combination, but here are some of our bestsellers:";
      }

      // Add reason/ingredients for frontend display
      products = products.map(p => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        category: p.category,
        ingredients: p.ingredients || [],
        notes: p.notes
      }));
    }

    // 5️⃣ Send Response
    res.json({
      reply,
      context: currentContext,
      products
    });

  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({ reply: "My brain is fuzzy. System error." });
  }
});

export default router;
