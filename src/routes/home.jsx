import Head from "../components/head";
import Tabs from "../components/tabs";
import Windows from "../components/windows";
import ArrowRight from "../icons/arrow-right";
import ArrowLeft from "../icons/arrow-left";
import RotateCW from "../icons/rotate-cw";
import ViewSidebar from "../icons/view-sidebar";
import SettingsIcon from "../icons/settings";
import { searchURL } from "../util/searchURL";
import Settings from "../components/settings";
import setIcon from "../util/setIcon";

const Home = function () {
    const isMac = navigator.userAgent.includes("Mac");
    this.actionKey = isMac ? "Control" : "Alt";
    this.theme = localStorage.getItem("@nano/theme") || "mocha";
    this.windows = null;
    this.search = null;
    this.sidebar = localStorage.getItem("@nano/sidebar") == "true" || true;
    this.sidebarPage = localStorage.getItem("@nano/sidebarPage") || "tabs";
    this.tabsActive = false;
    this.settingsActive = false;
    this.tabs = [
        {
            title: "New Tab",
        },
    ];
    this.current = 0;
    this.currentHasURL = false;
    this.searchEngine =
        localStorage.getItem("@nano/searchEngine") ||
        "https://www.google.com/search?q=%s";
    this.cloakTitle = localStorage.getItem("@nano/cloak/title") || "";
    this.cloakIcon = localStorage.getItem("@nano/cloak/icon") || "";

    useChange(this.searchEngine, () => {
        localStorage.setItem("@nano/searchEngine", this.searchEngine);
    });

    useChange([this.sidebar, this.sidebarPage], () => {
        this.tabsActive = this.sidebar && this.sidebarPage == "tabs";
        this.settingsActive = this.sidebar && this.sidebarPage == "settings";
    });

    useChange(this.sidebarPage, () => {
        localStorage.setItem("@nano/sidebarPage", this.sidebarPage);
    });

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
        newIFrame.src = await searchURL(tab.url, this.searchEngine);
        newIFrame.classList = "window h-full w-full";
        newIFrame.dataset.current = "true";
        newIFrame.addEventListener("load", (e) => {
            addKeybinds(e.target.contentWindow);
            interceptLinks(e.target.contentWindow);
            setIcon(this.current);

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

    const searchKeydown = async (e) => {
        if (e.key == "Enter" && window.chemical.loaded && e.target.value) {
            this.tabs[this.current].url = e.target.value;

            if (this.tabs[this.current].hasOwnProperty("iframe")) {
                this.tabs[this.current].iframe.src = await searchURL(
                    this.tabs[this.current].url,
                    this.searchEngine,
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

    const toggleSidebar = (page) => {
        if (this.sidebarPage !== page) {
            if (!this.sidebar) {
                this.sidebar = true;
            }
            this.sidebarPage = page;
        } else {
            this.sidebar = !this.sidebar;
        }
    };

    const newTab = async (title = "New Tab", url) => {
        for (let tab of this.tabs) {
            if (tab.hasOwnProperty("iframe")) {
                tab.iframe.dataset.current = "false";
            }
        }

        let createdTab = {
            title,
        };

        if (url) {
            createdTab.url = url;
        }

        this.tabs = [createdTab, ...this.tabs];

        this.current = 0;

        this.tabs = [...this.tabs];

        if (url) {
            createdTab.iframe = await createIFrame(this.tabs[this.current]);
        }
    };

    const removeTab = (index) => {
        document.body.dataset.deletingTab = "true";
        for (let tab of this.tabs) {
            if (tab.hasOwnProperty("iframe")) {
                tab.iframe.dataset.current = "false";
            }
        }

        if (this.tabs[index].iframe) {
            this.tabs[index].iframe.remove();
        }
        if (index == this.current) {
            if (index > 0) {
                this.current--;
            }
        } else if (index < this.current) {
            this.current--;
        }
        this.tabs = this.tabs.filter((_tab, i) => i !== index);
        if (this.tabs[this.current]) {
            if (this.tabs[this.current].hasOwnProperty("iframe")) {
                this.tabs[this.current].iframe.dataset.current = "true";
            }
        }
        this.tabs = [...this.tabs];
        setTimeout(() => {
            document.body.dataset.deletingTab = "false";
            if (!this.tabs.length) {
                newTab();
            }
        });
    };

    const interceptLinks = (win = window) => {
        win.open = new Proxy(win.open, {
            apply(_target, _thisArg, argArray) {
                if (argArray[0]) {
                    newTab(argArray[0], argArray[0]);
                }

                return;
            },
        });

        win.addEventListener("click", (e) => {
            if (e.target.tagName == "A" && e.target.hasAttribute("href")) {
                let isNewTab =
                    e.ctrlKey ||
                    e.shiftKey ||
                    (e.target.hasAttribute("target") &&
                        e.target.getAttribute("target").includes("_blank"));

                if (isNewTab) {
                    e.preventDefault();
                    newTab(
                        e.target.getAttribute("href"),
                        e.target.getAttribute("href"),
                    );
                }
            }
        });
    };

    const addKeybinds = (win = window) => {
        win.addEventListener("keyup", (e) => {
            const platDependentAltOrCtrl = isMac
                ? !e.altKey && e.ctrlKey
                : e.altKey && !e.ctrlKey;
            if (platDependentAltOrCtrl && !e.shiftKey && !e.metaKey) {
                e.stopPropagation();
                e.preventDefault();
                switch (e.key) {
                    case "a":
                        toggleSidebar("tabs");
                        break;
                    case "s":
                        toggleSidebar("settings");
                        break;
                    case "t":
                        newTab();
                        break;
                    case "w":
                        removeTab(this.current);
                        break;
                    case "r":
                        reload();
                        break;
                    case "n":
                        this.search.select();
                        this.search.focus();
                        break;
                    case "ArrowLeft":
                        back();
                        break;
                    case "ArrowRight":
                        forward();
                        break;
                }
            }
        });
    };

    addKeybinds();

    return (
        <div>
            <Head
                bind:theme={use(this.theme)}
                bind:cloakTitle={use(this.cloakTitle)}
                bind:cloakIcon={use(this.cloakIcon)}
            />
            <Tabs
                bind:current={use(this.current)}
                bind:iframes={use(this.windows)}
                bind:tabs={use(this.tabs)}
                bind:sidebar={use(this.sidebar)}
                bind:sidebarPage={use(this.sidebarPage)}
                bind:actionKey={use(this.actionKey)}
                newTab={newTab}
                removeTab={removeTab}
            />
            <Settings
                bind:sidebar={use(this.sidebar)}
                bind:sidebarPage={use(this.sidebarPage)}
                bind:theme={use(this.theme)}
                bind:searchEngine={use(this.searchEngine)}
                bind:cloakTitle={use(this.cloakTitle)}
                bind:cloakIcon={use(this.cloakIcon)}
            />
            <Windows
                bind:windows={use(this.windows)}
                bind:current={use(this.current)}
                bind:search={use(this.search)}
                bind:currentHasURL={use(this.currentHasURL)}
                bind:tabs={use(this.tabs)}
                bind:sidebar={use(this.sidebar)}
                bind:searchEngine={use(this.searchEngine)}
                createIFrame={createIFrame}
            />
            <div class="flex justify-center fixed bottom-0 right-0 left-0">
                <div class="flex items-center flex-1 gap-2 bg-Base rounded-[26px] p-1.5 my-2 mx-5 max-w-3xl shadow">
                    <button
                        on:click={() => toggleSidebar("tabs")}
                        aria-label="Tabs Sidebar"
                        title={use`Tabs (${this.actionKey}+A))`}
                        class="sidebar-animation h-8 w-8 rounded-full flex justify-center items-center ml-1 p-2"
                        class:bg-Surface0={use(this.tabsActive)}
                    >
                        <ViewSidebar class="sidebar-animated" />
                    </button>
                    <button
                        on:click={() => toggleSidebar("settings")}
                        aria-label="Settings Sidebar"
                        title={use`Settings (${this.actionKey}+S)`}
                        class="sidebar-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                        class:bg-Surface0={use(this.settingsActive)}
                    >
                        <SettingsIcon class="sidebar-animated" />
                    </button>
                    <div class="bg-Surface0 w-[2px] h-[calc(100%_-_1.25rem)] mr-1"></div>
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
                        title={use`Go Back (${this.actionKey}+Left)`}
                        class="left-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <ArrowLeft class="left-animated" />
                    </button>
                    <button
                        on:click={forward}
                        aria-label="Forward"
                        title={use`Go Forward (${this.actionKey}+Right)`}
                        class="right-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <ArrowRight class="right-animated" />
                    </button>
                    <button
                        on:click={reload}
                        aria-label="Reload"
                        title={use`Reload (${this.actionKey}+R)`}
                        class="rotate-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-Surface0 p-2"
                    >
                        <RotateCW class="rotate-animated" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
