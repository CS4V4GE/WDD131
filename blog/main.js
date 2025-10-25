const container = document.querySelector("#articles-container");

articles.forEach(article => {
  const articleEl = document.createElement("article");
  articleEl.innerHTML = `
    <div class="details">
      <p class="date">${article.date}</p>
      <p class="author">by ${article.author}</p>
    </div>
    <div class="content">
      <h2>${article.title}</h2>
      <img src="${article.imgSrc}" alt="${article.imgAlt}">
      <p>${article.description}</p>
    </div>
  `;
  container.appendChild(articleEl);
});
