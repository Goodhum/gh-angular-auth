import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhLoginComponent } from './gh-login.component';

describe('GhLoginComponent', () => {
  let component: GhLoginComponent;
  let fixture: ComponentFixture<GhLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
