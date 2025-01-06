import { Photo } from './Photo';

export interface User {
  username: string;
  token: string;
  PhotoUrl: string;
}

export interface Member {
  id: number;
  userName: string;
  age: number;
  photoUrl: string;
  gender: string;
  dateOfBirth: Date;
  knownAs: string;
  created: Date;
  lastActive: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
