import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import UserFilter from "../components/UserFilter";
import { getFilteredUsers } from "../services/userService";
import { UserProfile } from "../types/user";

const FeedPage = () => {
  const [usersData, setUsersData] = useState<UserProfile[]>([]);
  const [filters, setFilters] = useState<{ sports?: string[]; orderBy?: string[] }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFilteredUsers(filters)
      .then((data) => setUsersData(data))
      .catch(console.error);
  }, [filters]);

  const handleApplyFilters = (newFilters: { sports?: string[]; orderBy?: string[] }) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({});
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white min-h-screen w-full pt-14">
      <div className="px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-900">ЛЕНТА</h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Фильтры
          </button>
        </div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-6">
          {usersData.length} активных пользователей
        </h2>

        <div className="grid grid-cols-7 gap-6">
          {usersData.map((user) => (
            <div key={user.user_id} className="min-w-0 flex-1">
              <UserCard
                user={user}
                onClick={() => navigate(`/profile/${user.user_id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <UserFilter
              initialFilters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;