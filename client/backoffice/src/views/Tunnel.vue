<script setup>
import Header from "@/components/ClientHeader.vue";
import { FilterMatchMode } from "primevue/api";
import {
  ref,
  onMounted,
  onBeforeMount,
  reactive,
  computed,
  watchEffect,
} from "vue";
import { useToast } from "primevue/usetoast";
import { mapGetters } from "../store/map-state";

const tunnelDialog = ref(false);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const toast = useToast();
const tags = ref([[], []]);
const commentaire = ref(null);
const tunnels = reactive([]);
const selectedTunnels = ref(null);
const tunnel = ref({});
const { isLoggedInAsUser, currentUser } = mapGetters("loginAsUser");
const user = ref({});
if (isLoggedInAsUser.value) {
  user.value = currentUser.value;
} else {
  user.value = JSON.parse(localStorage.getItem("user"));
}

async function getUsersTags(userId) {
  try {
    const accessToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + `/users/${userId}/tags`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    }
    tags.value[0] = await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTunnel() {
  try {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(import.meta.env.VITE_SERVER_URL + `/tunnels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        commentaire: commentaire.value,
        id_user: user.value.id,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    } else {
      const accessToken = localStorage.getItem("token");
      const data = await response.json();
      if (data) {
        // now post tunnel_tag
        tags.value[1].forEach(async (item, idx) => {
          const response2 = await fetch(import.meta.env.VITE_SERVER_URL + `/tunneltag/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              id_tunnel: data.id,
              id_tag: item.id,
              ordre: idx,
            }),
          });

          const data2 = await response2.json();
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserTunnels(userId) {
  try {
    const accessToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + `/users/${userId}/tunnels/`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    }
    tunnels.length = 0;
    tunnels.push(...(await response.json()));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editTunnel(editTunnel) {
  const accessToken = localStorage.getItem("token");
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/tunnels/${editTunnel.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaire: editTunnel.commentaire }),
    }
  );
  if (response.ok) {
    tunnels.splice(
      tunnels.findIndex((_t) => _t.id === editTunnel.id),
      1,
      await response.json()
    );
    tunnelDialog.value = false;
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: `Tunnel ${editTunnel.commentaire} modifié avec succès`,
      life: 3000,
    });
  } else if (response.status === 422) {
    throw await response.json();
  } else {
    throw new Error(
      `erreur serveur (${response.status} ${response.statusText})`
    );
  }
}

onBeforeMount(async () => {
  initFilters();
  getUsersTags(user.value.id);
  getUserTunnels(user.value.id);
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

const hideDialog = () => {
  submitted.value = false;
  tunnelDialog.value = false;
};

function confirmEditTunnel(editTunnel) {
  tunnelDialog.value = true;
  tunnel.value = editTunnel;
}
</script>

<template>
  <Header />
  <Toast />
  <div class="card">
    <div class="my-2">
      <PickList v-model="tags" listStyle="height:342px">
        <template #sourceheader> Tags valables </template>
        <template #targetheader> Tags sélectionnés </template>
        <template #item="slotProps">
          <div>
            <span>{{ slotProps.item.commentaire }}</span>
          </div>
        </template>
      </PickList>
      <br />
      <div class="row">
        <div class="col-12">
          <InputText type="text" v-model="commentaire" />
        </div>
        <div class="col-12">
          <Button
            label="Ajouter le tunnel"
            icon="pi pi-plus"
            class="p-button-success"
            @click="createTunnel()"
          />
        </div>
      </div>

      <br />

      <DataTable
        ref="dt"
        :value="tunnels"
        v-model:selection="selectedTunnels"
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
          <div
            class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
          >
            <h5 class="m-0">Gestion de tunnels</h5>
            <span class="block mt-2 md:mt-0 p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Rechercher..."
              />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="commentaire"
          header="Commentaire"
          :sortable="true"
          headerStyle="width:20%; min-width:10rem;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Commentaire</span>
            {{ slotProps.data.commentaire }}
          </template>
        </Column>
        <Column
          field="createdAt"
          header="Créer le"
          :sortable="true"
          headerStyle="width:20%; min-width:10rem;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Prénom</span>
            {{ slotProps.data.createdAt }}
          </template>
        </Column>
        <Column
          field="updatedAt"
          header="Modifier le"
          headerStyle="width:20%; min-width:18rem;"
        >
          <template #body="slotProps">
            <span class="p-column-title">Email</span>
            {{ slotProps.data.updatedAt }}
          </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mt-2"
              @click="confirmEditTunnel(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>

      <Dialog
        v-model:visible="tunnelDialog"
        :style="{ width: '450px' }"
        header="Modifier le tunnel"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <label for="commentaire">Commentaire</label>
          <InputText
            id="commentaire"
            v-model.trim="tunnel.commentaire"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !tunnel.commentaire }"
          />
          <small class="p-invalid" v-if="submitted && !tunnel.commentaire"
            >Champ obligatoire.</small
          >
        </div>
        <template #footer>
          <Button
            label="Annuler"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Valider"
            icon="pi pi-check"
            class="p-button-text"
            @click="editTunnel(tunnel)"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss">
table td {
  vertical-align: middle;
}
</style>
