import { ProfileForm } from '../components/ProfileForm';
import { useFriends } from '../hooks/useFriends';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const {
    friends,
    sentRequests,
    receivedRequests,
    blockedUsers,
    loading,
    actionLoading,
    handleRequestAction,
    handleUnblock,
  } = useFriends();

  if (loading) return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-xl font-medium text-gray-600">Загрузка...</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center p-4">
        <div className="w-full max-w-4xl my-8">
          <ProfileForm />
          <div className="mt-8 space-y-8">
            {/* Входящие запросы */}
            {receivedRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Входящие запросы</h2>
                <ul className="space-y-3">
                  {receivedRequests.map(request => (
                    <li key={request.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                      <Link to={`/users/profiles/${request.id}`} className="text-gray-700 hover:underline">
                        {request.email}
                      </Link>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequestAction(request.id, 'accept')}
                          disabled={actionLoading === request.id}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                          Принять
                        </button>
                        <button
                          onClick={() => handleRequestAction(request.id, 'decline')}
                          disabled={actionLoading === request.id}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                          Отклонить
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Отправленные запросы */}
            {sentRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Отправленные запросы</h2>
                <ul className="space-y-3">
                  {sentRequests.map(request => (
                    <li key={request.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <Link to={`/users/profiles/${request.id}`} className="text-gray-700 hover:underline">
                        {request.email}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Друзья */}
            {friends.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Друзья</h2>
                <ul className="space-y-3">
                  {friends.map(friend => (
                    <li key={friend.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <Link to={`/profile/${friend.id}`} className="text-gray-700 hover:underline">
                        {friend.email}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Заблокированные пользователи */}
            {blockedUsers.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Заблокированные пользователи</h2>
                <ul className="space-y-3">
                  {blockedUsers.map(user => (
                    <li key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                      <Link to={`/users/profiles/${user.id}`} className="text-gray-700 hover:underline">
                        {user.email}
                      </Link>
                      <button
                        onClick={() => handleUnblock(user.id)}
                        disabled={actionLoading === user.id}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        Разблокировать
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}