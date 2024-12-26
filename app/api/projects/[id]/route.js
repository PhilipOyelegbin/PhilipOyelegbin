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
    const body = await req.json();
    const projectData = await Project.findById(id);
    if (!projectData) {
      throw new Error("Project with the provided ID does not exist.");
    }

    let coverImage = projectData.cover_image || null;

    const formData = await req.formData();
    const file = formData.get("cover_image");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!file) {
      throw new Error("No file uploaded");
    }

    // If a new file is provided, handle the image upload and deletion
    if (file) {
      // Upload the new image
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: file.name,
          Body: buffer,
          ContentType: file.type,
        })
      );

      // Delete the old image from Cloudflare R2 if it exists
      if (coverImage) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: coverImage,
          })
        );
      }

      // Update the movie image filename
      coverImage = file.name;
    }

    const jsonData = formDataToJson(formData);

    const projectUpdate = await Project.findByIdAndUpdate(id, {
      cover_image: coverImage,
      ...jsonData,
    });
    return NextResponse.json(
      { message: "Project sent succesfully", projectUpdate },
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
    if (!projectData) {
      return NextResponse.json(
        { message: "Project with the provided ID does not exit" },
        { status: 404 }
      );
    }

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

function formDataToJson(formData) {
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  return jsonData;
}
