import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyTableComponent } from './disney-table.component';

describe('DisneyTableComponent', () => {
  let component: DisneyTableComponent;
  let fixture: ComponentFixture<DisneyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisneyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisneyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
