import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrDelAutComponent } from './err-del-aut.component';

describe('ErrDelAutComponent', () => {
  let component: ErrDelAutComponent;
  let fixture: ComponentFixture<ErrDelAutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrDelAutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrDelAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
