import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import UserFilter from "../components/UserFilter";
import { getFilteredUsers } from "../services/userService";
import { UserProfile } from "../types/user";

const FeedPage = () => {
  const [usersData, setUsersData] = useState<UserProfile[]>([]);
  const [filters, setFilters] = useState<{
    sports?: string[];
    gender?: string;
    ageMin?: number;
    ageMax?: number;
    orderBy?: string[];
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    getFilteredUsers(filters)
      .then((data) => setUsersData(data))
      .catch(console.error);
  }, [filters]);

  const handleApplyFilters = (newFilters: {
    sports?: string[];
    gender?: string;
    ageMin?: number;
    ageMax?: number;
    orderBy?: string[];
  }) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto pt-14">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Фильтры */}
          <div className="w-full lg:w-80 sticky top-14 mt-20 pt-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <UserFilter
                initialFilters={filters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Карточки пользователей */}
          <div className="w-full lg:flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-blue-900">ЛЕНТА</h1>
              <h2 className="text-xl font-semibold text-indigo-600 mt-2">
                {usersData.length} активных пользователей
              </h2>
            </div>
            {usersData.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Пользователи не найдены. Попробуйте изменить фильтры.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {usersData.map((user) => (
                  <UserCard
                    key={user.user_id}
                    user={user}
                    onClick={() => navigate(`/profile/${user.user_id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;