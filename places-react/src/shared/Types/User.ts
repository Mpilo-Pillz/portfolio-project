export interface User {
  id: string;
  name: string;
  image: string;
  places: [];
}

export interface UserResponse {
  userId: string;
  token: string;
  message: string;
}
