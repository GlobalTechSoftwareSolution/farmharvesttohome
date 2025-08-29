import { connectToDatabase } from '../../lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "100";

    const url = `${process.env.NEXT_PUBLIC_WC_API_URL}/products?per_page=${per_page}&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(
          process.env.WC_CONSUMER_KEY + ':' + process.env.WC_CONSUMER_SECRET
        ).toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'WC API error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
