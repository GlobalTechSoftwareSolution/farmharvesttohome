import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { order } = req.body;

  if (!order) return res.status(400).json({ error: "No order data" });

  try {
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
        <p>Items: ${order.items.map(i => `${i.name} x ${i.qty}`).join(", ")}</p>
      `,
    });

    res.status(200).json({ message: "Emails sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send emails" });
  }
}