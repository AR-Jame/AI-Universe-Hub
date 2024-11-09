const loadCardsData = async () => {
    const divContainer = document.getElementById("divContainar")
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json();
    const finalData = data.data.tools;
    finalData.forEach(element => {
        // console.log(element)
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${element.image}"
                        class="rounded-xl" />
                </figure>
                <div class="card-body px-10">
                    <h4 class="card-title">Feature</h4>
                    <ul class="list-disc px-6">
                        <li>${element.features[0]}</li>
                        <li>${element.features[1]}</li>
                        <li>${element.features[2]}</li>
                    </ul>
                    <hr>
                    <h1 class="text-2xl font-bold">${element.name}</h1>
                    <div class="card-actions justify-between">
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            <p class="font-medium">${element.published_in}</p>
                        </div>
                        <div>
                            <button onclick="loadModal('${element.id}')" class="bg-[#f3e4e4] px-5 py-3 rounded-full btn">
                                <i class="fa-solid fa-arrow-right text-[#EB5757]"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        divContainer.appendChild(newDiv)

    });
}
const loadModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    showModal(data.data)
}
const showModal = (data) => {
    // console.log(data)
    my_modal_1.showModal()
    const description = document.getElementById("description")
    description.innerText = data.description
    const modalImg = document.getElementById("modalImg");
    const modalImgSrc = modalImg.setAttribute("src", data.image_link[0]);
    const features = data.features;
    const featureUL = document.getElementById("featureUL")
    featureUL.innerText = ""
    for (item in features) {
        const newLi = document.createElement("li")
        newLi.innerText = features[item].feature_name
        featureUL.appendChild(newLi)
    }
    const integrationUl = document.getElementById("integration")
    integrationUl.innerText = ""
    const integration = data.integrations
    console.log(integration)
    if (integration !== null) {
        for (item of integration) {
            const newLi = document.createElement("li");
            newLi.innerText = item
            integrationUl.appendChild(newLi)
        }
    }
    else {
        const newP = document.createElement("p");
        newP.innerText = "No Data Found";
        integrationUl.appendChild(newP)
    }

}

loadCardsData()