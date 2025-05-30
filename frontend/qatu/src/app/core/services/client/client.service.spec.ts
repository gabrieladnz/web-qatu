import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { TokenService } from '../token/token.service';

class MockTokenService { }

describe('ClientService', () => {
    let service: ClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ClientService,
                { provide: TokenService, useClass: MockTokenService }
            ]
        });
        service = TestBed.inject(ClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
