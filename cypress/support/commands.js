Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Italo')
    cy.get('#lastName').type('Cabral Cantaro')
    cy.get('#email').type('italo@teste.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})