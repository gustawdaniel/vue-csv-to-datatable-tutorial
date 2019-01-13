<template>
    <v-container>
        <v-layout text-xs-center wrap>

            <v-flex xs12 mb-4>
                <v-card hover>
                    <v-card-title primary-title class="justify-center">
                        <h1 class="display-2 font-weight-thin">CSV to DataTable</h1>
                    </v-card-title>

                    <v-card-actions>

                        <v-btn block color="success">
                            <input type="file" id="csv_upload" name="csv_upload" accept=".csv" class="input-file" style="opacity: 0; display: none">
                            <label style="width: 100%" for="csv_upload">Select CSV File</label>
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 v-if="headers.length">
                <v-card hover>
                    <v-card-title>
                        Data from: <pre class="ml-1">{{fileName}}</pre>
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

        </v-layout>
    </v-container>
</template>

<script>
    import Papa from 'papaparse';

    export default {
        data: () => ({
            search: '',
            headers: [],
            items: [],
            fileName: ""
        }),
        mounted() {
            const self = this;

            document.querySelector('#csv_upload').addEventListener('change', (e) => {
                self.headers = [];
                self.items = [];

                self.fileName = e.target.files[0].name;

                console.time('parsing');

                Papa.parse(e.target.files[0], {
                    header: true,
                    step: function(results) {
                        if(!self.headers.length) results.meta.fields.forEach((field) => {
                            self.headers.push({text: field, value: field});
                        });

                        results.data
                            .filter(row => results.meta.fields.every(field => row.hasOwnProperty(field)))
                            .forEach(row => {
                                self.items.push(row);
                            })
                    },
                    complete: function(results) {
                        console.timeEnd('parsing');
                    }
                });
            })
        }
    }
</script>