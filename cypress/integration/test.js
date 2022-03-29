let username = 'jeddy'
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
    it('enters race data', ()=>{
        cy.get('[id="distance"]').click().type(`42.2`)
        cy.get('[id="unit"]').select('Kilometers')
        cy.get('[id="easy"]').click()
        cy.get('[id="hours"]').click().type(`3`)
        cy.get('[id="minutes"]').click().type(`9`)
        cy.get('[id="seconds"]').click().type(`21`)
        cy.get('input').contains('Submit').click()
        cy.get('[id="raceBtn"]').click()
        cy.get('[class="raceTimeTable"]').should('be.visible')
    })

    it('confirms training paces table is visible', ()=>{
        cy.get('[id="paceBtn"]').click()
        cy.get('[class="paceTimeTable"]').should('be.visible')
    })

})

describe('visits about page', () => {
    it('visits about page', () => {
        cy.get('a').contains('About Us').click()
    })
})