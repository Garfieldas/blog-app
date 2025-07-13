import { ref, onMounted } from "vue";
import { getAllAuthors } from "@/components/services/authorService";

export const useAllAuthors = () => {
    const authors = ref([]);

    const fetchrequest = async () => {
        const response = await getAllAuthors();
        const data = response.data;
        authors.value = data;
    }

    onMounted(() => {
        fetchrequest();
    })

    return authors;
}