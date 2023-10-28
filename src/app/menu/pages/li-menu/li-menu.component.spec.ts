import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiMenuComponent } from './li-menu.component';

describe('LiMenuComponent', () => {
  let component: LiMenuComponent;
  let fixture: ComponentFixture<LiMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiMenuComponent]
    });
    fixture = TestBed.createComponent(LiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
