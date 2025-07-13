import { ref, onMounted } from "vue";
import { getAllAuthors } from "@/components/services/authorService";

export const useAllAuthors = () => {
    const authors = ref([]);

    const fetchrequest = async () => {
        const response = await getAllAuthors();
        const data = response
        authors.value = data;
    }

    onMounted(() => {
        fetchrequest();
    })

    return authors;
}