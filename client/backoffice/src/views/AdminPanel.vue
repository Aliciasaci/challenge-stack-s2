<!-- <template>
    <div>
        <AdminHeader />
        <h2 class="title is-2 mt-5">Liste des Utilisateurs</h2>
        <table class="table table is-bordered  table is-hoverable  table is-striped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                    <th>Compte</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in this.users" :key="user.id">
                    <td>{{ user.nom }}</td>
                    <td>{{ user.prenom }}</td>
                    <td>{{ user.email}}</td>
                    <td v-if="user.compteIsVerified">Vérifié</td>
                    <td v-else style="color: rgb(235, 165, 27);">En attente de vérification</td>
                    <td>
                        <button class="button is-success is-small mr-1">Modifier</button>
                        <button class="button is-danger is-small  mr-1">Supprimer</button>
                        <button class="button is-small is-warning mr-1">Désactiver compte</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template> -->

<script>
const users = ref(null);
const user = ref({});

export default {
    data() {
        return {
            users: null,
        }
    },
    created() {
        this.$api.get('/users/')
            .then(response => {
                if (response.data) {
                    this.users = response.data
                    console.log(this.users);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>
<style lang="scss">
table {
    width: 80%;
    margin: auto;
    margin-top: 3%;
}

</style>