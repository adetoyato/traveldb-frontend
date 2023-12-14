<template>
    <div>
        <b-table id="table" class="text-white text-center table-dark" style="background-color: rgba(0, 0, 0, 0.7); max-width: 1300px;"
        striped :items="usersList"></b-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                user_id: '',
                fName: '',
                lName: '',
                age: '',
                username: '',
                password: '',
                group: '',
            },
            perPage: 4,
            currentPage: 1,
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
                    key: "age",
                    label: "Age",
                    thStyle: {
                        width: "20px",
                    },
                },
                {
                    key: "username",
                    label: "Username",
                },
                {
                    key: "password",
                    label: "Password",
                },
                {
                    key: "delete",
                    label: "Delete"
                },
            ],
            usersList: [],
        };
    }
}
</script>

<style>

</style>