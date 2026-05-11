import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY is missing from .env.local" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
    });

    const body = await request.json();
    const message = body.message;

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
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

    return Response.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("MAUNi AI error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}