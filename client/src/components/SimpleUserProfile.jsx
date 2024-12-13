import { Camera, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

function SimpleUserProfile() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-400" />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl">pratiyank_</h1>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-primary text-white rounded-md text-sm font-medium">
                Follow
              </button>
              <button className="px-4 py-1.5 bg-gray-100 rounded-md text-sm font-medium">
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4">
            <div>
              <span className="font-semibold">0</span> posts
            </div>
            <div>
              <span className="font-semibold">29</span> followers
            </div>
            <div>
              <span className="font-semibold">64</span> following
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">Pratiyank</h2>
            <a
              href="https://github.com/Pratiyankkumar"
              className="text-blue-600 hover:underline"
            >
              https://github.com/Pratiyankkumar
            </a>
          </div>
        </div>
      </div>

      {/* New Post Button */}
      <div className="mb-8">
        <button className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gray-50 hover:bg-gray-100">
          <Plus className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">New</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-t">
        <div className="flex justify-center gap-12">
          <button className="px-4 py-3 text-sm font-semibold border-t border-black -mt-px">
            POSTS
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-black mb-4">
          <Camera className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">No Posts Yet</h2>
      </div>
    </div>
  );
}

export default SimpleUserProfile;
