import Sortable from "sortablejs";
import Head from "../components/head";
import ArrowRight from "../icons/arrow-right";
import ArrowLeft from "../icons/arrow-left";
import RotateCW from "../icons/rotate-cw";
import ViewSidebar from "../icons/view-sidebar";

const Home = function () {
    this.theme = "dark";
    this.url = "";
    this.iframe = null;
    this.search = null;
    this.sidebar = false;
    this.tabs = [
        {
            title: "Arc",
            current: false,
        },
        {
            title: "GitHub",
            current: false,
        },
        {
            title: "Example",
            current: true,
        },
        {
            title: "Discord",
            current: false,
        },
    ];

    const searchKeydown = async (e) => {
        if (e.key == "Enter" && window.chemicalLoaded && e.target.value) {
            this.url = await window.chemicalEncode(e.target.value);
        }
    };

    const back = () => {
        if (this.iframe && this.iframe.contentWindow) {
            if (this.iframe.contentWindow.navigation.canGoBack) {
                this.iframe.contentWindow.history.back();
            }
        }
    };

    const forward = () => {
        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.history.forward();
        }
    };

    const reload = () => {
        if (this.iframe && this.iframe.contentWindow) {
            try {
                this.iframe.contentWindow.location.reload();
            } catch {
                this.iframe.src += "";
            }
        }
    };

    const load = (e) => {
        console.log(e.target.src);
    };

    const Tabs = function () {
        this.mount = () => {
            new Sortable(this.root.querySelector(".tabs"), {
                forceFallback: true,
                animation: 300,
                direction: "vertical",
                dragClass: "dragging",
                onSort: (e) => {
                    const newIndex = e.newIndex;
                    const oldIndex = e.oldIndex;

                    const movedItem = this.tabs.splice(oldIndex, 1)[0];
                    this.tabs.splice(newIndex, 0, movedItem);
                },
                onChoose: (e) => {
                    [...document.querySelectorAll(".tab")].forEach(
                        (tab) => (tab.dataset.current = "false"),
                    );
                    e.item.dataset.current = "true";
                    setCurrent(e.oldIndex);
                },
                onStart: () => {
                    document.body.dataset.dragging = "true";
                },
                onEnd: () => {
                    document.body.dataset.dragging = "false";
                },
            });
        };

        const newTab = () => {
            //Do not remove. Fixes tab disappearing when first tab is moved.
            this.tabs = [...this.tabs]

            for (let tab of this.tabs) {
                tab.current = false;
            }

            this.tabs = [
                {
                    title: "New Tab",
                    current: true,
                },
                ...this.tabs,
            ];
        };

        const setCurrent = (index) => {
            for (let tab of this.tabs) {
                tab.current = false;
            }

            this.tabs[index].current = true;
        };
        return (
            <div
                class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-2 sidebar"
                class:sidebar-open={use(this.sidebar)}
            >
                <button
                    on:click={() => newTab()}
                    class="bg-Crust w-full h-10 rounded-xl text-left px-4 shrink-0 tab"
                >
                    + New Tab
                </button>
                <div class="flex flex-col gap-2 overflow-y-auto tabs">
                    {use(this.tabs, (tabs) =>
                        tabs.map((tab, index) => (
                            <button
                                on:click={() => setCurrent(index)}
                                class="bg-Crust w-full h-10 rounded-xl text-left px-4 shrink-0 tab"
                                data-current={tab.current}
                            >
                                {tab.title}
                            </button>
                        )),
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Head bind:theme={use(this.theme)} />
            <Tabs bind:tabs={use(this.tabs)} bind:sidebar={use(this.sidebar)} />
            {$if(
                use(this.url),
                <iframe
                    bind:this={use(this.iframe)}
                    on:load={load}
                    src={use(this.url)}
                    class="fixed top-0 right-0 bg-Base w-full h-[calc(100%_-_4.25rem)] select-none iframe-transitions"
                    class:iframe-sidebar-open={use(this.sidebar)}
                ></iframe>,
                <div
                    class="fixed top-0 right-0 bg-Crust w-full h-[calc(100%_-_4.25rem)] flex flex-col justify-center items-center iframe-transitions"
                    class:iframe-sidebar-open={use(this.sidebar)}
                >
                    <h1 class="text-Blue text-4xl font-bold select-none">
                        nano.
                    </h1>
                    <p class="mt-1 select-none">
                        Browse the internet securely and privately.
                    </p>
                </div>,
            )}

            <div class="flex justify-center fixed bottom-0 right-0 left-0">
                <div class="flex items-center flex-1 gap-2 bg-Base rounded-[26px] p-1.5 my-2 mx-5 max-w-3xl">
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
