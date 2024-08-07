import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTeachersComponent } from './get-teachers.component';

describe('GetTeachersComponent', () => {
  let component: GetTeachersComponent;
  let fixture: ComponentFixture<GetTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
