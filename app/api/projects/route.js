import Project from "@/app/(models)/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const projectData = await Project.create(body);
    return NextResponse.json(
      { message: "Project saved succesfully", projectData },
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
    const projectData = await Project.find();
    return NextResponse.json(
      { message: "Project received succesfully", projectData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
