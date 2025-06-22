import { TestBed } from '@angular/core/testing';
import { CategoriesFirebaseService } from './categories-firebase-service';

describe('CategoriesFirebase', () => {
  let service: CategoriesFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
