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
for((i=1;i<=200;i+=1)); do node script/generate_csv.js 10000 10 $i; done # iterate over lengths from 1 to 200
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

### Generate graphs

```
wolframscript script/generate_graphs.wls
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Known constraints

If you increase length of word above 103 you can observe huge increase of time
measured by cypress, and for length 163 there are exceptions like this:

```
<--- Last few GCs --->

[29334:0x238f651a000] 16807415 ms: Mark-sweep 2044.7 (2098.8) -> 2044.6 (2104.3) MB, 210.4 / 0.1 ms  allocation failure GC in old space requested
[29334:0x238f651a000] 16807697 ms: Mark-sweep 2044.6 (2104.3) -> 2044.6 (2071.8) MB, 282.3 / 29.6 ms  last resort 
[29334:0x238f651a000] 16807937 ms: Mark-sweep 2044.6 (2071.8) -> 2044.6 (2071.8) MB, 239.5 / 27.0 ms  last resort 
[29334:0x238f651a000] 16808177 ms: Mark-sweep 2044.6 (2071.8) -> 2044.6 (2071.8) MB, 240.6 / 31.3 ms  last resort 


<--- JS stacktrace --->

==== JS stack trace =========================================

Security context: 0x2b421504b231 <Window map = 0x3ad85b98cd89>
    0: builtin exit frame: parse(this=0x2b4215031a49 <JSON map = 0x3ad85b986249>,0x38f24d27e999 <Very long string[22002202]>)

    1: clone [http://localhost:8080/__cypress/runner/cypress_runner.js:~54909] [pc=0xeee698d4533](this=0xce2880b2501 <JSGlobal Object>,obj=0x33e3c8c02201 <Very long string[22002200]>)
    3: /* anonymous */ [http://localhost:8080/__cypress/runner/cypre...
```

This problem is described [here](https://github.com/cypress-io/cypress/issues/1955).