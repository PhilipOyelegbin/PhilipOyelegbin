import Feedback from "@/app/(models)/Feedback";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const feedbackData = await Feedback.create(body);
    return NextResponse.json(
      { message: "Feedback sent succesfully", feedbackData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbackData = await Feedback.find();
    return NextResponse.json(
      { message: "Feedback received succesfully", feedbackData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
