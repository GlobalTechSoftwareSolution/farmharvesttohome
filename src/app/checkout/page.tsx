"use client";

import { useEffect, useMemo, useState } from "react";
import { readCartFromStorage, clearCartFromStorage } from "@/app/lib/cart";
import { openWhatsAppPrefill } from "@/app/lib/whatsapp";
import type { CartItem } from "@/app/types/cart";

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

// Initial form state to reuse for resetting
const initialFormState = {
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "Karnataka",
  postcode: "",
  notes: "",
  paymentMethod: "cod",
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState<Form>(initialFormState);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setCart(readCartFromStorage());
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.quantity, 0),
    [cart]
  );

  const total = subtotal;
  const shippingLabel = "Local pickup";

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.postcode) {
      alert("Please fill in all required fields.");
      return;
    }

    // Show confirmation popup instead of immediately opening WhatsApp
    setShowPopup(true);
  }

  function confirmOrder() {
    setShowPopup(false);
    openWhatsAppPrefill(cart, { ...form, total });
    
    // Clear the cart and form data
    clearCartFromStorage();
    setCart([]);
    setForm(initialFormState);
    setOrderPlaced(true);
  }

  // If order is placed, show success message
  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your details and will contact you shortly on WhatsApp to confirm your order.
          </p>
          <button 
            onClick={() => setOrderPlaced(false)}
            className="bg-black text-white py-2 px-6 rounded"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* LEFT: Form */}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <h2 className="text-3xl font-bold">Contact</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={onChange}
          className="w-full border rounded p-3"
          required
        />

        <h2 className="text-2xl font-bold">Billing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full name *"
            value={form.fullName}
            onChange={onChange}
            className="border rounded p-3"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            value={form.phone}
            onChange={onChange}
            className="border rounded p-3"
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="House number and street name *"
          value={form.address}
          onChange={onChange}
          className="w-full border rounded p-3"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="Town / City *"
            value={form.city}
            onChange={onChange}
            className="border rounded p-3"
            required
          />
          <select
            name="state"
            value={form.state}
            onChange={onChange}
            className="border rounded p-3"
          >
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
          </select>
          <input
            type="text"
            name="postcode"
            placeholder="Postcode / ZIP *"
            value={form.postcode}
            onChange={onChange}
            className="border rounded p-3"
            required
          />
        </div>

        <textarea
          name="notes"
          placeholder="Notes about your order (optional)"
          value={form.notes}
          onChange={onChange}
          className="w-full border rounded p-3"
        />

        <h2 className="text-2xl font-bold">Shipping</h2>
        <p className="border rounded p-3 bg-gray-50">{shippingLabel}</p>

        <h2 className="text-2xl font-bold">Payment</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2 border p-3 rounded">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={onChange}
            />
            Cash on Delivery
          </label>
          {/* Razorpay option commented out as in original */}
        </div>

        <button
          type="submit"
          disabled={!cart.length}
          className="w-full bg-black text-white py-3 rounded text-lg font-semibold disabled:opacity-60"
        >
          Place Order · ₹{total.toFixed(2)}
        </button>
      </form>

      {/* RIGHT: Order Summary */}
      <div className="border rounded p-4 space-y-4 bg-white md:mt-10">
        <h2 className="text-2xl font-bold">Your Order</h2>

        {!cart.length ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size ?? "def"}`}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.size ? `Size: ${item.size} · ` : ""}
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-3">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingLabel}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

            <p className="mb-3">👤 {form.fullName}</p>
            <p className="mb-3">📞 {form.phone}</p>
            <p className="mb-3">🏡 {form.address}, {form.city}, {form.state} - {form.postcode}</p>

            <h3 className="font-semibold mb-2">🛍️ Items</h3>
            <ul className="mb-3 space-y-1 text-sm">
              {cart.map((it, i) => (
                <li key={i}>
                  {i + 1}) {it.name} x {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <p className="font-bold">💰 Total: ₹{total.toFixed(2)}</p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                OK ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}