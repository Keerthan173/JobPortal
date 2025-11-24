"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 px-7">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Connect with top employers and discover opportunities that match
            your skills
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-7 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose Our Job Portal?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-blue-400 text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Thousands of Jobs
              </h3>
              <p className="text-gray-400">
                Access thousands of job listings from top companies across
                various industries
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-blue-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Easy Application
              </h3>
              <p className="text-gray-400">
                Apply to multiple jobs with one click. Save time with our
                streamlined process
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-blue-500 transition">
              <div className="text-blue-400 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Smart Matching
              </h3>
              <p className="text-gray-400">
                Get personalized job recommendations based on your skills and
                preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-7 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-blue-200">
            Join thousands of job seekers who found their dream job through our
            platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/signup")}
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Create Account
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-md font-semibold hover:bg-blue-400 hover:text-white transition"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
