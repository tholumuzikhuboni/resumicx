// Add more skills dynamically
document.getElementById("add-skill").addEventListener("click", () => {
  const skillsSection = document.getElementById("skills-section");
  const skillInput = document.createElement("input");
  skillInput.type = "text";
  skillInput.className = "form-control mt-2";
  skillInput.placeholder = "Add a skill";
  skillsSection.appendChild(skillInput);
});

// Add more work experience dynamically
document.getElementById("add-experience").addEventListener("click", () => {
  const experienceSection = document.getElementById("experience-section");
  const experienceEntry = document.createElement("div");
  experienceEntry.className = "experience-entry mb-3";
  experienceEntry.innerHTML = `
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
  experienceSection.appendChild(experienceEntry);
});

// Generate resume preview
document.getElementById("generate-resume").addEventListener("click", () => {
  const fullName = document.getElementById("full-name").value;
  const profession = document.getElementById("profession").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const about = document.getElementById("about").value;

  const skills = Array.from(document.querySelectorAll("#skills-section input"))
    .map(skill => skill.value)
    .filter(skill => skill.trim() !== "");

  const experiences = Array.from(document.querySelectorAll(".experience-entry")).map(entry => ({
    role: entry.querySelector("input:nth-child(2)").value,
    company: entry.querySelector("input:nth-child(4)").value,
    startDate: entry.querySelector("input:nth-child(6)").value,
    endDate: entry.querySelector("input:nth-child(8)").value,
    description: entry.querySelector("textarea").value,
  }));

  const previewArea = document.getElementById("resume-preview");
  previewArea.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
      <h2>${fullName}</h2>
      <h4>${profession}</h4>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>About Me:</strong> ${about}</p>
      <h4>Skills</h4>
      <ul>
        ${skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
      <h4>Work Experience</h4>
      <ul>
        ${experiences.map(exp => `
          <li>
            <strong>${exp.role}</strong> at <strong>${exp.company}</strong><br>
            ${exp.startDate} to ${exp.endDate}<br>
            ${exp.description}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
});

// Download resume as PDF
document.getElementById("download-resume").addEventListener("click", async () => {
  const previewArea = document.getElementById("resume-preview");
  if (!previewArea.innerHTML.trim()) {
    alert("Please generate a resume preview first!");
    return;
  }

  const opt = {
    margin: 1,
    filename: 'Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  const contentToDownload = previewArea.cloneNode(true);

  // Ensure styles are embedded for rendering
  contentToDownload.style.fontFamily = "'Arial', sans-serif";
  contentToDownload.style.padding = "20px";
  contentToDownload.style.border = "1px solid #ccc";

  await new Promise((resolve) => setTimeout(resolve, 500));
  html2pdf().from(contentToDownload).set(opt).save();
});
