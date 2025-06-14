export interface Friend {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export enum FriendshipStatus {
  None = 'none',
  Friend = 'friend',
  SentRequest = 'sent_request',
  ReceivedRequest = 'received_request',
  Blocked = 'blocked',
}