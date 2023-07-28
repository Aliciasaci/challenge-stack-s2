<template>
  <div class="stat-cards">
    <div class="box" v-for="kpi in kpis" :key="kpi._id">
      <!-- <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" class="cancel" /> -->
      <span class="card-title">{{ kpi.data.label }}</span
      ><br />
      <span class="icon-style"
        ><i class="pi pi-database text-blue-500"></i
      ></span>
      <span v-if="kpi.data.tag != ''" class="font-medium"
        >Tag : {{ kpi.data.tag.commentaire }}</span
      >
      <span v-if="kpi.data.page != ''" class="font-medium"
        >Page : {{ kpi.data.page }} </span
      ><br />
      <span
        v-if="kpi.data.date_interval != 'null - null'"
        class="font-small date"
        >{{ kpi.data.date_interval }}</span
      >
      <div class="last">
        <span class="text-1000 font-large text-xl">{{ kpi.data.count }}</span>
      </div>
    </div>
  </div>

  <div>
    <Dialog
      v-model:visible="isModalVisible"
      modal
      header="Détails"
      :style="{ width: '30vw' }"
    >
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isModalVisible = ref(false);
const kpis = ref([]);
const user = JSON.parse(localStorage.getItem("user"));

onMounted(async () => {
  kpis.value = await getUsersKpis();
});

async function getUsersKpis() {
  try {
    const accessToken = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL +
        `/widgets/?type=kpi&appId=${user.appId}&orderDesc=true`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(
        `erreur serveur (${response.status} ${response.statusText})`
      );
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
</script>

<style lang="scss">
:root {
  --box-width: calc(100% / var(--nb-cards, 1));
}

.box {
  background: var(--surface-card);
  border: white;
  padding: 2rem;
  margin: 0rem 1rem 2rem 1rem;
  box-shadow: var(--card-shadow);
  border-radius: 12px;
  flex-basis: var(--box-width);
  height: 150px;
  position: relative;
  max-width: 20rem;
  line-height: 1.8;
  padding-top: 15px;
  font-family: "Roboto", sans-serif;
  -webkit-box-shadow: 7px 6px 23px 1px rgba(0, 0, 0, 0.22);
  box-shadow: 7px 6px 23px 1px rgba(0, 0, 0, 0.041);
}

.box:last-child {
  margin-bottom: 29px;
  font-family: "Roboto", sans-serif;
}

.last {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 5rem;
  font-weight: 700;
}

.stat-cards {
  width: 82%;
  display: flex;
  margin: 2rem auto;
  justify-content: start;
  text-align: start;
  flex-wrap: wrap;
}

.card-title {
  color: #707070;
  display: inline-block;
  font-size: 1.2em;
}

.title-wrapper {
  display: flex;
  align-items: top;
  justify-content: space-between;
}

.icon-style {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #fff4fc;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 15px;
}

.voir-plus {
  position: absolute;
  right: 21px;
}

.card {
  border: white;
}

.text-blue-500 {
  color: #f63bbe !important;
}

.cancel {
  position: absolute;
  top: 1%;
  right: 9px;
}

.date {
  color: var(--grey-500) !important;
  font-size: 0.8em;
}

@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@300;400;600&family=Roboto:ital,wght@0,400;0,500;1,700&display=swap");
</style>
