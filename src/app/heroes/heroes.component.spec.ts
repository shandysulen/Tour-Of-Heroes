import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';

export class MockHeroService {

}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;  
  // let mockHeroService: MockHeroService;
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ HeroesComponent ],
      providers: [ HeroService ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    heroService = TestBed.get(HeroService);
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have all of its heroes', () =>{
    expect(this.heroes.length).toBe(0);
    heroService.getHeroes();
    expect(this.heroes.length).toBe(10);
  })
});
