
export const UserService = {
    getUserData() {
        return this.$api.get('/user').then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }
}
