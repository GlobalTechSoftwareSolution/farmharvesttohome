import { NextResponse } from "next/server";
import { supabase } from '@/app/lib/supabaseClient';

// POST -> Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Example: expect { location, status }
    const { location, status } = body;

    // Generate a unique order_id (ORD123456)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD${randomNum}`;

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          order_id: orderId,
          location,
          status: status || "ordered",
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET -> Fetch latest order
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, order: data[0] || null });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
