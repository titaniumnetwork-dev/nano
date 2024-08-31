async function searchURL(
    input,
    searchEngine = "https://www.google.com/search?q=%s",
) {
    return await window.chemical.encode(input, {
        service: "uv",
        autoHttps: true,
        searchEngine
    });
}

export { searchURL };
