import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");
  const includeTracking = searchParams.get("include") === "tracking";

  if (!user_id && !email) {
    return NextResponse.json(
      { error: "Missing user_id or email" },
      { status: 400 }
    );
  }

  let query = supabase.from("orders").select("*");

  if (user_id && email) {
    // ✅ Correct OR syntax
    query = query.or(`user_id.eq.${user_id},email.eq.${email}`);
  } else if (user_id) {
    query = query.eq("user_id", user_id);
  } else if (email) {
    query = query.eq("email", email);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ✅ Parse items if stored as string
  let parsed = (data || []).map((order: any) => ({
    ...order,
    items:
      typeof order.items === "string" ? JSON.parse(order.items) : order.items,
  }));

  // ✅ If include=tracking, fetch tracking route for each order
  if (includeTracking && parsed.length > 0) {
    const orderIds = parsed.map((o) => o.id);

    const { data: trackingData, error: trackingError } = await supabase
      .from("tracking")
      .select("*")
      .in("order_id", orderIds)
      .order("timestamp", { ascending: true });

    if (trackingError) {
      return NextResponse.json(
        { error: trackingError.message },
        { status: 500 }
      );
    }

    parsed = parsed.map((order) => ({
      ...order,
      tracking: trackingData.filter((t) => t.order_id === order.id),
    }));
  }

  return NextResponse.json(parsed);
}
