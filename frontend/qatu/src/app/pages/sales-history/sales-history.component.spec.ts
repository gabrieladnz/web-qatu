import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SalesHistoryComponent } from './sales-history.component';

describe('SalesHistoryComponent', () => {
    let component: SalesHistoryComponent;
    let fixture: ComponentFixture<SalesHistoryComponent>;

    const mockMatSnackBar = {
        open: jasmine.createSpy('open')
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SalesHistoryComponent,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: MatSnackBar, useValue: mockMatSnackBar },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SalesHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
