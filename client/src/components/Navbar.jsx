export default function Navbar() {
  return (
    <header className="bg-white border-b mb-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/feed")}
          className="flex items-center gap-2 cursor-pointer">
          <img src="/image.png" alt="InstaMini" className="w-7 h-7" />
          <span className="text-lg font-semibold">InstaMini</span>
        </div>
      </div>
    </header>
  );
}
