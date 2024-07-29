const Head = function () {
    useChange(this.theme, () => {
        document.body.dataset.theme = this.theme;
        localStorage.setItem("@nano/theme", this.theme);
    });

    useChange(this.cloakTitle, () => {
        if (this.cloakTitle) {
            document.title = this.cloakTitle;
        } else {
            document.title = "nano.";
        }
        localStorage.setItem("@nano/cloak/title", this.cloakTitle);
    });

    useChange(this.cloakIcon, () => {
        if (this.cloakIcon) {
            window.document.querySelector("link[rel='icon']").href =
                this.cloakIcon;
        } else {
            window.document.querySelector("link[rel='icon']").href =
                "/logo.svg";
        }
        localStorage.setItem("@nano/cloak/icon", this.cloakIcon);
    });

    return <div></div>;
};

export default Head;
