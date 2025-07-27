import { prisma } from "@/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`✅ Webhook received: ID ${id}, Type ${eventType}`);
    console.log("📦 Full payload:", evt.data);

    if (eventType === "user.created") {
      const { id, username, email_addresses, image_url } = evt.data;
      const email = email_addresses[0]?.email_address ?? "";

      // Check if user with same email or username already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username: username ?? "" }],
        },
      });

      if (existingUser) {
        console.log("❗ User already exists:", {
          email: existingUser.email,
          username: existingUser.username,
        });
        return new Response(
          `User with email "${existingUser.email}" or username "${existingUser.username}" already exists.`,
          { status: 400 }
        );
      }

      // Create user if not exists
      await prisma.user.create({
        data: {
          id,
          username: username ?? "",
          email,
          img: image_url ?? "",
        },
      });

      return new Response("User created", { status: 200 });
    }
    if (eventType === "user.deleted") {
      await prisma.user.delete({ where: { id } });
      return new Response("User deleted", { status: 200 });
    }

    return new Response("Event type not handled", { status: 200 });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
