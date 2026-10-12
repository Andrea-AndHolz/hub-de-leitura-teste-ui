/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro();
    });

    afterEach(() => {
        cy.screenshot()
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
        cy.url().should('include', 'dashboard');
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
        cy.preencherCadastro(nome, email, '11999999999', 'Teste@123', 'Teste@123');
        cy.url().should('include', 'dashboard');
    });

    it('Deve fazer o cadastro com sucesso - Usando comando Page Object', () => {
        let email = `teste${Date.now()}@teste.com`;
        cadastroPage.preencherCadastro('Andi Holz', email, '11898998888','senha789', 'senha789');
        cy.url().should('include','dashboard');
    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'andreab@teste.com', '119779955', 'senha456', 'senha456');
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres');
    });

})