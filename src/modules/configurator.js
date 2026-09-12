export function initConfigurator() {
  const form = document.querySelector('#project-config-form');
  if (!form) return;

  const structureRadios = form.querySelectorAll('input[name="config-structure"]');
  const lengthInput = form.querySelector('#config-length');
  const widthInput = form.querySelector('#config-width');
  const coveringSelect = form.querySelector('#config-covering');
  const systemSelect = form.querySelector('#config-system');
  const cityInput = form.querySelector('#config-city');
  const nameInput = form.querySelector('#config-name');
  const phoneInput = form.querySelector('#config-phone');
  const sendWhatsAppBtn = form.querySelector('#config-send-whatsapp');
  const summaryText = form.querySelector('#config-summary-preview');

  function updateSummary() {
    const selectedStructure = form.querySelector('input[name="config-structure"]:checked')?.value || 'Non spécifié';
    const length = lengthInput?.value ? `${lengthInput.value} m` : '-';
    const width = widthInput?.value ? `${widthInput.value} m` : '-';
    const covering = coveringSelect?.options[coveringSelect.selectedIndex]?.text || '-';
    const system = systemSelect?.options[systemSelect.selectedIndex]?.text || '-';
    const city = cityInput?.value || 'Tunisie';

    if (summaryText) {
      summaryText.innerHTML = `<strong>${selectedStructure}</strong> (${length} × ${width}) — Finition : <em>${covering}</em> — Mode : <em>${system}</em> — Ville : <em>${city}</em>`;
    }
  }

  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);
  updateSummary();

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const selectedStructure = form.querySelector('input[name="config-structure"]:checked')?.value || 'Structure sur mesure';
      const length = lengthInput?.value ? `${lengthInput.value}m` : 'À définir';
      const width = widthInput?.value ? `${widthInput.value}m` : 'À définir';
      const covering = coveringSelect?.options[coveringSelect.selectedIndex]?.text || 'À conseiller';
      const system = systemSelect?.options[systemSelect.selectedIndex]?.text || 'Standard';
      const city = cityInput?.value || 'Non précisée';
      const name = nameInput?.value ? nameInput.value.trim() : 'Client';
      const clientPhone = phoneInput?.value ? phoneInput.value.trim() : '';

      const message = `Bonjour 2A PRO CONCEPT,
Je souhaite obtenir une étude et un devis pour mon projet :

🏗️ *Type de structure :* ${selectedStructure}
📐 *Dimensions estimées :* ${length} × ${width}
🛡️ *Couverture souhaitée :* ${covering}
⚙️ *Système :* ${system}
📍 *Ville / Localisation :* ${city}
👤 *Nom :* ${name}
📞 *Téléphone :* ${clientPhone || 'Voir ce numéro'}

Merci de me recontacter pour me conseiller sur la faisabilité et le coût.`;

      const whatsappUrl = `https://wa.me/21698804061?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
}
