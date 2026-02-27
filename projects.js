fetch("./projects.json")
  .then(res => res.json())
  .then(projects => {
    const grid = document.getElementById("projectsGrid");
    const filterContainer = document.getElementById("projectFilters");

    // ── Collect all unique tags ──────────────────────────────────
    const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];

    // ── Build filter buttons ─────────────────────────────────────
    allTags.forEach(tag => {
      const btn = document.createElement("button");
      btn.className = "projects__filter-btn" + (tag === "All" ? " active" : "");
      btn.textContent = tag;
      btn.dataset.tag = tag;

      btn.addEventListener("click", () => {
        // update active state
        document.querySelectorAll(".projects__filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // show/hide cards
        document.querySelectorAll(".projects__card").forEach(card => {
          const cardTags = card.dataset.tags.split(",");
          const match = tag === "All" || cardTags.includes(tag);
          card.style.display = match ? "flex" : "none";
        });
      });

      filterContainer.appendChild(btn);
    });

    // ── Build project cards ──────────────────────────────────────
    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "projects__card";
      card.dataset.tags = project.tags.join(",");

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
            <a href="${project.live}" target="_blank" class="projects__card-link">Live Demo</a>
            <a href="${project.github}" target="_blank" class="projects__card-link">GitHub</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  });
