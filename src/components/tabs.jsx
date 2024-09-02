import Sortable from "sortablejs";
import Plus from "../icons/plus";
import Minus from "../icons/minus";
import Home from "../icons/home";

const Tabs = function () {
    this.mount = () => {
        new Sortable(this.root.querySelector(".tabs"), {
            forceFallback: true,
            animation: 200,
            direction: "vertical",
            dragClass: "dragging",
            filter: ".tab-close",
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

    const setCurrent = (index) => {
        for (let tab of this.tabs) {
            if (tab.hasOwnProperty("iframe")) {
                tab.iframe.dataset.current = "false";
            }
        }

        this.current = index;
        if (this.tabs[this.current].hasOwnProperty("iframe")) {
            this.tabs[this.current].iframe.dataset.current = "true";
        }
    };

    return (
        <div
            class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-2 sidebar"
            class:sidebar-open={use(this.sidebar)}
            class:sidebar-hidden={use(
                this.sidebarPage,
                (sidebarPage) => sidebarPage !== "tabs",
            )}
        >
            <button
                on:click={() => this.newTab()}
                aria-label="New Tab"
                title={use`New Tab (${this.actionKey}+T)`}
                class="bg-Base w-full h-10 rounded-xl text-left px-4 shrink-0 flex items-center gap-2 select-none whitespace-nowrap overflow-hidden text-ellipsis"
            >
                <div class="h-4 w-4 rounded-full flex justify-center items-center">
                    <Plus />
                </div>
                <span class="whitespace-nowrap overflow-hidden text-ellipsis">
                    New Tab
                </span>
                <span class="whitespace-nowrap overflow-hidden text-ellipsis ml-auto text-Subtext0">
                    {use(this.actionKey, (actionKey) => `${actionKey}+T`)}
                </span>
            </button>
            <div class="flex flex-col gap-2 overflow-y-auto tabs">
                {use(this.tabs, (tabs) =>
                    tabs.map((tab, index) => (
                        <button
                            on:nanoUpdateTitle={(e) =>
                                (e.target.querySelector(
                                    ".tab-title",
                                ).innerText = tab.title)
                            }
                            class="tab flex justify-between items-center gap-2 w-full h-10 rounded-xl text-left px-4 shrink-0 select-none"
                            aria-label={"Tab #" + String(index)}
                            data-current={index == this.current}
                        >
                            <div class="whitespace-nowrap overflow-hidden text-ellipsis flex flex-row items-center gap-2 [&_svg]:size-4 [&_img]:size-4">
                                <span class="tab-icon inline-flex">
                                    {tabs[index].icon ? (
                                        <img
                                            src={tabs[index].icon}
                                            alt={tabs[index].title}
                                        />
                                    ) : (
                                        <Home />
                                    )}
                                </span>
                                <p class="tab-title">{tab.title}</p>
                            </div>
                            <button
                                on:click={() => this.removeTab(index)}
                                aria-label={"Close tab #" + String(index)}
                                title={use`Close Tab (${this.actionKey}+W)`}
                                class="tab-close opacity-0 h-4 w-4 rounded-full flex justify-center items-center"
                            >
                                <Minus />
                            </button>
                        </button>
                    )),
                )}
            </div>
        </div>
    );
};

export default Tabs;
