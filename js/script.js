document.getElementById('submeterButton').onclick = submeterFormulario;

function submeterFormulario(event) {
  event.preventDefault();

  var submitButton = document.getElementById('submeterButton');
  var messageElement = document.getElementById('message');

  // Verifique se o botão está desativado para evitar múltiplos cliques
  if (submitButton.disabled) return;
  submitButton.disabled = true; // Desativa o botão imediatamente

  messageElement.classList.remove('success', 'error');
  messageElement.innerHTML = ''; // Limpa mensagens anteriores

  // Reinicia a animação removendo e adicionando a classe 'animated'
  submitButton.classList.remove('animated');
  void submitButton.offsetWidth; // Força o reflow para reiniciar a animação
  submitButton.classList.add('animated');

  // Remover a classe 'animated' e exibir a mensagem de sucesso após 4 segundos
  setTimeout(() => {
    submitButton.classList.remove('animated'); // Remove a animação para voltar ao estado inicial
    messageElement.innerHTML = 'Dados enviados com sucesso!';
    messageElement.classList.add('success');
  }, 3400);

  var form = document.getElementById('ocorrenciaForm');
  var dados = {
    date_time: formatDate(new Date()),
    cnpj: form.cnpj.value,
    contrato: form.contrato.value,
    tipoOcorrencia: form.ocorrencia.value,
    observacoes: form.obs.value
  };

  var url = 'https://script.google.com/macros/s/AKfycbzFFV8qyrP5cMX__4LGUUzyOpgxYJJW89Ecpvv7p7mn3lug9xYxYnxMKLSdpwOfRzxcjw/exec';

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
    .catch(() => {
      messageElement.innerHTML = 'Falha ao enviar os dados.';
      messageElement.classList.add('error');
    })
    .finally(() => {
      submitButton.disabled = false; // Reativa o botão
    });
}

function limparFormulario() {
  document.getElementById('ocorrenciaForm').reset();
}

function formatDate(date) {
  let d = new Date(date);
  let year = d.getFullYear();
  let month = ('0' + (d.getMonth() + 1)).slice(-2);
  let day = ('0' + d.getDate()).slice(-2);
  let hours = ('0' + d.getHours()).slice(-2);
  let minutes = ('0' + d.getMinutes()).slice(-2);
  let seconds = ('0' + d.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
