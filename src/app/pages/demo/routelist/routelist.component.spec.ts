import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutelistComponent } from './routelist.component';

describe('RoutelistComponent', () => {
  let component: RoutelistComponent;
  let fixture: ComponentFixture<RoutelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
