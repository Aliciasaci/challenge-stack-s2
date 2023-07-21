<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

// const toast = useToast();

const users = reactive([]);
const userDialog = ref(false);
const deleteUserDialog = ref(false);
const deleteUsersDialog = ref(false);
const user = ref({});
const selectedUsers = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(async () => {
    initFilters();
    const response = await fetch('http://localhost:3000/users', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
    const data = await response.json();
    users.push(...data);
    console.log(Array.from(users)[0]);
});

onMounted(async () => {
    // const response = await fetch('http://localhost:3000/users', {
    //     headers: {
    //         Authorization: 'Bearer ' + localStorage.getItem('token')
    //     }
    // });
    // const data = await response.json();
    // users.push(...data);
});

async function deleteUser(user) {
    const response = await fetch('http://localhost:3000/users/' + user.id, {
        method: 'DELETE',
        //headers : authorization
    });
    if (response.status === 204) {
        users.splice(users.indexOf(user), 1);
    }
}

async function editUser(user) {
    const response = await fetch('http://localhost:3000/users/' + user.id, {
        method: 'PATCH',
        //headers : authorization
        body: JSON.stringify(user)
    });
    if (response.ok) {
        users.splice(users.findIndex((_u) => _u.id === user.id), 1, await response.json());
    } else if (response.status === 422) {
        throw await response.json();
    } else {
        throw new Error('Error while fetching');
    }
}

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }
}

const exportCSV = () => {
    dt.value.exportCSV();
}

const confirmDeleteSelected = () => {
    deleteUsersDialog.value = true;
}

const openNew = () => {
    user.value = {};
    submitted.value = false;
    userDialog.value = true;
}

const hideDialog = () => {
    submitted.value = false;
    userDialog.value = false;
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
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
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="edituser(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteuser(slotProps.data)" />
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
                        <label for="statut">Statut</label>
                        <InputText id="statut" v-model.trim="user.statut" required="true" autofocus :class="{ 'p-invalid': submitted && !user.statut }" />
                        <small class="p-invalid" v-if="submitted && !user.statut">Champ obligatoire.</small>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                        <Dropdown id="inventoryStatus" v-model="user.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'user-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'user-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="user.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="user.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="user.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="user.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber id="price" v-model="user.price" mode="currency" currency="USD" locale="en-US" :class="{ 'p-invalid': submitted && !user.price }" :required="true" />
                            <small class="p-invalid" v-if="submitted && !user.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber id="quantity" v-model="user.quantity" integeronly />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveuser" />
                    </template>
                </Dialog>

                <!-- <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user"
                            >Are you sure you want to delete <b>{{ user.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUserDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteuser" />
                    </template>
                </Dialog> -->

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