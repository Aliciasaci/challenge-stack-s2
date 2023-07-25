
<template>
    <div class="flex justify-content-center">
        <Dialog v-model:visible="visible.visible" modal header="Header" :style="{ width: '45vw' }">
            <h5>Type de donnée *</h5>
            <div class="card flex justify-content-center choice">
                <Dropdown v-model="selectedType" :options="dataTypes" optionLabel="name" placeholder="Type de données"
                    class="w-full md:w-14rem" required />
            </div>

            <div class="card flex flex-wrap gap-3 mt-5 flex align-items-center justify-content-center choice">
                <div class="flex align-items-center">
                    <RadioButton @change=setSelectedTypePerChoice v-model="selectedTypePerChoice" name="per_tag"
                        value="per_tag" />
                    <label for="ingredient3" class="ml-2">Par Tag</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton @change=setSelectedTypePerChoice v-model="selectedTypePerChoice" name="per_page"
                        value="per_page" />
                    <label for="ingredient4" class="ml-2">Par Page</label>
                </div>
            </div>


            <div class="card flex justify-content-center choice per_page dont-show">
                <h5>La page (tracker par nom de page)</h5>
                <Dropdown v-model="selectedPage" :options="Pages" optionLabel="name" placeholder="Page" class="w-full md:w-14rem" required />
            </div>
            <div class="card flex justify-content-center choice per_tag dont-show">
                <h5>Tag</h5>
                <Dropdown v-model="selectedTag" :options="tags" optionLabel="commentaire" placeholder="Tag"
                    class="w-full md:w-14rem" required />
            </div>
            <h5>Date</h5>
            <div class="wrapper">
                <div class="card flex justify-content-center choice">
                    <Calendar v-model="date1" showIcon />
                </div>
                <div class="card flex justify-content-center choice">
                    <Calendar v-model="date2" showIcon />
                </div>
            </div>

            <h5>Taux ou valeur *</h5>
            <div class="card flex flex-wrap gap-3 mt-5 flex align-items-center justify-content-center choice">
                <div class="flex align-items-center">
                    <RadioButton @change=setSelectedTauxType v-model="choix" name="taux" value="taux" />
                    <label for="ingredient3" class="ml-2">Taux</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton @change=setSelectedTauxType v-model="choix" name="valeur_absolue" value="valeur_absolue" />
                    <label for="ingredient4" class="ml-2">Valeur absolue</label>
                </div>
            </div>



            <div class="card flex justify-content-center choice per-taux dont-show">
                <h5>Comparer à </h5>
                <Dropdown v-model="typeComparaison" optionLabel="name" placeholder="Comparer à" class="w-full md:w-14rem"
                    required />
            </div>

            <h5>Type de représentation</h5>
            <div class="card flex justify-content-center choice ">
                <Dropdown @change=setSelectedPeriodType v-model="selectedRepresentation" :options="typeGraphes"
                    optionLabel="name" placeholder="Type de graphe" class="w-full md:w-14rem" required />
            </div>


            <div
                class="card flex flex-wrap gap-3 mt-5 flex align-items-center justify-content-center choice per-representation dont-show">
                <h5>Représentation par jour / mois / année</h5>
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedPeriod" name="Jour" value="day" />
                    <label for="ingredient3" class="ml-2">Jour</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedPeriod" name="Mois" value="month" />
                    <label for="ingredient4" class="ml-2">Mois</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedPeriod" name="Année" value="year" />
                    <label for="ingredient4" class="ml-2">Année</label>
                </div>
            </div>

            <Button label="Générer" @click="createWidget()" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
const visible = defineProps(['visible']);
const user = JSON.parse(localStorage.getItem('user'));
const selectedType = ref();
const date1 = ref();
const date2 = ref();
const tags = ref([]);
const selectedTag = ref();
const selectedTypePerChoice = ref();
const selectedRepresentation = ref();
const selectedPeriod = ref();
const choix = ref();
const selectedPage = ref();
const dataTypes = ref([
    { name: 'Click', code: 'click' },
    { name: 'Soumission de formulaire', code: 'submit' },
    { name: 'Visite', code: 'visited' },
]);


const Pages = ref([
    { name: 'Accueil', raw: "http://localhost:8080/?#/"},
    { name: "Contact", raw : 'http://localhost:8080/?#/contact'},
    { name: 'Mention légale', },
]);


const typeGraphes = ref([
    { name: 'KPI', code: 'kpi' },
    { name: 'Graphe MultiAxis', code: 'multiaxis' },
    { name: 'Graphe VerticalBar', code: 'verticalbar' },
    { name: 'HeatMap', code: 'heatmap' },
]);


const typeComparaison = ref([
    { name: 'Nombre de click total', code: 'click' },
    { name: 'Nombre ', code: 'submit' },
    { name: 'HeatMap', code: 'visite' },
]);

onMounted(() => {
    getUsersTags(user.id)
});

async function setSelectedTypePerChoice() {
    const choice = selectedTypePerChoice.value;
    const tag = document.querySelector('.per_tag');
    const page = document.querySelector('.per_page');
    if (choice == "per_tag") {
        tag.classList.remove('dont-show');
        tag.classList.add('show');


        page.classList.remove('show');
        page.classList.add('dont-show');

    } else if (choice == "per_page") {
        page.classList.remove('dont-show');
        page.classList.add('show');


        tag.classList.remove('show');
        tag.classList.add('dont-show');
    }
}

async function setSelectedPeriodType() {
    const periode = document.querySelector('.per-representation');
    if (selectedRepresentation.value.name == "KPI") {
        periode.classList.remove("show");
        periode.classList.add("dont-show");
    }
    else {
        periode.classList.remove("dont-show");
        periode.classList.add("show");
    }

}

async function setSelectedTauxType() {
    const comparedTo = document.querySelector('.per-taux');
    if (choix.value == "taux") {
        comparedTo.classList.remove("dont-show");
        comparedTo.classList.add("show");
    }
    else if (choix.value == "valeur_absolue") {
        comparedTo.classList.remove("show");
        comparedTo.classList.add("dont-show");
    }
}

async function getUsersTags(userId) {

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}/tags`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        tags.value = await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createWidget() {
    let widget = null;
    let WidgetLabels = [];
    let countArray = [];
    let countTotal = null;
    const dateDebut = transformDate(date1.value) ?? null;
    const dateFin = transformDate(date2.value) ?? null;

    let data = await getEventsAccordingToChoice();
    data.forEach(element => {
        countTotal += element.count;
    });


    if (selectedRepresentation.value.code == "multiaxis" || selectedRepresentation.value.code == "verticalbar") {
        if (selectedPeriod.value == "day") {
            WidgetLabels = getAllDatesBetween(dateDebut, dateFin);

        } else if (selectedPeriod.value == "month") {
            WidgetLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        } else if (selectedPeriod.value == "year") {
            WidgetLabels = ['2020', '2021', '2023', '2024', '2025', '2026', '2O27', '2028', '2029', '2030'];
        }

        widget = {
            type: selectedRepresentation.value.code, 
            appId: user.appId,
            data: {
                labels: WidgetLabels,
                label: "nombre de " + selectedType.value.name,
                date_interval: transformDate(date1.value) + " - " + transformDate(date2.value),
                arrayData: data,
                periode : selectedPeriod.value,
            }
        }
    } else if (selectedRepresentation.value.code == "kpi") {

        widget = {
            type: "kpi",
            appId: user.appId,
            data: {
                label: "nombre de " + selectedType.value.name,
                date_interval: transformDate(date1.value) + " - " + transformDate(date2.value),
                count: countTotal,
                tag: selectedTag.value ?? '',
                page: selectedPage.value ?? ''
            }
        }
        console.log(widget);
    }

    try {
        const response = await fetch("http://localhost:3000/widgets/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(widget),
        });
        if (!response.ok) {
            throw new Error(`Server error (${response.status} ${response.statusText})`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function getEventsAccordingToChoice() {

    const dateDebut = transformDate(date1.value) ?? '';
    const dateFin = transformDate(date2.value) ?? '';
    const periode = selectedPeriod.value ?? 'day';
    let tag = '';
    let page = '';
    if(selectedTag.value){
        tag =  selectedTag.value.commentaire ?? '';
    }
    if (selectedPage.value)
    {
        page =  encodeURIComponent(selectedPage.value.raw) ?? '';
        console.log(page);
    }

    console.log(`http://localhost:3000/events/count/?type=${selectedType.value.code}&dateDebut=${dateDebut}&dateFin=${dateFin}&periode=${periode}&appId=${user.appId}&orderDesc=true&tag=${tag}&page=${page}`);
    try {
        const response = await fetch(`http://localhost:3000/events/count/?type=${selectedType.value.code}&dateDebut=${dateDebut}&dateFin=${dateFin}&periode=${periode}&appId=${user.appId}&orderDesc=true&tag=${tag}&page=${page}`);
        if (!response.ok) {
            throw new Error(`erreur serveur (${response.status} ${response.statusText})`);
        }
        const data = await response.json();
        if(data.length > 0){
            return data;
        }else{
            alert('no data found for this specific request')
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function transformDate(date) {
    if (date) {
        const dateObj = new Date(date);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();

        const numericalDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return numericalDate;
    }
    return null;
}

function getAllDatesBetween(startDate, endDate) {
    const dateList = [];
    let currentDate = new Date(startDate);

    // Loop through the dates and add them to the dateList
    while (currentDate <= endDate) {
        dateList.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateList;
}

</script>
<style lang="scss">
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        margin-bottom: 0;
    }
}

.choice {
    border: 1px solid rgb(211, 211, 211) !important;
}

.dont-show {
    display: none !important;
}

.show {
    display: block !important;
}


</style>