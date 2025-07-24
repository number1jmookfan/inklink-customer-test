"use server";

export async function POST(description: string, title: string) {
  const response = await fetch("http://localhost:3000/api/request", {
    method: "POST",
    headers: {
      "x-api-key": process.env.INKLINK_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      proof_request_description: description,
      proof_title: title,
    }),
  });
  const data = await response.json();
  return [data];
}

export async function GET(url: string) {
  console.log("GEEET");
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data[0].status);
    return data.data[0].status;
  } catch {
    return "PENDING";
  }
}
