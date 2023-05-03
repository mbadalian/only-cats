import https from "../helpers/https";

class CatsDataService {
    getByAmount(amount) {
        return https.get(`/images/search?limit=${amount}`)
    };
    getBreeds() {
        return https.get(`/breeds`)
    };
    getByBreed(breed, amount=1) {
        return https.get(`/images/search?limit=${amount}&breed_ids=${breed}`)
    }
}
export default new CatsDataService();
