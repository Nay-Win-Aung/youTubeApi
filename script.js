document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById('search-query').value;
    const apiKey = 'AIzaSyD-QXIosXWQwj68gaF0dS8uZPAKNhW7spE'; // Replace with your YouTube API key

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('video-list');
            videoList.innerHTML = '';

            data.items.forEach(item => {
                if (item.id.kind === 'youtube#video') {
                    const videoLink = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                    const videoTitle = item.snippet.title;
                    const videoThumbnail = item.snippet.thumbnails.medium.url;

                    const videoElement = document.createElement('div');
                    videoElement.className = 'video';
                    videoElement.innerHTML = `
                        <a href="${videoLink}" target="_blank">
                            <img src="${videoThumbnail}" alt="${videoTitle}">
                            <h3>${videoTitle}</h3>
                        </a>
                    `;

                    videoList.appendChild(videoElement);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
});
