export function loginViaAuth0Ui(username: string, password: string) {
    // App landing page redirects to Auth0.
    cy.visit(`${Cypress.env("FRONTEND_URL")}`)

    // Login on Auth0.
    cy.origin(
        Cypress.env('VITE_AUTH0_DOMAIN'),
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username, { force: true })
            cy.get('input#password').type(password, { log: false, force: true })
            cy.contains('button[value=default]', 'Continue').click({ force: true })
        }
    )

    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', `${Cypress.env("FRONTEND_URL")}`)
}




