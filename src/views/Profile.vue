<template>
<div>
    
    <div class="mt-3 d-flex justify-content-center">
        <b-card :img-src="require('../assets/img/clipart4.png')" border-variant="white" style="max-width: 500px; min-height: 200px;" img-alt="Card image" img-top>
        <b-card-body title="Thank you for flying with us!" class="d-flex justify-content-center"></b-card-body>
        </b-card>
    </div>

    <b-container class="rounded" style="background-color: rgba(0, 0, 0, 0.6); max-width: 1200px; max-height: 300px;">
        <b-row cols="4">
        <b-col>
        <b-avatar size="150px" class="mx-5 my-2" variant="light"></b-avatar>
        </b-col>
        <b-col class="mt-5">
            <b-form-input disabled placeholder="First Name"></b-form-input>
        </b-col>
        <b-col class="mt-5">
            <b-form-input disabled placeholder="Last Name"></b-form-input>
        </b-col>
        <b-col class="mt-5">
            <b-form-input disabled placeholder="Age"></b-form-input>
        </b-col>
        </b-row>
    </b-container>

    <div class="mt-5 d-flex justify-content-center">
    <b-table id="table" class="text-white text-center table-dark" style="background-color: rgba(0, 0, 0, 0.7); max-width: 1300px;"
    striped :items="ticketList" :fields="fields">
    <template #cell(delete)="row">
        <b-button class="btn btn-danger" title="Delete" id="delete" type="submit" @click="deleteTicket(row)">
        <b-icon class="delete-btn" icon="trash-fill"></b-icon>
        </b-button>
    </template>
    </b-table>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            ticket: {
                ticket_id: "",
                country_id: "",
                city_id: "",
                user_id: "",
                fName: "",
                lName: "",
                date: "",
            },
            ticketList:[],
            fields: [
        {
          key: "fName",
          label: "First Name",
        },
        {
          key: "lName",
          label: "Last Name",
        },
        {
          key: "country_name",
          label: "Country",
          sortable: true,
        },
        {
          key: "city_name",
          label: "City",
          sortable: true,
        },
        {
          key: "date",
          label: "Departure Date",
          formatter: (value) => {
            return moment(value).format("MMM DD, YYYY");
          },
        },
        {
          key: "ticket_number",
          label: "Ticket Number",
        },
      ],
        };
    }
}
</script>
 
<style>

</style>
