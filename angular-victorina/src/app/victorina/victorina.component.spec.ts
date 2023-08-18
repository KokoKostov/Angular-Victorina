import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictorinaComponent } from './victorina.component';

describe('VictorinaComponent', () => {
  let component: VictorinaComponent;
  let fixture: ComponentFixture<VictorinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VictorinaComponent]
    });
    fixture = TestBed.createComponent(VictorinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
