export interface IArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
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
