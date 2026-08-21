// ============================================
// PORTFOLIO SCRIPT
// Supabase Dynamic Data Renderer
// ============================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("🚀 PORTFOLIO STARTING...");

    try {

        // ========================================
        // GET ALL DATA FROM SUPABASE
        // ========================================

        const data = await getAllPortfolioData();

        console.log("🔥 SUPABASE PORTFOLIO DATA");
        console.log(data);


        // ========================================
        // RENDER ALL SECTIONS
        // ========================================

        renderMetadata(data.metadata);

        renderConnectWithMe(data.metadata);

        renderEducation(data.education);

        renderProjects(data.projects);

        renderCertificates(data.certificates);


        // ========================================
        // FINISH LOADING
        // ========================================

        hideLoader();

        console.log("✅ PORTFOLIO LOADED SUCCESSFULLY");

    } catch (error) {

        console.error("❌ PORTFOLIO ERROR:", error);

        hideLoader();

    }


    // ========================================
    // THEME
    // ========================================

    initializeTheme();

});


// ==================================================
// GET VALUE FROM OBJECT
// Handles different column name formats
// ==================================================

function getValue(obj, possibleNames) {

    if (!obj || typeof obj !== "object") {
        return "";
    }

    for (const name of possibleNames) {

        if (
            obj[name] !== undefined &&
            obj[name] !== null &&
            String(obj[name]).trim() !== ""
        ) {
            return obj[name];
        }

    }


    // Case-insensitive fallback

    const keys = Object.keys(obj);

    for (const name of possibleNames) {

        const foundKey = keys.find(
            key =>
                key.toLowerCase().trim() ===
                name.toLowerCase().trim()
        );

        if (
            foundKey &&
            obj[foundKey] !== null &&
            obj[foundKey] !== undefined &&
            String(obj[foundKey]).trim() !== ""
        ) {
            return obj[foundKey];
        }

    }

    return "";
}


// ==================================================
// METADATA
// ==================================================

function renderMetadata(data) {

    if (!Array.isArray(data) || data.length === 0) {

        console.warn("⚠️ No metadata found");

        return;
    }


    const person = data[0];

    console.log("👤 Portfolio Metadata:", person);


    // ========================================
    // NAME
    // ========================================

    const fullName = getValue(person, [
        "Full_Name",
        "full_name",
        "FullName",
        "name",
        "Name"
    ]);

    setText("profile-name", fullName);
    setText("hero-name", fullName);
    setText("about-name", fullName);
    setText("terminal-name", fullName);
    setText("footer-name", fullName);
    setText("logo-name", fullName);


    // ========================================
    // HEADLINE
    // ========================================

    const headline = getValue(person, [
        "Headline",
        "headline",
        "Title",
        "title"
    ]);

    setText("hero-headline", headline);


    // ========================================
    // BIO
    // ========================================

    const bio = getValue(person, [
        "Bio",
        "bio",
        "About",
        "about",
        "description"
    ]);

    setText("profile-bio", bio);
    setText("hero-bio", bio);
    setText("about-bio", bio);


    // ========================================
    // EMAIL
    // ========================================

    const email = getValue(person, [
        "Email",
        "email",
        "Email_Address",
        "email_address"
    ]);

    setText("profile-email", email);
    setText("about-email", email);


    // ========================================
    // MOBILE
    // ========================================

    const mobile = getValue(person, [
        "Mobile",
        "mobile",
        "Phone",
        "phone",
        "Phone_Number",
        "phone_number"
    ]);

    setText("about-mobile", mobile);


    // ========================================
    // CITY
    // ========================================

    const city = getValue(person, [
        "City",
        "city",
        "Location",
        "location"
    ]);

    setText("profile-location", city);
    setText("about-city", city);
    setText("terminal-city", city);


    // ========================================
    // DATE OF BIRTH
    // ========================================

    const dob = getValue(person, [
        "Date_Of_Birth",
        "date_of_birth",
        "DOB",
        "dob"
    ]);

    if (dob) {

        setText(
            "about-year",
            formatDate(dob)
        );

    }


    // ========================================
    // GITHUB
    // ========================================

    const github = getValue(person, [
        "Github",
        "GitHub",
        "github",
        "github_url",
        "Github_URL",
        "GitHub_URL"
    ]);

    if (github) {

        setLink("github-link", github);
        setLink("github-button", github);

        setLink("connect-github", github);
        setLink("github-connect", github);

    }


    // ========================================
    // LINKEDIN
    // ========================================

    const linkedin = getValue(person, [
        "LinkedIn",
        "linkedin",
        "linkedin_url",
        "LinkedIn_URL"
    ]);

    if (linkedin) {

        setLink("linkedin-link", linkedin);
        setLink("linkedin-button", linkedin);

        setLink("connect-linkedin", linkedin);
        setLink("linkedin-connect", linkedin);

    }


    // ========================================
    // RESUME
    // ========================================

    const resume = getValue(person, [
        "Resume_Link",
        "resume_link",
        "Resume",
        "resume",
        "Resume_URL",
        "resume_url"
    ]);

    if (resume) {

        setLink("resume-link", resume);
        setLink("resume-button", resume);

    }


    // ========================================
    // EMAIL BUTTON
    // ========================================

    if (email) {

        setLink(
            "email-button",
            `mailto:${email}`
        );

        setLink(
            "connect-email",
            `mailto:${email}`
        );

        setLink(
            "email-connect",
            `mailto:${email}`
        );

    }


    // ========================================
    // FOOTER YEAR
    // ========================================

    setText(
        "footer-year",
        new Date().getFullYear()
    );


    console.log("================================");
    console.log("✅ METADATA RENDERED");
    console.log("👤 Name:", fullName);
    console.log("📧 Email:", email);
    console.log("📱 Mobile:", mobile);
    console.log("📍 City:", city);
    console.log("🎂 DOB:", dob);
    console.log("💻 GitHub:", github);
    console.log("🔗 LinkedIn:", linkedin);
    console.log("📄 Resume:", resume);
    console.log("================================");

}


// ==================================================
// CONNECT WITH ME
// ==================================================

function renderConnectWithMe(data) {

    if (!Array.isArray(data) || data.length === 0) {

        console.warn(
            "⚠️ No metadata available for Connect With Me"
        );

        return;
    }


    const person = data[0];


    // ========================================
    // GET SOCIAL DATA
    // ========================================

    const email = getValue(person, [
        "Email",
        "email",
        "Email_Address",
        "email_address"
    ]);


    const github = getValue(person, [
        "Github",
        "GitHub",
        "github",
        "github_url",
        "Github_URL",
        "GitHub_URL"
    ]);


    const linkedin = getValue(person, [
        "LinkedIn",
        "linkedin",
        "linkedin_url",
        "LinkedIn_URL"
    ]);


    const resume = getValue(person, [
        "Resume_Link",
        "resume_link",
        "Resume",
        "resume",
        "Resume_URL",
        "resume_url"
    ]);


    // ========================================
    // EMAIL
    // ========================================

    if (email) {

        const emailElements = document.querySelectorAll(
            "#email-button, #connect-email, #email-connect, [data-social='email']"
        );

        emailElements.forEach(element => {

            element.href = `mailto:${email}`;

            if (element.tagName === "A") {
                element.target = "_self";
            }

        });

    }


    // ========================================
    // GITHUB
    // ========================================

    if (github) {

        const githubElements = document.querySelectorAll(
            "#github-link, #github-button, #connect-github, #github-connect, [data-social='github']"
        );

        githubElements.forEach(element => {

            element.href = github;

            element.target = "_blank";
            element.rel = "noopener noreferrer";

        });

    }


    // ========================================
    // LINKEDIN
    // ========================================

    if (linkedin) {

        const linkedinElements = document.querySelectorAll(
            "#linkedin-link, #linkedin-button, #connect-linkedin, #linkedin-connect, [data-social='linkedin']"
        );

        linkedinElements.forEach(element => {

            element.href = linkedin;

            element.target = "_blank";
            element.rel = "noopener noreferrer";

        });

    }


    // ========================================
    // RESUME
    // ========================================

    if (resume) {

        const resumeElements = document.querySelectorAll(
            "#resume-link, #resume-button, [data-social='resume']"
        );

        resumeElements.forEach(element => {

            element.href = resume;

            element.target = "_blank";
            element.rel = "noopener noreferrer";

        });

    }


    console.log("🔗 CONNECT WITH ME RENDERED");

}


// ==================================================
// EDUCATION
// ==================================================

function renderEducation(data) {

    const container =
        document.getElementById(
            "education-container"
        );


    if (!container) {

        console.warn(
            "⚠️ education-container not found"
        );

        return;
    }


    container.innerHTML = "";


    if (!Array.isArray(data) || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No education information available.
            </div>
        `;

        return;
    }


    data.forEach((education, index) => {

        const card =
            document.createElement("div");


        card.className =
            "education-card";


        // ========================================
        // EDUCATION VALUES
        // ========================================

        const year = getValue(education, [
            "year_of_completion",
            "Year_of_Completion",
            "year",
            "Year",
            "completion_year"
        ]);


        const course = getValue(education, [
            "Course_title",
            "course_title",
            "Course_Title",
            "course",
            "Course",
            "Degree",
            "degree"
        ]);


        const institute = getValue(education, [
            "Institute_Name",
            "institute_name",
            "Institute",
            "institute",
            "College",
            "college",
            "University",
            "university"
        ]);


        const specialization = getValue(education, [
            "Specialization",
            "specialization",
            "Branch",
            "branch",
            "Stream",
            "stream"
        ]);


        const duration = getValue(education, [
            "Course_Duration",
            "course_duration",
            "Duration",
            "duration"
        ]);


        const score = getValue(education, [
            "CGPA/CGPI/CPI",
            "CGPA",
            "CGPI",
            "CPI",
            "cgpa",
            "cgpi",
            "cpi"
        ]);


        // ========================================
        // CARD
        // ========================================

        card.innerHTML = `

            ${
                year
                    ? `
                        <div class="education-year">
                            ${escapeHTML(year)}
                        </div>
                    `
                    : ""
            }


            <div class="education-content">

                <h3 class="education-title">
                    ${escapeHTML(
                        course || "Education"
                    )}
                </h3>


                ${
                    institute
                        ? `
                            <h4 class="education-institute">
                                ${escapeHTML(institute)}
                            </h4>
                        `
                        : ""
                }


                ${
                    specialization
                        ? `
                            <p class="education-specialization">
                                ${escapeHTML(
                                    specialization
                                )}
                            </p>
                        `
                        : ""
                }


                ${
                    duration
                        ? `
                            <p class="education-duration">
                                Duration:
                                <span>
                                    ${escapeHTML(duration)}
                                </span>
                            </p>
                        `
                        : ""
                }


                ${
                    score
                        ? `
                            <span class="education-score">
                                CGPA/CGPI/CPI:
                                ${escapeHTML(score)}
                            </span>
                        `
                        : ""
                }

            </div>

        `;


        container.appendChild(card);


        console.log(
            `🎓 Education ${index + 1}:`,
            education
        );

    });


    console.log(
        `✅ ${data.length} education record(s) rendered`
    );

}


// ==================================================
// PROJECTS
// ==================================================

function renderProjects(data) {

    const container =
        document.getElementById(
            "projects-container"
        );


    if (!container) {

        console.warn(
            "⚠️ projects-container not found"
        );

        return;
    }


    container.innerHTML = "";


    if (!Array.isArray(data) || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No projects available.
            </div>
        `;

        return;
    }


    data.forEach((project, index) => {

        const card =
            document.createElement("article");


        card.className =
            "project-card";


        // ========================================
        // PROJECT VALUES
        // ========================================

        const id = getValue(project, [
            "id",
            "ID"
        ]);


        const title = getValue(project, [
            "Title",
            "title",
            "Project_Title",
            "project_title"
        ]);


        const description = getValue(project, [
            "Description",
            "description"
        ]);


        const year = getValue(project, [
            "year_of_project",
            "Year_of_Project",
            "year",
            "Year"
        ]);


        const skills = getValue(project, [
            "skills_tech",
            "Skills_Tech",
            "skills",
            "Skills",
            "technologies"
        ]);


        const projectURL = getValue(project, [
            "Project_Link",
            "project_link",
            "project_url",
            "Project_URL"
        ]);


        const githubURL = getValue(project, [
            "github_link",
            "Github_Link",
            "GitHub_Link",
            "github",
            "Github"
        ]);


        const team = getValue(project, [
            "project_drone_under",
            "Project_Drone_Under",
            "team",
            "Team"
        ]);


        // ========================================
        // SKILLS
        // ========================================

        let skillsHTML = "";


        if (skills) {

            skillsHTML =
                String(skills)
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean)
                    .map(skill => `
                        <span class="project-tech">
                            ${escapeHTML(skill)}
                        </span>
                    `)
                    .join("");

        }


        // ========================================
        // PROJECT LINK
        // ========================================

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


        // ========================================
        // GITHUB LINK
        // ========================================

        let githubHTML = "";


        if (githubURL) {

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


        // ========================================
        // CARD HTML
        // ========================================

        card.innerHTML = `

            <div class="project-number">
                ${String(
                    id || index + 1
                ).padStart(2, "0")}
            </div>


            <div class="project-content">

                ${
                    year
                        ? `
                            <div class="project-top">
                                <span class="project-year">
                                    ${escapeHTML(year)}
                                </span>
                            </div>
                        `
                        : ""
                }


                <h3>
                    ${escapeHTML(
                        title ||
                        "Untitled Project"
                    )}
                </h3>


                <p>
                    ${escapeHTML(
                        description ||
                        "No description available."
                    )}
                </p>


                ${
                    skillsHTML
                        ? `
                            <div class="project-tech-stack">
                                ${skillsHTML}
                            </div>
                        `
                        : ""
                }


                ${
                    team
                        ? `
                            <div class="project-team">
                                ${escapeHTML(team)}
                            </div>
                        `
                        : ""
                }


                <div class="project-actions">

                    ${projectLinkHTML}

                    ${githubHTML}

                </div>

            </div>

        `;


        // ========================================
        // DOUBLE CLICK
        // ========================================

        if (projectURL) {

            card.addEventListener(
                "dblclick",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    window.open(
                        projectURL,
                        "_blank"
                    );

                }
            );


            card.style.cursor =
                "pointer";

            card.title =
                "Double-click to open project";

        }


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
        document.getElementById(
            "certificates-container"
        );


    if (!container) {

        console.warn(
            "⚠️ certificates-container not found"
        );

        return;
    }


    container.innerHTML = "";


    if (!Array.isArray(data) || data.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                No certificates available.
            </div>
        `;

        return;
    }


    data.forEach((certificate, index) => {

        const card =
            document.createElement("div");


        card.className =
            "certificate-card";


        // ========================================
        // CERTIFICATE VALUES
        // ========================================

        const certificateName =
            getValue(certificate, [
                "Certification_Name",
                "certification_name",
                "Certificate_Name",
                "certificate_name",
                "Title",
                "title",
                "Name",
                "name"
            ]) ||
            "Certificate";


        const organization =
            getValue(certificate, [
                "Issuing_Organization",
                "issuing_organization",
                "Organization",
                "organization",
                "Issuer",
                "issuer"
            ]);


        const issueDate =
            getValue(certificate, [
                "Issue_Date",
                "issue_date",
                "IssueDate",
                "issueDate",
                "Year",
                "year"
            ]);


        // ========================================
        // CERTIFICATE LINK
        // ========================================

        const certificateURL =
            getValue(certificate, [
                "certificate link",
                "certificate_link",
                "Certificate_Link",
                "Certificate_URL",
                "certificate_url",
                "Certificate_Link_URL",
                "URL",
                "url",
                "Link",
                "link"
            ]);


        console.log(
            "📜 Certificate:",
            certificateName
        );


        console.log(
            "🏢 Organization:",
            organization
        );


        console.log(
            "📅 Issue Date:",
            issueDate
        );


        console.log(
            "🔗 Certificate URL:",
            certificateURL
        );


        // ========================================
        // LINK
        // ========================================

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


        // ========================================
        // CARD
        // ========================================

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


                ${
                    organization
                        ? `
                            <p>
                                ${escapeHTML(
                                    organization
                                )}
                            </p>
                        `
                        : ""
                }


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


        // ========================================
        // DOUBLE CLICK
        // ========================================

        if (certificateURL) {

            card.addEventListener(
                "dblclick",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    window.open(
                        certificateURL,
                        "_blank"
                    );

                }
            );


            card.style.cursor =
                "pointer";

            card.title =
                "Double-click to open certificate";

        }


        container.appendChild(card);


        console.log(
            `📜 Certificate ${index + 1} rendered`
        );

    });


    console.log(
        `✅ ${data.length} certificate(s) rendered`
    );

}


// ==================================================
// DATE FORMAT
// ==================================================

function formatDate(value) {

    if (!value) {
        return "";
    }


    let dateString =
        String(value).trim();


    try {

        // DD-MM-YYYY

        if (
            /^\d{2}-\d{2}-\d{4}$/.test(
                dateString
            )
        ) {

            const parts =
                dateString.split("-");

            const date =
                new Date(
                    Number(parts[2]),
                    Number(parts[1]) - 1,
                    Number(parts[0])
                );


            return date.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

        }


        // YYYY-MM-DD

        if (
            /^\d{4}-\d{2}-\d{2}$/.test(
                dateString
            )
        ) {

            const parts =
                dateString.split("-");

            const date =
                new Date(
                    Number(parts[0]),
                    Number(parts[1]) - 1,
                    Number(parts[2])
                );


            return date.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

        }


        return dateString;

    } catch (error) {

        console.warn(
            "⚠️ Date formatting failed:",
            error
        );

        return dateString;

    }

}


// ==================================================
// SET TEXT
// ==================================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (
        !element ||
        value === null ||
        value === undefined
    ) {
        return;
    }


    element.textContent =
        value;

}


// ==================================================
// SET LINK
// ==================================================

function setLink(id, url) {

    const element =
        document.getElementById(id);


    if (
        !element ||
        !url
    ) {
        return;
    }


    element.href =
        url;


    if (
        !url.startsWith("mailto:")
    ) {

        element.target =
            "_blank";

        element.rel =
            "noopener noreferrer";

    }

}


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==================================================
// ESCAPE ATTRIBUTE
// ==================================================

function escapeAttribute(value) {

    if (!value) {
        return "#";
    }


    return String(value)
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==================================================
// LOADER
// ==================================================

function hideLoader() {

    const loader =
        document.getElementById(
            "loading-screen"
        );


    if (!loader) {

        console.warn(
            "⚠️ Loading screen not found"
        );

        return;
    }


    console.log(
        "🔓 Hiding loading screen..."
    );


    loader.classList.add(
        "loaded"
    );


    setTimeout(() => {

        loader.style.display =
            "none";

    }, 700);

}


// ==================================================
// DARK / LIGHT MODE
// ==================================================

function initializeTheme() {

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        );


    // ========================================
    // LOAD SAVED THEME
    // ========================================

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );

    }


    // ========================================
    // UPDATE ICON
    // ========================================

    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }


        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            themeToggle.textContent =
                "🌙";

        } else {

            themeToggle.textContent =
                "☀️";

        }

    }


    updateThemeIcon();


    // ========================================
    // TOGGLE
    // ========================================

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

}
