const startApp = async () => {

    const setImg = ({name,url,price}) => {
        imgView.src = ""
        imgView.src = url
        imgSrc.innerHTML = url
        imgSrc.href = url
        cardName.innerText = "Card name: " + name
        cardPrice.innerText = "Card price: " + price + " USD"
    }

    const ImgChangedHandler = (step) => {
        const nextPage = curPage + step
        if(nextPage === 1){
            backButton.style.opacity = 1
        }
        if(nextPage < imgList.length && nextPage >= 0){
            setImg(imgList[nextPage])
            curPage = nextPage
            if(nextButton.style.display == "none") 
                nextButton.style.opacity = 1
            else if(nextPage == imgList.length - 1)
                nextButton.style.opacity = 0
            else if(nextPage == 0)
                backButton.style.opacity = 0
        }
    }

    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes&attribute=light');
    const json_data = await response.json()
    const data = json_data.data
    const imgList = data.map(aCard => ({
          url: aCard.card_images[0].image_url,
          name: aCard.name,
          price: aCard.card_prices[0].amazon_price
        })
    )
    
    let curPage = 0
    const nextButton = document.getElementById("next")
    const backButton = document.getElementById("back")
    const imgView = document.getElementById("display")
    const imgSrc = document.getElementById("source")
    const cardName = document.getElementById("card-name")
    const cardPrice = document.getElementById("card-price")
    setImg(imgList[0])

    nextButton.addEventListener("click",()=>ImgChangedHandler(1))
    backButton.addEventListener("click",()=>ImgChangedHandler(-1))
}

startApp()



