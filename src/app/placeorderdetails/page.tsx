"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { FaArrowLeft, FaBoxOpen, FaCheckCircle, FaWhatsapp, FaShoppingBag } from "react-icons/fa";
import { FiPackage, FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Order {
  id: number;
  order_id: string;
  full_name: string;
  created_at: string;
}

export default function PlaceOrderDetails() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

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
          let latestOrder = data[0];

          if (!latestOrder.full_name && user) {
            latestOrder.full_name = user.fullName || user.username || "Guest User";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <p className="text-gray-500 mt-4">Fetching your order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || "No order found."}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const { date, time } = formatDate(order.created_at);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <div className="text-sm text-gray-500">Order Details</div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 p-3 rounded-full">
                <FaCheckCircle className="text-3xl" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-1">Order Confirmed!</h1>
            <p className="text-white/90">Thank you for your purchase</p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                <p className="text-gray-500 text-sm">We'll contact you shortly on WhatsApp</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Confirmed
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaShoppingBag className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-800">ORD{order.id.toString().padStart(4, "0")}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <FiUser className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium text-gray-800">{order.full_name}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <FiCalendar className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium text-gray-800">{date}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FiClock className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Time</p>
                  <p className="font-medium text-gray-800">{time}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center bg-green-50 rounded-lg p-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaWhatsapp className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Updates via WhatsApp</p>
                  <p className="text-xs text-gray-600">You'll receive order updates on WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <FiPackage className="mr-2 text-blue-600" /> What happens next?
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
              </div>
              <p className="text-sm text-gray-600">We'll prepare your order for shipment</p>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
              </div>
              <p className="text-sm text-gray-600">You'll receive a confirmation message on WhatsApp</p>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</div>
              </div>
              <p className="text-sm text-gray-600">Your order will be shipped within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}