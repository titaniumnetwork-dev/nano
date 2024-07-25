import { searchURL } from "../util/searchURL";

const Windows = function () {
    const updateTitles = () => {
        for (let tab of [...document.querySelectorAll(".tab")]) {
            tab.dispatchEvent(new Event("nanoUpdateTitle"));
        }
    };

    const createIFrame = async (tab) => {
        const newIFrame = document.createElement("iframe");
        newIFrame.src = await searchURL(tab.url);
        newIFrame.classList = "window h-full w-full";
        newIFrame.dataset.current = "true";
        newIFrame.addEventListener("load", (e) => {
            tab.url = window.__uv$config.decodeUrl(
                e.target.contentWindow.location.pathname.split(
                    window.__uv$config.prefix,
                )[1],
            );
            if (this.search) {
                if (this.tabs[this.current].hasOwnProperty("url")) {
                    this.search.value = this.tabs[this.current].url;
                } else {
                    this.search.value = "";
                }
            }

            let newTitle = e.target.contentWindow.document.title;
            if (newTitle !== tab.title) {
                tab.title = newTitle || tab.url;
                updateTitles();
            }
        });
        this.windows.appendChild(newIFrame);

        return newIFrame;
    };

    window.addEventListener("chemicalLoaded", async () => {
        setTimeout(async () => {
            for (let tab of this.tabs) {
                if (
                    tab.hasOwnProperty("url") &&
                    !tab.hasOwnProperty("iframe")
                ) {
                    tab.iframe = await createIFrame(tab);
                }
            }
        }, 100);
    });
    return (
        <div
            bind:this={use(this.windows)}
            class="fixed top-0 right-0 bg-Crust w-full h-[calc(100%_-_4.25rem)] flex flex-col justify-center items-center select-none overflow-hidden iframe-transitions"
            class:iframe-sidebar-open={use(this.sidebar)}
        >
            <div class="block" class:hidden={use(this.currentHasURL)}>
                <h1 class="text-center text-Blue text-4xl font-bold select-none">
                    nano.
                </h1>
                <p class="text-center mt-1 select-none">
                    Browse the internet securely and privately.
                </p>
            </div>
        </div>
    );
};

export default Windows;
