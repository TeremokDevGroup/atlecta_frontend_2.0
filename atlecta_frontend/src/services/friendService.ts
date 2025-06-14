import { http } from './http';
import { Friend, FriendshipStatus } from '../types/friend';

const friendService = {
  async sendFriendRequest(friendId: string): Promise<void> {
    try {
      await http.post(`/friends/request/${friendId}`, {});
    } catch (error) {
      console.error('Ошибка отправки запроса в друзья:', error);
      throw error;
    }
  },

  async acceptFriendRequest(friendId: string): Promise<void> {
    try {
      await http.post(`/friends/accept/${friendId}`, {});
    } catch (error) {
      console.error('Ошибка принятия запроса в друзья:', error);
      throw error;
    }
  },

  async declineFriendRequest(friendId: string): Promise<void> {
    try {
      await http.post(`/friends/decline/${friendId}`, {});
    } catch (error) {
      console.error('Ошибка отклонения запроса в друзья:', error);
      throw error;
    }
  },

  async blockUser(blockId: string): Promise<void> {
    try {
      await http.post(`/friends/block/${blockId}`, {});
    } catch (error) {
      console.error('Ошибка блокировки пользователя:', error);
      throw error;
    }
  },

  async unblockUser(blockId: string): Promise<void> {
    try {
      await http.post(`/friends/unblock/${blockId}`, {});
    } catch (error) {
      console.error('Ошибка разблокировки пользователя:', error);
      throw error;
    }
  },

  async getFriends(): Promise<Friend[]> {
    try {
      const response = await http.get(`/friends/list`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения списка друзей:', error);
      throw error;
    }
  },

  async getSentRequests(): Promise<Friend[]> {
    try {
      const response = await http.get(`/friends/requests/sent`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения отправленных запросов:', error);
      throw error;
    }
  },

  async getReceivedRequests(): Promise<Friend[]> {
    try {
      const response = await http.get(`/friends/requests/received`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения входящих запросов:', error);
      throw error;
    }
  },

  async getBlockedUsers(): Promise<Friend[]> {
    try {
      const response = await http.get(`/friends/blocked`);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения заблокированных пользователей:', error);
      throw error;
    }
  },

  async getFriendshipStatus(friendId: string): Promise<FriendshipStatus> {
    try {
      const [friends, sentRequests, receivedRequests, blockedUsers] = await Promise.all([
        this.getFriends(),
        this.getSentRequests(),
        this.getReceivedRequests(),
        this.getBlockedUsers(),
      ]);

      if (blockedUsers.some(user => user.id === friendId)) {
        return FriendshipStatus.Blocked;
      }
      if (friends.some(friend => friend.id === friendId)) {
        return FriendshipStatus.Friend;
      }
      if (sentRequests.some(request => request.id === friendId)) {
        return FriendshipStatus.SentRequest;
      }
      if (receivedRequests.some(request => request.id === friendId)) {
        return FriendshipStatus.ReceivedRequest;
      }
      return FriendshipStatus.None;
    } catch (error) {
      console.error('Ошибка получения статуса дружбы:', error);
      return FriendshipStatus.None;
    }
  },
};

export default friendService;