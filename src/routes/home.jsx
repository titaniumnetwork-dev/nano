import Head from "../components/head";
import Tabs from "../components/tabs";
import Windows from "../components/windows";
import ArrowRight from "../icons/arrow-right";
import ArrowLeft from "../icons/arrow-left";
import RotateCW from "../icons/rotate-cw";
import ViewSidebar from "../icons/view-sidebar";

const Home = function () {
    this.theme = "mocha";
    this.url = "";
    this.windows = null;
    this.search = null;
    this.sidebar = false;
    this.tabs = [
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
            current: true,
            url: "https://example.com/",
        },
    ];
    this.current = this.tabs.filter((tab) => tab.current)[0];
    this.currentHasURL = false;

    useChange(this.current, () => {
        this.currentHasURL = this.current.hasOwnProperty("url");
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
            this.current.url = await window.chemicalEncode(e.target.value);

            if (this.current.hasOwnProperty("iframe")) {
                this.current.iframe.src = this.current.url;
            } else {
                this.current.iframe = createIFrame(this.current);
            }
        }
    };

    const back = () => {
        if (this.current && this.current.hasOwnProperty("iframe") && this.current.iframe.contentWindow) {
            if (this.current.iframe.contentWindow.navigation.canGoBack) {
                this.current.iframe.contentWindow.history.back();
            }
        }
    };

    const forward = () => {
        if (this.current && this.current.hasOwnProperty("iframe") && this.current.iframe.contentWindow) {
            this.current.iframe.contentWindow.history.forward();
        }
    };

    const reload = () => {
        if (this.current && this.current.hasOwnProperty("iframe") && this.current.iframe.contentWindow) {
            try {
                this.current.iframe.contentWindow.location.reload();
            } catch {
                this.current.iframe.src += "";
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
                        class="flex-1 border-0 bg-transparent outline-0 h-10 w-full placeholder:select-none placeholder:text-Subtext0"
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
                </div>
            </div>
            {/*
            <p>Theme is {use(this.theme)}</p>
            <button on:click={()=> this.theme = "dark"}>Set Dark</button>
            <button on:click={()=> this.theme = "light"}>Set Light</button>
            */}
        </div>
    );
};

export default Home;
