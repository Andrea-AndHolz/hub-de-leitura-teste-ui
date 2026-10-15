/// <reference types="cypress" /> 

describe('Funcionalidade: Contato', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('Deve preencher os campos obrigatórios e enviar o formulário', () => {
    cy.get('[name="name"]').type('Andrea Buchholz');
    cy.get('[name="email"]').type('andrea.buchholz@teste.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');//obs sem acento cria erro
    cy.get('[name="message"]').type('Teste de preenchimento do campo mensagem');
    cy.get('#btn-submit').click();
    cy.contains('Contato enviado com sucesso!').should('exist');
  });

  it('Deve validar mensagem de erro ao enviar formulário sem preencher campo nome', () => {
      cy.get('[name="name"]').clear();
      cy.get('[name="email"]').type('andrea@teste.com');
      cy.get('[name="subject"]').select('Dúvidas Gerais');
      cy.get('[name="message"]').type('Teste de preenchimento do campo mensagem');
      cy.get('#btn-submit').click(); 
      cy.get('#alert-container').should('contain.text', 'Por favor, preencha o campo Nome.'); 
  });

  it('Deve validar mensagem de erro ao enviar formulário sem preencher campo email', () => {
    cy.get('[name="name"]').type('Andrea Buchholz');
    cy.get('[name="email"]').clear();
    cy.get('[name="subject"]').select('Dúvidas Gerais');//obs sem acento cria erro
    cy.get('[name="message"]').type('Teste de preenchimento do campo mensagem');
    cy.get('#btn-submit').click();
    cy.get('#alert-container').should('contain.text', 'Por favor, preencha o campo E-mail.');
  });

  it('Deve validar mensagem de erro ao enviar formulário sem selecionar assunto', () => {
    cy.get('[name="name"]').type('Andrea Buchholz');
    cy.get('[name="email"]').type('andrea@teste.com');
    //cy.get('[name="subject"]').select('Dúvidas Gerais');//obs sem acento cria erro
    cy.get('[name="message"]').type('Teste de preenchimento do campo mensagem');
    cy.get('#btn-submit').click();
    cy.get('#alert-container').should('contain.text', 'Por favor, selecione o Assunto.');
  });

  it('Deve validar mensagem de erro ao enviar formulário sem preencher campo mensagem', () => {
    cy.get('[name="name"]').type('Andrea Buchholz');
    cy.get('[name="email"]').type('andrea@teste.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('[name="message"]').clear;
    cy.get('#btn-submit').click();
    cy.get('#alert-container').should('contain.text', 'Por favor, escreva sua Mensagem.');
  });
 
});