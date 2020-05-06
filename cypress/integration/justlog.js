describe('log',()=>{
    it('log', function(){
        cy.log(Cypress.env('host'))
        console.log(Cypress.env('host'))
        cy.wait(5000)
    })
})