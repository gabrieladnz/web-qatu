import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { TokenService } from '../../core/services/token/token.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let compiled: HTMLElement;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let tokenServiceSpy: jasmine.SpyObj<TokenService>;

    beforeEach(async () => {
        const authSpy = jasmine.createSpyObj('AuthService', ['login']);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
        const tokenSpy = jasmine.createSpyObj('TokenService', ['save', 'saveUserId']);

        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                ReactiveFormsModule,
                MatIconModule,
                MatButtonModule,
                MatFormFieldModule
            ],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerSpyObj },
                { provide: TokenService, useValue: tokenSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
        fixture.detectChanges();
    });

    describe('Inicialização do componente', () => {
        it('deve criar o componente', () => {
            expect(component).toBeTruthy();
        });

        it('deve inicializar o formulário com campos vazios', () => {
            expect(component.loginForm.get('email')?.value).toBe('');
            expect(component.loginForm.get('password')?.value).toBe('');
        });

        it('deve inicializar hidePassword como true', () => {
            expect(component.hidePassword).toBe(true);
        });

        it('deve inicializar loginFailed como false', () => {
            expect(component.loginFailed).toBe(false);
        });
    });

    describe('Validação do formulário', () => {
        it('deve ser inválido quando os campos estão vazios', () => {
            expect(component.loginForm.valid).toBeFalsy();
        });

        it('deve ser inválido quando o email está em formato incorreto', () => {
            component.loginForm.patchValue({
                email: 'email-invalido',
                password: '123456'
            });

            expect(component.loginForm.get('email')?.hasError('email')).toBeTruthy();
            expect(component.loginForm.valid).toBeFalsy();
        });

        it('deve ser inválido quando a senha tem menos de 6 caracteres', () => {
            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123'
            });

            expect(component.loginForm.get('password')?.hasError('minlength')).toBeTruthy();
            expect(component.loginForm.valid).toBeFalsy();
        });

        it('deve ser válido quando email e senha estão preenchidos corretamente', () => {
            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123456'
            });

            expect(component.loginForm.valid).toBeTruthy();
        });

        it('deve exibir mensagem de erro para email inválido quando touched', () => {
            component.loginForm.patchValue({
                email: 'email-invalido'
            });
            component.loginForm.get('email')?.markAsTouched();
            fixture.detectChanges();

            const errorMessage = compiled.querySelector('.form-group__error');
            expect(errorMessage?.textContent?.trim()).toBe('Por favor, insira um e-mail válido.');
        });

        it('não deve exibir mensagem de erro quando email é válido', () => {
            component.loginForm.patchValue({
                email: 'test@example.com'
            });
            component.loginForm.get('email')?.markAsTouched();
            fixture.detectChanges();

            const emailErrorMessage = Array.from(compiled.querySelectorAll('.form-group__error'))
                .find(el => el.textContent?.includes('Por favor, insira um e-mail válido'));
            expect(emailErrorMessage).toBeFalsy();
        });
    });

    describe('Visibilidade da senha', () => {
        it('deve alternar a visibilidade da senha ao clicar no botão', () => {
            const toggleButton = compiled.querySelector('.form-group__password__toggle-password') as HTMLButtonElement;

            expect(component.hidePassword).toBe(true);

            toggleButton.click();
            fixture.detectChanges();

            expect(component.hidePassword).toBe(false);

            toggleButton.click();
            fixture.detectChanges();

            expect(component.hidePassword).toBe(true);
        });

        it('deve alterar o tipo do input de senha baseado no hidePassword', () => {
            const passwordInput = compiled.querySelector('#signup-password') as HTMLInputElement;

            expect(passwordInput.type).toBe('password');

            component.hidePassword = false;
            fixture.detectChanges();

            expect(passwordInput.type).toBe('text');
        });

        it('deve exibir o ícone correto baseado no estado da visibilidade', () => {
            const iconElement = compiled.querySelector('mat-icon');

            expect(iconElement?.textContent?.trim()).toBe('visibility_off');

            component.hidePassword = false;
            fixture.detectChanges();

            expect(iconElement?.textContent?.trim()).toBe('visibility');
        });

        it('deve chamar passwordVisibility com preventDefault quando evento é passado', () => {
            const event = new Event('click');
            spyOn(event, 'preventDefault');

            component.passwordVisibility(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(component.hidePassword).toBe(false);
        });
    });

    describe('Botão de login', () => {
        it('deve estar desabilitado quando o formulário é inválido', () => {
            const loginButton = compiled.querySelector('.login__button') as HTMLButtonElement;

            expect(loginButton.disabled).toBe(true);
        });

        it('deve estar habilitado quando o formulário é válido', () => {
            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123456'
            });
            fixture.detectChanges();

            const loginButton = compiled.querySelector('.login__button') as HTMLButtonElement;

            expect(loginButton.disabled).toBe(false);
        });

        it('deve chamar o método login() quando o formulário é submetido', async () => {
            spyOn(component, 'login');

            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123456'
            });
            fixture.detectChanges();

            const form = compiled.querySelector('.login__form') as HTMLFormElement;
            form.dispatchEvent(new Event('submit'));

            expect(component.login).toHaveBeenCalled();
        });
    });

    describe('Função de login', () => {
        it('deve chamar authService.login quando o formulário é válido', async () => {
            const mockResponse = {
                success: true,
                token: 'fake-token',
                _id: 'user-id',
                message: 'Login realizado com sucesso'
            };
            authServiceSpy.login.and.returnValue(Promise.resolve(mockResponse));

            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123456'
            });

            await component.login();

            expect(authServiceSpy.login).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: '123456'
            });
        });

        it('deve navegar para dashboard quando login é bem-sucedido', async () => {
            const mockResponse = {
                success: true,
                token: 'fake-token',
                _id: 'user-id',
                message: 'Login realizado com sucesso'
            };
            authServiceSpy.login.and.returnValue(Promise.resolve(mockResponse));

            component.loginForm.patchValue({
                email: 'test@example.com',
                password: '123456'
            });

            await component.login();

            expect(tokenServiceSpy.save).toHaveBeenCalledWith('fake-token');
            expect(tokenServiceSpy.saveUserId).toHaveBeenCalledWith('user-id');
            expect(component.loginFailed).toBe(false);
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
        });

        it('deve marcar todos os campos como touched quando formulário é inválido', async () => {
            component.loginForm.patchValue({
                email: 'usuario@',
                password: '123'
            });

            expect(component.loginForm.valid).toBe(false);
            spyOn(component.loginForm, 'markAllAsTouched');

            await component.login();
            expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
        });
    });

    describe('Exibição de erros no login', () => {
        it('deve exibir mensagem de erro quando loginFailed é true', () => {
            component.loginFailed = true;
            fixture.detectChanges();

            const errorMessages = compiled.querySelectorAll('.form-group__error');
            const loginErrorMessage = Array.from(errorMessages).find(
                el => el.textContent?.includes('Credenciais inválidas')
            );

            expect(loginErrorMessage?.textContent?.trim()).toBe('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
        });

        it('não deve exibir mensagem de erro quando loginFailed é false', () => {
            component.loginFailed = false;
            fixture.detectChanges();

            const errorMessages = compiled.querySelectorAll('.form-group__error');
            const loginErrorMessage = Array.from(errorMessages).find(
                el => el.textContent?.includes('Credenciais inválidas')
            );

            expect(loginErrorMessage).toBeFalsy();
        });
    });

    describe('Elementos do HTML', () => {
        it('deve renderizar o título "Bem-vindo(a) de volta!"', () => {
            const title = compiled.querySelector('h2');
            expect(title?.textContent?.trim()).toBe('Bem-vindo(a) de volta!');
        });

        it('deve renderizar os labels corretos', () => {
            const emailLabel = compiled.querySelector('label[for="signup-email"]');
            const passwordLabel = compiled.querySelector('label[for="signup-password"]');

            expect(emailLabel?.textContent?.trim()).toBe('E-mail');
            expect(passwordLabel?.textContent?.trim()).toBe('Senha');
        });

        it('deve renderizar os inputs com os atributos corretos', () => {
            const emailInput = compiled.querySelector('#signup-email') as HTMLInputElement;
            const passwordInput = compiled.querySelector('#signup-password') as HTMLInputElement;

            expect(emailInput.type).toBe('email');
            expect(emailInput.required).toBe(true);
            expect(passwordInput.required).toBe(true);
        });

        it('deve renderizar o texto do botão corretamente', () => {
            const loginButton = compiled.querySelector('.login__button');
            expect(loginButton?.textContent?.trim()).toBe('ENTRAR');
        });
    });

    describe('Integração dos FormControls', () => {
        it('deve atualizar o valor do FormControl quando o usuário digita no input de email', () => {
            const emailInput = compiled.querySelector('#signup-email') as HTMLInputElement;

            emailInput.value = 'test@example.com';
            emailInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.loginForm.get('email')?.value).toBe('test@example.com');
        });

        it('deve atualizar o valor do FormControl quando o usuário digita no input de senha', () => {
            const passwordInput = compiled.querySelector('#signup-password') as HTMLInputElement;

            passwordInput.value = 'minhasenha123';
            passwordInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.loginForm.get('password')?.value).toBe('minhasenha123');
        });
    });
});
