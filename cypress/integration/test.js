let username = 'donne'
let password = 'asdf123'

describe('Create User and Login', () => {
    it('checks website is up', () => {
      cy.visit('http://localhost:5050/')
    })
    it('visits login => create user page', ()=>{
        cy.get('[class="headerButton"]').contains('Login').click()
        cy.url().should("include", "/login")
        cy.get('[class="loginLink"]').contains('Create an Account').click()
        cy.url().should("include", "/createAccount")
    })
    it('creates account', ()=>{
        cy.get('[id="username"]').click().type(`${username}`)
        cy.get('[id="password"]').click().type(`${password}`)
        cy.get('[id="confirmPassword"]').click().type(`${password}`)
        cy.get('input').contains('Create Account').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('account sucsessfully registered');
          })
          cy.get('[class="loginLink"]').contains('Login to existing account').click()
    })
    it('logs in',()=>{
    cy.get('[id="username"]').click().type(`${username}`)
        cy.get('[id="password"]').click().type(`${password}`)
        cy.get('input').contains('Login').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains(`welcome ${username}`);
          })
        })
  })

  describe('Test Site Functionallity', () => {
    it('checks website is up', () => {
      cy.visit('http://localhost:5050/')
    })

})