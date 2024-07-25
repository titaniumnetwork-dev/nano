async function searchURL(
    input,
    searchEngine = "https://www.google.com/search?q=%s",
) {
    if (input.match(/^https?:\/\//)) {
        return await chemicalEncode(input);
    } else if (input.includes(".") && !input.includes(" ")) {
        return await chemicalEncode("https://" + input);
    } else {
        return await chemicalEncode(
            searchEngine.replace("%s", encodeURIComponent(input)),
        );
    }
}

export { searchURL };
