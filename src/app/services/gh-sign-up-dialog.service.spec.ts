import { TestBed, inject } from '@angular/core/testing';

import { GhSignUpDialogService } from './gh-sign-up-dialog.service';

describe('GhSignUpDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhSignUpDialogService]
    });
  });

  it('should be created', inject([GhSignUpDialogService], (service: GhSignUpDialogService) => {
    expect(service).toBeTruthy();
  }));
});
