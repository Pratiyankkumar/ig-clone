import LeftSidebar from "../components/LeftSidebar";
import Search from "../components/Search";

function SearchPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <LeftSidebar />
      <Search />
    </div>
  );
}

export default SearchPage;
