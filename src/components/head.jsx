const Head = function () {
    if (this.title) {
        document.title = this.title + " | nano.";
    } else {
        document.title = "nano.";
    }

    let themeChangingTimeout;

    useChange(this.theme, () => {
        if (typeof themeChangingTimeout === "number") {
            clearTimeout(themeChangingTimeout)
        }
        document.body.dataset.themeChanging = "true";
        themeChangingTimeout = setTimeout(() => {
            document.body.dataset.themeChanging = "false";
        }, 1200)
        document.body.dataset.theme = this.theme;
        localStorage.setItem("@nano/theme", this.theme)
    });

    return <div></div>;
};

export default Head;
