import Project from "@/app/(models)/Project";
import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_PRIVATE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("cover_image");

    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // save image to R2
    const upload = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: file.name,
        Body: buffer,
        ContentType: file.type,
      })
    );

    if (!upload) {
      throw new Error("Failed to upload file");
    }

    const jsonData = formDataToJson(formData);

    // save data to database
    const projectData = await Project.create({
      cover_image: file.name,
      title: jsonData.title,
      description: jsonData.description,
      tag: jsonData.tag,
      project_url: jsonData.project_url,
      gitub_url: jsonData.gitub_url,
    });

    return NextResponse.json(
      { message: "Project saved successfully", projectData },
      { status: 201 }
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

export async function GET() {
  try {
    const projectData = await Project.find();

    const projectWithImage = projectData.map((list) => {
      const cover_image = `${process.env.R2_PUBLIC_ENDPOINT}/portfolio-buk/${list.cover_image}`;
      return {
        cover_image,
        title: list.title,
        description: list.description,
        tag: list.tag,
        project_url: list.project_url,
        github_url: list.github_url,
      };
    });

    return NextResponse.json(
      { message: "Project received succesfully", projectWithImage },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error?.message },
      { status: 500 }
    );
  }
}
