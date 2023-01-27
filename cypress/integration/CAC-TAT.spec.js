/// <reference types="Cypress" />


describe ('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it ('verificar o título da aplicação', function (){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it ('preencher os campos obrigatórios e envia o formulario', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Cabral Cantaro')
        cy.get('#email').type('italo@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) //esse (delay) serve para zerar o tempo de digitação de textos longos
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it ('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Cabral Cantaro')
        cy.get('#email').type('italo@teste;com')
        cy.get('#open-text-area').type('Testando verfiicação de errro de email')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it ('Campo telefone continua vazio quando preenchido com o valor não-numerico', function(){
        cy.get('#phone')
            .type('abcdefghij')
                .should('have.value', '') //verficaçã ode campo, pra ver se o campo telefone aceita letras, pois so deve aceitar numeros

    })

    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preeenchido antes do envio do formulario', function(){
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Cabral Cantaro')
        cy.get('#email').type('italo@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Testando verfiicação de errro de email')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function ()  {
        cy.get('#firstName')
            .type('Italo')
            .should('have.value', 'Italo')
            .clear()
            .should('have.value','')

        cy.get('#lastName')
            .type('Cabral Cantaro')
            .should('have.value', 'Cabral Cantaro')
            .clear()
            .should('have.value','')

        cy.get('#email')
            .type('italo@teste.com')
            .should('have.value', 'italo@teste.com')
            .clear()
            .should('have.value','')
        
        cy.get('#phone')
            .type('12345678')
            .should('have.value', '12345678')
            .clear()
            .should('have.value','')
        

    })

    it ('exibir mensagem de erro ao sbmeter o formulario sem preencher os campos obrigatorios', function(){

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it ('envia o formulario com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() //função criada no arquivo COMMANDS para substituir as tecnicas de PAGE OBJECTS

        cy.get('.success').should('be.visible')
    })

    it ('seleciona um produto (YouTube) pelo texto', function(){
        cy.get('#product')
            .select('YouTube') //usado para elementos flutuantes
            .should('have.value', 'youtube')
    })

    it ('seleciona um produto (Mentoria) pelo value', function(){
        cy.get('#product')
            .select('mentoria') //usado para elementos flutuantes
            .should('have.value', 'mentoria')
    })

    it ('seleciona um produto (Blog) pelo indice', function(){
        cy.get('#product')
            .select(1) //usado para elementos flutuantes
            .should('have.value', 'blog')
    })

    it ('marcar tipo de atendimento (FeedBack)', function(){
        cy.get('input[type="radio"][value="feedback"')
            .check()
            .should('have.value', 'feedback')

    })
        
    it ('marcar cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it ('marca ambos os checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last() //escolhendo o ultimo para tirar a seleção
            .uncheck()
            .should('not.be.checked')


    })

    it ('seleciona um arquivo da pagina fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it ('seleciona arquivo simulando grag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it ('verifica que a politica de privacidade abre em outra aba sem necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })     

    it ('acessa a pagina de politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')

    }) 
})
