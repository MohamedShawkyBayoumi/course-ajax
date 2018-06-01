(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        
        const unsplashRequest = new XMLHttpRequest();
        
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 6670a83f214d278f9bf62cff97a44fee6ecd773fe11d7631aa8ec28cb657e6cc');
        unsplashRequest.send();
        
        function addImage(){
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            

            if(data && data.results && data.results[0]){
                const firstImage = data.results[0];
                htmlContent = `
                <figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>
                `;
            } else {
                responseContainer = '<div class="error-no-image">No images available</div>';
            }
            

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
        
        function addArticles (data){
            let htmlContent = '';

            if(data.response && data.response.docs && data.response.docs.length > 1){
                htmlContent = 
                '<ul>' + data.response.docs.map(article => 
                    `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`).join('')
                + '</ul>';
            } else {
                htmlContent = `<div class="error-no-articles">No articles avilable</div>`;
            }

            

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=41d8aaa226a94c15948201520d1e9922`
        }).done(AddArticles);
        
    });
})();
