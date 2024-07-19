import Sortable from "sortablejs";
import Plus from "../icons/plus";

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
        this.tabs = [...this.tabs];

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
            class="fixed left-2 top-2 h-[calc(100%_-_4.25rem-0.5rem)] w-[14.5rem] opacity-0 flex flex-col gap-4 sidebar"
            class:sidebar-open={use(this.sidebar)}
        >
            <button
                on:click={() => newTab()}
                class="bg-Base w-full h-10 rounded-xl text-left px-4 shrink-0 flex items-center gap-1 select-none"
            >
                <Plus />
                <span>New Tab</span>
            </button>
            <div class="flex flex-col gap-2 overflow-y-auto tabs">
                {use(this.tabs, (tabs) =>
                    tabs.map((tab, index) => (
                        <button
                            on:click={() => setCurrent(index)}
                            class="tab bg-Crust w-full h-10 rounded-xl text-left px-4 shrink-0 select-none"
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

export default Tabs;
