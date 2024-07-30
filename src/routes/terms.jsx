import Head from "../components/head";

const Terms = function () {
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
            <h1 class="text-Blue text-3xl font-bold mb-6">Terms of Service</h1>
            <p class="text-sm mb-4">
                Effective Date:{" "}
                {this.updated.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    1. Acceptance of Terms
                </h2>
                <p>
                    By using the nano. service, you agree to these Terms of
                    Service. If you do not agree, do not use our service.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    2. Service Description
                </h2>
                <p>
                    nano. provides a web-proxy service that allows users to
                    access web content anonymously.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    3. User Responsibilities
                </h2>
                <ul class="list-disc list-inside ml-4">
                    <li>
                        <strong>Compliance:</strong> Use the service in
                        compliance with applicable laws and regulations.
                    </li>
                    <li>
                        <strong>Prohibited Use:</strong> Do not use the service
                        for illegal activities or to infringe on the rights of
                        others.
                    </li>
                </ul>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">4. No Warranty</h2>
                <p>
                    nano. does not guarantee the service’s availability,
                    accuracy, or reliability. We are not responsible for any
                    issues arising from third-party content accessed through the
                    service.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    5. Limitation of Liability
                </h2>
                <p>
                    nano. is not liable for any indirect, incidental, or
                    consequential damages resulting from the use of the service.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">
                    6. Third-Party Sites
                </h2>
                <p>
                    The service may provide access to third-party websites. We
                    are not responsible for the content or privacy practices of
                    these sites.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
                <p>
                    We may update these Terms of Service periodically. Changes
                    will be effective immediately upon posting. Continued use of
                    the service signifies acceptance of the revised terms.
                </p>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-semibold mb-4">8. Termination</h2>
                <p>
                    We may suspend or terminate access to the service for any
                    user who violates these terms.
                </p>
            </section>

            <section>
                <h2 class="text-2xl font-semibold mb-4">
                    9. Contact Information
                </h2>
                <p>
                    For inquiries about these Terms of Service, please contact:{" "}
                    <a href="mailto:nebelung@mailfence.com">
                        nebelung@mailfence.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Terms;
