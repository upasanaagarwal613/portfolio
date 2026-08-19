window.PORTFOLIO_CONFIG = {
    url: "https://rmqkdmqipknkuaaafwjf.supabase.co",
    key: "sb_publishable_iaVXNM_fOI-bXYxyrNgO2Q_9vlrohrS"
};


async function fetchTable(tableName) {

    const url =
        `${window.PORTFOLIO_CONFIG.url}/rest/v1/${tableName}?select=*`;

    console.log(`📡 Fetching: ${tableName}`);
    console.log(`🔗 ${url}`);

    try {

        const response = await fetch(url, {
            method: "GET",

            headers: {
                "apikey": window.PORTFOLIO_CONFIG.key,
                "Authorization":
                    `Bearer ${window.PORTFOLIO_CONFIG.key}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                `${response.status} - ${errorText}`
            );
        }

        const data = await response.json();

        console.log(`✅ ${tableName}:`, data);

        return data;

    } catch (error) {

        console.error(
            `❌ ${tableName} Error:`,
            error
        );

        return [];
    }
}


async function getPortfolioMetadata() {

    return await fetchTable("portfolio_metadata");

}


async function getEducation() {

    return await fetchTable("Education");

}



async function getProjects() {

    return await fetchTable("Projects");

}



async function getCertificates() {

    return await fetchTable("Certificates");

}


// ============================================
// GET ALL PORTFOLIO DATA
// ============================================

async function getAllPortfolioData() {

    console.log("🚀 Fetching complete portfolio...");

    const results = await Promise.all([

        getPortfolioMetadata(),
        getEducation(),
        getProjects(),
        getCertificates()

    ]);

    const portfolioData = {

        metadata: results[0],
        education: results[1],
        projects: results[2],
        certificates: results[3]

    };

    console.log(
        "📦 Complete Portfolio Data:",
        portfolioData
    );

    return portfolioData;
}