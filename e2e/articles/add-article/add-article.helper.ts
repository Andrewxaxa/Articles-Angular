import { expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { addArticlePage } from './add-article.selectors';

export const newArticleFormData = {
  category: 'Technology',
  title: `[TEST] newtitle+${Date.now()}`,
  summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit+${Date.now()}`,
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.+${Date.now()}`,
};

const uploadcareBaseResponse = {
  file: '7be94c1c-c162-4b06-bc01-56d287f88a1e',
};

const uploadcareInfoResponse = {
  size: 6587,
  total: 6587,
  done: 6587,
  uuid: '7be94c1c-c162-4b06-bc01-56d287f88a1e',
  file_id: '7be94c1c-c162-4b06-bc01-56d287f88a1e',
  original_filename: 'test-image.jpg',
  is_image: true,
  is_stored: true,
  image_info: {
    dpi: null,
    width: 225,
    format: 'JPEG',
    height: 225,
    sequence: false,
    color_mode: 'RGB',
    orientation: null,
    geo_location: null,
    datetime_original: null,
  },
  video_info: null,
  content_info: {
    mime: {
      mime: 'image/jpeg',
      type: 'image',
      subtype: 'jpeg',
    },
    image: {
      dpi: null,
      width: 225,
      format: 'JPEG',
      height: 225,
      sequence: false,
      color_mode: 'RGB',
      orientation: null,
      geo_location: null,
      datetime_original: null,
    },
  },
  is_ready: true,
  filename: 'testimage.jpg',
  mime_type: 'image/jpeg',
  metadata: {},
};

export const interceptUploadcareBaseQequest = (page: Page): Promise<void> =>
  page.route('https://upload.uploadcare.com/base/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(uploadcareBaseResponse),
    });
  });

export const interceptUploadcateInfoRequest = (page: Page): Promise<void> =>
  page.route('https://upload.uploadcare.com/info/*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(uploadcareInfoResponse),
    });
  });

export const addArticle = async (page: Page): Promise<void> => {
  const addArticle = addArticlePage(page);

  await interceptUploadcareBaseQequest(page);
  await interceptUploadcateInfoRequest(page);

  const fileChooserPromise = page.waitForEvent('filechooser');
  await addArticle.uploadFileButton().click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('e2e/assets/test-image.jpg');
  await addArticle.uploadDoneButton().click();

  await addArticle.category().click();
  const categoryOption = await addArticle.categoryOption();
  await expect(categoryOption).toBeVisible();
  await categoryOption.click();

  await addArticle.title().fill(newArticleFormData.title);
  await addArticle.summary().fill(newArticleFormData.summary);
  await addArticle.content().fill(newArticleFormData.content);

  await addArticle.submitButton().click();
};
