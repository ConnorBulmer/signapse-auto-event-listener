<script>
;(function(){
  function push(evtName, details){
    window.dataLayer = window.dataLayer||[];
    window.dataLayer.push(Object.assign({ event: evtName }, details||{}));
  }

  // helper to find the <video> inside a <sa-video>
  function findVideo(el){
    return el.querySelector && el.querySelector('video');
  }

  // enhanced listeners
  document.addEventListener('sa-translate', function(e){
    var info = { videoHash: e.detail && e.detail.videoHash };
    // grab whatever text was highlighted
    info.translatedText = window.getSelection
      ? window.getSelection().toString()
      : '';
    push('signapse:translate', info);
  });

  document.addEventListener('sa-video-start', function(e){
    var vid = findVideo(e.target);
    var info = {};
    if (vid) {
      info.duration = vid.duration || null;
      info.startRate = vid.playbackRate || null;
    }
    push('signapse:video-start', info);
  });

  document.addEventListener('sa-video-end', function(e){
    var vid = findVideo(e.target);
    var info = {};
    if (vid) {
      info.endTime = vid.currentTime || 0;
      info.playRate = vid.playbackRate || null;
    }
    push('signapse:video-end', info);
  });

  document.addEventListener('sa-playback-speed', function(e){
    // e.detail.speed already contains the new rate
    push('signapse:playback-speed', { speed: e.detail.speed });
  });

  document.addEventListener('sa-player-full-screen-toggle', function(e){
    push('signapse:full-screen', {
      fullscreen: e.target.getAttribute('aria-expanded') === 'true'
    });
  });

  // all the rest you already had
  [
    'sa-player-zoom-in',
    'sa-player-zoom-out',
    'sa-actions-menu-close',
    'sa-player-activate',
    'sa-player-deactivate'
  ].forEach(function(type){
    document.addEventListener(type, function(e){
      push('signapse:' + type, {});
    });
  });
})();
</script>
