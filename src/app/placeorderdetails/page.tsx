"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { FaArrowLeft, FaCheckCircle, FaWhatsapp, FaShoppingBag, FaHeadset } from "react-icons/fa";
import { FiPackage, FiUser, FiCalendar, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import Image from "next/image";

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  size?: string;
}

interface Order {
  id: number;
  order_id: string;
  full_name: string;
  created_at: string;
  items?: OrderItem[];
  total?: number;
  image?: string;
}

export default function PlaceOrderDetails() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching order:", error.message);
          setError("Failed to load order details. Please try again.");
        } else if (data && data.length > 0) {
          let latestOrder = data[0] as Order;

          // Ensure full_name is always set
          if (!latestOrder.full_name && user) {
            latestOrder.full_name =
              (user.user_metadata?.full_name as string) ||
              user.email ||
              "Guest User";
          }

          setOrder(latestOrder);
        } else {
          setError("No order found.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Loading your order
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch your order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error || "No order found."}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <div className="text-sm text-gray-500 font-medium">
            Order Confirmation
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <FaCheckCircle className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-blue-100">
              Thank you for your purchase. We've sent a confirmation to your
              email.
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order Summary
                </h2>
                <p className="text-gray-500 text-sm">
                  Order #ORD{order.id.toString().padStart(4, "0")}
                </p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmed
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FiUser className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium text-gray-800">
                      {order.full_name || user?.user_metadata?.full_name || user?.email || "Guest User"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FiCalendar className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date & Time</p>
                    <p className="font-medium text-gray-800">
                      {new Date(order.created_at).toLocaleString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Items Ordered</h3>

              <div className="space-y-3">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-lg w-10 h-10 flex items-center justify-center mr-3 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <FiPackage className="text-gray-400 text-2xl" />
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} {item.size ? `(${item.size})` : ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-800">
                    ₹{order.total?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Notification */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3 flex-shrink-0">
                  <FaWhatsapp className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    Updates via WhatsApp
                  </p>
                  <p className="text-xs text-gray-600">
                    You'll receive order updates on WhatsApp including shipping
                    notifications and delivery updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            What happens next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">
                  Order Processing
                </p>
                <p className="text-sm text-gray-600">
                  We'll prepare your order for shipment within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Shipping</p>
                <p className="text-sm text-gray-600">
                  Your order will be shipped with tracking information sent to
                  you.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">Delivery</p>
                <p className="text-sm text-gray-600">
                  Expect your delivery within 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Need help with your order?
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Our customer support team is here to help with any questions about
            your order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:+919844281875"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <FaHeadset className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Contact Support
                  </p>
                  <p className="text-xs text-gray-500">Get help with your order</p>
                </div>
              </div>
              <FiChevronRight className="text-gray-400" />
            </a>

            <a
              href="https://wa.me/919844281875?text=Hi%20I%20need%20help%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <FaWhatsapp className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    WhatsApp Chat
                  </p>
                  <p className="text-xs text-gray-500">Message us directly</p>
                </div>
              </div>
              <FiChevronRight className="text-gray-400" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/orderhistory")}
            className="py-3 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            View Order History
          </button>
          <button
            onClick={() => router.push("/shop")}
            className="py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
          >
            <FaShoppingBag className="mr-2" /> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
