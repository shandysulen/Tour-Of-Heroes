import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';


fdescribe('MessageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should contain no messages initially', inject([MessageService], (service: MessageService) => {
    expect(service.messages).toEqual([]);
  }));

  it('should add a message', inject([MessageService], (service: MessageService) => {
    service.add('1');
    expect(service.messages).toContain('1');
  }));

  it('should add two messages and then clear them', inject([MessageService], (service: MessageService) => {
    service.add('1');
    expect(service.messages).toContain('1');
    service.add('2');
    expect(service.messages).toContain('1');
    expect(service.messages).toContain('2');
    service.clear();
    expect(service.messages).toEqual([]);
  }));

});
