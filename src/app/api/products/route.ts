import { supabase } from '../../lib/supabaseClient';

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories (
          categories (
            id,
            name,
            slug
          )
        )
      `);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data ?? []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Supabase fetch error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Expect single product object or array of products

    // TypeScript fix: cast onConflict as string
    const { data, error } = await supabase
      .from('products')
      .upsert(body, { onConflict: 'id' as unknown as string });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
