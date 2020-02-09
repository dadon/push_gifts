<template>
    <div class="row">
        <div class="col-sm-12">
            <h2>Users list</h2>
            <table class="users-list">
                <thead>
                <tr>
                    <th>created</th>
                    <th>user</th>
                    <th>balance</th>
                    <th>lang</th>
                    <th>country</th>
                    <th>spend</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.userId">
                    <td data-label="created">{{ formatDate(user.created) }}</td>
                    <td data-label="user">{{ user.email }} {{ user.phone }}</td>
                    <td data-label="balance">{{ user.balance }}</td>
                    <td data-label="lang">{{ user.userLocale.lang }}</td>
                    <td data-label="country">{{ user.userLocale.country }}</td>
                    <td data-label="spend">{{ formatSpend(user) }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { formatDistance } from "date-fns";

    export default {
        props: {
            users: Array,
        },

        methods: {
            formatDate(date) {
                return formatDistance(date, new Date());
            },

            formatSpend(user) {
                if (user.spendRecords && user.spendRecords.length) {
                    return user.spendRecords.map(el => el.type).join(", ");
                }
                return "-";
            },
        },
    };
</script>

<style scoped>
    table.users-list {
        height: auto;
        max-height: 1200px;
    }
</style>
