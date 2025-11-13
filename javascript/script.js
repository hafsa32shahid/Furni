// Select all list items
const navItems = document.querySelectorAll('.nav-item');

// Add click event listener to each nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add 'active' class to the clicked nav item
        item.classList.add('active');
    });
});
function openNav() {
    // Open the sidebar
    document.getElementById("mySidenav").style.width = "250px";
  
    // Show the overlay
    document.getElementById("overlay").classList.add("visible");
  
    // Dim the background content
    document.body.classList.add("dimmed");
    // disable scrolling
    document.body.classList.add("noscroll");
  }
  
  function closeNav() {
    // Close the sidebar
    document.getElementById("mySidenav").style.width = "0";
  
    // Hide the overlay
    document.getElementById("overlay").classList.remove("visible");
  
    // Restore normal background content
    document.body.classList.remove("dimmed");
    // unable scrolling
    document.body.classList.remove("noscroll");
  }
      
// Types to filter (you can dynamically update this array as needed)
const selectedTypes = ["Bedroom","Dining Room"]; // Filter for "sofa" and "chair"

// Fetch JSON data
fetch('cards.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then(data => {
    // Filter data for selected types
    const filteredData = data.filter(item => selectedTypes.includes(item.category));

    // Render the filtered cards
    renderCards(filteredData);
  })
  .catch(error => console.error("Error fetching JSON:", error));

// Function to render cards
function renderCards(data) {
  const container = document.getElementById("cards-row");
  container.innerHTML = ""; // Clear previous content

  data.forEach(item => {
    const cardHTML = `
      <div class="card col-lg-4 col-md-6 col-sm-12 border-0 p-3" >
        <div class="card-body text-center">
          <img src="${item.image}" alt="${item.name}" class=" card-img-top">
          <h3 class="mt-3">${item.name}</h3>
          <p>Price: $${item.price}</p>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}


// gsap animation for text and other

// Select all elements with class 'text-anim'
const typewriters = document.querySelectorAll(".text-anim");

// Function to animate the typewriter effect with GSAP
function typeWriterAnimation(element) {
  const textContent = element.textContent;

  // Split text into individual characters
  const splitText = textContent.split("");
  element.innerHTML = splitText.map((char) => `<span>${char}</span>`).join("");

  // Animate each character using GSAP timeline
  const timeline = gsap.timeline({ onComplete: () => blinkCursor(element) });
  timeline.fromTo(
    element.querySelectorAll("span"),
    { opacity: 0 },
    { opacity: 1, duration: 0.1, stagger: 0.05 }
  );

  // Blinking cursor effect
  function blinkCursor(elem) {
    gsap.to(elem, { borderRightColor: "transparent", duration: 0.5, repeat: -1, yoyo: true });
  }
}

// Start the animation for each typewriter element
typewriters.forEach(typeWriterAnimation);

// navlinks animation on load
// Option 2: Manual Iteration with Delays
const nav_items = document.querySelectorAll(".nav-item");

nav_items.forEach((item, index) => {
  gsap.fromTo(
    item,
    { opacity: 0, y: 50 }, // Start state
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "Power2.easeInOut",
      delay: index * 0.3 // Sequential delay
    }
  );
});