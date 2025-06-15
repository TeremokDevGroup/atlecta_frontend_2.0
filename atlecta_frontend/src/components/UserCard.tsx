import { useState, useRef, useEffect } from "react";
import { UserProfile } from "../types/user";

interface Props {
  user: UserProfile;
  onClick: () => void;
}

const UserCard = ({ user, onClick }: Props) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const tagsButtonRef = useRef<HTMLButtonElement>(null);
  const tagsPopupRef = useRef<HTMLDivElement>(null);

  const toggleTagsPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  // Проверка границ экрана для позиционирования всплывающего окна
  useEffect(() => {
    if (showAllTags && tagsPopupRef.current && tagsButtonRef.current) {
      const popupRect = tagsPopupRef.current.getBoundingClientRect();
      const buttonRect = tagsButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      if (spaceBelow < popupRect.height) {
        tagsPopupRef.current.style.top = 'auto';
        tagsPopupRef.current.style.bottom = 'calc(100% + 5px)';
        tagsPopupRef.current.style.transform = 'translateX(-50%)';
      } else {
        tagsPopupRef.current.style.top = 'calc(100% + 5px)';
        tagsPopupRef.current.style.bottom = 'auto';
        tagsPopupRef.current.style.transform = 'translateX(-50%)';
      }
    }
  }, [showAllTags]);

  return (
    <div className="relative">
      {/* Основная карточка */}
      <div
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition hover:shadow-lg w-[208px] h-[320px] flex flex-col overflow-hidden"
        onClick={onClick}
      >
        {/* Фото */}
        <div className="w-full h-36 bg-gray-200 rounded-md mb-3 overflow-hidden flex items-center justify-center">
          {user?.images?.length > 0 && user.images[0].url ? (
            <img
              src={user.images[user.images.length - 1].url}
              alt="Фото профиля"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <span className="text-gray-600 text-sm">Фото отсутствует</span>
          )}
        </div>

        {/* Информация */}
        <div className="flex-1 flex flex-col">
          <div className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">
            {user.first_name} {user.last_name}
          </div>

          <div className="mb-2 text-xs font-medium text-gray-700 line-clamp-2">
            {user.age ? `${user.age} лет` : ''} {user.height ? `· ${user.height} см` : ''} {user.weight ? `· ${user.weight} кг` : ''}
          </div>

          {/* Теги */}
          <div className="mt-2">
            <div className="flex flex-wrap gap-1.5">
              {[...user.sports]
                .sort((a, b) => a.name.length - b.name.length) // Сортируем по длине названия
                .slice(0, 2) // Берем первые два самых коротких
                .map((tag, index) => (
                  <span
                    key={index}
                    className="bg-black text-white text-sm px-2.5 py-1 rounded-md font-semibold line-clamp-1"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>

            {user.sports.length > 2 && (
              <button
                ref={tagsButtonRef}
                onClick={toggleTagsPopup}
                className="text-white text-sm mt-0.5 hover:underline"
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
          ref={tagsPopupRef}
          className="absolute z-50 bg-white shadow-lg rounded-md p-2 w-48 border border-gray-200 max-h-40 overflow-y-auto"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: 'calc(100% + 5px)',
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {user.sports.slice(2).map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white text-sm px-2.5 py-1 rounded-md font-semibold"
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