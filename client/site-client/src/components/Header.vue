<template lang="">
  <div class="card">
    <TabMenu :model="items" />
    <router-view />
  </div>
</template>
<script>
import TabMenu from "primevue/tabmenu";
export default {
  name: "Header",
  components: {
    TabMenu,
  },
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Contact",
          icon: "pi pi-fw pi-calendar",
          to: "/contact",
        },
        {
          label: "Documentation",
          icon: "pi pi-fw pi-book",
          to: "/documentation",
        },
        {
          label: "Mention légale",
          icon: "pi pi-fw pi-info-circle",
          to: "/mention-legale",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.navbar {
  border-bottom: 2px solid orangered;
}
</style>
