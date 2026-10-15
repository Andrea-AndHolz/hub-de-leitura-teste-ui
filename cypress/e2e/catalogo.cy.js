/// <reference types="cypress" /> 

describe('Funcionalidade:Catalogo de Livros', () => {
  beforeEach(() => {
    cy.visit('/catalog.html');
  });

    it('Deve clicar no botão Adicionar à cesta', () => {
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click();
        cy.get('#cart-count').should('contain', '1');
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid> .btn-primary').should('be.visible');
    });

    it('Deve clicar em todos os botões Adicionar à cesta', () => {
        cy.get('.btn-primary').click({multiple: true});
    });

    it('Deve clicar no botão Adicionar à cesta do primeiro livro', () => {
        cy.get('.btn-primary').first().click();
    });

    it('Deve clicar no botão Adicionar à cesta do último livro', () => {
        cy.get('.btn-primary').last().click();
    });

    it('Deve clicar no botão Adicionar à cesta do terceiro livro', () => {
        cy.get('.btn-primary').eq(2).click();
    });

    it('Deve clicar no botão Adicionar à cesta do quinto livro', () => {
        cy.get('.btn-primary').eq(4).click();
        cy.get('#global-alert-container').should('contain', 'A Metamorfose');
    }); 

    it('Deve clicar no nome do livro e direcionar para tela do livro', () => {
        cy.contains('Dom Casmurro').click();
        cy.url().should('include', 'book-details');
        cy.get('#add-to-cart-btn').click();
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso!');
    });

})