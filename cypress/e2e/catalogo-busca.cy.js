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

})