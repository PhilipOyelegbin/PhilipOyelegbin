import Project from "@/app/(models)/Project";
import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_PRIVATE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function PATCH(req, { params }) {
  try {
    const { id } = params;

    // Find the existing project
    const projectData = await Project.findById(id);
    if (!projectData) {
      throw new Error("Project with the provided ID does not exist.");
    }

    let coverImage = projectData.cover_image || null;

    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("cover_image");
    let buffer;

    if (file && typeof file.arrayBuffer === "function") {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);

      // Enforce file size limit (1MB)
      if (buffer.length > 1024 * 1024) {
        throw new Error("File size exceeds 1MB limit.");
      }

      // Upload the new image
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: file.name,
          Body: buffer,
        })
      );

      // Delete the old image if it exists
      if (coverImage) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: coverImage,
          })
        );
      }

      // Update the cover image filename
      coverImage = file.name;
    }

    // Convert the remaining form data to JSON
    const jsonData = formDataToJson(formData);

    // Update the project with new data
    const projectUpdate = await Project.findByIdAndUpdate(
      id,
      {
        cover_image: coverImage,
        title: jsonData.title,
        description: jsonData.description,
        tag: jsonData.tag,
        project_url: jsonData.project_url,
        github_url: jsonData.github_url,
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      { message: "Project updated successfully", projectUpdate },
      { status: 202 }
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
    if (!projectData) {
      return NextResponse.json(
        { message: "Project with the provided ID does not exit" },
        { status: 404 }
      );
    }
    const cover_image = `${process.env.R2_PUBLIC_ENDPOINT}/${projectData.cover_image}`;

    return NextResponse.json(
      {
        message: "Project received succesfully",
        projectData: {
          _id: projectData.id,
          cover_image,
          title: projectData.title,
          description: projectData.description,
          tag: projectData.tag,
          project_url: projectData.project_url,
          github_url: projectData.github_url,
          createdAt: projectData.createdAt,
          updatedAt: projectData.updatedAt,
        },
      },
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

    if (!projectData) {
      return NextResponse.json(
        { message: "Project with the provided ID does not exit" },
        { status: 404 }
      );
    }

    // delete the image from the block storage
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: projectData.cover_image,
      })
    );

    return NextResponse.json(
      { message: "Project deleted succesfully" },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}

function formDataToJson(formData) {
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  return jsonData;
}
