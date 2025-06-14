import { useEffect, useState } from 'react';
import friendService from '../services/friendService';
import { Friend } from '../types/friend';

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [sentRequests, setSentRequests] = useState<Friend[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Friend[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      friendService.getFriends(),
      friendService.getSentRequests(),
      friendService.getReceivedRequests(),
      friendService.getBlockedUsers(),
    ])
      .then(([friendsData, sentData, receivedData, blockedData]) => {
        setFriends(friendsData);
        setSentRequests(sentData);
        setReceivedRequests(receivedData);
        setBlockedUsers(blockedData);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных о друзьях:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRequestAction = async (friendId: string, action: 'accept' | 'decline') => {
    if (!friendId) {
      console.error('ID пользователя не указан');
      return;
    }
    setActionLoading(friendId);
    try {
      if (action === 'accept') {
        await friendService.acceptFriendRequest(friendId);
        setReceivedRequests(prev => prev.filter(req => req.id !== friendId));
        setFriends(prev => [...prev, receivedRequests.find(req => req.id === friendId)!]);
      } else {
        await friendService.declineFriendRequest(friendId);
        setReceivedRequests(prev => prev.filter(req => req.id !== friendId));
      }
    } catch (error) {
      console.error('Ошибка действия с запросом:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnblock = async (blockId: string) => {
    if (!blockId) {
      console.error('ID пользователя не указан');
      return;
    }
    setActionLoading(blockId);
    try {
      await friendService.unblockUser(blockId);
      setBlockedUsers(prev => prev.filter(user => user.id !== blockId));
    } catch (error) {
      console.error('Ошибка разблокировки:', error);
    } finally {
      setActionLoading(null);
    }
  };

  return {
    friends,
    sentRequests,
    receivedRequests,
    blockedUsers,
    loading,
    actionLoading,
    handleRequestAction,
    handleUnblock,
  };
};