const Settings = function () {
    let themeChangingTimeout;
    const changeTheme = (newTheme) => {
        if (typeof themeChangingTimeout === "number") {
            clearTimeout(themeChangingTimeout);
        }
        document.body.dataset.themeChanging = "true";
        themeChangingTimeout = setTimeout(() => {
            document.body.dataset.themeChanging = "false";
        }, 600);
        this.theme = newTheme;
    };

    return (
        <div
            class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-2 sidebar"
            class:sidebar-open={use(this.sidebar)}
            class:hidden={use(
                this.sidebarPage,
                (sidebarPage) => sidebarPage !== "settings",
            )}
        >
            <button on:click={() => changeTheme("mocha")}>Set Mocha</button>
            <button on:click={() => changeTheme("macchiato")}>
                Set Macchiato
            </button>
            <button on:click={() => changeTheme("frappe")}>Set Frappe</button>
            <button on:click={() => changeTheme("latte")}>Set Latte</button>
            <button on:click={() => changeTheme("green")}>Set Green</button>
        </div>
    );
};

export default Settings;
