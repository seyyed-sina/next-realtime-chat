export const apiEndpoints = {
  BASE_URL: process.env.API_URL,
  ADD_FRIEND: '/friends/add',
  ACCEPT_FRIEND: '/friends/accept',
  DECLINE_FRIEND: '/friends/decline',
} as const;
