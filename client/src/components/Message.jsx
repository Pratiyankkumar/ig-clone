import {
  Phone,
  Video,
  Info,
  ChevronDown,
  Smile,
  Mic,
  Image,
  Heart,
} from "lucide-react";

function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Abhay Chauhan",
      message: "Abhay sent an attachment.",
      time: "7h",
      isActive: false,
      hasAttachment: true,
    },
    {
      id: 2,
      name: "PRIYANSH YADAV",
      message: "Yash",
      time: "1d",
      isActive: false,
    },
    {
      id: 3,
      name: "ADITYA RAJPUT",
      message: "Active now",
      time: "",
      isActive: true,
    },
    {
      id: 4,
      name: "Kartik Rana",
      message: "Reacted 😊 to your message",
      time: "2d",
      isActive: false,
    },
    {
      id: 5,
      name: "akshay Pal",
      message: "Active 1m ago",
      time: "",
      isActive: false,
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Bhosdike notes lga raha aur igonre kr raha chl thk hai",
      time: "Sun 13:05",
      sender: "them",
    },
    {
      id: 2,
      text: "abe ignore na mara yaar 2 min ko khola tha maine socha whatsapp par bhej dunga link phir mai khana khane chala gya dhyan se utar gyi meri",
      time: "Sun 15:00",
      sender: "you",
    },
    {
      id: 3,
      text: "phir mummy phone bhi le gyi",
      time: "Sun 15:00",
      sender: "you",
    },
    { id: 4, text: "ab mika phone", time: "Sun 15:00", sender: "you" },
  ];

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <button className="flex items-center gap-2">
            <span className="font-semibold">pratiyank_</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-4 p-4 border-b">
          <button className="font-semibold">Messages</button>
          <button className="text-gray-500">Requests</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                {chat.isActive && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-gray-500 truncate">
                  {chat.message}
                </div>
              </div>
              {chat.time && (
                <div className="text-xs text-gray-500">{chat.time}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <span className="font-semibold">PRIYANSH YADAV</span>
          </div>
          <div className="flex items-center gap-4">
            <button>
              <Phone className="h-6 w-6" />
            </button>
            <button>
              <Video className="h-6 w-6" />
            </button>
            <button>
              <Info className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "you" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "you"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "you" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
            <button>
              <Smile className="h-6 w-6 text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent outline-none"
            />
            <div className="flex items-center gap-3">
              <button>
                <Mic className="h-6 w-6 text-gray-500" />
              </button>
              <button>
                <Image className="h-6 w-6 text-gray-500" />
              </button>
              <button>
                <Heart className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
