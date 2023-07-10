export default {
    install(VueInstance, options) {

        //check si l'appID se trouve en base de données et si il appartient à un site existant.
        VueInstance.directive('tracker', (el, binding) => {
            if (binding.modifiers.click) {
                //tracker tout les boutons du site-client.
                el.addEventListener("click", () => {
                    switch (binding.arg) {
                        case 'BUTTONA':
                            console.log("click", binding.arg, binding.modifiers);
                            break;
                        case 'BUTTONB':
                            console.log("click", binding.arg, binding.modifiers);
                            break;
                        case 'FORMA' : 
                        console.log("Form A submited", binding.arg, binding.modifiers);
                    }
                });
            }
        })
    }
}
