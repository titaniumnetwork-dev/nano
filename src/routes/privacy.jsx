import Head from "../components/head";

const Privacy = function () {
    this.theme = localStorage.getItem("@nano/theme") || "mocha";
    this.cloakTitle = localStorage.getItem("@nano/cloak/title") || "";
    this.cloakIcon = localStorage.getItem("@nano/cloak/icon") || "";
    this.updated = new Date(1722322385209);

    return (
        <div class="container mx-auto p-14">
            <Head
                bind:theme={use(this.theme)}
                bind:cloakTitle={use(this.cloakTitle)}
                bind:cloakIcon={use(this.cloakIcon)}
            />
            <h1 class="text-Blue text-3xl font-bold mb-6">Privacy Policy</h1>
            <p class="text-sm mb-4">
                Effective Date:{" "}
                {this.updated.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                    nano. ("we," "us," "our") is committed to protecting your
                    privacy. This Privacy Policy outlines our practices
                    regarding the collection, use, and protection of information
                    when you use our web-proxy service.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    Information Collection
                </h2>
                <p>
                    We do not collect personal information from users. The only
                    data stored pertains to user preferences, saved locally on
                    your device.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Use of Information</h2>
                <p>
                    Local storage data is utilized solely to remember user
                    preferences and enhance the user experience. This data is
                    not transmitted to our servers or shared with third parties.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    Cookies and Tracking
                </h2>
                <p>
                    We do not employ cookies or tracking technologies to monitor
                    user activities.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Data Sharing</h2>
                <p>
                    We do not share, sell, or disclose user information to third
                    parties.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Third-Party Sites</h2>
                <p>
                    When using our proxy service, you may access third-party
                    websites. These sites may collect data or perform other
                    actions independently of our control. We are not responsible
                    for the privacy practices or content of these third-party
                    sites. We encourage you to review their privacy policies.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Data Security</h2>
                <p>
                    While we do not collect personal data, we ensure that local
                    storage data remains on your device, which you can manage
                    through your browser settings.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">User Rights</h2>
                <p>
                    As no personal data is collected, there are no applicable
                    personal data rights under this policy. Users can manage
                    their local storage data via browser settings.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    Changes to the Privacy Policy
                </h2>
                <p>
                    We may update this Privacy Policy periodically. The
                    "Effective Date" will be revised accordingly. Users are
                    encouraged to review this policy regularly.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">Contact Information</h2>
                <p>
                    For questions or concerns about this Privacy Policy, please
                    contact us at:{" "}
                    <a href="mailto:nebelung@mailfence.com">
                        nebelung@mailfence.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Privacy;
