// PrivacyPolicy.jsx

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold text-black">Hanger</span>! 
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our ecommerce platform to purchase clothing and accessories.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Personal details like name, email address, phone number, and shipping address</li>
            <li>Payment information (securely processed through trusted payment gateways)</li>
            <li>Purchase history and preferences</li>
            <li>Device and browsing information (cookies, IP address, etc.)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To process and deliver your orders</li>
            <li>To communicate with you regarding updates, promotions, and offers</li>
            <li>To improve our services and provide a better shopping experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Protect Your Information</h2>
          <p className="text-gray-600">
            We use secure servers, encryption, and strict access controls to protect your personal data.
            However, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and protect your devices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sharing of Information</h2>
          <p className="text-gray-600">
            We do not sell your personal information. We may share it with trusted partners (like payment gateways and delivery services) solely for fulfilling your orders and improving our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of the data we hold about you</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or concerns about our Privacy Policy, feel free to contact us at 
            <a href="mailto:support@hanger.com" className="text-blue-600 hover:underline ml-1">
              support@hanger.com
            </a>.
          </p>
        </section>

        <div className="mt-12 text-sm text-gray-500 text-center">
          Last updated: April 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
