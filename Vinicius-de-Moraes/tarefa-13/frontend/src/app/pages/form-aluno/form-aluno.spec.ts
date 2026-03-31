import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAluno } from './form-aluno';

describe('FormAluno', () => {
  let component: FormAluno;
  let fixture: ComponentFixture<FormAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAluno],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAluno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
