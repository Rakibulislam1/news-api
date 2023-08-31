const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');

    const trimmedFData = data.data.news_category.slice(0, 3);
    trimmedFData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab text-lg">${category.category_name}</a>
        `
        tabContainer.appendChild(div);
    });

};

const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = "";

    data.data?.forEach((news) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
          <figure><img src=${news?.image_url} /></figure>
          <div class="card-body">
          <h2 class="card-title">${news.title.slice(0, 50)}</h2>
          <div class="badge badge-accent">${news.rating.badge}</div>
          
            <p>${news.details.slice(0, 55)}</p>
            <h3>Total views: ${news.total_view ? news.total_view : "No views"}</h3>
            <div class="flex gap-6 items-center mt-4">
                <div class="avatar online">
                    <div class="w-24 rounded-full">
                    <img src=${news.author.img} />
                    </div>
                </div>
                <div>
                    <h6 class="font-medium">${news.author.name}</h6>
                    <small>${news.author.published_date}</small>
                </div>
            </div>

            <div>
            <small class="font-medium">Published: ${news.author.published_date}</small>
            </div>

            <div onclick="handleModal('${news._id}')" class="card-actions justify-end">
              <button class="btn btn-neutral">Details</button>
            </div>
          </div>
        </div>
        `
        cardContainer.appendChild(div);
        // console.log(news);
    })
};

const handleModal = async(newsId) => {
    // console.log(newsId)
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json();
    // console.log(data.data[0]);


    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">${data.data[0].title}</h3>
            <p class="py-4">${data.data[0].details}</p>
            <div class="modal-action">
                <button class="btn">Close</button>
            </div>
        </form>
    </dialog>
    `
    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1');
    modal.showModal();
}


handleCategory();
handleLoadNews('01');
