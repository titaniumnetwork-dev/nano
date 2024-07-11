import Head from "../components/head";
import ArrowRight from "../feather-icons/arrow-right";
import ArrowLeft from "../feather-icons/arrow-left";
import RotateCW from "../feather-icons/rotate-cw";

const Home = function () {
    this.theme = "dark";

    return (
        <div class="flex flex-col flex-1">
            <Head bind:theme={use(this.theme)} />
            <div class="bg-background w-full h-full flex flex-col justify-center items-center">
                <h1 class="text-brand text-4xl font-bold select-none">nano.</h1>
                <p class="mt-1 select-none">Browse the internet securly and private.</p>
            </div>
            <div class="flex justify-center">
                <div class="flex items-center flex-1 gap-2 bg-secondary rounded-[26px] p-1.5 my-4 mx-5 max-w-3xl">
                    <input
                        autofocus
                        placeholder="Search or Type URL"
                        class="flex-1 border-0 bg-transparent outline-0 h-10 w-full ml-4 placeholder:select-none placeholder:text-placeholder"
                    />
                    <button class="left-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-background p-2">
                        <ArrowLeft class="left-animated" />
                    </button>
                    <button class="right-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-background p-2">
                        <ArrowRight class="right-animated" />
                    </button>
                    <button class="rotate-animation h-8 w-8 rounded-full flex justify-center items-center mr-1 bg-background p-2">
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
