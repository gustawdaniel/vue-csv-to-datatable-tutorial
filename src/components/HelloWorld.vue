<template>
    <v-container>
        <v-layout text-xs-center wrap>

            <v-flex xs12 mb-4>
                <v-card hover>
                    <v-card-title primary-title class="justify-center">
                        <h1 class="display-2 font-weight-thin">CSV to DataTable</h1>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn block color="success">Select CSV File</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 v-if="headers.length">
                <v-card hover>
                    <v-card-title>
                        Data
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
    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'Header', value: 'name' }
            ],
            items: [
                { name: 'Value' }
            ]
        })
    }
</script>