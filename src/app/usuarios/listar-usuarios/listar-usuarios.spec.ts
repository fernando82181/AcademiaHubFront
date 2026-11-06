import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ListarUsuarios } from './listar-usuarios';

describe('ListarUsuarios', () => {
  let component: ListarUsuarios;
  let fixture: ComponentFixture<ListarUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuarios],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
