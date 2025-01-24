import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCollectionsComponent } from './portfolio-collections.component';

describe('PortfolioCollectionsComponent', () => {
  let component: PortfolioCollectionsComponent;
  let fixture: ComponentFixture<PortfolioCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCollectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
