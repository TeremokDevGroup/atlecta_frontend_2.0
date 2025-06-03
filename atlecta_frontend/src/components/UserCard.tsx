import { useState, useRef } from "react";
import { UserProfile } from "../types/user";

interface Props {
  user: UserProfile;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: Props) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const tagsButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTagsPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  return (
    <div className="relative">
      {/* Основная карточка */}
      <div
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition hover:shadow-lg w-64 h-96 flex flex-col"
        onClick={onClick}
      >
        {/* Фото */}
        <div className="w-full h-40 bg-gray-200 rounded-md mb-3 overflow-hidden flex items-center justify-center">
          {user?.images?.length > 0 && user.images[0].url ? (
            <img
              src={user.images[0].url}
              alt="Фото профиля"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <span className="text-gray-600 text-sm">Фото отсутствует</span>
          )}
        </div>

        {/* Информация */}
        <div className="flex-1 flex flex-col">
          <div className="mb-1 text-xl font-bold text-black line-clamp-1">
            {user.first_name} {user.last_name}
          </div>

          <div className="mb-2 text-sm font-medium text-gray-700"> {/* Уменьшен margin-bottom */}
            {user.age} лет · {user.height} см · {user.weight} кг
          </div>

          {/* Теги */}
          <div className="mt-1"> {/* Уменьшен margin-top */}
            <div className="flex flex-wrap gap-1"> {/* Уменьшен gap между тегами */}
              {user.sports.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-black text-white text-xs px-2 py-1 rounded-md font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {user.sports.length > 2 && (
              <button
                ref={tagsButtonRef}
                onClick={toggleTagsPopup}
                className="text-blue-600 text-xs font-semibold underline mt-1" 
              >
                +{user.sports.length - 2} ещё
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Всплывающее окно с тегами */}
      {showAllTags && (
        <div 
          className="absolute z-10 bg-white shadow-lg rounded-md p-2 w-48 mt-1 border border-gray-200"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: 'calc(100% + 5px)'
          }}
        >
          <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto"> {/* Уменьшен gap между тегами */}
            {user.sports.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md font-semibold"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45"
          />
        </div>
      )}
    </div>
  );
};

export default UserCard;