import { TestBed } from '@angular/core/testing';

import { ArticlesFirebaseService } from './articles-firebase-service';

describe('ArticlesFirebaseService', () => {
  let service: ArticlesFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
