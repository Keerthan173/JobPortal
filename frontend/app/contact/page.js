"use client"
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-lg mb-6 text-gray-300">
          Have questions or need support? We’d love to hear from you!  
          Reach out using the details below:
        </p>

        <div className="space-y-4">
          <p><span className="font-semibold text-blue-400">📧 Email:</span> support@hirehub.com</p>
          <p><span className="font-semibold text-blue-400">📞 Phone:</span> +91 ***** *****</p>
          <p><span className="font-semibold text-blue-400">📍 Address:</span> Mangalore, India</p>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Our team will get back to you within 24–48 hours.
        </p>
      </div>
    </div>
  );
}