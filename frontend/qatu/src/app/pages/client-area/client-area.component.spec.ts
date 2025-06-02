import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientAreaComponent } from './client-area.component';

describe('ClientAreaComponent', () => {
    let component: ClientAreaComponent;
    let fixture: ComponentFixture<ClientAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ClientAreaComponent,
                RouterTestingModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClientAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
