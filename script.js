document.addEventListener("DOMContentLoaded", () => {
  // Dynamically add work experience fields
  document.getElementById("add-experience").addEventListener("click", () => {
    const experienceSection = document.getElementById("experience-section");
    const newExperience = document.createElement("div");
    newExperience.className = "experience-entry mb-3";
    newExperience.innerHTML = `
      <label class="form-label">Job Role</label>
      <input type="text" class="form-control" placeholder="Software Engineer">
      <label class="form-label">Company Name</label>
      <input type="text" class="form-control" placeholder="Tech Corp">
      <label class="form-label">Start Date</label>
      <input type="date" class="form-control">
      <label class="form-label">End Date</label>
      <input type="date" class="form-control">
      <label class="form-label">Description</label>
      <textarea class="form-control" rows="3"></textarea>
    `;
    experienceSection.appendChild(newExperience);
  });

  // Dynamically add skills fields
  document.getElementById("add-skill").addEventListener("click", () => {
    const skillsSection = document.getElementById("skills-section");
    const newSkill = document.createElement("div");
    newSkill.className = "skills-entry mb-3";
    newSkill.innerHTML = `
      <input type="text" class="form-control" placeholder="Add a skill">
    `;
    skillsSection.appendChild(newSkill);
  });

  // Generate Resume Preview
  document.getElementById("generate-resume").addEventListener("click", () => {
    const name = document.getElementById("full-name").value || "John Doe";
    const profession = document.getElementById("profession").value || "Your Profession";
    const about = document.getElementById("about").value || "Tell us about yourself.";
    const email = document.getElementById("email").value || "you@example.com";
    const phone = document.getElementById("phone").value || "123-456-7890";
    const address = document.getElementById("address").value || "N/A";
    const city = document.getElementById("city").value || "N/A";
    const country = document.getElementById("country").value || "N/A";

    const skillsEntries = document.querySelectorAll(".skills-entry input");
    let skillsHTML = "";
    skillsEntries.forEach((entry) => {
      const skill = entry.value || "No skill added.";
      skillsHTML += `<li>${skill}</li>`;
    });

    const experienceEntries = document.querySelectorAll(".experience-entry");
    let experienceHTML = "";
    experienceEntries.forEach((entry) => {
      const jobRole = entry.querySelector("input[placeholder='Software Engineer']").value || "No job role";
      const company = entry.querySelector("input[placeholder='Tech Corp']").value || "No company";
      const startDate = entry.querySelector("input[type='date']:nth-of-type(1)").value || "N/A";
      const endDate = entry.querySelector("input[type='date']:nth-of-type(2)").value || "N/A";
      const description = entry.querySelector("textarea").value || "No description";
      experienceHTML += `
        <div><strong>${jobRole}</strong> at ${company} (${startDate} - ${endDate})</div>
        <p>${description}</p>
      `;
    });

    // Create resume preview
    const resumePreview = document.getElementById("resume-preview");
    resumePreview.innerHTML = `
      <h3>${name}</h3>
      <p><em>${profession}</em></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>About Me:</strong> ${about}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${country}</p>
      <h4>Skills</h4>
      <ul>${skillsHTML}</ul>
      <h4>Work Experience</h4>
      ${experienceHTML}
    `;
  });

  // Download Resume Functionality
  document.getElementById("download-resume").addEventListener("click", () => {
    const name = document.getElementById("full-name").value || "John Doe";
    const profession = document.getElementById("profession").value || "Your Profession";
    const about = document.getElementById("about").value || "Tell us about yourself.";
    const email = document.getElementById("email").value || "you@example.com";
    const phone = document.getElementById("phone").value || "123-456-7890";
    const address = document.getElementById("address").value || "N/A";
    const city = document.getElementById("city").value || "N/A";
    const country = document.getElementById("country").value || "N/A";

    const skillsEntries = document.querySelectorAll(".skills-entry input");
    let skillsText = "Skills:\n";
    skillsEntries.forEach((entry) => {
      const skill = entry.value || "No skill added.";
      skillsText += `- ${skill}\n`;
    });

    const experienceEntries = document.querySelectorAll(".experience-entry");
    let experienceText = "Work Experience:\n";
    experienceEntries.forEach((entry) => {
      const jobRole = entry.querySelector("input[placeholder='Software Engineer']").value || "No job role";
      const company = entry.querySelector("input[placeholder='Tech Corp']").value || "No company";
      const startDate = entry.querySelector("input[type='date']:nth-of-type(1)").value || "N/A";
      const endDate = entry.querySelector("input[type='date']:nth-of-type(2)").value || "N/A";
      const description = entry.querySelector("textarea").value || "No description";
      experienceText += `\n${jobRole} at ${company} (${startDate} - ${endDate})\n${description}\n`;
    });

    const resumeText = `
      ${name}
      ${profession}

      Email: ${email}
      Phone: ${phone}
      
      About Me:
      ${about}
      
      Address:
      ${address}, ${city}, ${country}
      
      ${skillsText}
      
      ${experienceText}
    `;

    // Create a blob and download it as a text file
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_Resume.txt`;
    link.click();
  });
});
