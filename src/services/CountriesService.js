import RequestInterceptorService from "./RequestInterceptorService";

class CountriesService {

    async searchCountry(query) {
        let url = "https://restcountries.eu/rest/v2/name/" + query
        let response = await RequestInterceptorService.doRequest(url);
        let data = []
        if (response?.isSuccess) {
            data = response.data
        }
        return data
    }
}

export default new CountriesService();
