/*
 * Params:
 * - rows
 * - columns
 * - length
 */

const fs = require('fs'); // we need filesystem (build in node module)

// remove file name and path from args and convert them to integer numbers
const args = process.argv.slice(2).map(e => Number.parseInt(e));

// show args
console.log(args);

// define default values of out basic parameters
const rows = args[0] || 5; // number of rows (without header)
const columns = args[1] ||  3; // number of columns
const length = args[2] || 10; // number of letters in any field
// summary number of chars = ( rows + 1 ) * (columns * (length + 1) - 1)
// ( rows + 1 ) // because of we should add header
// (length + 1) // because of we have comas
// (columns * (length + 1) - 1) // but no coma at the end of line

// headers is array of strings composed from letters of alphabet from `a` repeating `length` times
const headers = [...new Array(columns)].map((e, i) => String.fromCharCode(97 + i).repeat(length));

// append header to content of file
let content = headers.join(',');

// for any row
for(let i=0; i<rows; i++) {
    content += "\n"; // append new line
    for(let j=0; j<headers.length; j++) { // generate content of line and append to content
        content += (j ? "," : "") + [...Array(length)].map(()=>(~~(Math.random()*36)).toString(36)).join('');
    }
}

// show content of file
// console.log(content);

// save file with proper name
fs.writeFile(__dirname+`/test_col_${columns}_row_${rows}_len_${length}.csv`, content, function(err) {
    if(err) {
        return console.log(err);
    }

    // finally show that everything finished successfully
    console.log("The file was saved!");
});