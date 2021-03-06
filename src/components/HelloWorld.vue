<template>
  <v-container>
    <v-layout text-xs-center wrap>

      <v-flex xs12 mb-4>
        <v-card hover>

          <v-card-title primary-title row fill-height justify-center>
            <v-card tile text style="width: 100%">
              <v-card-text style="display: flex; justify-content: space-between; align-items: center">
                <h1 class="display-1 font-weight-thin">CSV to DataTable</h1>
                <v-switch class="justify-end" :label="`Measure: ${measure.toString()}`" v-model="measure"></v-switch>
              </v-card-text>
            </v-card>
          </v-card-title>

          <v-card-actions>
            <label style="width: 100%" ref="label">
              <input id="csv_upload" @change="upload" type="file" name="csv_upload" accept=".csv" class="input-file"
                     style="opacity: 0; display: none">
            </label>

            <v-btn block color="success" @click="$refs.label.click()">
              Select CSV File
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="headers.length">
        <v-card hover>
          <v-card-title>
            Data from:
            <pre class="ml-1">{{ fileName }}</pre>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" v-for="header in headers">{{ props.item[header.value] }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>

      <v-snackbar
          v-model="snackbar.showed"
          :color="snackbar.color"
          :timeout="3000"
          :vertical="true"
      >
        {{ snackbar.text }}
        <v-btn
            text
            @click="snackbar.showed = false"
        >
          Close
        </v-btn>
      </v-snackbar>

    </v-layout>
  </v-container>
</template>

<script>
import Papa from 'papaparse'

export default {
  data: () => ({
    search: '',
    headers: [],
    items: [],
    fileName: '',
    measure: false,
    snackbar: { showed: false }
  }),
  methods: {
    upload(e) {
      const self = this;

      self.headers = []
      self.items = []
      self.fileName = e.target.files[0].name

      let col = 0
      let len = 0
      let row = 0

      try {
        col = Number.parseInt(self.fileName.match(/col_\d+/)[0].replace('col_', ''))
        len = Number.parseInt(self.fileName.match(/len_\d+/)[0].replace('len_', ''))
        row = Number.parseInt(self.fileName.match(/row_\d+/)[0].replace('row_', ''))
      } catch (e) {
        self.measure = false
      }

      const t0 = performance.now()
      console.time('parsing')

      Papa.parse(e.target.files[0], {
        header: true,
        step: function (results) {
          if (!self.headers.length) results.meta.fields.forEach((field) => {
            self.headers.push({ text: field, value: field })
          })

          console.log('results', results)

          self.items.push(results.data)

          // results.data
          //     .filter(row => results.meta.fields.every(field => row.hasOwnProperty(field)))
          //     .forEach(row => {
          //       self.items.push(row)
          //     })
        },
        complete: function (results) {
          console.timeEnd('parsing')
          const t1 = performance.now()

          if (self.measure) {

            fetch('http://localhost:3000/measurements', {
              method: 'POST',
              body: JSON.stringify({ file: self.fileName, col, row, len, time: t1 - t0 }),
              headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(json => {
                  console.log(json)

                  Object.assign(self.snackbar, {
                    showed: true,
                    text: `Data saved. col: ${col}, row: ${row}, len: ${len}, tim: ${t1 - t0}`,
                    color: 'success'
                  })
                })

          }
        }
      })
    }
  }
}
</script>
