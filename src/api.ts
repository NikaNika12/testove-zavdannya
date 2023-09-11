import { Album } from './types/Album';
import { Post } from './types/Post';
import { User } from './types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url;

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getPosts = (userId: number) => get<Post[]>(`/posts?userId=${userId}`);

export const getAlbums = (userId: number) => get<Album[]>(`/albums?userId=${userId}`);

export const getUsers = () => get<User[]>('/users');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
