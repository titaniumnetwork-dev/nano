import Head from "../components/head";
import Tabs from "../components/tabs";
import Windows from "../components/windows";
import ArrowRight from "../icons/arrow-right";
import ArrowLeft from "../icons/arrow-left";
import RotateCW from "../icons/rotate-cw";
import ViewSidebar from "../icons/view-sidebar";
import { searchURL } from "../util/searchURL";

const Home = function () {
    this.theme = localStorage.getItem("@nano/theme") || "mocha";
    this.windows = null;
    this.search = null;
    this.sidebar = localStorage.getItem("@nano/sidebar") == "true" || false;
    this.tabs = [
        {
            title: "New Tab",
        },
    ];
    this.current = 0;
    this.currentHasURL = false;

    useChange(this.sidebar, () => {
        localStorage.setItem("@nano/sidebar", String(this.sidebar));
    });

    useChange([this.search, this.current], () => {
        if (this.search) {
            if (this.tabs[this.current].hasOwnProperty("url")) {
                this.search.value = this.tabs[this.current].url;
            } else {
                this.search.value = "";
            }
        }
    });

    useChange(this.current, () => {
        this.currentHasURL = this.tabs[this.current].hasOwnProperty("url");
    });

    const createIFrame = async (tab) => {
        const newIFrame = document.createElement("iframe");
        newIFrame.src = await searchURL(tab.url);
        newIFrame.classList = "window h-full w-full";
        newIFrame.dataset.current = "true";
        this.windows.appendChild(newIFrame);

        return newIFrame;
    };

    const searchKeydown = async (e) => {
        if (e.key == "Enter" && window.chemicalLoaded && e.target.value) {
            this.tabs[this.current].url = e.target.value;

            if (this.tabs[this.current].hasOwnProperty("iframe")) {
                this.tabs[this.current].iframe.src = await searchURL(
                    this.tabs[this.current].url,
                );
            } else {
                this.tabs[this.current].iframe = await createIFrame(
                    this.tabs[this.current],
                );
                this.currentHasURL = true;
            }
        }
    };

    const back = () => {
        if (
            this.tabs[this.current] &&
            this.tabs[this.current].hasOwnProperty("iframe") &&
            this.tabs[this.current].iframe.contentWindow
        ) {
            if (
                !this.tabs[this.current].iframe.contentWindow.navigation ||
                this.tabs[this.current].iframe.contentWindow.navigation
                    .canGoBack
            ) {
                this.tabs[this.current].iframe.contentWindow.history.back();
            }
        }
    };

    const forward = () => {
        if (
            this.tabs[this.current] &&
            this.tabs[this.current].hasOwnProperty("iframe") &&
            this.tabs[this.current].iframe.contentWindow
        ) {
            this.tabs[this.current].iframe.contentWindow.history.forward();
        }
    };

    const reload = () => {
        if (
            this.tabs[this.current] &&
            this.tabs[this.current].hasOwnProperty("iframe") &&
            this.tabs[this.current].iframe.contentWindow
        ) {
            try {
                this.tabs[this.current].iframe.contentWindow.location.reload();
            } catch {
                this.tabs[this.current].iframe.src += "";
            }
        }
    };

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

    const updateTitles = () => {
        for (let tab of [...document.querySelectorAll(".tab")]) {
            tab.dispatchEvent(new Event("nanoUpdateTitle"));
        }
    };

    setInterval(() => {
        if (this.tabs[this.current].hasOwnProperty("iframe")) {
            let newLocation =
                this.tabs[this.current].iframe.contentWindow.location;
            if (!newLocation.href.startsWith("about:")) {
                let decodedLocation = window.__uv$config.decodeUrl(
                    newLocation.pathname.split(window.__uv$config.prefix)[1],
                );

                if (decodedLocation !== this.tabs[this.current].url) {
                    this.tabs[this.current].url = decodedLocation;
                    this.search.value = decodedLocation;
                }

                let newTitle =
                    this.tabs[this.current].iframe.contentWindow.document.title;
                if (newTitle !== this.tabs[this.current].title) {
                    this.tabs[this.current].title =
                        newTitle || this.tabs[this.current].url;
                    updateTitles();
                }
            }
        }
    }, 1000);

    return (
        <div>
            <Head bind:theme={use(this.theme)} />
            <Tabs
                bind:current={use(this.current)}
                bind:iframes={use(this.windows)}
                bind:tabs={use(this.tabs)}
                bind:sidebar={use(this.sidebar)}
            />
            <Windows
                bind:windows={use(this.windows)}
                bind:current={use(this.current)}
                bind:search={use(this.search)}
                bind:currentHasURL={use(this.currentHasURL)}
                bind:tabs={use(this.tabs)}
                bind:sidebar={use(this.sidebar)}
            />
            <div class="flex justify-center fixed bottom-0 right-0 left-0">
                <div class="flex items-center flex-1 gap-2 bg-Base rounded-[26px] p-1.5 my-2 mx-5 max-w-3xl shadow">
                    <button
                        on:click={() => (this.sidebar = !this.sidebar)}
                        aria-label="Toggle Sidebar"
                        class="sidebar-animation h-8 w-8 rounded-full flex justify-center items-center mx-1 bg-Surface0 p-2"
                    >
                        <ViewSidebar class="sidebar-animated" />
                    </button>
                    <input
                        autofocus
                        bind:this={use(this.search)}
                        on:keydown={searchKeydown}
                        placeholder="Search or Type URL"
                        class="flex-1 border-0 bg-transparent outline-none h-10 w-full placeholder:select-none placeholder:text-Subtext0"
                    />
                    <button
                        on:click={back}
                        aria-label="Back"
                        class="left-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <ArrowLeft class="left-animated" />
                    </button>
                    <button
                        on:click={forward}
                        aria-label="Forward"
                        class="right-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <ArrowRight class="right-animated" />
                    </button>
                    <button
                        on:click={reload}
                        aria-label="Reload"
                        class="rotate-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <RotateCW class="rotate-animated" />
                    </button>
                    {/*
                    <button on:click={() => changeTheme("mocha")}>
                        Set Mocha
                    </button>
                    <button on:click={() => changeTheme("macchiato")}>
                        Set Macchiato
                    </button>
                    <button on:click={() => changeTheme("frappe")}>
                        Set Frappe
                    </button>
                    <button on:click={() => changeTheme("latte")}>
                        Set Latte
                    </button>
                    <button on:click={() => changeTheme("green")}>
                        Set Green
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
};

export default Home;
