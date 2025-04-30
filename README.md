1. Validación inicial de términos y redirección
Función ejecutada al cargar el script:
checkTermsAndRedirect()

Lee localStorage['termsAccepted']

Si no es 'true' y el hash es #/shipping, redirige a #/profile

Escucha cambios de URL (hash):

Evento window.addEventListener('hashchange', checkTermsAndRedirect)

2. Inserción del checkbox de términos
Al cargar el DOM:

Se crea un MutationObserver que vigila el DOM (body) para insertar el checkbox cuando aparezca el formulario con la clase .newsletter.

Función: insertTermsCheckbox()

Inserta HTML con checkbox de términos y link.

Si localStorage['termsAccepted'] === 'true':

Marca el checkbox como checked

Lo habilita (disabled = false)

Llama a createTermsPopup() y validateTerms()

3. Popup de términos y condiciones
Función: createTermsPopup()

Crea un popup oculto con un botón “Aceptar”.

Agrega listeners a:

#accept-terms-button: al hacer click:

Marca y habilita el checkbox.

Cierra el popup.

Guarda termsAccepted = true en localStorage

Llama a validateTerms()

Función: openTermsPopup(e)

Muestra el popup y el overlay al hacer clic en el texto o link de términos.

4. Validación del checkbox y botón de envío
Función: validateTerms()

Añade listener a cambios en el checkbox:

Si se desmarca:

Se deshabilita automáticamente y se guarda false en localStorage

Si se marca:

Se guarda true en localStorage

Habilita o deshabilita el botón de envío del formulario (submitButton)

5. Bloqueo si no se aceptan términos
Evento global click:

Si el usuario hace clic en el botón con ID go-to-shipping:

Verifica si el checkbox está marcado.

Si no lo está:

Bloquea el evento (e.preventDefault() y e.stopImmediatePropagation())

Muestra una alerta: “Debes aceptar los términos…”