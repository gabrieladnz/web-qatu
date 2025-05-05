import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';


@Component({
  selector: 'app-search',
  imports: [NavbarComponent, FooterComponent, CardProductComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
    protected mockListProducts = [
        {
            id: 1,
            name: 'Smartphone Samsung Galaxy A54',
            description: 'Smartphone com 128GB, 6GB RAM e tela Super AMOLED de 6.4"',
            category: 'Eletrônicos',
            price: 1899.90,
            stock: 15,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 2,
            name: 'Tênis Esportivo Runner Pro',
            description: 'Tênis para corrida com amortecimento e sistema anti-impacto',
            category: 'Esportes',
            price: 299.90,
            stock: 23,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 3,
            name: 'Cafeteira Express 15 Bar',
            description: 'Cafeteira com sistema de pressão para café expresso e cappuccino',
            category: 'Eletrodomésticos',
            price: 459.90,
            stock: 8,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 4,
            name: 'Notebook Intel Core i5',
            description: 'Notebook com 8GB RAM, SSD 256GB e tela Full HD de 15.6"',
            category: 'Eletrônicos',
            price: 3599.90,
            stock: 7,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 5,
            name: 'Smart TV LED 50" 4K',
            description: 'Smart TV com sistema Android TV e controle remoto por voz',
            category: 'Eletrônicos',
            price: 2799.90,
            stock: 12,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 6,
            name: 'Fone de Ouvido Bluetooth',
            description: 'Fone sem fio com cancelamento de ruído e bateria de longa duração',
            category: 'Acessórios',
            price: 249.90,
            stock: 30,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 7,
            name: 'Liquidificador 12 Velocidades',
            description: 'Liquidificador com função pulsar e copo de vidro resistente ao calor',
            category: 'Eletrodomésticos',
            price: 169.90,
            stock: 18,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 8,
            name: 'Mochila para Notebook',
            description: 'Mochila executiva com compartimentos organizadores e porta USB',
            category: 'Acessórios',
            price: 189.90,
            stock: 25,
            imageUrl: 'https://placehold.co/400x400/png',
        },

        {
            id: 9,
            name: 'Smartphone Samsung Galaxy A54',
            description: 'Smartphone com 128GB, 6GB RAM e tela Super AMOLED de 6.4"',
            category: 'Eletrônicos',
            price: 1899.90,
            stock: 15,
            imageUrl: 'https://placehold.co/400x400/png',
        },

        {
            id: 10,
            name: 'Smartphone Samsung Galaxy A54',
            description: 'Smartphone com 128GB, 6GB RAM e tela Super AMOLED de 6.4"',
            category: 'Eletrônicos',
            price: 1899.90,
            stock: 15,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 11,
            name: 'Smartphone Samsung Galaxy A54',
            description: 'Smartphone com 128GB, 6GB RAM e tela Super AMOLED de 6.4"',
            category: 'Eletrônicos',
            price: 1899.90,
            stock: 15,
            imageUrl: 'https://placehold.co/400x400/png',
        },
        {
            id: 12,
            name: 'Smartphone Samsung Galaxy A54',
            description: 'Smartphone com 128GB, 6GB RAM e tela Super AMOLED de 6.4"',
            category: 'Eletrônicos',
            price: 1899.90,
            stock: 15,
            imageUrl: 'https://placehold.co/400x400/png',
        },
    ];
  }