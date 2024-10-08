$(document).ready(function() {
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showNextSlide() {
        slides.eq(currentIndex).removeClass('active'); 
        currentIndex = (currentIndex + 1) % totalSlides; 
        slides.eq(currentIndex).addClass('active'); 
    }

    slides.eq(currentIndex).addClass('active'); 

    setInterval(showNextSlide, 2000); 
});
