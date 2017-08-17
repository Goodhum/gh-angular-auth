import { TestBed, inject } from '@angular/core/testing';

import { GhLoginDialogService } from './gh-login-dialog.service';

describe('GhLoginDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhLoginDialogService]
    });
  });

  it('should be created', inject([GhLoginDialogService], (service: GhLoginDialogService) => {
    expect(service).toBeTruthy();
  }));
});
