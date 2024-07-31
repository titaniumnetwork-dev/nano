import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import Bing from "../icons/searchEngines/bing";
import Brave from "../icons/searchEngines/brave";
import DuckDuckGo from "../icons/searchEngines/duckduckgo";
import Google from "../icons/searchEngines/google";
import SearXNG from "../icons/searchEngines/searxng";
import Yahoo from "../icons/searchEngines/yahoo";

const Settings = function () {
    this.showCloak = false;
    this.showEngine = false;
    this.showTheme = false;

    const themes = {
        mocha: {
            id: "mocha",
            title: "Mocha",
        },
        macchiato: {
            id: "macchiato",
            title: "Macchiato",
        },
        frappe: {
            id: "frappe",
            title: "Frappé",
        },
        latte: {
            id: "latte",
            title: "Latte",
        },
        nord: {
            id: "nord",
            title: "Nord",
        },
        "rose-pine": {
            id: "rose-pine",
            title: "Rosé Pine",
        },
        moss: {
            id: "moss",
            title: "Moss",
        },
        gruvbox: {
            id: "gruvbox",
            title: "Gruvbox",
        },
        night: {
            id: "night",
            title: "Night",
        },
    };

    const searchEngines = {
        "https://www.google.com/search?q=%s": {
            id: "google",
            url: "https://www.google.com/search?q=%s",
            title: "Google",
        },
        "https://duckduckgo.com/?q=%s&ia=web": {
            id: "duckduckgo",
            url: "https://duckduckgo.com/?q=%s&ia=web",
            title: "DuckDuckGo",
        },
        "https://www.bing.com/search?q=%s": {
            id: "bing",
            url: "https://www.bing.com/search?q=%s",
            title: "Bing",
        },
        "https://search.yahoo.com/search?p=%s": {
            id: "yahoo",
            url: "https://search.yahoo.com/search?p=%s",
            title: "Yahoo",
        },
        "https://search.brave.com/search?q=%s": {
            id: "brave",
            url: "https://search.brave.com/search?q=%s",
            title: "Brave",
        },
        "https://searx.si/search?q=%s": {
            id: "searxng",
            url: "https://searx.si/search?q=%s",
            title: "SearXNG",
        },
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

    return (
        <div
            class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-2 overflow-y-auto sidebar"
            class:sidebar-open={use(this.sidebar)}
            class:sidebar-hidden={use(
                this.sidebarPage,
                (sidebarPage) => sidebarPage !== "settings",
            )}
        >
            <p class="select-none">Tab Cloak</p>
            <button
                class="flex items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0 shrink-0"
                aria-label="Current Cloak"
                on:click={() => (this.showCloak = !this.showCloak)}
            >
                <img
                    src={use(
                        this.cloakIcon,
                        (cloakIcon) => cloakIcon || "/logo.svg",
                    )}
                    alt="Current cloak icon"
                    draggable={false}
                    class="w-4 h-4 shrink-0"
                    on:error={(e) =>
                        (e.target.src =
                            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>")
                    }
                />
                <span class="mx-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {use(
                        this.cloakTitle,
                        (cloakedTitle) => cloakedTitle || "None",
                    )}
                </span>
                <ChevronDown
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(this.showCloak)}
                />
                <ChevronUp
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(
                        this.showCloak,
                        (showCloak) => !showCloak,
                    )}
                />
            </button>
            <div
                class="flex flex-col gap-2"
                class:hidden={use(this.showCloak, (showCloak) => !showCloak)}
            >
                <div class="flex flex-wrap gap-2">
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak None"
                        on:click={() => (
                            (this.cloakTitle = ""), (this.cloakIcon = "")
                        )}
                    >
                        <img
                            src="/logo.svg"
                            alt="nano logo"
                            draggable={false}
                            class="w-4 h-4 shrink-0"
                        />
                    </button>
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak Google"
                        on:click={() => (
                            (this.cloakTitle = "Google"),
                            (this.cloakIcon =
                                "https://www.google.com/favicon.ico")
                        )}
                    >
                        <Google class="w-4 h-4 shrink-0" />
                    </button>
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak Wikipedia"
                        on:click={() => (
                            (this.cloakTitle = "Wikipedia"),
                            (this.cloakIcon =
                                "https://www.wikipedia.org/static/favicon/wikipedia.ico")
                        )}
                    >
                        <img
                            src="https://www.wikipedia.org/static/favicon/wikipedia.ico"
                            alt="Wikipedia Logo"
                            draggable={false}
                            class="w-4 h-4 shrink-0"
                        />
                    </button>
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak Canvas"
                        on:click={() => (
                            (this.cloakTitle = "Canvas"),
                            (this.cloakIcon =
                                "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico")
                        )}
                    >
                        <img
                            src="https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico"
                            alt="Canvas Logo"
                            draggable={false}
                            class="w-4 h-4 shrink-0"
                        />
                    </button>
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak Google Classroom"
                        on:click={() => (
                            (this.cloakTitle = "Google Classroom"),
                            (this.cloakIcon =
                                "https://ssl.gstatic.com/classroom/ic_product_classroom_144.png")
                        )}
                    >
                        <img
                            src="https://ssl.gstatic.com/classroom/ic_product_classroom_144.png"
                            alt="Google Classroom Logo"
                            draggable={false}
                            class="w-4 h-4 shrink-0"
                        />
                    </button>
                    <button
                        class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                        aria-label="Cloak Google Drive"
                        on:click={() => (
                            (this.cloakTitle = "Google Drive"),
                            (this.cloakIcon =
                                "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png")
                        )}
                    >
                        <img
                            src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
                            alt="Google Drive Logo"
                            draggable={false}
                            class="w-4 h-4 shrink-0"
                        />
                    </button>
                </div>
                <input
                    placeholder="Title"
                    class="h-10 rounded-xl bg-Surface0 px-4 outline-none"
                    bind:value={use(this.cloakTitle)}
                    on:input={(e) => (this.cloakTitle = e.target.value)}
                />
                <input
                    placeholder="Icon"
                    class="h-10 rounded-xl bg-Surface0 px-4 outline-none"
                    bind:value={use(this.cloakIcon)}
                    on:input={(e) => (this.cloakIcon = e.target.value)}
                />
            </div>
            <p class="select-none">Search Engine</p>
            <button
                class="flex items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0 shrink-0"
                aria-label="Current Search Engine"
                on:click={() => (this.showEngine = !this.showEngine)}
            >
                {/* Dreamland is fucking broken */}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "google",
                    ),
                    <Google class="w-4 h-4 shrink-0 mr-2" />,
                )}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "duckduckgo",
                    ),
                    <DuckDuckGo class="w-4 h-4 shrink-0 mr-2" />,
                )}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "bing",
                    ),
                    <Bing class="w-4 h-4 shrink-0 mr-2" />,
                )}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "yahoo",
                    ),
                    <Yahoo class="w-4 h-4 shrink-0 mr-2" />,
                )}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "brave",
                    ),
                    <Brave class="w-4 h-4 shrink-0 mr-2" />,
                )}
                {$if(
                    use(
                        this.searchEngine,
                        (searchEngine) =>
                            searchEngines[searchEngine] &&
                            searchEngines[searchEngine].id == "searxng",
                    ),
                    <SearXNG class="w-4 h-4 shrink-0 mr-2" />,
                )}
                <span class="mr-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {use(this.searchEngine, (searchEngine) =>
                        searchEngines[searchEngine]
                            ? searchEngines[searchEngine].title
                            : this.searchEngine,
                    )}
                </span>
                <ChevronDown
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(this.showEngine)}
                />
                <ChevronUp
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(
                        this.showEngine,
                        (showEngine) => !showEngine,
                    )}
                />
            </button>
            <div
                class="flex flex-col gap-2"
                class:hidden={use(this.showEngine, (showEngine) => !showEngine)}
            >
                <div class="flex flex-wrap gap-2">
                    {Object.entries(searchEngines).map((engine) => (
                        <button
                            class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                            aria-label={engine[1].title}
                            on:click={() => (this.searchEngine = engine[1].url)}
                        >
                            {/* Dreamland is so fucking broken */}
                            {$if(
                                engine[1].id == "google",
                                <Google class="w-4 h-4 shrink-0" />,
                            )}
                            {$if(
                                engine[1].id == "duckduckgo",
                                <DuckDuckGo class="w-4 h-4 shrink-0" />,
                            )}
                            {$if(
                                engine[1].id == "bing",
                                <Bing class="w-4 h-4 shrink-0" />,
                            )}
                            {$if(
                                engine[1].id == "yahoo",
                                <Yahoo class="w-4 h-4 shrink-0" />,
                            )}
                            {$if(
                                engine[1].id == "brave",
                                <Brave class="w-4 h-4 shrink-0" />,
                            )}
                            {$if(
                                engine[1].id == "searxng",
                                <SearXNG class="w-4 h-4 shrink-0" />,
                            )}
                        </button>
                    ))}
                </div>
                <input
                    placeholder="Search Engine (%s = query)"
                    class="h-10 rounded-xl bg-Surface0 px-4 outline-none shrink-0"
                    bind:value={use(this.searchEngine)}
                    on:input={(e) => (this.searchEngine = e.target.value)}
                />
            </div>
            <p class="select-none">Theme</p>
            <button
                class="flex items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0 shrink-0"
                aria-label="Current Theme"
                on:click={() => (this.showTheme = !this.showTheme)}
            >
                <div
                    class="w-4 h-4 rounded-full shrink-0"
                    style={use(
                        this.theme,
                        (theme) => "background: var(--theme-" + theme + ");",
                    )}
                ></div>
                <span class="mx-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {use(
                        this.theme,
                        (theme) => themes[theme].title || "Invalid Theme",
                    )}
                </span>
                <ChevronDown
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(this.showTheme)}
                />
                <ChevronUp
                    class="w-4 h-4 shrink-0 ml-auto"
                    class:hidden={use(
                        this.showTheme,
                        (showTheme) => !showTheme,
                    )}
                />
            </button>
            <div
                class="flex flex-col gap-2"
                class:hidden={use(this.showTheme, (showTheme) => !showTheme)}
            >
                <div class="flex flex-wrap gap-2">
                    {Object.entries(themes).map((theme) => (
                        <button
                            class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
                            aria-label={theme[1].title}
                            on:click={() => changeTheme(theme[1].id)}
                        >
                            <div
                                class="w-4 h-4 rounded-full shrink-0"
                                style={
                                    "background: var(--theme-" +
                                    theme[1].id +
                                    ");"
                                }
                            ></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;
