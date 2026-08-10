import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/get-word`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch word" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
