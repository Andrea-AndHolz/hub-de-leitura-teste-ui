/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    beforeEach(() => {
        cy.visit('register.html');
    });

    it('Deve fazer o cadastro com sucesso - Usando função JS', () => {
        let email = `andrea.buch${Date.now()}@teste.com`;
        cy.get('#name').type('Andrea Buch');
        cy.get('#email').type(email);
        cy.get('#phone').type('1234567890');
        cy.get('#password').type('senha123');
        cy.get('#confirm-password').type('senha123');
        cy.get('#terms-agreement').check();
        cy.get('#register-btn').click();
        cy.url().should('include', 'dashboard.html');
    });

    it('Deve fazer o cadastro com sucesso - Usando Faker', () => {
        let nome = faker.person.fullName();
        let email = faker.internet.email();
        cy.get('#name').type(nome);
        cy.get('#email').type(email);
        cy.get('#phone').type('1234567890');
        cy.get('#password').type('senha123');
        cy.get('#confirm-password').type('senha123');
        cy.get('#terms-agreement').check();
        cy.get('#register-btn').click();
        cy.url().should('include', 'dashboard.html');
        cy.get('#user-name').should('contain', nome);
    });

    it('Deve preencher o cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`;
        let nome = faker.person.fullName({sex: 'female'});// Gerando nome feminino ou male masculino
        cy.preencherCadastro(nome, email, '11999999999', 'senha123', 'senha123');
        cy.url().should('include', 'dashboard');
    });

})