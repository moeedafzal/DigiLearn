const getStartedButtons = document.querySelectorAll(".get-started-button");
const modulesContainer = document.querySelector("#module-cards-container");

getStartedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = `pages.html?pageNumber=1`;
  });
});

const bonusBriefs = [
  {
    title: "E-commerce mobile app for organic food store",
    description: "Organic Basket: E-commerce mobile app...",
  },
  {
    title: "Social media platform for pet enthusiasts",
    description: "PawsConnect: Social media for pet lovers...",
  },
  {
    title: "Travel experience planner application",
    description: "Wanderlust Companion: Travel experience planner...",
  },
];

function getModuleButton(pageNumber, buttonText = "See module") {
  const moduleButton = document.createElement("button");
  moduleButton.innerHTML = buttonText;
  moduleButton.id = "next-button";

  const moduleButtonImage = document.createElement("img");
  moduleButtonImage.src = "/img/next-arrow.svg";
  moduleButtonImage.alt = "Next arrow icon";
  moduleButtonImage.width = "16";
  moduleButtonImage.height = "16";

  moduleButton.appendChild(moduleButtonImage);

  moduleButton.addEventListener("click", () => {
    window.location.href = `pages.html?pageNumber=${pageNumber}`;
  });

  return moduleButton;
}

// creating cards for each module and appending them to the container
function createModuleCard(module) {
  const moduleCard = document.createElement("div");
  moduleCard.classList.add("module-card");

  const moduleTitle = document.createElement("h2");
  moduleTitle.innerHTML = module.title;

  const moduleHeading = document.createElement("h3");
  moduleHeading.innerHTML = module.heading;

  const moduleDescription = document.createElement("p");
  moduleDescription.innerHTML = module.description;

  const moduleButton = getModuleButton(module.entry_page_number);

  moduleCard.appendChild(moduleTitle);
  moduleCard.appendChild(moduleHeading);
  moduleCard.appendChild(moduleDescription);
  moduleCard.appendChild(moduleButton);

  moduleCard.style.backgroundImage = `url('/img/watermark-0${module.index}.png')`;
  moduleCard.style.backgroundRepeat = "no-repeat";
  moduleCard.style.backgroundPosition = "left";

  return moduleCard;
}

async function appendModulesCards() {
  try {
    // Fetching Modules from database
    const response = await fetch(`/get-modules-data`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    const modules = res.data;

    modules.forEach((module) => {
      const moduleCard = createModuleCard(module);
      modulesContainer.appendChild(moduleCard);
    });

    const bonusModuleCard = document.createElement("div");
    bonusModuleCard.classList.add("module-card");

    const bonusModuleTitle = document.createElement("h2");
    bonusModuleTitle.innerHTML = "Bonus project briefs";

    const briefsContainer = document.createElement("div");
    briefsContainer.classList.add("briefs-container");
    briefsContainer.style.display = "flex";
    briefsContainer.style.gap = "70px";
    briefsContainer.style.margin = "28px 0";

    bonusBriefs.forEach((brief) => {
      const briefCard = document.createElement("div");
      briefCard.classList.add("brief-card");

      const briefTitle = document.createElement("h4");
      briefTitle.innerHTML = brief.title;
      briefTitle.style.fontWeight = "600";

      const briefDescription = document.createElement("p");
      briefDescription.innerHTML = brief.description;
      briefDescription.style.marginTop = "4px";

      briefCard.appendChild(briefTitle);
      briefCard.appendChild(briefDescription);

      briefsContainer.appendChild(briefCard);
    });

    const moduleButton = getModuleButton(15, "Explore");
    bonusModuleCard.appendChild(bonusModuleTitle);
    bonusModuleCard.appendChild(briefsContainer);
    bonusModuleCard.appendChild(moduleButton);

    bonusModuleCard.style.backgroundImage = `url('/img/watermark-gift.png')`;
    bonusModuleCard.style.backgroundRepeat = "no-repeat";
    bonusModuleCard.style.backgroundPosition = "left";

    modulesContainer.appendChild(bonusModuleCard);
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation:",
      error.message
    );
  }
}

appendModulesCards();
