import { NextResponse } from "next/server";

// Same mock DB
const products = [
  { id: "1", name: "Product 1", price: 100, description: "Awesome item", image: "/p1.jpg" },
  { id: "2", name: "Product 2", price: 200, description: "Cool item", image: "/p2.jpg" },
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
