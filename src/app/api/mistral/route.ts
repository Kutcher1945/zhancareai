import { NextResponse } from "next/server";

const API_KEY = process.env.MISTRAL_API_KEY; // Access API Key from environment
const ENDPOINT = process.env.MISTRAL_API_ENDPOINT; // Access Endpoint from environment

export async function POST(req: Request) {
  console.log("POST request received");

  // Validate the endpoint and API key
  if (!ENDPOINT) {
    console.error("MISTRAL_API_ENDPOINT is not defined.");
    return NextResponse.json(
      { error: "Internal server error: API endpoint is not configured." },
      { status: 500 }
    );
  }

  if (!API_KEY) {
    console.error("MISTRAL_API_KEY is not defined.");
    return NextResponse.json(
      { error: "Internal server error: API key is not configured." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
    console.log("Parsed request body:", body);
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const { user_text, language } = body;

  if (!user_text || !language) {
    console.error("Missing required parameters:", { user_text, language });
    return NextResponse.json(
      { error: "Missing required parameters." },
      { status: 400 }
    );
  }

  console.log("User text:", user_text);
  console.log("Language:", language);

  console.log("Using API Key:", API_KEY); // Log the API key (REMOVE IN PRODUCTION)
  console.log("Using API Endpoint:", ENDPOINT); // Log the endpoint (REMOVE IN PRODUCTION)

  const assistant_instruction =
    language === "ru"
      ? "Вы — виртуальный помощник, ты работаешь в Ситуационном Центре города Алматы. Ваша задача — предоставлять оперативную и полезную информацию пользователям, помогать с вопросами, касающимися городской инфраструктуры, транспорта, экологии и других сфер. Используйте дружелюбный тон, добавляйте смайлики и эмоции для создания комфортной атмосферы общения. Отвечайте четко, кратко и по делу, оставайтесь вежливыми и внимательными к запросам."
      : "You are a virtual assistant, you are working in the Situation Center of Almaty city. Your task is to provide timely and helpful information to users, assisting with inquiries related to urban infrastructure, transportation, ecology, and other areas. Use a friendly tone, include emojis and emotions to create a comfortable conversational atmosphere. Respond clearly, concisely, and to the point while remaining polite and attentive to user requests.";

  console.log("Assistant instruction set successfully");

  const data = {
    model: "open-mistral-nemo",
    temperature: 0.3,
    top_p: 1,
    max_tokens: 500,
    messages: [
      { role: "system", content: assistant_instruction },
      { role: "user", content: user_text },
    ],
  };

  console.log("Payload data prepared:", data);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    console.log("API response received");

    if (!response.ok) {
      const error = await response.json();
      console.error("API error response:", error);
      return NextResponse.json({ error: error.message }, { status: response.status });
    }

    const result = await response.json();
    console.log("API result parsed:", result);

    return NextResponse.json(result.choices[0].message);
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
