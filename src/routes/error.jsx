import Head from "../components/head";

const Error = function () {
    this.theme = localStorage.getItem("@nano/theme") || "mocha";
    this.cloakTitle = localStorage.getItem("@nano/cloak/title") || "";
    this.cloakIcon = localStorage.getItem("@nano/cloak/icon") || "";

    return (
        <div class="h-full flex flex-col justify-center items-center">
            <Head
                bind:theme={use(this.theme)}
                bind:cloakTitle={use(this.cloakTitle)}
                bind:cloakIcon={use(this.cloakIcon)}
            />
            <h1 class="text-center text-Blue text-4xl font-bold select-none">
                error.
            </h1>
            <p class="text-center mt-1 select-none">
                The requested page cannot be found.
            </p>
        </div>
    );
};

export default Error;
