document.addEventListener("DOMContentLoaded", function(){

    // Speed of scrolling to each section in milliseconds
    var scrollSpeed = 150; 

    // Set event listener on each li element in the menu
    var menuItems = document.querySelectorAll(".menu li a");

    function getCurrentSectionIndex(sections) {
        var currentSectionIndex = 0;

        for (let i = 0; i < sections.length; i++) {

            // Checking if the top of the section is in the viewport
            let rect = document.querySelector(sections[i].getAttribute("href")).getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight) {
                currentSectionIndex = i;
                break;
            }
        }

        return currentSectionIndex;
    }

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", function(e) {

            // Prevent default action
            e.preventDefault(); 

            var targetId = this.getAttribute("href");
            var sections = Array.from(document.querySelectorAll(".menu li a"));

            // Get the index of the current section
            var currentSectionIndex = getCurrentSectionIndex(sections);

            // Get the index of the target section
            var targetIndex = sections.findIndex(item => item.getAttribute("href") === targetId);

            // Create an array of sections to scroll through
            var sectionsToPass = currentSectionIndex <= targetIndex ? 
                sections.slice(currentSectionIndex, targetIndex + 1) : 
                sections.slice(targetIndex, currentSectionIndex + 1).reverse();

            // Loop through the sections to pass
            sectionsToPass.forEach((item, index) => {
                setTimeout(() => {
                    var sectionId = item.getAttribute("href");
                    var sectionElement = document.querySelector(sectionId);
                    
                    // Use scrollIntoView method
                    sectionElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                }, index * scrollSpeed); // Adjust scrolling speed here
            });
        });
    }
});
