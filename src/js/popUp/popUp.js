const popUpData = {
  phone: "83991616485",
  maquiagem_social: {
    text: "Olá, gostaria de agendar um horário para maquiagem social.",
  },
  maquiagem_social_babyliss: {
    text: "Olá, gostaria de agendar um horário para maquiagem social + babyliss.",
  },
}

const buttonsOpenPopUp = document.querySelectorAll(".menu li[data-name]")

buttonsOpenPopUp.forEach((button) => {
  button.addEventListener("click", handleOpenPopUp)
})

function handleOpenPopUp(event) {
  const { name } = event.target.parentElement.dataset
  openPopUp(name)
  addCloseButtonListener()
  addItemsListeners()
}

function addCloseButtonListener() {
  const buttonClose = document.querySelector(".btn-close")
  if (buttonClose) {
    buttonClose.addEventListener("click", closePopUp, { once: true })
  }
}
function openPopUp(data) {
  const popUp = document.createElement("div")
  popUp.classList.add("pop-up")
  popUp.innerHTML = getPopUpContent(data)
  document.body.appendChild(popUp)
}

function closePopUp() {
  const popUp = document.querySelector(".pop-up")
  if (popUp) {
    const popUpContent = popUp.querySelector(".pop-up-content")
    popUpContent.classList.add("fade-out")
    popUpContent.addEventListener(
      "animationend",
      () => {
        popUp.style = "display: none"
        popUp.remove()
      },
      { once: true }
    )
  }
}

function addItemsListeners() {
  const listItems = document.querySelectorAll(".pop-up-content ul li")

  listItems.forEach((item) => {
    item.addEventListener("click", () => hadleClick(item), { once: true })
  })

  function hadleClick(item) {
    const text = encodeURIComponent(popUpData[item.dataset.name].text)
    navigateTo(`https://wa.me/55${popUpData.phone}?text=${text}`)
  }
}

function navigateTo(url) {
  window.open(url, "_blank")
}

function getPopUpContent(data) {
  const content = {
    agendamento: `<div class="pop-up-content fade-in">
                    <span class="pop-up-title">Selecione a opção desejada:</span>
                    <ul>
                      <li data-name="maquiagem_social">Maquiagem social</li>
                      <li data-name="maquiagem_social_babyliss">Maquiagem social + babyliss</li>
                    </ul>
                    <a class="btn-close">Voltar</a>
                  </div>`,
    curso_maquiagem: `<div class="pop-up-content fade-in">
                          <p class="indisponivel">* Indisponível no momento</p>                         
                          <a class="btn-close">Voltar</a>
                        </div>`,
    portifolio: `<div class="pop-up-content fade-in">
                  <p class="indisponivel">* Portifólio indisponível (em atualização)</p>                         
                  <a class="btn-close">Voltar</a>
                </div>`,
  }

  return content[data]
}
