import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!apiKey || !supabaseUrl || !supabasePublishableKey) {
      return Response.json(
        { error: "Missing required environment variables." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = body.message;
    const accessToken = body.accessToken;

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!accessToken) {
      return Response.json(
        { error: "User session is required." },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, supabasePublishableKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json(
        { error: "Could not verify authenticated user." },
        { status: 401 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "You are MAUNi, a compassionate recovery coaching reflection assistant. You support people with warmth, dignity, curiosity, and practical recovery coaching questions. You do not diagnose, provide medical advice, or replace professional, clinical, emergency, or crisis support. If someone appears at risk of harming themselves or others, encourage them to contact emergency services, a trusted person, or a local crisis line immediately. Keep responses supportive, grounded, and practical. Structure each response with: 1) a short validation, 2) one gentle reflection, 3) one practical next step, and 4) one coaching question.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.output_text;

    const { error: insertError } = await supabase.from("reflections").insert({
      user_id: user.id,
      message,
      reply,
    });

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("MAUNi AI error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    return Response.json({ error: message }, { status: 500 });
  }
}