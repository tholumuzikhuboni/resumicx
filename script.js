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

    const skillsEntries = document.querySelectorAll(".skills-entry input");
    let skillsHTML = "<ul>";
    skillsEntries.forEach((entry) => {
      const skill = entry.value || "No skill added.";
      skillsHTML += `<li>${skill}</li>`;
    });
    skillsHTML += "</ul>";

    const experienceEntries = document.querySelectorAll(".experience-entry");
    let experienceHTML = "";
    experienceEntries.forEach((entry) => {
      const role = entry.querySelector("input[placeholder='Software Engineer']").value || "N/A";
      const company = entry.querySelector("input[placeholder='Tech Corp']").value || "N/A";
      const startDate = entry.querySelector("input[type='date']").value || "N/A";
      const endDate = entry.querySelectorAll("input[type='date']")[1].value || "N/A";
      const description = entry.querySelector("textarea").value || "No description.";
      experienceHTML += `
        <div>
          <h5>${role} at ${company}</h5>
          <p>${startDate} - ${endDate}</p>
          <p>${description}</p>
        </div>
      `;
    });

    const profilePicture = document.getElementById("profile-picture").files[0];
    const profileImageURL = profilePicture ? URL.createObjectURL(profilePicture) : "";

    // Display Resume Preview
    const previewArea = document.getElementById("resume-preview");
    previewArea.innerHTML = `
      <div class="card p-3">
        <div class="text-center">
          ${profileImageURL ? `<img src="${profileImageURL}" alt="Profile Picture" class="img-thumbnail" style="max-width: 150px;">` : ""}
          <h2>${name}</h2>
          <h4>${profession}</h4>
        </div>
        <div>
          <h5>Contact Information</h5>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
        </div>
        <div>
          <h5>About Me</h5>
          <p>${about}</p>
        </div>
        <div>
          <h5>Skills</h5>
          ${skillsHTML}
        </div>
        <div>
          <h5>Work Experience</h5>
          ${experienceHTML}
        </div>
      </div>
    `;
  });

  // Download Resume as PDF
  document.getElementById("download-resume").addEventListener("click", () => {
    const previewArea = document.getElementById("resume-preview");

    // Check if the preview is generated
    if (!previewArea.innerHTML.trim()) {
      alert("Please generate a resume preview first!");
      return;
    }

    // Clone the preview area to avoid rendering issues
    const clonedPreview = previewArea.cloneNode(true);

    // Configure html2pdf options
    const opt = {
      margin: 1,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Render and download the PDF
    html2pdf().set(opt).from(clonedPreview).save();
  });
});
