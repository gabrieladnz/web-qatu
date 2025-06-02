import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PurchaseHistoryComponent } from './purchase-history.component';
import { ClientService } from '../../core/services/client/client.service';

class MockClientService {
}

describe('PurchaseHistoryComponent', () => {
    let component: PurchaseHistoryComponent;
    let fixture: ComponentFixture<PurchaseHistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PurchaseHistoryComponent,
                HttpClientTestingModule
            ],
            providers: [
                { provide: ClientService, useClass: MockClientService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PurchaseHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
