function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
		console.log('---loginForm---');
        console.log(loginForm.username.value + ' ' + loginForm.password.value);
		getUser(loginForm.username.value, loginForm.password.value);

        e.preventDefault();
        
        // Perform your AJAX/Fetch login
        setFormMessage(loginForm, "error", "Invalid username/password combination");

    });

	createAccountForm.addEventListener("submit", e => {
		console.log('---loginForm---');
        console.log(loginForm.username.value + ' ' + loginForm.password.value);
		getUser(loginForm.username.value, loginForm.password.value);

        e.preventDefault();
        
        // Perform your AJAX/Fetch login
        setFormMessage(loginForm, "error", "Invalid username/password combination");

    });


    
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


const getUser = async (user, pass) => {
	try {
		console.log('---getUser---');
		const response = await fetch('http://localhost:3011/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: user,
				password: pass
			})
		});
		console.log('--fetch:getUser--');
		const data = await response.json();
		storeToken(JSON.stringify(data.timestamp));
		console.log(data)
		}
	catch (err) {
		console.log(err);
	}
}

const storeToken = (token) => {
	localStorage.setItem('token', token);
}
const getToken = () => {
	const token = localStorage.getItem('token');
	return token;
}
const removeToken = () => {
	localStorage.removeItem('token');
}
