// ============================================
// PORTFOLIO CONFIG
// ============================================

window.PORTFOLIO_CONFIG = {

    url: "https://rmqkdmqipknkuaaafwjf.supabase.co",

    key: "sb_publishable_iaVXNM_fOI-bXYxyrNgO2Q_9vlrohrS"

};


// ============================================
// FETCH ONE TABLE
// ============================================

async function fetchTable(tableName) {

    const url =
        `${window.PORTFOLIO_CONFIG.url}/rest/v1/${encodeURIComponent(tableName)}?select=*`;

    console.log(`📡 Fetching table: ${tableName}`);
    console.log(`🔗 ${url}`);

    try {

        const response = await fetch(url, {

            method: "GET",

            headers: {

                "apikey":
                    window.PORTFOLIO_CONFIG.key,

                "Authorization":
                    `Bearer ${window.PORTFOLIO_CONFIG.key}`,

                "Content-Type":
                    "application/json",

                "Accept-Profile":
                    "public"

            }

        });


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                `❌ ${tableName}: ${response.status}`,
                errorText
            );

            return null;

        }


        const data =
            await response.json();


        console.log(
            `✅ ${tableName}:`,
            data
        );


        return data;

    }

    catch (error) {

        console.error(
            `❌ ${tableName} ERROR:`,
            error
        );

        return null;

    }

}


// ============================================
// TRY MULTIPLE TABLE NAMES
// ============================================

async function fetchTableWithFallback(
    tableNames
) {

    for (const tableName of tableNames) {

        console.log(
            `🔎 Trying table: ${tableName}`
        );


        const data =
            await fetchTable(tableName);


        if (
            Array.isArray(data)
        ) {

            console.log(
                `🎯 TABLE FOUND: ${tableName}`
            );

            return data;

        }

    }


    console.error(
        "❌ None of these tables were found:",
        tableNames
    );


    return [];

}


// ============================================
// PORTFOLIO METADATA
// ============================================

async function getPortfolioMetadata() {

    return await fetchTableWithFallback([

        "portfolio_metadata",
        "Portfolio_Metadata",
        "Portfolio_metadata"

    ]);

}


// ============================================
// EDUCATION / LEARNING TIMELINE
// ============================================

async function getEducation() {

    return await fetchTableWithFallback([

        "education",
        "Education"

    ]);

}


// ============================================
// PROJECTS
// ============================================

async function getProjects() {

    return await fetchTableWithFallback([

        "projects",
        "Projects"

    ]);

}


// ============================================
// CERTIFICATES
// ============================================

async function getCertificates() {

    return await fetchTableWithFallback([

        "certificates",
        "Certificates"

    ]);

}


// ============================================
// GET ALL PORTFOLIO DATA
// ============================================

async function getAllPortfolioData() {

    console.log(
        "🚀 FETCHING COMPLETE PORTFOLIO..."
    );


    const [

        metadata,

        education,

        projects,

        certificates

    ] = await Promise.all([

        getPortfolioMetadata(),

        getEducation(),

        getProjects(),

        getCertificates()

    ]);


    const portfolioData = {

        metadata:
            metadata || [],

        education:
            education || [],

        projects:
            projects || [],

        certificates:
            certificates || []

    };


    // ========================================
    // DEBUG
    // ========================================

    console.log(
        "========================================"
    );

    console.log(
        "📦 COMPLETE PORTFOLIO DATA"
    );

    console.log(
        "👤 Metadata:",
        portfolioData.metadata
    );

    console.log(
        "🎓 Education:",
        portfolioData.education
    );

    console.log(
        "💻 Projects:",
        portfolioData.projects
    );

    console.log(
        "📜 Certificates:",
        portfolioData.certificates
    );

    console.log(
        "========================================"
    );


    return portfolioData;

}
