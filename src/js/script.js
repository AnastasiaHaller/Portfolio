document.addEventListener('DOMContentLoaded', () => {

    // Side panel

    const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');
    menuOverlay = document.querySelector('.menu__overlay');
    menuItems = document.querySelectorAll('.menu__link');

    hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    });

    menuOverlay.addEventListener('click', () => {
    menu.classList.remove('active');
    });

    menuItems.forEach(item => {
    item.addEventListener('click', () => {
    menu.classList.remove('active');
    });
    });

    const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

    counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
    });

    // Form

    const form = document.querySelector('.contacts__form'),
          button = document.querySelector('.contacts__btn');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            button.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                button.classList.remove('_sending');
            } else {
                alert('Error');
                button.classList.remove('_sending');
            }
        }
    }

    function formValidate() {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "" || (input.type === "checkbox" && input.checked === false)) {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});