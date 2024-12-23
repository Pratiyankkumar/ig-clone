/* eslint-disable react/prop-types */
import { SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ModernLoader } from "./ModernLoader";
import UserDetails from "./UserDetails";

const token = localStorage.getItem("accessToken");

export default function SearchUsers({ searchIsOpen, setSearchIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const searchCache = useRef(new Map());

  useEffect(() => {
    const abortController = new AbortController();

    const debounceTimer = setTimeout(async () => {
      if (query.length >= 2) {
        // Check cache first
        if (searchCache.current.has(query)) {
          setUsers(searchCache.current.get(query));
          return;
        }

        setIsLoading(true);
        try {
          const usersReq = await fetch(
            `http://localhost:5000/user/search/${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              signal: abortController.signal,
            }
          );
          const data = await usersReq.json();
          setUsers(data.users);
          // Cache the results
          searchCache.current.set(query, data.users);

          // Limit cache size to prevent memory issues
          if (searchCache.current.size > 100) {
            const firstKey = searchCache.current.keys().next().value;
            searchCache.current.delete(firstKey);
          }
        } catch (error) {
          if (error.name === "AbortError") return;
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [query]);

  return (
    <div
      className={`w-[400px]  h-full bg-white shadow-md fixed top-0 overflow-auto 
      transition-all duration-300 ease-in-out
      ${searchIsOpen ? "left-64 opacity-100" : "-left-[400px] opacity-0"}
      flex flex-col rounded-e-lg`}
    >
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold ml-[30px] mt-4">Search</p>
        <X
          onClick={() => setSearchIsOpen(false)}
          className="w-6 h-6 mt-4 mr-4 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center pb-4 border-b-[#EFEFEF] border-b-[2px]">
        <div className="relative">
          <SearchIcon className="absolute top-[52px] left-2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-[350px] mt-10 bg-[#EFEFEF] rounded-lg py-2 px-8 pr-10 
            transition-all duration-300 focus:ring-2 focus:ring-gray-300 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <X
            className="absolute top-[52px] cursor-pointer right-2 w-4 h-4 text-gray-400 
          hover:scale-110 transition-transform"
            onClick={() => setQuery("")}
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {isLoading && <ModernLoader />}
        {users.length === 0 && <p className="ml-[30px]">No Recent Searches</p>}
        {users.map((user) => (
          <UserDetails
            user={user}
            setSearchIsOpen={setSearchIsOpen}
            key={user._id}
          />
        ))}
      </div>
    </div>
  );
}
