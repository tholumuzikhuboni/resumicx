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
    let skillsHTML = "";
    skillsEntries.forEach((entry) => {
      const skill = entry.value || "No skill added.";
      skillsHTML += `<li>${skill}</li>`;
    });

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

    // Display Profile Image
    const previewArea = document.getElementById("resume-preview");
    previewArea.innerHTML = `
      <div>
        <div class="text-center">
          <img src="${profileImageURL}" alt="Profile Picture" class="profile-image">
        </div>
        <h1>${name}</h1>
        <h3>${profession}</h3>
        <h4>About Me</h4>
        <p>${about}</p>
        <h4>Contact Details</h4>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h4>Skills</h4>
        <ul>${skillsHTML || "No skills added."}</ul>
        <h4>Work Experience</h4>
        ${experienceHTML || "No work experience added."}
      </div>
    `;
    previewArea.scrollIntoView({ behavior: "smooth" });
  });

  // Download Resume as PDF
  document.getElementById("download-resume").addEventListener("click", () => {
    const doc = new jsPDF();
    const previewArea = document.getElementById("resume-preview");

    // Prepare image for PDF
    const profilePicture = document.getElementById("profile-picture").files[0];
    const profileImageURL = profilePicture ? URL.createObjectURL(profilePicture) : "";

    // Insert the image into the PDF if exists
    if (profileImageURL) {
      const img = new Image();
      img.src = profileImageURL;
      img.onload = function () {
        // Draw the circle with a border for profile picture
        doc.setFillColor(255, 255, 255); // Set background color for the image circle
        doc.setLineWidth(3); // Set border thickness
        doc.setDrawColor(0, 0, 0); // Set border color (black)
        doc.ellipse(20, 20, 15, 15, 'S'); // Draw the circle border
        doc.addImage(img, "JPEG", 10, 10, 30, 30); // Add the image inside the circle
        generatePDFContent(doc, previewArea);
      };
    } else {
      generatePDFContent(doc, previewArea);
    }
  });

  // Helper function to generate content in PDF after image load
  function generatePDFContent(doc, previewArea) {
    doc.html(previewArea, {
      callback: (doc) => {
        doc.text("Created on resumicx.tholumuzi.co.za", 10, doc.internal.pageSize.height - 10, {
          align: "center",
        });
        doc.save("resume.pdf");
      },
      x: 10,
      y: 10,
    });
  }
});
