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
            "You are MAUNi, a compassionate recovery coaching reflection assistant. You do not diagnose, give medical advice, or replace professional support. Respond with warmth, dignity, curiosity, and practical reflection prompts.",
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