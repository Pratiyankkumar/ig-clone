import { X } from "lucide-react";

function Search() {
  return (
    <div className="flex flex-col p-4 w-full max-w-[800px]">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-lg py-2 px-4 pr-10"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold">Recent</h2>
        <div className="text-gray-500 text-sm py-8 text-center">
          No recent searches.
        </div>
      </div>
    </div>
  );
}

export default Search;
