async function searchURL(
    input,
    searchEngine = "https://www.google.com/search?q=%s",
) {
    return await window.chemical.encode(input, {
        autoHttps: true,
        searchEngine,
    });
}

export { searchURL };
