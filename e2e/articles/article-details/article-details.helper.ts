import { expect, Page } from '@playwright/test';
import { articleDetailsPage } from './article-details.selectors';

export const testArticle = {
  id: '9rFR2b8HbEKj3m7oQoxL',
  userId: 'cQaD1pizg3dKyB0vc5iioKuUv2x2',
  title: 'The Future of Remote Work: Trends and Predictions for 2030',
  summary:
    'Remote work has rapidly transformed the modern workplace. As we move toward 2030, new technologies and shifting cultural norms will continue to shape how we work from anywhere.',
  content:
    "The COVID-19 pandemic accelerated the shift to remote work, but it was only the beginning of a larger transformation. By 2030, it's expected that nearly 50% of the global workforce will work remotely at least part-time. Key drivers include advanced collaboration tools, the proliferation of AI-driven productivity apps, and a stronger emphasis on work-life balance. Organizations are rethinking their office spaces, often opting for hybrid models where employees can choose how and where they work. Meanwhile, workers are relocating to smaller towns and more affordable regions, no longer tethered to company headquarters. Challenges such as maintaining company culture and ensuring cybersecurity remain, but the trend is clear: the future of work is flexible, digital, and decentralized.",
  category: 'Technology',
  cdnUrl:
    'https://ucarecdn.com/4cba8d6e-86f6-48aa-9e5f-f2e99bc225a3/-/preview/640x960/',
  createdAt: '2025-06-29T13:17:52.683Z',
  createdAtFormatted: '6/29/25, 3:17 PM',
  updatedAt: '2025-06-29T13:17:52.683Z',
};

export const deleteArticle = async (
  page: Page,
  title: string
): Promise<void> => {
  const card = page.locator('mat-card', {
    hasText: title,
  });
  await expect(card).toBeVisible();

  await expect(card.getByRole('button', { name: 'Read more' })).toBeVisible();

  await Promise.all([
    page.waitForURL('**/articles/**'),
    card.getByRole('button', { name: 'Read more' }).click(),
  ]);

  const url = page.url();
  const id = url.split('/articles/')[1];

  await page.waitForURL(`/articles/${id}`);

  const articleDetails = articleDetailsPage(page);

  const deleteButton = articleDetails.deleteButton();
  await deleteButton.click();

  await articleDetails.deleteConfirmButton().click();
};
