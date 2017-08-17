import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhSignUpComponent } from './gh-sign-up.component';

describe('GhSignUpComponent', () => {
  let component: GhSignUpComponent;
  let fixture: ComponentFixture<GhSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
