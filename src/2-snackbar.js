import iziToast from "izitoast";

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const delay = Number(form.delay.value) || 0;
    const state = form.elements.state.value;

    console.log(delay, state);
    
    setTimeout(() => {
        const promise = new Promise((resolve, reject) => {
            if (state === 'fulfilled') {
                resolve('Success');
                iziToast.success({
                    title: 'Fulfilled!',
                    message: `Fulfilled after ${delay}ms`,
                    position: 'topRight',
                });
            } else if (state === 'rejected') {
                reject('Error');
                iziToast.error({
                    title: 'Rejected!',
                    message: `Rejected after ${delay}ms`,
                    position: 'topRight',
                });
            } else {
                iziToast.warning({
                    title: 'Sorry!',
                    message: 'Something went wrong...',
                    position: 'topRight',
                }) // ! For warning to work change state value in line 23 or 16
            }
        });
    }, delay);
}