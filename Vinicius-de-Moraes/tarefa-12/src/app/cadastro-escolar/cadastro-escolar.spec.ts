import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEscolarComponent } from './cadastro-escolar';

describe('CadastroEscolar', () => {
  let component: CadastroEscolarComponent;
  let fixture: ComponentFixture<CadastroEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEscolarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEscolarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
