export interface CreateFormData {
  title: string;
  desc: string;
  tag: string;
}

export interface IPost {
  id: string;
  userId: string;
  username: string;
  date: string;
  title: string;
  desc: string;
  tag: string;
  time: string;
}

export interface PostProps {
  post: IPost
}

export interface Like{
  userId: string;
  likeId: string;
}