const setIcon = async (index) => {
    const href =
        this.tabs[index].iframe?.querySelector("link[rel=icon]")?.href ||
        `https://${new URL(this.tabs[index].url).hostname}/favicon.ico`;
    if (href) {
        const res = await chemical.fetch(href);
        if (res.status !== 200) return;
        this.tabs[index].icon = URL.createObjectURL(await res.blob());
    }
};
export default setIcon;
