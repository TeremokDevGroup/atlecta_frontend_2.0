import { useEffect, useState } from "react";
import { UserProfile } from "../types/user";
import { getUserProfileImages } from "../services/userService"; // добавить

interface Props {
  user: UserProfile;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: Props) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const visibleTags = showAllTags ? user.sports : user.sports.slice(0, 2);

  useEffect(() => {
    getUserProfileImages(user.user_id).then(setProfilePicture);
  }, [user.user_id]);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition hover:shadow-lg"
      onClick={onClick}
    >
      {/* Фото */}
      <div className="w-full h-40 bg-gray-300 rounded-md mb-4 overflow-hidden flex items-center justify-center">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Фото профиля"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span className="text-gray-600 text-sm">Фото отсутствует</span>
        )}
      </div>

      <div className="mb-2 text-xl font-bold text-black">
        {user.first_name} {user.last_name}
      </div>

      <div className="mb-3 text-sm font-medium text-gray-700">
        {user.age} лет · {user.height} см · {user.weight} кг
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag, index) => (
          <span
            key={index}
            className="bg-black text-white text-xs px-2 py-1 rounded-md font-semibold"
          >
            {tag.name}
          </span>
        ))}

        {user.sports.length > 2 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAllTags(!showAllTags);
            }}
            className="text-blue-600 text-xs font-semibold underline"
          >
            {showAllTags ? "Скрыть" : "Ещё"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
