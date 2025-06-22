export interface IArticle {
  id: string;
  userId: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  cdnUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type INewArticle = Omit<IArticle, 'id'>;

export interface IUpdateArticle {
  title: string;
  summary: string;
  content: string;
  updatedAt: Date;
}
