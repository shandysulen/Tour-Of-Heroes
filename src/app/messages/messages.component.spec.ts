import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';
// import { By } from '@angular/platform-browser';

fdescribe('MessagesComponent', () => {
  let component: MessagesComponent;
  let service: MessageService;
  let fixture: ComponentFixture<MessagesComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers: [ MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MessageService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show messages if no messages exist', () => {
    expect(el.nativeElement.textContent.trim()).toBe('');
  });

  it('should add a message to MessageService and show message on front end', () => {
    service.add('1');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toBe('');
  });

  it('should properly clear all messages after adding multiple messages', () => {
    service.add('1');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toBe('');
    service.add('2');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toBe('');
    service.clear();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('');
  });
});
