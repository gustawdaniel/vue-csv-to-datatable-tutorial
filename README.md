# vue-csv-to-datatable-tutorial

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your end-to-end tests
Prepare fixtures that are not appended to repository

```
node script/generate_csv.js 1 1 1; # generate simplest possible csv file
for((i=1;i<=30;i+=1)); do node script/generate_csv.js 10000 $i 10; done # iterate over cols from 1 to 30
for((i=1;i<=40;i+=1)); do node script/generate_csv.js 10000 10 $i; done # iterate over lengths from 1 to 40
for((i=500;i<=40000;i+=500)); do node script/generate_csv.js $i 10 10; done # iterate over rows from 500 to 40 000 with step equal 500
mv script/*.csv tests/e2e/fixtures/ # move all files to fixtures
```

Install and start server for measurements

```
npm install -g json-server
json-server --watch tests/measurements.json
```

run tests

```
npm run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
