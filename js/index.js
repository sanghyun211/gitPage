document.addEventListener("DOMContentLoaded", function() {
    const invitation = document.querySelector('.invitation');
    invitation.style.opacity = 0;
    invitation.style.transition = 'opacity 2s';

    setTimeout(() => {
        invitation.style.opacity = 1;
    }, 100);

    const form = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('guest-name').value;
        const message = document.getElementById('guest-message').value;

        if (name && message) {
            const entry = {
                name: name,
                message: message,
                date: new Date().toLocaleString()
            };

            addEntryToGuestbook(entry);
            saveEntryToLocalStorage(entry);

            form.reset();
        }
    });

    function addEntryToGuestbook(entry) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${entry.name}</strong> <em>${entry.date}</em><p>${entry.message}</p>`;
        guestbookEntries.appendChild(li);
    }

    function saveEntryToLocalStorage(entry) {
        let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.push(entry);
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
    }

    function loadEntriesFromLocalStorage() {
        let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.forEach(entry => addEntryToGuestbook(entry));
    }

    loadEntriesFromLocalStorage();
});