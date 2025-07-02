const Overlay = () => {
  return (
    <div className="w-full h-full text-white flex items-center justify-center flex-col z-10">
      <h2 className="text-lg tracking-widest mb-2">Welcome</h2>
      <h1 className="text-5xl font-bold">
        <span className="text-[#FFCB98]">LogiX</span> HAS ARRIVED
      </h1>
      <button className="mt-6 px-6 py-2 border border-[#FFCB98] hover:bg-[#efb984] transition">DISCOVER</button>
    </div>
  );
};

export default Overlay;