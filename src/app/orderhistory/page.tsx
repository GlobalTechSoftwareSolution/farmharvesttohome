"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

interface OrderItem {
  id: number;
  qty: number;
  name: string;
  size?: string;
  price: number;
  image?: string;
}

interface Order {
  id: number;
  user_id: string;
  created_at: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<number | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setError(null);
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw new Error(userError.message);
        if (!user) {
          setLoading(false);
          return;
        }

        setUser(user);

        // Fetch orders
        const { data, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.email)
          .order("created_at", { ascending: false });

        if (ordersError) throw new Error(ordersError.message);

        let parsed = (data || []).map((o: any) => ({
          ...o,
          items:
            typeof o.items === "string" ? JSON.parse(o.items) : o.items || [],
        }));

        // Attach product images for each order
        for (let order of parsed) {
          const productIds = order.items.map((i: any) => i.id);
          if (productIds.length > 0) {
            const { data: products } = await supabase
              .from("products")
              .select("id, image_url")
              .in("id", productIds);

            if (products) {
              order.items = order.items.map((item: any) => ({
                ...item,
                image:
                  products.find((p) => p.id === item.id)?.image_url ||
                  "/placeholder-product.jpg",
              }));
            }
          }
        }

        setOrders(parsed);
      } catch (err: any) {
        console.error("Error fetching orders:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

const handleCancelOrder = async (orderId: number) => {
  try {
    setDeletingOrder(orderId);

    // Update the row instead of deleting
    const { error } = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId);

    if (error) {
      console.error("Error cancelling order:", error);
    } else {
      // Refresh local state so UI updates
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
      );
    }
  } finally {
    setDeletingOrder(null);
  }
};



  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-200 text-white-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-green-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please <a href="/login" className="font-medium underline text-yellow-700 hover:text-yellow-600">login</a> to view your order history.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading orders: {error}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by placing your first order.</p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
        <p className="mt-1 text-sm text-gray-500 md:mt-0">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id
                      )
                    }
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Hide Details
                      </>
                    ) : (
                      <>
                        <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        View Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {expandedOrder === order.id && (
              <>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <h4 className="font-medium text-gray-700 mb-3">Items Ordered:</h4>
                  <ul className="divide-y divide-gray-200">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="py-4 flex justify-between">
                        <div className="flex items-center">
                          <img
                            src={item.image || "/placeholder-product.jpg"}
                            alt={item.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            {item.size && (
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                            )}
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">₹{item.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-lg font-bold text-gray-900 mb-3 sm:mb-0">Total: ₹{order.total}</p>
                 <button
  onClick={() => handleCancelOrder(order.id)}
  disabled={deletingOrder === order.id || order.status === "cancelled"}
  className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
    order.status === "cancelled"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed`}
>
  {deletingOrder === order.id ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Cancelling...
    </>
  ) : order.status === "cancelled" ? (
    "Cancelled"
  ) : (
    "Cancel Order"
  )}
</button>

                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}