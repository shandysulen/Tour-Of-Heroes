import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick}

import { routes } from './app-routing.module';  

fdescribe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
