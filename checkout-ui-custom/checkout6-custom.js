function checkTermsAndRedirect() {
  const termsAccepted = localStorage.getItem('termsAccepted');
  const currentStep = window.location.href;

  if (termsAccepted !== 'true' && currentStep.includes('/checkout/#/shipping')) {
    window.location.hash = '#/profile';
  }
}

checkTermsAndRedirect();

window.addEventListener('hashchange', checkTermsAndRedirect);
setInterval(checkTermsAndRedirect, 500);

document.addEventListener('DOMContentLoaded', function () {

  const observer = new MutationObserver(insertTermsCheckbox)
  observer.observe(document.body, { childList: true, subtree: true })
})

document.addEventListener(
  'click',
  function (e) {
    const target = e.target
    if (target && target.id === 'go-to-shipping') {
      const termsCheckbox = document.getElementById('terms-checkbox')

      if (termsCheckbox && !termsCheckbox.checked) {
        e.preventDefault()
        e.stopImmediatePropagation()
        alert('Debes aceptar los términos y condiciones para continuar con la compra. uwuwuwuwuwu')
      }
    }
  },
  true
)

function insertTermsCheckbox() {
  const newsletterCheckbox = document.querySelector('.newsletter input[type="checkbox"]')

  if (newsletterCheckbox && !document.getElementById('terms-checkbox')) {
    const container = newsletterCheckbox.closest('.newsletter')

    const termsDiv = document.createElement('div')
    termsDiv.className = 'terms-container'
    termsDiv.innerHTML = `
      <label style="cursor: pointer;">
        <input type="checkbox" id="terms-checkbox" disabled required/>
        <span id="terms-label">Acepto los <a href="#" id="terms-link">términos y condiciones</a></span>
      </label>
    `
    container.parentNode.insertBefore(termsDiv, container.nextSibling)

    createTermsPopup()

    document.getElementById('terms-link').addEventListener('click', openTermsPopup)
    document.getElementById('terms-label').addEventListener('click', openTermsPopup)

    const savedValue = localStorage.getItem('termsAccepted')
    const checkbox = document.getElementById('terms-checkbox')
    if (savedValue === 'true') {
      checkbox.checked = true
      checkbox.disabled = false
    }

    checkbox.addEventListener('click', (e) => {
      if (checkbox.disabled) {
        e.preventDefault()
      }
    })
    validateTerms()
  }
}

function createTermsPopup() {
  if (!document.getElementById('terms-popup')) {
    const overlay = document.createElement('div')
    overlay.id = 'terms-overlay'
    document.body.appendChild(overlay)

    const popup = document.createElement('div')
    popup.id = 'terms-popup'
    popup.style.display = 'none'
    popup.innerHTML = `
      <h3>Terminos y condiciones</h3>
      <p>Los terminos y condiciones son que debes darle al boton aceptar para poder avanzar...​</p>
      <button id="accept-terms-button">Aceptar</button>
    `
    document.body.appendChild(popup)

    document.getElementById('accept-terms-button').addEventListener('click', function () {
      const checkbox = document.getElementById('terms-checkbox')
      checkbox.checked = true
      checkbox.disabled = false
      popup.style.display = 'none'
      overlay.style.display = 'none'
      validateTerms()
      localStorage.setItem('termsAccepted', 'true')
    })
  }
}

function openTermsPopup(e) {
  e.preventDefault()
  document.getElementById('terms-popup').style.display = 'flex'
  document.getElementById('terms-overlay').style.display = 'block'
}

function validateTerms() {
  const checkbox = document.getElementById('terms-checkbox')
  const submitButton = document.querySelector('.cart-template .btn-submit-wrapper input[type="submit"]')

  if (!checkbox) return

  checkbox.addEventListener('change', function () {
    if (!this.checked) {
      this.disabled = true
      localStorage.setItem('termsAccepted', 'false')
    } else {
      localStorage.setItem('termsAccepted', 'true')
    }

    if (submitButton) {
      submitButton.disabled = !this.checked
    }
  })

  if (submitButton) {
    submitButton.disabled = !checkbox.checked
  }
}