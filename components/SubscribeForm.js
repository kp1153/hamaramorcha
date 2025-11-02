"use client";

import { useState } from "react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus(data.error || "error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 mb-6">
      <h3 className="text-white font-bold text-lg mb-2">
        नई खबरें सीधे अपने Email पर पाएं!
      </h3>
      <p className="text-white text-sm mb-4">
        सब्सक्राइब करें और हर नई पोस्ट की सूचना पाएं
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="अपना Email डालें"
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {loading ? "Subscribe हो रहा है..." : "Subscribe करें"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-white mt-3 text-sm font-semibold">
          ✅ सब्सक्रिप्शन सफल रहा!
        </p>
      )}
      {status === "Already subscribed" && (
        <p className="text-yellow-200 mt-3 text-sm">
          ⚠️ आप पहले से सब्सक्राइब हैं
        </p>
      )}
      {status === "error" && (
        <p className="text-red-200 mt-3 text-sm">
          ❌ कुछ गड़बड़ हुई, फिर से कोशिश करें
        </p>
      )}
    </div>
  );
};

export default SubscribeForm;
