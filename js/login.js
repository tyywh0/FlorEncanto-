
class Login {
  constructor() {

    this.loginForm = document.getElementById('login-form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.emailError = document.getElementById('email-error');
    this.passwordError = document.getElementById('password-error');
    
    this.inicializar();
  }
  
  inicializar() {
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validarFormulario();
      });
    }
    
    if (this.emailInput) {
      this.emailInput.addEventListener('input', () => {
        this.emailError.textContent = '';
      });
    }
    
    if (this.passwordInput) {
      this.passwordInput.addEventListener('input', () => {
        this.passwordError.textContent = '';
      });
    }
  }
  
  validarFormulario() {
    let isValid = true;
    
    const email = this.emailInput.value.trim();
    if (!email) {
      this.emailError.textContent = 'Por favor, insira seu email.';
      isValid = false;
    } else if (!this.validarEmail(email)) {
      this.emailError.textContent = 'Por favor, insira um email válido.';
      isValid = false;
    }
    
    const password = this.passwordInput.value;
    if (!password) {
      this.passwordError.textContent = 'Por favor, insira sua senha.';
      isValid = false;
    } else if (password.length < 6) {
      this.passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
      isValid = false;
    }
    
    if (isValid) {
      this.enviarFormulario();
    }
  }
  
  validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
  
  enviarFormulario() {
    
    const email = this.emailInput.value.trim();
    
    const submitBtn = this.loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Entrando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      mostrarToast(`Login realizado com sucesso! Bem-vindo de volta.`, 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const login = new Login();
});