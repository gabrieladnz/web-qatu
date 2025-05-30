import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../core/services/auth/auth.service';

class MockAuthService {
    async register(data: any): Promise<any> {
        return { success: true };
    }
}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
