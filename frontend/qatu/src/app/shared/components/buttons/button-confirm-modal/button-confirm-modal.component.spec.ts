import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfirmModalComponent } from './button-confirm-modal.component';

describe('ButtonConfirmModalComponent', () => {
  let component: ButtonConfirmModalComponent;
  let fixture: ComponentFixture<ButtonConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
