import { Page } from 'playwright/test';

export const homePage = (page: Page) => ({
  header: () => page.getByTestId('home-header'),
  logo: () => page.getByTestId('logo'),
  githubLink: () => page.getByTestId('github-link'),
  featureItems: () => page.getByTestId('feature-item'),
  techItems: () => page.getByTestId('tech-item'),
  startCard: () => page.getByTestId('start-card'),
  username: () => page.getByTestId('username'),
});
