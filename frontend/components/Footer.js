export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-lg font-bold text-white">HireHub</h2>

        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>

        <p className="text-sm mt-3 md:mt-0">© 2025 HireHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
