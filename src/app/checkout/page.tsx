"use client";

import { createClient } from "@supabase/supabase-js";
import emailjs from "@emailjs/browser";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiShoppingBag, FiUser, FiPhone, FiMapPin, FiMessageSquare, FiCreditCard, FiChevronRight } from "react-icons/fi";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

type Form = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  notes: string;
  paymentMethod: "cod" | "razorpay";
};

const STORAGE_KEY = "cart";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState<Form>({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "Karnataka",
    postcode: "",
    notes: "",
    paymentMethod: "cod",
  });
    const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ---- cart storage helpers ----
  function readCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
  
  function clearCart() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }


  // ---- email notification helper ----
  async function sendEmailNotification(order: any) {
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      // Customer email
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: form.email || order.customer_details.email,
          from_name: "FarmHarvest",
          subject: "Your Order Confirmation",
          message: `
          Hi ${order.customer_details.name},
          
          Thank you for your order! Here are your details:
          
          Order Total: ₹${order.total}
          Payment: ${order.customer_details.payment}
          
          Items:
          ${order.map((i:any)=>`${i.name} (${i.size || "N/A"}) x ${i.qty} = ₹${i.price * i.qty}`).join("\n")}
          
          Delivery Address:
          ${order.customer_details.address}, ${order.customer_details.city}, ${order.customer_details.state} - ${order.customer_details.postcode}
        `,
        },
        publicKey
      );

      // Company email
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: "orders@farmharvesttohome.com",
          from_name: "FarmHarvest Website",
          subject: "New Order Received",
          message: `
          New order received!
          
          Customer: ${order.customer_details.name}
          Phone: ${order.customer_details.phone}
          Email: ${order.customer_details.email}
          
          Total: ₹${order.total}
          
          Items:
          ${order.items.map((i:any)=>`${i.name} (${i.size || "N/A"}) x ${i.qty} = ₹${i.price * i.qty}`).join("\n")}
          
          Address: ${order.customer_details.address}, ${order.customer_details.city}, ${order.customer_details.state} - ${order.customer_details.postcode}
          
          Notes: ${order.customer_details.notes || "N/A"}
        `,
        },
        publicKey
      );

    } catch (err) {
      console.error("Email notification failed:", err);
    }
  }

  // ---- effects ----
  useEffect(() => {
    setCart(readCart());
    setIsLoading(false);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.quantity, 0),
    [cart]
  );

  const total = subtotal;

  // ---- handlers ----
  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handlePlaceOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!cart.length) return alert("Your cart is empty.");
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.postcode)
      return alert("Please fill all required fields.");
    setShowPopup(true);
  }

  async function confirmOrder() {
    setShowPopup(false);

    const orderPayload = {
      user_id: form.email || form.phone,
      total: total,
      status: "pending",
      created_at: new Date().toISOString(),
      customer_details: {
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        notes: form.notes,
        payment: form.paymentMethod,
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
        size: item.size,
      })),
    };

    const { data, error } = await supabase.from("orders").insert([orderPayload]);

    if (error) {
      console.error("Order insert error:", error);
      alert("There was an error placing your order. Please try again.");
      return;
    }

    // Send email notification after successful order insert
    await sendEmailNotification(orderPayload);

    clearCart();
    setCart([]);
    setOrderPlaced(true);
  }

  // ---- UI ----
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="text-green-500 text-4xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you shortly on WhatsApp to confirm your order details.
          </p>
          <Link 
            href="/placeorderdetails"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Continue Shipping
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (cart.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <FiShoppingBag className="text-gray-400 text-4xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checking out.
          </p>
          <Link 
            href="/shop"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <FiChevronRight className="mx-2" />
          <Link href="/cart" className="hover:text-green-600">Cart</Link>
          <FiChevronRight className="mx-2" />
          <span className="text-green-600">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* LEFT: Checkout form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiUser className="mr-2 text-green-600" />
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Your phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiMapPin className="mr-2 text-green-600" />
                  Delivery Address
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Your complete address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={onChange}
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">-- Select State --</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input
                      name="postcode"
                      value={form.postcode}
                      onChange={onChange}
                      placeholder="Postal code"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiMessageSquare className="mr-2 text-green-600" />
                  Order Notes
                </h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={onChange}
                  placeholder="Any special instructions for your order..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiCreditCard className="mr-2 text-green-600" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === "cod"}
                      onChange={onChange}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <div className="ml-3">
                      <span className="block font-medium">Cash on Delivery</span>
                      <span className="block text-sm text-gray-500">Pay when you receive your order</span>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={form.paymentMethod === "razorpay"}
                      onChange={onChange}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <div className="ml-3">
                      <span className="block font-medium">Razorpay</span>
                      <span className="block text-sm text-gray-500">Pay securely with Razorpay</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT: Order summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center border-b pb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image || "/placeholder-product.jpg"} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                        {item.size && <p className="text-sm text-gray-500">{item.size}</p>}
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-medium text-green-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-scale-in">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center">
                <FiUser className="text-gray-500 mr-2" />
                <span>{form.fullName}</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="text-gray-500 mr-2" />
                <span>{form.phone}</span>
              </div>
              {form.email && (
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📧</span>
                  <span>{form.email}</span>
                </div>
              )}
              <div className="flex items-start">
                <FiMapPin className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                <span>{form.address}, {form.city}, {form.state} - {form.postcode}</span>
              </div>
              {form.notes && (
                <div className="flex items-start">
                  <FiMessageSquare className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Notes: {form.notes}</span>
                </div>
              )}
              <div className="flex items-center">
                <FiCreditCard className="text-gray-500 mr-2" />
                <span>Payment: {form.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"}</span>
              </div>
            </div>

            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="mb-4 max-h-40 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="text-sm py-1 border-b last:border-b-0">
                  {i + 1} {item.name}{item.size ? ` (${item.size})` : ''} x {item.quantity} = ₹
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span className="text-green-600">₹{total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmOrder}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}