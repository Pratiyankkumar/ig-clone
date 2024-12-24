import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Feed from "./components/Feed";
import ExplorePage from "./components/Explore";
import MessagesPage from "./components/Message";
import Profile from "./pages/Profile";
import { MainProvider } from "./Contexts/MainContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { UiProvider } from "./Contexts/UiContext";

// import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <UiProvider>
                  <HomePage />
                </UiProvider>
              }
            >
              <Route index element={<Feed />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="reels" element={<p>reels</p>} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="notifications" element={<p>notifications</p>} />
              <Route path="profile/:id" element={<Profile />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<p>Page not found :(</p>} />
          </Routes>
        </AuthProvider>
      </MainProvider>
    </BrowserRouter>
  );
}
// function App() {
//   return <ImageUpload />;
// }

export default App;
