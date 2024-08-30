import Project from "@/app/(models)/Project";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const projectData = await Project.findByIdAndUpdate(id, body);
    return NextResponse.json(
      { message: "Project sent succesfully", projectData },
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
    const projectData = await Project.findById(id);
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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const projectData = await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Project deleted succesfully", projectData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
