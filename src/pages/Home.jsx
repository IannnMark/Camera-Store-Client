export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-black font-bold text-6xl lg:text-7xl text-center">
          Capture Every Moment
        </h1>
        <p className="font-medium text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button className="bg-black text-white px-3 py-2 rounded-sm mt-6">
          Call to Action
        </button>
        <div
          className="relative w-[1128px] h-[667px] flex justify-center items-end rounded-md"
          style={{
            backgroundImage: "url('../../images/sony_a7cr.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>
    </div>
  );
}
