export interface User {
  id: string;
  name: string;
  image: string;
  places: [];
}

export interface UserResponse {
  user: {
    id: string;
  };
  message: string;
}
