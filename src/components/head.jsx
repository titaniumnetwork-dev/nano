const Head = function () {
    if (this.title) {
        document.title = this.title + " | nano.";
    } else {
        document.title = "nano.";
    }

    useChange(this.theme, () => {
        document.body.dataset.theme = this.theme;
        localStorage.setItem("@nano/theme", this.theme)
    });

    return <div></div>;
};

export default Head;
