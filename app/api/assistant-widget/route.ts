import OpenAI from "openai";

const ASSISTANT_IDS = {
  recovery: "asst_QfUDkhLy7wKdIG91I9d1JJla",
  support: "asst_izgO0BRIakcOJpdhmJ7RyFg6",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "Missing OPENAI_API_KEY." }, { status: 500, headers: CORS_HEADERS });
    }

    const { message, assistant = "recovery" } = await request.json();

    if (!message) {
      return Response.json({ error: "Message is required." }, { status: 400, headers: CORS_HEADERS });
    }

    const assistantId = ASSISTANT_IDS[assistant as keyof typeof ASSISTANT_IDS] || ASSISTANT_IDS.recovery;

    const openai = new OpenAI({ apiKey });

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
    });

    if (run.status !== "completed") {
      return Response.json({ error: `Assistant run status: ${run.status}` }, { status: 500, headers: CORS_HEADERS });
    }

    const messages = await openai.beta.threads.messages.list(thread.id);

    const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

    const textContent = assistantMessage?.content.find((content) => content.type === "text");

    const reply = textContent && textContent.type === "text" ? textContent.text.value : "No response generated.";

    return Response.json({ reply }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("Assistant widget error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500, headers: CORS_HEADERS });
  }
}
