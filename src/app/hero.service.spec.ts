import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

import { Hero } from './hero';

fdescribe('service: HeroService', () => {
  let messageService: MessageService;
  let heroService: HeroService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({  
      imports: [ HttpClientTestingModule ],    
      providers: [        
        MessageService,
        HttpClient,
        HeroService
      ]     
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    messageService = TestBed.get(MessageService);
    heroService = new HeroService(http, messageService);
  });

  afterEach(() => {
    httpMock.verify(); //cleans up any outstanding requests if they do exist
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });
  
  it('should get all heroes from the database', () => {
    const response_heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    
    heroService.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(10);
      expect(heroes).toEqual(response_heroes);
    });

    const request = httpMock.expectOne(heroService.heroesUrl);
    expect(request.request.method).toBe('GET');

    request.flush(response_heroes);

  });

  it('should get one hero from the database', () => {
    const mockResult = {
      id: 11,
      name: 'Mr. Nice'
    }

    const mockId = 11;

    heroService.getHero(mockId).subscribe(hero => {    
      expect(hero).toEqual(mockResult);
    });

    const request = httpMock.expectOne(`${heroService.heroesUrl}/${mockId}`);
    expect(request.request.method).toBe('GET');

    request.flush(mockResult);
  });

  it('should be able to add a hero', () => {
    const name : string = "shando";

    const mockHero: Hero = {
      id: 21,
      name: "shando"
    }

    heroService.addHero({ name } as Hero).subscribe(hero => {    
      expect(hero).toEqual(mockHero);
    });

    const request = httpMock.expectOne(heroService.heroesUrl);
    expect(request.request.method).toBe('POST');

    request.flush(mockHero)

  });

  it('should be able to update a hero', () => {

    const mockName: string = "new name";

    const mockHero: Hero = {
      id: 11,
      name: "new name"
    }

    heroService.updateHero(mockHero).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const request = httpMock.expectOne(heroService.heroesUrl);
    expect(request.request.method).toBe('PUT');

    request.flush(mockHero)

  });

  it('should be able to delete a hero', () => {
    const id: number = 11;

    const mockHero: Hero = {
      id: 11,
      name: "'Mr. Nice'"
    }

    heroService.deleteHero(mockHero).subscribe(hero => {    
      expect(hero).toEqual(mockHero);
    });

    const request = httpMock.expectOne(`${heroService.heroesUrl}/${id}`);
    expect(request.request.method).toBe('DELETE');

    request.flush(mockHero)
  });

  it('can test for a 404 error', () => {
    const emsg = 'deliberate 404 error';

    http.get(heroService.heroesUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpMock.expectOne(heroService.heroesUrl);

    //Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });

  });


});
