<script setup>
import { ref, onMounted } from "vue";

let appEvents = ref([]);
const user = JSON.parse(localStorage.getItem("user"));
const pageSize = ref(10); // Number of events per page
const pageNumber = ref(1);
let nbPages = ref(0); // Initialize the variable
let nbTotalEvents = ref(0);
const currentPage = ref(0);
onMounted(async () => {
  try {
    appEvents.value = await getEvents();
    console.log("eventsss" + appEvents);
    nbPages.value = await getNbPages();
    //check for event changes
    checkEventChange();
  } catch (error) {
    console.error(error);
  }
});

function convertDate(dateStr) {
  const date = new Date(dateStr);

  const jour = date.getDate();
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();

  const heures = date.getHours();
  const minutes = date.getMinutes();
  const secondes = date.getSeconds();

  const dateFrancaise = `${jour}/${mois}/${annee}`;
  const heureFrancaise = `${heures}:${minutes}:${secondes}`;
  return dateFrancaise + " " + heureFrancaise; // Add a space between date and time
}

function getPageName(url) {
  if (url) {
    const parts = url.split("/");
    let lastPart = parts[parts.length - 1];

    if (lastPart === "") {
      lastPart = "/Accueil";
    }

    return lastPart;
  }
}

async function getEvents() {
    const accessToken = localStorage.getItem('token');
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

      console.log(import.meta.env.VITE_SERVER_URL + `/events/?appId=${user.appId}&orderDesc=true&page_size=${pageSize.value}&page_number=${pageNumber.value}`);
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/events/?appId=${user.appId}&orderDesc=true&page_size=${pageSize.value}&page_number=${pageNumber.value}`,
            requestOptions
        );
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getEventsCount() {
  const accessToken = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL +
        `/events/count/?appId=${user.appId}&orderDesc=true&periode=year`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getNbPages() {
  //nb page possible pour la pagination
  const nbPagesObject = await getEventsCount();
  if (nbPagesObject[0]["count"]) {
    nbTotalEvents.value = nbPagesObject[0]["count"];
    nbPages.value = Math.ceil(nbTotalEvents.value / pageSize.value);
    return nbPages.value;
  }
}

async function changePage(event) {
  const selectedPageNumber = event;
  currentPage.value =
    selectedPageNumber.originalTarget.getAttribute("aria-label");

  if (Number.isInteger(parseInt(currentPage.value))) {
    pageNumber.value = currentPage.value;
    appEvents.value = await getEvents();
  }
}

function checkEventChange() {
  const eventSource = new EventSource(
    import.meta.env.VITE_SERVER_URL + "/watch/events"
  );

  eventSource.onopen = function () {
    console.log("Connexion établie.");
  };

  eventSource.onerror = function (event) {
    console.error("Erreur de connexion :", event);
    eventSource.close();
  };

  eventSource.onmessage = async function (event) {
    if (event) {
      appEvents.value = await getEvents();
      nbPages.value = await getNbPages();
    }
  };
}
</script>
<template>
  <div class="card mb-5">
    <table class="table full is-fullwidth is-hoverable is-bordered">
      <thead>
        <tr>
          <th>Type d'évènement</th>
          <th>Tag</th>
          <th>Lien</th>
          <th>Date création</th>
          <th>Dernière Modification</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in appEvents" :key="event._id">
          <td>{{ event.type }}</td>
          <td>{{ event.data.tag }}</td>
          <td>
            <a :href="getPageName(event.data.page)">{{
              getPageName(event.data.page)
            }}</a>
          </td>
          <td>{{ convertDate(event.createdAt) }}</td>
          <td>{{ convertDate(event.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="">
      <Paginator
        @click="changePage"
        :rows="nbPages"
        :totalRecords="nbTotalEvents"
      ></Paginator>
    </div>
  </div>
</template>

<style lang="scss">
.table th:not([align]) {
  text-align: center;
}
</style>
