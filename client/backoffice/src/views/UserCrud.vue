<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, reactive, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { mapState, mapGetters, mapMutations, mapActions } from '../store/map-state';

const users = reactive([]);
const userDialog = ref(false);
const deleteUserDialog = ref(false);
const deleteUsersDialog = ref(false);
const user = ref({});
const selectedUsers = ref(null);
const selectedRole = ref(null);
const selectedStatus = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = [
    { label: 'Vérifié', value: true },
    { label: 'Non vérifié', value: false },
];
const roles = [
    { label: 'USER_ADMIN', value: 'USER_ADMIN' },
    { label: 'USER_CLIENT', value: 'USER_CLIENT' },
];
const toast = useToast();

onBeforeMount(async () => {
    initFilters();
    const response = await fetch('http://localhost:3000/users', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    const data = await response.json();
    users.push(...data);
    // console.log(Array.from(users)[0]);
});

async function deleteUser(userId) {
    try {
        const response = await fetch('http://localhost:3000/users/' + userId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.status === 204) {
            users.splice(users.indexOf(userId), 1);
            deleteUserDialog.value = false;
            toast.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé', life: 3000 });
        }
    } catch (error) {
        console.error(error);
    }
}

async function editUser(editUser) {
    editUser.role = selectedRole.value.value; // update role
    editUser.compteIsVerified = selectedStatus.value.value; // update status
    const response = await fetch('http://localhost:3000/users/' + editUser.id, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editUser)
    });
    console.log(JSON.stringify(editUser), response);
    if (response.ok) {
        users.splice(users.findIndex((_u) => _u.id === editUser.id), 1, await response.json());
        userDialog.value = false;
        toast.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur modifié', life: 3000 });
    } else if (response.status === 422) {
        throw await response.json();
    } else {
        throw new Error('Error while fetching');
    }
}

const hideDialog = () => {
    submitted.value = false;
    userDialog.value = false;
}

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }
}

const exportCSV = () => {
    dt.value.exportCSV();
}

function confirmEditUser(editUser) {
    userDialog.value = true;
    user.value = editUser;
    selectedRole.value = roles.filter(el => el.value === editUser.role)[0];
    selectedStatus.value = statuses.filter(el => el.value === editUser.compteIsVerified)[0];
}

// one user
const confirmDeleteUser = (deleteUser) => {
    user.value = deleteUser;
    deleteUserDialog.value = true;
    console.log(user.value.id);
}

// many users
const confirmDeleteSelected = () => {
    deleteUsersDialog.value = true;
}

const { loginAsUser } = mapActions('loginAsUser');
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <!-- <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
                            <Button label="Supprimer" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Exporter" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="users"
                    v-model:selection="selectedUsers"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Afficher de {first} à {last} sur {totalRecords} utilisateurs"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Gestion d'utilisateurs</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Rechercher..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="nom" header="Nom" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nom</span>
                                {{ slotProps.data.firstname }}
                        </template>
                    </Column>
                    <Column field="prenom" header="Prénom" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Prénom</span>
                            {{ slotProps.data.lastname }}
                        </template>
                    </Column>
                    <Column field="email" header="Email" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Email</span>
                            {{ slotProps.data.email }}
                        </template>
                    </Column>
                    <Column field="societe" header="Société" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Société</span>
                            {{ slotProps.data.societe }}
                        </template>
                    </Column>
                    <Column field="urlsite" header="Url Site" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">URL site</span>
                            {{ slotProps.data.urlsite }}
                        </template>
                    </Column>
                    <Column field="compteIsVerified" header="Statut" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Statut</span>
                            <div v-if="slotProps.data.compteIsVerified">
                                <Tag severity="success" value="Vérifié"></Tag>
                            </div>
                            <div v-else>
                                <Tag severity="danger" value="Non vérifié"></Tag>
                            </div>
                        </template>
                    </Column>
                    <Column field="appId" header="AppID" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">App ID</span>
                            {{ slotProps.data.appId }}
                        </template>
                    </Column>
                    <Column field="role" header="Role" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Role</span>
                            {{ slotProps.data.role }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="confirmEditUser(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteUser(slotProps.data)" />
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-info mt-2" @click="loginAsUser(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="userDialog" :style="{ width: '450px' }" header="Ajouter un utilisateur" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="lastname">Nom</label>
                        <InputText id="lastname" v-model.trim="user.lastname" required="true" autofocus :class="{ 'p-invalid': submitted && !user.lastname }" />
                        <small class="p-invalid" v-if="submitted && !user.lastname">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="firstname">Prénom</label>
                        <InputText id="firstname" v-model.trim="user.firstname" required="true" autofocus :class="{ 'p-invalid': submitted && !user.firstname }" />
                        <small class="p-invalid" v-if="submitted && !user.firstname">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{ 'p-invalid': submitted && !user.email }" />
                        <small class="p-invalid" v-if="submitted && !user.email">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="firstname">Société</label>
                        <InputText id="firstname" v-model.trim="user.societe" required="true" autofocus :class="{ 'p-invalid': submitted && !user.societe }" />
                        <small class="p-invalid" v-if="submitted && !user.societe">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="urlsite">URL site</label>
                        <InputText id="urlsite" v-model.trim="user.urlsite" required="true" autofocus :class="{ 'p-invalid': submitted && !user.urlsite }" />
                        <small class="p-invalid" v-if="submitted && !user.urlsite">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="compteIsVerified" class="mb-3">Compte statut</label>
                        <Dropdown id="compteIsVerified" v-model="selectedStatus" :options="statuses" optionLabel="label" placeholder="Sélectionner un statut">
                            <template #value="slotProps">
                                <div v-if="slotProps.value">
                                    <span>{{ slotProps.value.label }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field">
                        <label for="appId">App ID</label>
                        <InputText id="appId" v-model.trim="user.appId" required="true" autofocus :class="{ 'p-invalid': submitted && !user.appId }" />
                        <small class="p-invalid" v-if="submitted && !user.appId">Champ obligatoire.</small>
                    </div>
                    <div class="field">
                        <label for="role" class="mb-3">Rôle</label>
                        <Dropdown id="role" v-model="selectedRole" :options="roles" optionLabel="label" placeholder="Sélectionner un rôle">
                            <template #value="slotProps">
                                <div v-if="slotProps.value">
                                    <span>{{ slotProps.value.label }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    <template #footer>
                        <Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Valider" icon="pi pi-check" class="p-button-text" @click="editUser(user)" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Confirmer" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user"
                            >Etes-vous sûr de supprimer utilisateur <b>{{ user.lastname }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="Non" icon="pi pi-times" class="p-button-text" @click="deleteUserDialog = false" />
                        <Button label="Oui" icon="pi pi-check" class="p-button-text" @click="deleteUser(user.id)" />
                    </template>
                </Dialog>

                <!-- <Dialog v-model:visible="deleteUsersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user">Are you sure you want to delete the selected users?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsersDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
                    </template>
                </Dialog> -->
            </div>
        </div>
    </div>
</template>


<style lang="scss">
table td {
    vertical-align: middle;
}
</style>