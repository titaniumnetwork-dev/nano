const Windows = function () {
    window.addEventListener("chemicalLoaded", async () => {
        setTimeout(async () => {
            for (let tab of this.tabs) {
                if (
                    tab.hasOwnProperty("url") &&
                    !tab.hasOwnProperty("iframe")
                ) {
                    tab.iframe = await this.createIFrame(tab);
                }
            }
        }, 100);
    });
    return (
        <div
            bind:this={use(this.windows)}
            class="fixed top-0 right-0 bg-Crust w-full h-[calc(100%_-_4.25rem)] flex flex-col justify-center items-center select-none overflow-hidden iframe-transitions"
            class:iframe-sidebar-open={use(this.sidebar)}
        >
            <div class="absolute top-0 w-screen h-12 pwa-drag" />
            <div
                class="block h-full w-full relative flex flex-col justify-center"
                class:hidden={use(this.currentHasURL)}
            >
                <h1 class="text-center text-Blue text-4xl font-bold select-none">
                    nano.
                </h1>
                <p class="text-center mt-1 select-none">
                    Browse the internet securely and privately.
                </p>
                <div class="text-Subtext0 absolute right-0 left-0 bottom-4 flex justify-center gap-2">
                    <a href="https://github.com/titaniumnetwork-dev/nano">
                        GitHub
                    </a>
                    <span>/</span>
                    <a href="/privacy">Privacy Policy</a>
                    <span>/</span>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};

export default Windows;
