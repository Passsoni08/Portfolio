
//Consumindo API do Fork
// api.js
async function fetchProfileData() {
    const url = './data/profile.json'  // caminho local
    const fetching = await fetch(url)
    return await fetching.json()
}
