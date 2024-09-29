document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');
    const maxDistance = 150;

    let mouseX = 0;
    let mouseY = 0;

    const alarmAudio = new Audio('alarm-sound.mp3');

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function moveButton() {
        const rect = button.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;

        const dx = mouseX - buttonX;
        const dy = mouseY - buttonY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
            requestAnimationFrame(moveButton);
            return;
        }

        const moveX = (dx / distance) * maxDistance;
        const moveY = (dy / distance) * maxDistance;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newLeft = rect.left - moveX;
        let newTop = rect.top - moveY;

        newLeft = Math.max(0, Math.min(viewportWidth - rect.width, newLeft));
        newTop = Math.max(0, Math.min(viewportHeight - rect.height, newTop));

        button.style.transform = `translate(${newLeft - rect.left}px, ${newTop - rect.top}px)`;

        requestAnimationFrame(moveButton);
    }

    moveButton();

    button.addEventListener('click', () => {
        button.classList.add('ripple');
        alarmAudio.play();
        setTimeout(() => {
            alert('You are still gay!!!!');
        }, 50);

        button.addEventListener('animationend', () => {
            button.classList.remove('ripple');
        }, { once: true });
    });

    // Delay alarm sound for 10 seconds
    setTimeout(() => {
        alarmAudio.play();
        setTimeout(() => {
            alert('Gay Detected!!!');
        }, 50);
    }, 10000); // 10000ms = 10 seconds
});