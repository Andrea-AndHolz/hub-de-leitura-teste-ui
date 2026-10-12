/// <reference types="cypress" />
import catalogo from "../fixtures/livros.json"

describe('Funcionalidade: Busca no catalogo', () => {
    beforeEach(() => {
        cy.visit('catalog.html');
    });

    it('Deve buscar um livro específico no catálogo, Livro 1984', () => {
        cy.get('#search-input').type('1984');
        cy.get('.card-title').should('contain', '1984');
    });

    it('Deve buscar um livro específico no catálogo - Usando importação da massa de dados', () => {
        cy.get('#search-input').type(catalogo[2].livro);
        cy.get('.card-title').should('contain', catalogo[2].livro);
    });

    it('Deve buscar um livro específico no catálogo - Usando Fixture', () => {
        cy.fixture("livros").then((cat) => {
            cy.get('#search-input').type(cat[2].livro);
            cy.get('.card-title').should('contain', cat[2].livro);
        });
    });

    it.only('Deve validar todos os livros da lista', () => {
        cy.fixture("livros").then((cat) => {
            cat.forEach(item => {
                cy.get('#search-input').clear().type(item.livro);
                cy.get('.card-title').should('contain', item.livro);
                
            });

        });
    });


})