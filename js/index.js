document.addEventListener("DOMContentLoaded", function() {
    const invitation = document.querySelector('.invitation');
    invitation.style.opacity = 0;
    invitation.style.transition = 'opacity 2s';

    setTimeout(() => {
        invitation.style.opacity = 1;
    }, 100);
});