$(function () {
  // Smooth scroll
  $("nav a").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      1000
    );
    return false;
  });

  // tablesorter
  $("#expert").tablesorter({ widgets: ["staticRow"] });

  $("#expert").bind("sortEnd", function (e, table) {
    $("tr.static").each(function () {
      console.log("parent-id");
      var id = $(this).data("parent-id");
      var parentSelector = "[data-id=" + id + "]";
      $(this).insertAfter(parentSelector);
    });
  });

  // accordion
  // $('tr.item-title').click(function(){
  //   console.log('hi');
  //   var id = $(this).data('id');
  //   console.log(id);
  //   var childSelector = '[data-parent-id=' + id + ']';
  //   $(childSelector).toggle();
  //   console.log(childSelector);
  // });

  // Guide nav
  const guideNav = $("#guide"); // The guide navigation element
  const aboutUsSection = $("#about-us"); // The "About Us" section
  const aboutUsOffset = aboutUsSection.offset().top - 100; // Top position of the "About Us" section

  // Section offsets for active link highlighting
  const sections = [
    "#about-us",
    "#past-solutions",
    "#atmospheric-friends",
    "#future-solutions",
    "#contact-us",
  ];

  // Highlight the current link based on the scroll position
  $(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();

    // Show/hide the guide nav based on scroll position
    if (scrollPosition > aboutUsOffset) {
      guideNav.addClass("visible");
    } else {
      guideNav.removeClass("visible");
    }

    // Flag to track if any section is currently active
    let sectionActive = false;

    // Loop through each section and check if it is in the viewport
    sections.forEach(function (section) {
      const sectionOffset = $(section).offset().top - 100; // Adjust this value to when you want it to activate
      const sectionHeight = $(section).outerHeight();

      // Check if the current scroll position is within the section's range
      if (
        scrollPosition >= sectionOffset &&
        scrollPosition < sectionOffset + sectionHeight
      ) {
        // Remove 'current' class from all links
        $("nav#past-present-future a").removeClass("current");

        // Add 'current' class to the corresponding link
        $("nav#past-present-future a[href='" + section + "']").addClass(
          "current"
        );

        // Mark that a section is currently active
        sectionActive = true;
      }
    });

    // If no section is active, remove the 'current' class from all links
    if (!sectionActive) {
      $("nav#past-present-future a").removeClass("current");
    }
  });

  // Times in Paris and Tokyo

  function formatTimeInCity(timezone) {
    const date = new Date();
    const options = {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      weekday: undefined,
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(date);

    const hour = parts.find((p) => p.type === "hour").value;
    const minute = parts.find((p) => p.type === "minute").value;
    const day = parts.find((p) => p.type === "day").value;
    const month = parts.find((p) => p.type === "month").value;
    const year = parts.find((p) => p.type === "year").value;
    const dayPeriod = parts
      .find((p) => p.type === "dayPeriod")
      .value.toLowerCase();

    return `${hour}:${minute}${dayPeriod}, ${month} ${day}, ${year}`;
  }

  function updateTimes() {
    document.getElementById("paris-time").textContent =
      formatTimeInCity("Europe/Paris");
    document.getElementById("tokyo-time").textContent =
      formatTimeInCity("Asia/Tokyo");
  }

  updateTimes();

  // Optional: Update every minute
  setInterval(updateTimes, 60 * 1000);
});

// air quality

// https://api.waqi.info/feed/A514390/?token=22150a2e50f0966426a1b74dffb3d16f06ca38b6

async function showAQI() {
  const url =
    "https://api.waqi.info/feed/A514390/?token=22150a2e50f0966426a1b74dffb3d16f06ca38b6";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ok") {
      const aqi = data.data.aqi;
      const location = data.data.city.name;
      const display = document.getElementById("air");
      display.textContent = `The air quality is ${aqi} in Kamakura.`;
    } else {
      document.getElementById("air").textContent = "Error loading AQI.";
    }
  } catch (err) {
    document.getElementById("air").textContent = "Error fetching AQI.";
    console.error(err);
  }
}

window.addEventListener("load", showAQI);
