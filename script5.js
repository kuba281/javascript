document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    
    const fields = {
        imie: document.getElementById('imie'),
        nazwisko: document.getElementById('nazwisko'),
        email: document.getElementById('email'),
        telefon: document.getElementById('telefon'),
        
        temat: document.getElementById('temat'),        
        wiadomosc: document.getElementById('wiadomosc'), 
        zgoda: document.getElementById('zgoda')         
    };

    
    const patterns = {
        text: /^[A-Za-zĄĆĘŁŃÓŚŻŹąćęłńóśżź\-\s]{2,}$/, 
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        telefon: /^[0-9]{9}$/,
        kod: /^[0-9]{2}-[0-9]{3}$/
    };

 
  
    const createErrorElement = (input) => {
        let errorDiv = input.nextElementSibling;
       
        if (!errorDiv || !errorDiv.classList.contains('error-text')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-text';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        return errorDiv;
    };

    const showError = (input, msg) => {
        const errorDiv = createErrorElement(input);
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorDiv.innerText = msg;
        errorDiv.style.display = 'block';
    };

    const showSuccess = (input) => {
        const errorDiv = createErrorElement(input);
        input.classList.remove('input-error');
        input.classList.add('input-success');
        errorDiv.style.display = 'none';
    };


    const validateField = (input) => {
        if (!input) return true; 
        
        const value = input.value.trim();
        let valid = true;

        if (input.id === 'imie' || input.id === 'nazwisko') {
            if (!patterns.text.test(value)) {
                showError(input, 'Minimum 2 znaki, tylko litery.');
                valid = false;
            } else showSuccess(input);
        }
        else if (input.id === 'email') {
            if (!patterns.email.test(value)) {
                showError(input, 'Błędny format email.');
                valid = false;
            } else showSuccess(input);
        }
        else if (input.id === 'telefon') {
           
            if (value !== '' && !patterns.telefon.test(value)) {
                showError(input, 'Telefon musi mieć 9 cyfr.');
                valid = false;
            } else {
               
                showSuccess(input);
                if(value === '') input.classList.remove('input-success'); 
            }
        }
        else if (input.id === 'wiadomosc') {
            if (value.length < 10) {
                showError(input, 'Wiadomość musi mieć min. 10 znaków.');
                valid = false;
            } else showSuccess(input);
        }
        else if (input.id === 'zgoda') {
            if (!input.checked) {
                
                input.parentElement.style.color = 'red'; 
                valid = false;
            } else {
                input.parentElement.style.color = 'inherit';
                showSuccess(input);
            }
        }

        return valid;
    };

   
    Object.values(fields).forEach(input => {
        if(!input) return;

        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
           
            if (input.classList.contains('input-error')) {
                validateField(input);
            }
        });
    });

    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        let isFormValid = true;
        
        
        Object.values(fields).forEach(input => {
            if (!validateField(input)) isFormValid = false;
        });

        if (isFormValid) {
          
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());
            
          
            console.log('Dane do wysyłki:', dataObj);

           
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Wysyłanie...';
            submitBtn.disabled = true;

            
            setTimeout(() => {
                alert('Formularz wysłany pomyślnie! (Sprawdź konsolę)');
                form.reset();
                
                
                document.querySelectorAll('.input-success, .input-error').forEach(el => {
                    el.classList.remove('input-success', 'input-error');
                });
                
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
});