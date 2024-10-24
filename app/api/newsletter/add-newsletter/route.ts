import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Newsletter from "@/models/Newsletter";
import { transporter } from "../core";

export async function POST(req: NextRequest) {
  await connectToDB();

  const requestBody = await req.json();
  const email = requestBody.email;

  if (!email) {
    return NextResponse.json(
      { error: "Email ID is required" },
      { status: 400 }
    );
  }

  try {
    // Check if the email already exists in the database
    const existingMember = await Newsletter.findOne({ email });

    if (existingMember) {
      return NextResponse.json(
        { message: "You are already a member" },
        { status: 200 }
      );
    }

    // If email does not exist, create a new entry and send a mail
    const newsletter = new Newsletter({
      email,
      status: "subscribed",
    });

    const result = await newsletter.save();

    if (result) {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Subscribed to CSK Textiles Newsletter ✔",
        text: "Subscribed",
        html: `
                <html>
                <body>
                    <h1>Subscribed to CSK Textile Newsletter</h1>
                </body>
                </html>
                `,
      });

      return NextResponse.json({
        message: "You are now a member",
        result: result,
        info: info,
        status: 200,
      });
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 400 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Error creating contact message" },
      { status: 500 }
    );
  }
}
