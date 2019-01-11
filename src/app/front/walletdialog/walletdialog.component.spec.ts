import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletdialogComponent } from './walletdialog.component';

describe('WalletdialogComponent', () => {
  let component: WalletdialogComponent;
  let fixture: ComponentFixture<WalletdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
