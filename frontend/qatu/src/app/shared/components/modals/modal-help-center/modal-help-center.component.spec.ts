import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHelpCenterComponent } from './modal-help-center.component';

describe('ModalHelpCenterComponent', () => {
  let component: ModalHelpCenterComponent;
  let fixture: ComponentFixture<ModalHelpCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHelpCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
