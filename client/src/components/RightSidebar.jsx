function RightSidebar() {
  return (
    <div className="hidden w-80 flex-col gap-4 p-4 lg:flex">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=48&width=48"
            alt="PR"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">pratiyank_</p>
          <p className="text-sm text-gray-500">Pratiyank</p>
        </div>
        <button className="text-sm text-blue-500 hover:underline">
          Switch
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Suggested for you
        </span>
        <button className="text-xs font-medium text-gray-900 hover:underline">
          See All
        </button>
      </div>

      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              src={`/placeholder.svg?height=32&width=32`}
              alt={`Suggested User ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">suggested_user_{i + 1}</p>
            <p className="text-xs text-gray-500">Followed by user_{i + 1}</p>
          </div>
          <button className="text-xs text-blue-500 hover:underline">
            Follow
          </button>
        </div>
      ))}

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            Press
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
        <p className="text-xs text-gray-500">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}

export default RightSidebar;
