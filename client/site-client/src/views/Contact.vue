<template >
    <div class="contact">
        <Header />
        <div>
            <section class="hero">
                <div class="hero-body">
                    <p class="title">
                        Contacts
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
    components: {
        Header,
    },
    mounted(){
        const page = document.querySelector('.contact');
        if (page) {
           alert("et une visite !");
        }
    },
}
</script>
<style lang="">
    
</style>