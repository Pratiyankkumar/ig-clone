function Stories() {
  return (
    <div className="border-b px-4 py-4 overflow-x-auto">
      <div className="flex gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-pink-500 ring-offset-2">
              <img
                src={`/placeholder.svg?height=64&width=64`}
                alt={`User ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs">user_{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
