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
            <h2 class="text-xl font-bold select-none">Theme</h2>
            <div class="flex flex-wrap gap-2">
                <button
                    class="flex justify-center items-center px-[1.125rem] h-10 rounded-xl select-none bg-Surface0"
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
