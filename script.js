// ============================================
// PORTFOLIO SCRIPT
// Supabase Dynamic Data Renderer
// ============================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("🚀 PORTFOLIO STARTING...");

    try {

        // --------------------------------------------
        // GET ALL DATA FROM SUPABASE
        // --------------------------------------------

        const data = await getAllPortfolioData();

        console.log("🔥 SUPABASE PORTFOLIO DATA");
        console.log(data);

        // --------------------------------------------
        // RENDER ALL SECTIONS
        // --------------------------------------------

        renderMetadata(data.metadata);
        renderEducation(data.education);
        renderProjects(data.projects);
        renderCertificates(data.certificates);

        // --------------------------------------------
        // FINISH LOADING
        // --------------------------------------------

        hideLoader();

        console.log("✅ PORTFOLIO LOADED SUCCESSFULLY");

    } catch (error) {

        console.error("❌ PORTFOLIO ERROR:", error);

        hideLoader();

    }

});

// ==================================================
// METADATA
// ==================================================

function renderMetadata(data) {

    // --------------------------------------------------
    // CHECK DATA
    // --------------------------------------------------

    if (!Array.isArray(data) || data.length === 0) {

        console.warn("⚠️ No metadata found");

        return;
    }


    // --------------------------------------------------
    // GET FIRST RECORD
    // --------------------------------------------------

    const person = data[0];

    console.log("👤 Portfolio Metadata:", person);


    // ==================================================
    // NAME
    // ==================================================

    const fullName =
        person.Full_Name ||
        "";

    setText(
        "profile-name",
        fullName
    );

    setText(
        "hero-name",
        fullName
    );

    setText(
        "about-name",
        fullName
    );

    setText(
        "terminal-name",
        fullName
    );

    setText(
        "footer-name",
        fullName
    );

    setText(
        "logo-name",
        fullName
    );


    // ==================================================
    // HEADLINE
    // ==================================================

    setText(
        "hero-headline",
        person.Headline || ""
    );


    // ==================================================
    // BIO
    // ==================================================

    setText(
        "profile-bio",
        person.Bio || ""
    );

    setText(
        "hero-bio",
        person.Bio || ""
    );

    setText(
        "about-bio",
        person.Bio || ""
    );


    // ==================================================
    // EMAIL
    // ==================================================

    const email =
        person.Email ||
        "";

    setText(
        "profile-email",
        email
    );

    setText(
        "about-email",
        email
    );


    // ==================================================
    // MOBILE
    // ==================================================

    setText(
        "about-mobile",
        person.Mobile || ""
    );


    // ==================================================
    // LOCATION
    // ==================================================

    const city =
        person.City ||
        "";

    setText(
        "profile-location",
        city
    );

    setText(
        "about-city",
        city
    );

    setText(
        "terminal-city",
        city
    );


    // ==================================================
    // DATE OF BIRTH
    // ==================================================

    if (person.Date_Of_Birth) {

        let formattedDOB =
            person.Date_Of_Birth;

        try {

            const dob =
                String(
                    person.Date_Of_Birth
                ).trim();


            // ------------------------------------------
            // DD-MM-YYYY
            // Example: 01-06-2007
            // ------------------------------------------

            if (
                /^\d{2}-\d{2}-\d{4}$/.test(dob)
            ) {

                const parts =
                    dob.split("-");

                const day =
                    Number(parts[0]);

                const month =
                    Number(parts[1]);

                const year =
                    Number(parts[2]);


                const date =
                    new Date(
                        year,
                        month - 1,
                        day
                    );


                if (!isNaN(date.getTime())) {

                    formattedDOB =
                        date.toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }
                        );

                }

            }

            // ------------------------------------------
            // YYYY-MM-DD
            // ------------------------------------------

            else if (
                /^\d{4}-\d{2}-\d{2}$/.test(dob)
            ) {

                const parts =
                    dob.split("-");

                const year =
                    Number(parts[0]);

                const month =
                    Number(parts[1]);

                const day =
                    Number(parts[2]);


                const date =
                    new Date(
                        year,
                        month - 1,
                        day
                    );


                if (!isNaN(date.getTime())) {

                    formattedDOB =
                        date.toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }
                        );

                }

            }

        } catch (error) {

            console.warn(
                "⚠️ Could not format Date of Birth:",
                error
            );

        }


        setText(
            "about-year",
            formattedDOB
        );

    }


    // ==================================================
    // GITHUB
    // ==================================================

    if (person.Github) {

        setLink(
            "github-link",
            person.Github
        );

        setLink(
            "github-button",
            person.Github
        );

    }


    // ==================================================
    // LINKEDIN
    // ==================================================

    if (person.LinkedIn) {

        setLink(
            "linkedin-link",
            person.LinkedIn
        );

        setLink(
            "linkedin-button",
            person.LinkedIn
        );

    }


    // ==================================================
    // RESUME
    // ==================================================

    if (person.Resume_Link) {

        setLink(
            "resume-link",
            person.Resume_Link
        );

        console.log(
            "📄 Resume Link:",
            person.Resume_Link
        );

    }


    // ==================================================
    // EMAIL BUTTON
    // ==================================================

    if (email) {

        setLink(
            "email-button",
            `mailto:${email}`
        );

    }


    // ==================================================
    // FOOTER YEAR
    // ==================================================

    const footerYear =
        document.getElementById(
            "footer-year"
        );

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    // ==================================================
    // DEBUG
    // ==================================================

    console.log(
        "================================"
    );

    console.log(
        "✅ METADATA RENDERED"
    );

    console.log(
        "👤 Name:",
        fullName
    );

    console.log(
        "📧 Email:",
        email
    );

    console.log(
        "📱 Mobile:",
        person.Mobile
    );

    console.log(
        "📍 City:",
        city
    );

    console.log(
        "🎂 Date of Birth:",
        person.Date_Of_Birth
    );

    console.log(
        "💻 GitHub:",
        person.Github
    );

    console.log(
        "🔗 LinkedIn:",
        person.LinkedIn
    );

    console.log(
        "📄 Resume:",
        person.Resume_Link
    );

    console.log(
        "================================"
    );

}
// ==================================================
// EDUCATION
// ==================================================

function renderEducation(data) {

    const container =
        document.getElementById("education-container");

    if (!container) {
        console.warn("⚠️ education-container not found");
        return;
    }

    container.innerHTML = "";

    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No education information available.
            </div>
        `;

        return;
    }

    data.forEach((education) => {

        const card = document.createElement("div");

        card.className = "education-card";

        card.innerHTML = `

            <div class="education-year">
                ${escapeHTML(
                    education.year_of_completion || ""
                )}
            </div>

            <div class="education-content">

                <!-- COURSE TITLE -->
                <h3 class="education-title">
                    ${escapeHTML(
                        education.Course_title ||
                        "Education"
                    )}
                </h3>

                <!-- INSTITUTE -->
                <h4 class="education-institute">
                    ${escapeHTML(
                        education.Institute_Name ||
                        ""
                    )}
                </h4>

                <!-- SPECIALIZATION -->
                ${
                    education.Specialization
                    ? `
                        <p class="education-specialization">
                            ${escapeHTML(
                                education.Specialization
                            )}
                        </p>
                    `
                    : ""
                }

                <!-- COURSE DURATION -->
                ${
                    education.Course_Duration
                    ? `
                        <p class="education-duration">
                            Duration:
                            <span>
                                ${escapeHTML(
                                    education.Course_Duration
                                )}
                            </span>
                        </p>
                    `
                    : ""
                }

                <!-- CGPA -->
                ${
                    education["CGPA/CGPI/CPI"]
                    ? `
                        <span class="education-score">
                            CGPA/CGPI/CPI:
                            ${escapeHTML(
                                education["CGPA/CGPI/CPI"]
                            )}
                        </span>
                    `
                    : ""
                }

            </div>

        `;

        container.appendChild(card);

    });

}

// ==================================================
// PROJECTS
// ==================================================

function renderProjects(data) {

    const container =
        document.getElementById("projects-container");

    if (!container) {
        console.warn("⚠️ projects-container not found");
        return;
    }

    // Clear old content
    container.innerHTML = "";

    // No projects
    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No projects available.
            </div>
        `;

        return;
    }


    // ==================================================
    // RENDER EACH PROJECT
    // ==================================================

    data.forEach((project) => {

        const card =
            document.createElement("article");

        card.className = "project-card";


        // ==================================================
        // PROJECT LINK
        // Supabase column = Project_Link
        // ==================================================

        const projectURL =
            project.Project_Link
                ? String(project.Project_Link).trim()
                : "";


        console.log(
            "🚀 Project:",
            project.Title
        );

        console.log(
            "🔗 Project URL:",
            projectURL
        );


        // ==================================================
        // SKILLS
        // ==================================================

        let skillsHTML = "";

        if (project.skills_tech) {

            const skills =
                String(project.skills_tech)
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean);

            skillsHTML = skills
                .map(skill => `
                    <span class="project-tech">
                        ${escapeHTML(skill)}
                    </span>
                `)
                .join("");

        }


        // ==================================================
        // PROJECT LINK BUTTON
        // ==================================================

        let projectLinkHTML = "";

        if (projectURL) {

            projectLinkHTML = `
                <a
                    href="${escapeAttribute(projectURL)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                >
                    VIEW PROJECT ↗
                </a>
            `;

        }


        // ==================================================
        // GITHUB LINK
        // ==================================================

        let githubHTML = "";

        if (project.github_link) {

            const githubURL =
                String(project.github_link).trim();

            githubHTML = `
                <a
                    href="${escapeAttribute(githubURL)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                >
                    GITHUB ↗
                </a>
            `;

        }


        // ==================================================
        // PROJECT CARD HTML
        // ==================================================

        card.innerHTML = `

            <div class="project-number">
                ${String(
                    project.id || ""
                ).padStart(2, "0")}
            </div>


            <div class="project-content">


                <!-- YEAR -->

                <div class="project-top">

                    <span class="project-year">
                        ${escapeHTML(
                            project.year_of_project || ""
                        )}
                    </span>

                </div>


                <!-- TITLE -->

                <h3>
                    ${escapeHTML(
                        project.Title ||
                        "Untitled Project"
                    )}
                </h3>


                <!-- DESCRIPTION -->

                <p>
                    ${escapeHTML(
                        project.Description ||
                        "No description available."
                    )}
                </p>


                <!-- TECHNOLOGIES -->

                <div class="project-tech-stack">

                    ${skillsHTML}

                </div>


                <!-- PROJECT TEAM -->

                ${
                    project.project_drone_under
                        ? `
                            <div class="project-team">
                                ${escapeHTML(
                                    project.project_drone_under
                                )}
                            </div>
                        `
                        : ""
                }


                <!-- ACTION BUTTONS -->

                <div class="project-actions">

                    ${projectLinkHTML}

                    ${githubHTML}

                </div>


            </div>

        `;


        // ==================================================
        // DOUBLE CLICK → OPEN PROJECT
        // ==================================================

        if (projectURL) {

            card.addEventListener(
                "dblclick",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    console.log(
                        "🖱️ PROJECT DOUBLE CLICKED"
                    );

                    console.log(
                        "🔗 Opening:",
                        projectURL
                    );


                    window.open(
                        projectURL,
                        "_blank"
                    );

                }
            );


            // Show pointer cursor

            card.style.cursor = "pointer";


            // Tooltip

            card.title =
                "Double-click to open project";

        }


        // ==================================================
        // ADD CARD
        // ==================================================

        container.appendChild(card);

    });


    console.log(
        `✅ ${data.length} project(s) rendered`
    );

}
// ==================================================
// CERTIFICATES
// ==================================================

function renderCertificates(data) {

    const container =
        document.getElementById("certificates-container");

    if (!container) {
        console.warn("⚠️ certificates-container not found");
        return;
    }

    // Clear existing content
    container.innerHTML = "";

    // No certificates
    if (!data || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No certificates available.
            </div>
        `;

        return;
    }


    // ==================================================
    // CREATE CERTIFICATE CARDS
    // ==================================================

    data.forEach((certificate) => {

        const card =
            document.createElement("div");

        card.className = "certificate-card";


        // ==================================================
        // GET CERTIFICATE DATA
        // ==================================================

        const certificateName =
            certificate.Certification_Name ||
            "Certificate";

        const issuingOrganization =
            certificate.Issuing_Organization ||
            "";

        const issueDate =
            certificate.Issue_Date ||
            "";

        // IMPORTANT:
        // Your actual column name is:
        // "certificate link"
        //
        // Because there is a space, we MUST use:
        // certificate["certificate link"]

        const certificateURL =
            certificate["certificate link"]
                ? String(
                    certificate["certificate link"]
                  ).trim()
                : "";


        // Debug
        console.log(
            "📜 Certificate:",
            certificateName
        );

        console.log(
            "🔗 Certificate URL:",
            certificateURL
        );


        // ==================================================
        // CERTIFICATE LINK
        // ==================================================

        let certificateLinkHTML = "";

        if (certificateURL) {

            certificateLinkHTML = `

                <a
                    href="${escapeAttribute(
                        certificateURL
                    )}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="certificate-link"
                >
                    VIEW CERTIFICATE ↗
                </a>

            `;

        } else {

            certificateLinkHTML = `

                <span class="certificate-link disabled">
                    CERTIFICATE NOT AVAILABLE
                </span>

            `;

        }


        // ==================================================
        // CARD HTML
        // ==================================================

        card.innerHTML = `

            <div class="certificate-icon">
                <span>✦</span>
            </div>


            <div class="certificate-content">

                <span class="certificate-label">
                    CERTIFICATION
                </span>


                <h3>
                    ${escapeHTML(
                        certificateName
                    )}
                </h3>


                <p>
                    ${escapeHTML(
                        issuingOrganization
                    )}
                </p>


                ${
                    issueDate
                        ? `
                            <span class="certificate-year">
                                ${escapeHTML(
                                    issueDate
                                )}
                            </span>
                        `
                        : ""
                }


                ${certificateLinkHTML}

            </div>

        `;


        // ==================================================
        // DOUBLE CLICK → OPEN CERTIFICATE
        // ==================================================

        if (certificateURL) {

            card.addEventListener(
                "dblclick",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    console.log(
                        "🖱️ Certificate double-clicked"
                    );

                    console.log(
                        "🔗 Opening:",
                        certificateURL
                    );


                    window.open(
                        certificateURL,
                        "_blank"
                    );

                }
            );


            // Show that card is clickable

            card.style.cursor = "pointer";

            card.title =
                "Double-click to open certificate";

        }


        // ==================================================
        // ADD CARD TO PAGE
        // ==================================================

        container.appendChild(card);

    });


    console.log(
        `✅ ${data.length} certificate(s) rendered`
    );

}
// ==================================================
// UTILITY FUNCTIONS
// ==================================================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (!element ||
        value === null ||
        value === undefined) {
        return;
    }

    element.textContent = value;

}


function setLink(id, url) {

    const element =
        document.getElementById(id);

    if (!element || !url) {
        return;
    }

    element.href = url;

}


function escapeHTML(value) {

    if (value === null ||
        value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    if (!value) {
        return "#";
    }

    return String(value)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==================================================
// LOADER
// ==================================================

function hideLoader() {

    const loader = document.getElementById("loading-screen");

    if (!loader) {
        console.warn("⚠️ Loading screen not found");
        return;
    }

    console.log("🔓 Hiding loading screen...");

    loader.classList.add("loaded");

    setTimeout(() => {
        loader.style.display = "none";
    }, 700);
}
// ==================================================
// DARK / LIGHT MODE
// ==================================================

const themeToggle =
    document.getElementById("theme-toggle");


// Load saved theme
const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

}


// Update button icon
function updateThemeIcon() {

    if (!themeToggle) return;

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeToggle.textContent = "🌙";

    } else {

        themeToggle.textContent = "☀️";

    }

}


// Initial icon
updateThemeIcon();


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}