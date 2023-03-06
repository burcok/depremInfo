
import axios from "axios";
import { ref } from "vue";

const errored = ref(false);
const loading = ref(true);

const fetchLimitEarthquakes = async (limit) => {
    try {
    const response = await axios.get(
        "https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=" + limit
    );
    return response.data
    } catch (error) {
    console.error(error);
    errored.value = true;
    } finally {
    loading.value = false;
    }
};

export default { fetchLimitEarthquakes, errored, loading };
