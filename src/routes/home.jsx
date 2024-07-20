import Head from "../components/head";
import Tabs from "../components/tabs";
import Windows from "../components/windows";
import ArrowRight from "../icons/arrow-right";
import ArrowLeft from "../icons/arrow-left";
import RotateCW from "../icons/rotate-cw";
import ViewSidebar from "../icons/view-sidebar";

const Home = function () {
    this.theme = localStorage.getItem("@nano/theme") || "mocha";
    this.windows = null;
    this.search = null;
    this.sidebar = false;
    this.tabs = [
        {
            title: "New Tab",
            current: true,
        },
        {
            title: "Arc",
            current: false,
            url: "https://arc.net/",
        },
        {
            title: "GitHub",
            current: false,
            url: "https://github.com/",
        },
        {
            title: "Example",
            current: false,
            url: "https://example.com/",
        },
    ];
    this.current = this.tabs.findIndex((tab) => tab.current);
    this.currentHasURL = false;

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
        newIFrame.src = await chemicalEncode(tab.url);
        newIFrame.classList = "window h-full w-full";
        newIFrame.dataset.current = tab.current;
        this.windows.appendChild(newIFrame);

        return newIFrame;
    };

    const searchKeydown = async (e) => {
        if (e.key == "Enter" && window.chemicalLoaded && e.target.value) {
            this.tabs[this.current].url = e.target.value;

            if (this.tabs[this.current].hasOwnProperty("iframe")) {
                this.tabs[this.current].iframe.src =
                    this.tabs[this.current].url;
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
                    <button on:click={() => (this.theme = "mocha")}>
                        Set Mocha
                    </button>
                    <button on:click={() => (this.theme = "macchiato")}>
                        Set Macchiato
                    </button>
                    <button on:click={() => (this.theme = "frappe")}>
                        Set Frappe
                    </button>
                    <button on:click={() => (this.theme = "latte")}>
                        Set Latte
                    </button>
                    <button on:click={() => (this.theme = "green")}>
                        Set Green
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
};

export default Home;
