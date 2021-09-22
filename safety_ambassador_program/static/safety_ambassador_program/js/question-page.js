let currentPage = 0 // pages start from 0

const nextPage = () => {
    currentPage++;
}

const previousPage = () => {
    currentPage--;
}

const submit = (answer) => {
    if (answer.length() > 10) {
        ++currentPage;
    }
}