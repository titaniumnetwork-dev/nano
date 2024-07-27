import Bing from "../icons/searchEngines/bing";
import Brave from "../icons/searchEngines/brave";
import DuckDuckGo from "../icons/searchEngines/duckduckgo";
import Google from "../icons/searchEngines/google";
import SearXNG from "../icons/searchEngines/searxng";
import Yahoo from "../icons/searchEngines/yahoo";

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
            <p class="select-none text-center">Search Engine</p>
            <div class="flex flex-wrap gap-2">
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Google"
                    on:click={() =>
                        (this.searchEngine =
                            "https://www.google.com/search?q=%s")
                    }
                >
                    <Google class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !==
                                "https://www.google.com/search?q=%s",
                        )}
                    >
                        Google
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="DuckDuckGo"
                    on:click={() =>
                        (this.searchEngine =
                            "https://duckduckgo.com/?q=%s&ia=web")
                    }
                >
                    <DuckDuckGo class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !==
                                "https://duckduckgo.com/?q=%s&ia=web",
                        )}
                    >
                        DuckDuckGo
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Bing"
                    on:click={() =>
                        (this.searchEngine = "https://www.bing.com/search?q=%s")
                    }
                >
                    <Bing class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !==
                                "https://www.bing.com/search?q=%s",
                        )}
                    >
                        Bing
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Yahoo"
                    on:click={() =>
                        (this.searchEngine =
                            "https://search.yahoo.com/search?p=%s")
                    }
                >
                    <Yahoo class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !==
                                "https://search.yahoo.com/search?p=%s",
                        )}
                    >
                        Yahoo
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Brave"
                    on:click={() =>
                        (this.searchEngine =
                            "https://search.brave.com/search?q=%s")
                    }
                >
                    <Brave class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !==
                                "https://search.brave.com/search?q=%s",
                        )}
                    >
                        Brave
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="SearXNG"
                    on:click={() =>
                        (this.searchEngine = "https://searx.si/search?q=%s")
                    }
                >
                    <SearXNG class="w-4 h-4 shrink-0" />
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.searchEngine,
                            (searchEngine) =>
                                searchEngine !== "https://searx.si/search?q=%s",
                        )}
                    >
                        SearXNG
                    </span>
                </button>
            </div>
            <input
                placeholder="Search Engine (%s = query)"
                class="h-10 rounded-xl bg-Surface0 px-4 outline-none"
                bind:value={use(this.searchEngine)}
                on:input={(e) => this.searchEngine = e.target.value}
            />
            <p class="select-none text-center">Theme</p>
            <div class="flex flex-wrap gap-2">
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Mocha"
                    on:click={() => changeTheme("mocha")}
                >
                    <div class="w-4 h-4 bg-[#89b4fa] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "mocha",
                        )}
                    >
                        Mocha
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Macchiato"
                    on:click={() => changeTheme("macchiato")}
                >
                    <div class="w-4 h-4 bg-[#8aadf4] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "macchiato",
                        )}
                    >
                        Macchiato
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Frappe"
                    on:click={() => changeTheme("frappe")}
                >
                    <div class="w-4 h-4 bg-[#8caaee] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "frappe",
                        )}
                    >
                        Frappé
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Latte"
                    on:click={() => changeTheme("latte")}
                >
                    <div class="w-4 h-4 bg-[#1e66f5] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "latte",
                        )}
                    >
                        Latte
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Nord"
                    on:click={() => changeTheme("nord")}
                >
                    <div class="w-4 h-4 bg-[#88c0d0] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "nord",
                        )}
                    >
                        Nord
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Rose Pine"
                    on:click={() => changeTheme("rose-pine")}
                >
                    <div class="w-4 h-4 bg-[#ebbcba] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "rose-pine",
                        )}
                    >
                        Rosé Pine
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Moss"
                    on:click={() => changeTheme("moss")}
                >
                    <div class="w-4 h-4 bg-[#4caf50] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "moss",
                        )}
                    >
                        Moss
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Gruvbox"
                    on:click={() => changeTheme("gruvbox")}
                >
                    <div class="w-4 h-4 bg-[#ebdbb2] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "gruvbox",
                        )}
                    >
                        Gruvbox
                    </span>
                </button>
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                    aria-label="Night"
                    on:click={() => changeTheme("night")}
                >
                    <div class="w-4 h-4 bg-[#58a6ff] rounded-full shrink-0"></div>
                    <span
                        class="ml-2 overflow-hidden"
                        class:theme-hidden={use(
                            this.theme,
                            (theme) => theme !== "night",
                        )}
                    >
                        Night
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Settings;
