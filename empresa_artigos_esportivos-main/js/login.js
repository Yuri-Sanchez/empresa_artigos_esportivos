const form = document.getElementById("formLogin");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const erroTipo = document.getElementById("erro-tipo");

form.addEventListener("submit", function (e) {
  let valido = true;

  // Reset das mensagens de erro
  erroEmail.textContent = "";
  erroSenha.textContent = "";
  erroTipo.textContent = "";

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    erroEmail.textContent = "O email é obrigatório.";
    valido = false;
  } else if (!emailRegex.test(email.value)) {
    erroEmail.textContent = "Digite um email válido.";
    valido = false;
  }

  // Validação da senha
  if (!senha.value.trim()) {
    erroSenha.textContent = "A senha é obrigatória.";
    valido = false;
  } else if (senha.value.length < 6) {
    erroSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
    valido = false;
  }

  // Validação do tipo
  const tipoSelecionado = document.querySelector("input[name='tipo']:checked");
  if (!tipoSelecionado) {
    erroTipo.textContent = "Selecione CPF ou CNPJ.";
    valido = false;
  }

  if (!valido) {
    e.preventDefault(); // impede envio do formulário
  }
});
