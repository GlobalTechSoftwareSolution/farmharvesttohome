export default function ShippingPolicy() {
  return (
    <main className="p-8 max-w-4xl mx-auto text-gray-800">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Shipping Policy
        </h1>
        <p className="text-lg text-gray-600">
          Effective Date: January 1, 2025
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8">
        <p className="leading-relaxed">
          At <span className="font-semibold">Farm Harvest To Home</span>, we aim
          to deliver your products quickly and in excellent condition. This
          policy explains our shipping process and timelines.
        </p>
      </section>

      {/* Shipping Timelines */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Delivery Timelines</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Orders are processed within{" "}
            <span className="font-semibold">24–48 hours</span> of confirmation.
          </li>
          <li>
            Standard delivery time is{" "}
            <span className="font-semibold">3–7 business days</span> depending
            on your location.
          </li>
          <li>
            For remote or rural areas, additional shipping time may be required.
          </li>
        </ul>
      </section>

      {/* Shipping Charges */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Shipping Charges</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Free shipping is available for orders above{" "}
            <span className="font-semibold">₹499</span>.
          </li>
          <li>
            A flat shipping fee of{" "}
            <span className="font-semibold">₹50</span> applies to orders below
            the free shipping limit.
          </li>
        </ul>
      </section>

      {/* Tracking */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
        <p>
          Once shipped, you will receive an email or SMS with your tracking
          details. You can track your order directly through the FarmHarvestToHome
          website.
        </p>
      </section>

      {/* Contact Info */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about shipping, feel free to contact our
          support team:
        </p>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:farmharvesttohome@gmail.com"
              className="text-blue-600 underline"
            >
              farmharvesttohome@gmail.com
            </a>
          </p>
          <p>📞 Phone: +91-9844281875</p>
          <p>
            🏢 Address: No 10, 4th Floor, Gaduniya Complex, Ramaiah Layout,
            Vidyaranyapura, Bangalore - 560097
          </p>
        </div>
      </section>
    </main>
  );
}
