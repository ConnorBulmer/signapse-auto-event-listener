<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"></script>
<script>
//super experimental mapper utility to help ensure the Data Layer variable for translated text has human-readable values.
(function() {
  const signLanguage = 'bsl'; // Adjust to your default

  // Step 1: Build hash → text map
  const hashMap = {};
  const elements = document.querySelectorAll('p, h1, h2, h3, li');
  elements.forEach(el => {
    const text = el.textContent.trim();
    if (text.length < 10) return;
    const hash = md5(signLanguage + text);
    hashMap[hash] = text;
  });

  // Step 2: Intercept the translate event
  document.addEventListener('sa-translate', function(e) {
    const videoHash = e.detail?.videoHash;
    const translatedText = hashMap[videoHash] || '';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'signapse:translate',
      videoHash: videoHash,
      translatedText: translatedText
    });

    console.log('✅ signapse:translate with text:', {
      videoHash,
      translatedText
    });
  });
})();
</script>
