// https://docs.cypress.io/api/introduction/api.html

describe('Loading data', () => {
  it('Page should contain header and after loading file also filename.', () => {
    cy.visit('/');
    cy.contains('h1', 'CSV to DataTable');
    cy.uploadFile('#csv_upload', 'test_col_1_row_1_len_1.csv', 'text/csv');
    cy.contains('pre', 'test_col_1_row_1_len_1.csv');
  })
});
