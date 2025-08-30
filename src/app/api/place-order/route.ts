// app/api/place-order/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order } = body;

    if (!order) {
      return NextResponse.json({ error: "No order data" }, { status: 400 });
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.customer_details.email,
      subject: "Your order has been placed!",
      html: `
        <h2>Thank you for your order, ${order.customer_details.name}!</h2>
        <p>Order Total: ₹${order.total}</p>
        <p>We will contact you shortly.</p>
      `,
    });

    // Email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "farmharvesttohome@gmail.com", // replace with your email
      subject: `New Order from ${order.customer_details.name}`,
      html: `
        <h2>New Order Received</h2>
        <p>Total: ₹${order.total}</p>
        <p>Customer: ${order.customer_details.name}</p>
        <p>Email: ${order.customer_details.email}</p>
        <p>Phone: ${order.customer_details.phone}</p>
        <p>Address: ${order.customer_details.address}, ${order.customer_details.city}, ${order.customer_details.state} - ${order.customer_details.postcode}</p>
        <p>Items: ${order.items.map((i: any) => `${i.name} x ${i.qty}`).join(", ")}</p>
      `,
    });

    return NextResponse.json({ message: "Emails sent" }, { status: 200 });
  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
