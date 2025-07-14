
//Consumindo API do Fork
async function fetchProfileData() {
  const url = 'https://raw.githubusercontent.com/RenanJPaula/js-developer-portfolio/main/data/profile.json';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
