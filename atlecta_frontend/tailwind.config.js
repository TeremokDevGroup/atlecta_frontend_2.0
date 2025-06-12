/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/LoginForn.tsx",
    "./src/components/RegisterForm.tsx",
    "./src/components/YandexMap.tsx",
    "./src/components/MapForm.tsx",
    "./src/components/PlacemarkSidebar.tsx",
    "./src/components/ProfileForm.tsx",
    "./src/components/UserCard.tsx",
    "./src/components/Navbar.tsx",
    "./src/components/MapFilter.tsx",
    "./src/components/UserFilter.tsx",
    //pages
    "./src/pages/YandexMapPage.tsx",
    "./src/pages/Chat.tsx",
    "./src/pages/ProfilePage.tsx",
    "./src/pages/LoginPage.tsx",
    "./src/pages/RegisterPage.tsx",
    "./src/pages/UserProfilePage.tsx",
    "./src/pages/FeedPage.tsx",
    "./src/pages/NotFound.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
