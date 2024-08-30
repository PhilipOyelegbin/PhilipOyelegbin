import Feedback from "@/app/(models)/Feedback";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const feedbackData = await Feedback.findByIdAndUpdate(id, body);
    return NextResponse.json(
      { message: "Feedback updated succesfully", feedbackData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const feedbackData = await Feedback.findById(id);
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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Feedback.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Feedback deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
