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
    //pages
    "./src/pages/YandexMapPage.tsx",
    "./src/pages/ProfilePage.tsx",
    "./src/pages/LoginPage.tsx",
    "./src/pages/RegisterPage.tsx",
    "./src/pages/FeedPage.tsx",
    "./src/pages/NotFound.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
