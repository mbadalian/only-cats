import https from "../helpers/https";

class CatsDataService {
    getByAmount(amount) {
        return https.get(`/images/search?limit=${amount}`)
    }
}
export default new CatsDataService();
