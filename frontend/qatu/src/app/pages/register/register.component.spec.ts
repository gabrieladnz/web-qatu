// Libs
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Components e Services
import { RegisterComponent } from './register.component';
import { AuthService } from '../../core/services/auth/auth.service';

class MockAuthService {
    async register(data: any): Promise<any> {
        if (data.email === 'fail@test.com') {
            return { success: false, message: 'Email já existe' };
        }
        if (data.email === 'error@test.com') {
            throw new Error('Erro de rede');
        }
        return { success: true, message: 'Usuário cadastrado com sucesso' };
    }
}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let compiled: HTMLElement;
    let authService: AuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RegisterComponent,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Inicialização', () => {
        it('deve inicializar o formulário com campos vazios e válidos', () => {
            expect(component.registerForm.get('name')?.value).toBe('');
            expect(component.registerForm.get('email')?.value).toBe('');
            expect(component.registerForm.get('password')?.value).toBe('');
            expect(component.hidePassword).toBe(true);
            expect(component.registerFailed).toBe(false);
        });
    });

    describe('Validação do formulário', () => {
        it('deve ser inválido quando campos estão vazios', () => {
            expect(component.registerForm.valid).toBeFalsy();
        });

        it('deve ser inválido com email incorreto', () => {
            component.registerForm.patchValue({
                name: 'Gabriela',
                email: 'email-invalido',
                password: '123456'
            });
            expect(component.registerForm.valid).toBeFalsy();
        });

        it('deve ser inválido com senha menor que 6 caracteres', () => {
            component.registerForm.patchValue({
                name: 'Gabriela',
                email: 'gabriela@test.com',
                password: '123'
            });
            expect(component.registerForm.valid).toBeFalsy();
        });

        it('deve ser válido com todos os campos preenchidos corretamente', () => {
            component.registerForm.patchValue({
                name: 'Gabriela Diniz',
                email: 'gabriela@test.com',
                password: '123456'
            });
            expect(component.registerForm.valid).toBeTruthy();
        });
    });

    describe('Visibilidade da senha', () => {
        it('deve alternar hidePassword ao chamar passwordVisibility', () => {
            expect(component.hidePassword).toBe(true);
            component.passwordVisibility();
            expect(component.hidePassword).toBe(false);
            component.passwordVisibility();
            expect(component.hidePassword).toBe(true);
        });
    });

    describe('Cadastro', () => {
        it('deve navegar para login quando cadastro é bem sucedido', async () => {
            component.registerForm.patchValue({
                name: 'Gabriela Diniz',
                email: 'gabriela@test.com',
                password: '123456'
            });

            await component.register();

            expect(component.registerFailed).toBe(false);
            expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        });

        it('deve definir registerFailed como true quando cadastro falha', async () => {
            component.registerForm.patchValue({
                name: 'Gabriela Diniz',
                email: 'fail@test.com',
                password: '123456'
            });

            await component.register();

            expect(component.registerFailed).toBe(true);
            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('deve definir registerFailed como true quando ocorre erro', async () => {
            component.registerForm.patchValue({
                name: 'Gabriela Diniz',
                email: 'error@test.com',
                password: '123456'
            });

            await component.register();

            expect(component.registerFailed).toBe(true);
            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('deve marcar campos como touched quando formulário é inválido', async () => {
            spyOn(component.registerForm, 'markAllAsTouched');

            await component.register();

            expect(component.registerForm.markAllAsTouched).toHaveBeenCalled();
        });
    });

    describe('Elementos do HTML', () => {
        it('deve renderizar oscampos do formulário', () => {
            const nameInput = compiled.querySelector('#signup-name');
            const emailInput = compiled.querySelector('#signup-email');
            const passwordInput = compiled.querySelector('#signup-password');
            const submitButton = compiled.querySelector('.register__button');

            expect(nameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(submitButton).toBeTruthy();
        });

        it('deve desabilitar o botão quando formulário é inválido', () => {
            const submitButton = compiled.querySelector('.register__button') as HTMLButtonElement;
            expect(submitButton.disabled).toBe(true);
        });

        it('deve habilitar o botão quando formulário é válido', () => {
            component.registerForm.patchValue({
                name: 'Gabriela Diniz',
                email: 'gabriela@test.com',
                password: '123456'
            });
            fixture.detectChanges();

            const submitButton = compiled.querySelector('.register__button') as HTMLButtonElement;
            expect(submitButton.disabled).toBe(false);
        });
    });
});
