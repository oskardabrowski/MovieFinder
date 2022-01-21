export default function viewTrailer() {
    let btn, videoDiv, iframe, container, close;
    if(document.querySelector('.TrailerButton')) {
        btn = document.querySelector('.TrailerButton');
        videoDiv = document.querySelector('.videoDiv');
        container = document.querySelector('.header-containerTrailer');
        iframe = videoDiv.querySelector('iframe');
        close = videoDiv.querySelector('button');
        btn.addEventListener('click', function() {
            const key = btn.getAttribute('trailer');
            const markup = `<iframe class="TrailerVideo" src="https://www.youtube.com/embed/${key}" title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>`;
            videoDiv.insertAdjacentHTML('beforeend', markup);
            container.classList.remove('dnone');
        });
        close.addEventListener('click', function() {
            container.classList.add('dnone');
            document.querySelector('.TrailerVideo').remove();
        })
    }
}