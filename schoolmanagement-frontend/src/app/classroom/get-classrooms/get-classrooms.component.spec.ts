import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassroomsComponent } from './get-classrooms.component';

describe('GetClassroomsComponent', () => {
  let component: GetClassroomsComponent;
  let fixture: ComponentFixture<GetClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClassroomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
