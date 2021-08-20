describe('name input', function (){
    it('Will grab the name input and type a name into the text box', function(){
        cy.visit('http://localhost:3000/')
        .get('input[name = "user"]').type('Steven Homem').should('have.value', 'Steven Homem')
    })
});

describe('email input', function (){
    it('Will grab the email input and type an email into the text box', function(){
        cy.visit('http://localhost:3000/')
        .get('input[name = "contactInfo"]').type('sjhomem@outlook.com').should('have.value', 'sjhomem@outlook.com')
    })
});

describe('password check', function (){
    it('Will grab the password input and type a password into the text box', function(){
        cy.visit('http://localhost:3000/')
        .get('input[name = "password"]').type('allisonishot').should('have.value', 'allisonishot')
    })
});

describe('agree to terms of service checked', function (){
    it('Will see if the user can check, uncheck, and check again the agree to terms checkbox', function(){
        cy.visit('http://localhost:3000/')
        .get('[type = "checkbox"]').check().uncheck().check()
    })
});

describe('Submit the form', function(){
    it('Check if we can submit the form', function(){
        cy.visit('http://localhost:3000/')
        .get('#projectForm')
        .submit()
    })
})

describe('Form Validation', function() {
    it('Checks to make sure that the submit button is disabled initially', function(){
        cy.visit('http://localhost:3000/')
        .get('button[type="submit"]')
        .should('have.disabled')
    })
})

describe('Form Validation', function() {
    it('Checks to make sure that the form can be submited with all of the fields filled out', function(){
        cy.visit('http://localhost:3000/')
        .get('input[name = "user"]').type('Steven Homem')
        .get('input[name = "contactInfo"]').type('sjhomem@outlook.com')
        .get('input[name = "password"]').type('allisonishot')
        .get('[type = "checkbox"]').check()
        .get('button[type="submit"]')
        .should('not.have.disabled')
    })
})


 



