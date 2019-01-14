// https://docs.cypress.io/api/introduction/api.html

describe('Loading data', () => {
  it('Page should contain header and after loading file also filename.', () => {
    cy.visit('/');
    cy.contains('h1', 'CSV to DataTable');
    cy.uploadFile('#csv_upload', 'test_col_1_row_1_len_1.csv', 'text/csv');
    cy.contains('pre', 'test_col_1_row_1_len_1.csv');
  });

  it('Loading files collection', () => {
    cy.visit('/');
    cy.get('input[type="checkbox"]').click({force: true});
    cy.contains('label', 'Measure: true');
    // for(let col=1; col<30; col++) {
    //   cy.uploadFile('#csv_upload', `test_col_${col}_row_10000_len_10.csv`, 'text/csv');
    // }

    for(let len=1; len<100; len++) {
      cy.uploadFile('#csv_upload', `test_col_10_row_10000_len_${len}.csv`, 'text/csv');
    }

    // for(let row=500; row<40000; row+=500) {
    //   cy.uploadFile('#csv_upload', `test_col_10_row_${row}_len_10.csv`, 'text/csv');
    // }
  });
});
