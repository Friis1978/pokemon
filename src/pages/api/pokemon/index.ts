export default async function handle(req, res) {
  const { id, name, limit } = req.body;
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  const PAGE_LIMIT = 100;

  const uri = name
    ? `${API_URL}/${name}`
    : id ? `${API_URL}/${id}` : `${API_URL}?limit=${limit ? limit : PAGE_LIMIT}`;
    
  await fetch(uri)
    .then((response) => response.json())
    .then((data) => res.status(200).json({ data }));
}
