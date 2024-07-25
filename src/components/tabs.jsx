import Sortable from "sortablejs";
import Plus from "../icons/plus";
import Minus from "../icons/minus";

const Tabs = function () {
    this.mount = () => {
        new Sortable(this.root.querySelector(".tabs"), {
            forceFallback: true,
            animation: 300,
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

    const newTab = () => {
        this.tabs = [...this.tabs];

        for (let tab of this.tabs) {
            if (tab.hasOwnProperty("iframe")) {
                tab.iframe.dataset.current = "false";
            }
        }

        const createdTab = {
            title: "New Tab",
        };

        this.tabs = [createdTab, ...this.tabs];

        this.current = 0;
    };

    const setCurrent = (index) => {
        for (let tab of this.tabs) {
            if (tab.hasOwnProperty("iframe")) {
                tab.iframe.dataset.current = "false";
            }
        }

        this.current = index;
        this.tabs[index].current = true;
        if (this.tabs[this.current].hasOwnProperty("iframe")) {
            this.tabs[this.current].iframe.dataset.current = "true";
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
    return (
        <div
            class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-2 sidebar"
            class:sidebar-open={use(this.sidebar)}
        >
            <button
                on:click={() => newTab()}
                class="bg-Base w-full h-10 rounded-xl text-left px-4 shrink-0 flex items-center gap-2 select-none whitespace-nowrap overflow-hidden text-ellipsis"
            >
                <div class="h-4 w-4 rounded-full flex justify-center items-center">
                    <Plus />
                </div>
                <span class="whitespace-nowrap overflow-hidden text-ellipsis">
                    New Tab
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
                            data-current={index == this.current}
                        >
                            <span class="tab-title whitespace-nowrap overflow-hidden text-ellipsis">
                                {tab.title}
                            </span>
                            <button
                                on:click={() => removeTab(index)}
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
