import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

fdescribe('HeroService', () => {
  let messageService: MessageService;
  let heroService: HeroService;
  let http: HttpClient;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, HeroService, HttpClient]
    });
  });

  beforeEach(() => {
    messageService = new MessageService();
    heroService = new HeroService(http, messageService);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });
});
