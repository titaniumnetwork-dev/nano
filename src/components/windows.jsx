const Windows = function () {
    const createIFrame = async (tab) => {
        const newIFrame = document.createElement("iframe");
        newIFrame.src = await chemicalEncode(tab.url);
        newIFrame.classList = "window h-full w-full";
        newIFrame.dataset.current = tab.current;
        this.windows.appendChild(newIFrame);

        return newIFrame;
    };

    window.addEventListener("chemicalLoaded", async () => {
        setTimeout(async () => {
            for (let tab of this.tabs) {
                if (!tab.hasOwnProperty("iframe")) {
                    tab.iframe = await createIFrame(tab);
                }
            }
        }, 100);
    });
    return (
        <div
            bind:this={use(this.windows)}
            class="fixed top-0 right-0 bg-Base w-full h-[calc(100%_-_4.25rem)] flex flex-col justify-center items-center select-none overflow-hidden iframe-transitions"
            class:iframe-sidebar-open={use(this.sidebar)}
        >
            <div class="block" class:hidden={use(this.currentHasURL)}>
                <h1 class="text-center text-Blue text-4xl font-bold select-none">
                    nano.
                </h1>
                <p class="text-center mt-1 select-none">
                    Browse the internet securely and privately.
                </p>
            </div>
        </div>
    );
};

export default Windows;
