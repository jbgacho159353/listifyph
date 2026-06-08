import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { GenerateRequest } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.plan === "free" && (profile?.generations_used ?? 0) >= 3) {
    return NextResponse.json({ error: "Generation limit reached" }, { status: 403 });
  }

  const body: GenerateRequest = await request.json();

  const systemPrompt = `You are an expert Filipino real estate copywriter with 10+ years of experience selling properties in the Philippines. You write copy that converts browsers into buyers.

You will generate 4 types of content for a property listing. Make each one unique, compelling, and tailored to Filipino real estate buyers.

WRITING RULES:
- Never write generic copy
- Use emotion and storytelling
- Create desire and urgency naturally
- Speak directly to the buyer's dream
- Use proven frameworks (AIDA, PAS, FOMO)
- Be specific with numbers and details
- Never say "Call now" — use specific CTAs
- Write like a top agent, not a robot

AD STYLE GUIDELINES:

STORYTELLING: Write as if painting a picture of the buyer's future life in this property. Open with a scene, build desire, then reveal the property details. Best for luxury condos and houses.

DIRECT RESPONSE: Lead with the strongest benefit or deal. Use bullet points. Create urgency with limited availability. Best for fast sales and foreclosed properties.

FOMO: Emphasize scarcity and exclusivity. "Only X units left", "Prices going up next month", "Last unit at this price". Best for pre-selling.

INVESTMENT PITCH: Focus on ROI, rental income potential, capital appreciation, and location value. Include data points. Best for investors.`;

  const amenitiesStr = body.amenities.length > 0 ? body.amenities.join(", ") : "Not specified";
  const bedsStr = body.bedrooms ? `${body.bedrooms} bedrooms` : "";
  const bathsStr = body.bathrooms ? `${body.bathrooms} bathrooms` : "";
  const sizeStr = body.size ? `Floor area: ${body.size}` : "";
  const notesStr = body.special_notes ? `Special notes: ${body.special_notes}` : "";

  const userPrompt = `Generate property listing content for:

Property Type: ${body.property_type}
Location: ${body.location}
Price: ${body.price}
${bedsStr}
${bathsStr}
${sizeStr}
Amenities: ${amenitiesStr}
${notesStr}
Language: ${body.language}
Ad Style: ${body.ad_style}

Return a JSON object with these exact keys:
{
  "listing_description": "400-600 word SEO-optimized property description",
  "facebook_post": "Facebook post with emojis, 150-300 words, ready to copy-paste",
  "facebook_ad_copy": "3 variations of Facebook ad copy separated by ---",
  "instagram_caption": "Instagram caption with relevant hashtags, 100-200 words",
  "filipino_version": "Complete Filipino/Tagalog version of the listing description and facebook post combined"
}

${body.language === "english" ? 'Write everything in English only. Set "filipino_version" to null.' : ""}
${body.language === "filipino" ? "Write everything in Filipino/Tagalog. Still populate all fields in Filipino." : ""}
${body.language === "both" ? "Write the main content in English, and provide a complete Filipino/Tagalog version in the filipino_version field." : ""}

Return only valid JSON, no markdown code blocks.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: userPrompt }],
      system: systemPrompt,
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const result = JSON.parse(cleaned);

    // Update generation count
    if (profile?.plan === "free") {
      await supabase
        .from("profiles")
        .update({ generations_used: (profile.generations_used ?? 0) + 1 })
        .eq("id", user.id);
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
