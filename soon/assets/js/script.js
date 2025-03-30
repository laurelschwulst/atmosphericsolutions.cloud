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
  $('#expert').tablesorter({ widgets: ['staticRow'] });

  $('#expert').bind('sortEnd',function(e, table) {
    $('tr.static').each(function(){
      console.log('parent-id');
      var id = $(this).data('parent-id');
      var parentSelector = '[data-id=' + id + ']';
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
  const guideNav = $('#guide'); // The guide navigation element
  const aboutUsSection = $('#about-us'); // The "About Us" section
  const aboutUsOffset = aboutUsSection.offset().top - 100; // Top position of the "About Us" section

  // Section offsets for active link highlighting
  const sections = ['#about-us', '#past-solutions', '#atmospheric-friends', '#future-solutions', '#contact-us'];

  // Highlight the current link based on the scroll position
  $(window).on('scroll', function () {
    const scrollPosition = $(window).scrollTop();

    // Show/hide the guide nav based on scroll position
    if (scrollPosition > aboutUsOffset) {
      guideNav.addClass('visible');
    } else {
      guideNav.removeClass('visible');
    }

    // Flag to track if any section is currently active
    let sectionActive = false;

    // Loop through each section and check if it is in the viewport
    sections.forEach(function (section) {
      const sectionOffset = $(section).offset().top - 100; // Adjust this value to when you want it to activate
      const sectionHeight = $(section).outerHeight();

      // Check if the current scroll position is within the section's range
      if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
        // Remove 'current' class from all links
        $("nav#past-present-future a").removeClass("current");
        
        // Add 'current' class to the corresponding link
        $("nav#past-present-future a[href='" + section + "']").addClass("current");
        
        // Mark that a section is currently active
        sectionActive = true;
      }
    });

    // If no section is active, remove the 'current' class from all links
    if (!sectionActive) {
      $("nav#past-present-future a").removeClass("current");
    }
  });
});
