/* get the stepForm */

{
    let formProgress = 0;

    const stepForm = document.querySelector('#stepForm');

    /* get the steps inside array */

    const steps = stepForm.querySelectorAll('.stepFormStep');

    /* const userNameInput = stepForm.querySelector('#userName');
    const emailInput = stepForm.querySelector('#email'); */
    const passwordInput = stepForm.querySelector('#password');
    const passwordReInput = stepForm.querySelector('#passwordRe');




    let sectionInputArr = [];

    steps.forEach((item, index) => {

        const sectionInput = item.querySelector('.inputField');
        sectionInputArr[index] = sectionInput;

        if (sectionInput === passwordReInput) {
            /* if input is repeat password input do 1 more custom validity check */
            sectionInput.addEventListener('input', (e) => {
                if (e.target.value !== passwordInput.value) {
                    e.target.setCustomValidity('password does not match');
                } else {
                    e.target.setCustomValidity('');
                }
                if (e.target.checkValidity()) {
                    item.classList.add('valid');
                    item.classList.remove('error');
                } else item.classList.remove('valid');
            })

        } else sectionInput.addEventListener('input', (e) => {
            if (e.target.checkValidity()) {
                item.classList.add('valid');
                item.classList.remove('error');
            } else item.classList.remove('valid');
        })

        item.addEventListener('click', (e) => {
            /* open section */
            e.preventDefault();
            if (formProgress >= index || validNotEmpty(sectionInputArr[index])) {
                openStep(steps, index);
            }
        })
        const stepFormNext = item.querySelector('.stepFormNext');
        if (stepFormNext) {
            /* submit section when clicking stepFormNext if not last open next section */
            stepFormNext.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (validNotEmpty(sectionInputArr[formProgress])) {
                    /* if its the last step its time to actually submit the form */
                    if (formProgress === steps.length - 1) {
                        stepForm.submit();
                    }
                    return openNextStep(steps, formProgress);
                }
                /* not valid? tell user why */
                sectionInputArr[formProgress].reportValidity();
                steps[formProgress].classList.add('error');
            })
        }

        item.querySelector('.stepFormPrev').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return openPrevStep(steps, index);

        })
    })




    validNotEmpty = (element) => element.checkValidity() && element.value.length

    openStep = (steps, openIndex) => {
        /* dont bother opening the same step again */
        if(steps[openIndex].classList.contains('active')) return
        steps.forEach((section, index) => {
            if (index === openIndex) {
                section.classList.add('active');
                return sectionInputArr[openIndex].focus();
            }
            section.classList.remove('active');
        })
        formProgress = openIndex;
    }

    openNextStep = (steps, index) => { 
        if (index + 1 < steps.length) {
            openStep(steps, index + 1)
        }

    }

    openPrevStep = (steps, index) => {
        if (index > 0) {
            openStep(steps, index - 1)

        }
    }
}