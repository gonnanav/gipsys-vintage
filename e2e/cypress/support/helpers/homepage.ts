export function visit(): void {
  cy.visit('/');
}

export function goToShopPage(): void {
  cy.findByRole('link', { name: /shop now/i }).click();
}
