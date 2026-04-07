async function api<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Falha ao buscar dados em ${url}`);
    }
    return await response.json();
}

export default api; 