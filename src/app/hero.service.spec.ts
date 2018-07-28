import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MockBackend } from '@angular/http/testing';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import {
  JsonpModule,
  Jsonp,
  BaseResponseOptions,
  ResponseOptions,  
  Response,
  BaseRequestOptions,
  Http
} from '@angular/http';

fdescribe('service: HeroService', () => {
  let messageService: MessageService;
  let heroService: HeroService;
  let http: HttpClient;
  let backend: MockBackend;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        BaseResponseOptions,
        MessageService, 
        HeroService,         
        BaseRequestOptions,
        // ResponseOptions,
        MockBackend,
        // {
        //   provide: Jsonp,
        //   useFactory: (backend, options) => new Jsonp(backend, options),
        //   deps: [MockBackend, BaseRequestOptions]
        // },
        // {
        //   provide: Http,
        //   useFactory: (backend, options) => new Http(backend, options),
        //   deps: [MockBackend, BaseRequestOptions]
        // },
      ]
    });

    messageService = new MessageService();
    heroService = new HeroService(http, messageService);
    backend = TestBed.get(MockBackend);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });
  
  // it('should get all heroes from the database', fakeAsync(() => {
  //   const heroes = {
  //     "list": [
  //       { id: 11, name: 'Mr. Nice' },
  //       { id: 12, name: 'Narco' },
  //       { id: 13, name: 'Bombasto' },
  //       { id: 14, name: 'Celeritas' },
  //       { id: 15, name: 'Magneta' },
  //       { id: 16, name: 'RubberMan' },
  //       { id: 17, name: 'Dynama' },
  //       { id: 18, name: 'Dr IQ' },
  //       { id: 19, name: 'Magma' },
  //       { id: 20, name: 'Tornado' }
  //     ]
  //   };

  //   backend.connections.subscribe( connection => {
  //     connection.mockRespond(new Response(<ResponseOptions>(
  //       {
  //         "body": JSON.stringify(heroes)
  //       }
  //     )))
  //   });

  //   let response_heroes = heroService.getHeroes();
  //   tick();
  //   expect(response_heroes).toEqual(heroes);

  // }));


});
