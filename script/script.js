// *subscribe btn
document.getElementById("subscribe-btn").addEventListener("click", () => {
    window.location.href="blogs.html"
})

// *add loading bar
const addLoadingBar = () => {
    document.getElementById("leading-bar").classList.remove("hidden")
    document.getElementById("leading-bar").classList.add("block")
}

// *remove loading bar
const removeLoadingBar = () => {
    document.getElementById("leading-bar").classList.remove("block")
    document.getElementById("leading-bar").classList.add("hidden")
}
const loadCategories = async () => {
    const Response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    const data = await Response.json()
    displayCategories(data.categories)
}

const removeActiveClass = () => {
    const getAcctiveButtons = document.getElementsByClassName("active")
    
    for (let btn of getAcctiveButtons) {
        btn.classList.remove("active")
    }
}

function displayCategories(categories) {
    for (let cat of categories) {
        const categorieContainer = document.getElementById("categorie-container");
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadVideoByCategories(${cat.category_id})"  class="btn bg-gray-300 px-6 text-base  hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
        categorieContainer.appendChild(div)

    }
}

//* load videos by categorie

const loadVideoByCategories = async (id) => {
    addLoadingBar()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url);
    const categorieUrl = await fetch(url);
    const data = await categorieUrl.json();
    removeActiveClass()
    const clickedButton = document.getElementById(`btn-${id}`)
    clickedButton.classList.add("active")
    loadVedioData(data.category);
    removeLoadingBar()
    
}

// *show modal
const loadVedioDetails = async (id) => {
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    const response = await fetch(url);
    const data = await response.json();
    displayVedioDetails(data.video);
    console.log(data.video);
    
}

// * Display videro details
const displayVedioDetails = (details) => {
    // console.log(details);
    document.getElementById("my_modal_2").showModal()
    const modalBox = document.querySelector(".modal-box");
    modalBox.innerHTML = `
    <div class="card bg-base-100 image-full w-full shadow-sm">
  <figure>
    <img class="object-cover w-full "
      src="${details.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title ">${details.title}</h2>
    <p class="text-gray-400">${details.description}</p>
    <div class="card-actions justify-end">
    <h2 class="">${details.authors[0].profile_name}</h2>
      <!-- <button class="btn btn-primary">Buy Now</button> -->
    </div>
  </div>
</div>`
}

const loadVedios = async (search = "") => {
    addLoadingBar()
    const Response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    const data = await Response.json()
    const btnAll = document.getElementById("all-btn");
    removeActiveClass()
    btnAll.classList.add("active");
    loadVedioData(data.videos)
    removeLoadingBar()
}

function loadVedioData(videos) {
   
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ""
    
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center mt-28">
               <img class="w-44" src="./assets/Icon.png" alt="">
               <p class="text-3xl font-semibold">Oops!!! Sorry, There is no content here</p>
              </div>`
    }
    for (let video of videos) {
        
        const div = document.createElement("div");
        div.innerHTML = `
             <div class="card bg-base-100  ">
                    <figure>
                      <img
                        src="${video.thumbnail}"
                        alt="Shoes" class="w-full h-[200px] object-cover" />
                    </figure>
                     <div class="flex items-center gap-4">
                        <div class="py-2 flex gap-4 pt-6 pl-2">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>

                        
                        </div>
                        <div class="">

                            <div class="flex items-center gap-1 w-full">
                           <h1 class="font-semibold text-lg"> ${video.title} </h1>
                          
                           </div>

                           <div class="flex items-center gap-2">
                           <h1 class="text-gray-400 text-sm">
                           ${video.authors[0].profile_name} 
                           ${video.authors[0].verified == true ? `<img class="w-4 h-4 flex items-center" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="Verified Bagth">`:``}</h1>
                           
                           </div>
                           <p class="text-gray-400 text-sm ">${video.others.views} Views</p>
                           </div>
                        </div>
                        </div>
                        <button onclick="loadVedioDetails('${video.video_id}')" id="show-details-btn" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-gray-500">Show Details</button>
                  </div>`
        videoContainer.append(div)
        
         
    }

}

document.getElementById("search-bar").addEventListener("keyup", (event) => {
    const input = (event.target.value);
    loadVedios(input)
})


loadCategories()