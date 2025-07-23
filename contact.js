const form = document.getElementById("my-contact-form");
const formStatus = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            // THIS IS THE FIX: We explicitly set the method to 'POST'
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(data.entries())),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "Thanks for your submission! I will get back to you shortly.";
            formStatus.className = 'alert alert-success';
            form.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                formStatus.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
            }
            formStatus.className = 'alert alert-danger';
        }
    } catch (error) {
        formStatus.innerHTML = "Oops! There was a problem submitting your form.";
        formStatus.className = 'alert alert-danger';
    }
}

form.addEventListener("submit", handleSubmit);
form.action = "https://formspree.io/f/manbebly";