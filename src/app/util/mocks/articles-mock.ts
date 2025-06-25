import { IArticle } from '../../articles/interfaces/articles.interface';

export const articleMock: IArticle = {
  id: 'article1',
  userId: 'user1',
  title: 'testTitle',
  summary: 'testSummary',
  content: 'testContent',
  category: 'testCategory',
  cdnUrl: 'testUrl',
  createdAt: new Date('2025-01-01T10:00:00Z'),
  updatedAt: new Date('2025-01-01T10:00:00Z'),
};

export const articlesMock: IArticle[] = [
  {
    id: 'article1',
    userId: 'user1',
    title: 'testTitle1',
    summary: 'testSummary1',
    content: 'testContent1',
    category: 'testCategory1',
    cdnUrl: 'testUrl1',
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-01T10:00:00Z'),
  },
  {
    id: 'article2',
    userId: 'user2',
    title: 'testTitle2',
    summary: 'testSummary2',
    content: 'testContent2',
    category: 'testCategory2',
    cdnUrl: 'testUrl2',
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-01T10:00:00Z'),
  },
  {
    id: 'article3',
    userId: 'user2',
    title: 'testTitle3',
    summary: 'testSummary3',
    content: 'testContent3',
    category: 'testCategory3',
    cdnUrl: 'testUrl3',
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-01T10:00:00Z'),
  },
];
