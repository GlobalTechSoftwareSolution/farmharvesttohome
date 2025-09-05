import React from "react";

export default function CancellationRefunds() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with decorative elements */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 Z" fill="white"></path>
            </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Cancellation & Refunds Policy
            </h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-8 md:p-10">
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              At{" "}
              <span className="font-semibold text-green-700">
                Farm Harvest To Home
              </span>
              , we strive to provide the highest quality farm-fresh products to
              our valued customers. We understand that sometimes circumstances
              change, and we've designed our cancellation and refund policy to
              be fair and transparent.
            </p>
          </section>

          {/* Cancellation Policy */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Cancellation Policy
              </h2>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    1
                  </span>
                  <p className="text-gray-700">
                    Orders can be cancelled within{" "}
                    <span className="font-semibold text-green-700">
                      24 hours of placement
                    </span>{" "}
                    or before they are processed for shipment.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    2
                  </span>
                  <p className="text-gray-700">
                    Once an order has been shipped, it cannot be cancelled. You
                    may request a return or refund as per our policy below.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    3
                  </span>
                  <p className="text-gray-700">
                    To cancel an order, please email us at{" "}
                    <a
                      href="mailto:farmharvesttohome@gmail.com"
                      className="text-green-700 font-medium underline hover:text-green-800 transition-colors"
                    >
                      farmharvesttohome@gmail.com
                    </a>{" "}
                    with your order details. Please include your order number
                    for faster processing.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Refund Policy</h2>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-amber-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    1
                  </span>
                  <p className="text-gray-700">
                    Refund requests must be initiated within{" "}
                    <span className="font-semibold text-amber-700">
                      5 days of delivery
                    </span>
                    .
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    2
                  </span>
                  <p className="text-gray-700">
                    Refunds are processed to the{" "}
                    <span className="font-semibold text-amber-700">
                      original payment method only
                    </span>
                    .
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    3
                  </span>
                  <p className="text-gray-700">
                    Refunds typically take{" "}
                    <span className="font-semibold text-amber-700">
                      5–7 business days
                    </span>{" "}
                    to reflect in your account, depending on your bank's
                    processing time.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    4
                  </span>
                  <p className="text-gray-700">
                    Due to their perishable nature, fresh farm products are{" "}
                    <span className="font-semibold text-amber-700">
                      non-refundable
                    </span>{" "}
                    unless there is a quality issue or defect. In case of
                    quality concerns, please contact us with photos of the
                    product within 24 hours of delivery.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Return Process
              </h2>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    1
                  </span>
                  <p className="text-gray-700">
                    For eligible returns, we will provide a prepaid return label
                    or arrange for pickup of the products.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    2
                  </span>
                  <p className="text-gray-700">
                    Products must be returned in their original packaging and in
                    saleable condition.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    3
                  </span>
                  <p className="text-gray-700">
                    Once we receive and inspect the returned items, we will
                    process your refund within 3-5 business days.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">
                If you have any questions regarding our cancellation or refund
                policies, please don't hesitate to contact our customer support
                team:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:farmharvesttohome@gmail.com"
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      farmharvesttohome@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:+919844281875"
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      +91-9844281875
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm md:col-span-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-700">
                      No 10, 4th Floor, Gaduniya Complex, Ramaiah Layout,
                      Vidyaranyapura, Bangalore - 560097
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Our customer support team is available Monday to Saturday,
                  10:00 AM to 6:00 PM IST. We typically respond to all inquiries
                  within 24 hours.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
