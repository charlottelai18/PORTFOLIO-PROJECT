fetch("./projects.json")
  .then(res => res.json())
  .then(projects => {
    const grid = document.getElementById("projectsGrid");

    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "projects__card";

      card.innerHTML = `
        <div class="projects__image-wrapper">
          <img src="${project.image}" alt="${project.title}" class="projects__image" />
        </div>

        <div class="projects__content">
          <h3 class="projects__card-title">${project.title}</h3>
          <p class="projects__card-text">${project.description}</p>

          <div class="projects__tags">
            ${project.tags.map(tag => `<span class="projects__tag">${tag}</span>`).join("")}
          </div>

          <div class="projects__links">
            <a href="${project.live}" target="_blank" class="projects__card-button">Live Demo</a>
            <a href="${project.github}" target="_blank" class="projects__card-link">GitHub</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  });
