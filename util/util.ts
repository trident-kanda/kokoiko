export const createId = () => {
    let id = ""
    for (let i = 1; i <= 9; i++) {
        id += Math.floor(Math.random() * 9) + 1;
    }
    return id
}