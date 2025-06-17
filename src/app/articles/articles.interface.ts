export interface IArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export type INewArticle = Omit<IArticle, 'id'>;

export interface IUpdateArticle {
  title: string;
  content: string;
  summary: string;
  updatedAt: Date;
}
