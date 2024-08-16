let games = [];
let cartGames = JSON.parse(localStorage.getItem("cart")) || [];
let isCartDropDownOpen = false;

document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".swiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 20,
    reverseDirection: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const fetchGames = () => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("assets/games.json");
      if (!response.ok)
        reject("request rejected with this status:", response.status);
      resolve(response.json());
    });
  };

  fetchGames()
    .then((res) => generateGameSlides(res))
    .catch((err) => console.error(err));

  function generateGameSlides(response) {
    // spread operator, to prevent of nested arrays
    games.push(...response);
    try {
      games.forEach((game) => {
        let swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        swiperSlide.innerHTML = `
        <div class="__container w-full h-full">
          <div
            class="_inner_ w-full h-full bg-[#f8f8f8] rounded-[40px]"
          >
            <div class="_img__container">
              <div class="_inner_">
                <img
                  class="rounded-t-[40px]"
                  src="${game.imgPath}"
                  alt=""
                />
              </div>
            </div>
            <div class="_content__container">
              <div
                class="_inner_ flex flex-col px-5 pt-4 font-medium text-[#424242]"
              >
                <div class="_platform__container">
                  <div
                    class="_inner_ border-l-[4px] border-red-400 pl-2 font-normal"
                  >
                    ${game.platform}
                  </div>
                </div>
                <div class="_name__container">
                  <div
                    class="_inner_ text-[20px] leading-6 font-extrabold text-[#5b99c2] line-clamp-2 pl-2 mb-7 mt-3"
                  >
                    ${game.name}
                  </div>
                </div>
                <div
                  class="_points__container font-extralight text-sm mb-4"
                >
                  <div class="_inner_ flex">
                    <span
                      ><img
                        src="img/gold-coin.png"
                        class="w-[20px] w-[20px] mr-2"
                        alt=""
                    /></span>
                    by purchasing this game, you'll earn ${game.point} coins
                  </div>
                </div>
                <div
                  class="_price__container font-medium text-orange-400 text-2xl mb-3"
                >
                  <div class="_inner_">${game.price} $</div>
                </div>
                <div class="_add-to-cart__container">
                  <div class="_inner_ flex justify-end">
                    ${buyGameBtnTxtHandler(game)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        let container = document.querySelector(".swiper-wrapper");
        if (container) {
          container.appendChild(swiperSlide);
          swiper.update();
        } else {
          console.error("container was not found");
        }
      });
    } catch (e) {
      console.error("while genarating gameSlide, this happend:", e);
    }
    generateCartItems();
  }
});

function generateCartItems() {
  cartGames.forEach((e) => {
    const game = games.find((gm) => gm.id === e.id);
    try {
      let element = document.createElement("div");
      element.classList.add("_cart-item__container");
      element.innerHTML = `
      <div
        id="${game.id}"
        class="min-h-[60px] min-w-full bg-red-50 rounded-lg flex mb-2"
      >
        <div class="_img__container w-[30%] mr-2">
          <div class="_inner_ w-full h-full">
            <img
              class="rounded-[8px] h-full"
              src="${game.imgPath}"
              alt=""
            />
          </div>
        </div>
        <div class="_content__container h-[60px] min-w-[55%]">
          <div class="_inner_ flex flex-col">
            <div
              class="_name__container max-w-[170px] max-h-[35px] h-[35px]"
            >
              <div
                class="_inner_ line-clamp-2 leading-[14px]"
              >
                ${game.name}
              </div>
            </div>
            <div
              class="_price__container max-h-[25px] h-[25px]"
            >
              <div class="_inner_">${game.price} $</div>
            </div>
          </div>
        </div>
        <div class="_qnt__container min-w-[25px]">
          <div
            class="_inner_ h-full flex flex-col items-center"
          >
            <div
              class="_increase_ flex justify-center items-center w-full flex-1"
            >
              <div class="_inner_ text-xs">
                <button
                  class="outline-none"
                  onclick="contrloGameQnt({ action: 'INCREASE', id: ${game.id} })"
                >
                  <i
                    class="fa-sharp fa-solid fa-plus-large"
                  ></i>
                </button>
              </div>
            </div>
            <div
              class="_decrease_ flex justify-center items-center w-full flex-1"
            >
              <div class="_inner_ text-xs">
                <button
                  class="outline-none"
                  onclick="contrloGameQnt({ action: 'DECREASE', id: ${game.id} })"
                >
                  <i class="fa-sharp fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      const parent = document.querySelector("._cart-dd__inner");
      parent.appendChild(element);
    } catch (e) {
      console.error("while generating cart items, this error happend:", e);
    }
  });
  if (cartGames.length < 1) {
    document
      .querySelector("._cart-drop-down__container")
      .classList.remove("max-h-[200px]", "overflow-y-scroll");
    const parent = document.querySelector("._cart-dd__inner");
    parent.innerHTML = `<div class='text-2xl text-orange-500'>Empty</div>`;
  }
}

function contrloGameQnt(payload) {
  if (!payload) {
    console.error("provide a payload");
    return;
  }
  const action = payload.action;
  const id = payload.id;
  let targetIndex = cartGames.findIndex((g) => g.id === id);
  console.log(targetIndex);
  if (action === "INCREASE") {
    cartGames[targetIndex].qntt += 1;
    localStorage.setItem("cart", JSON.stringify(cartGames));
  } else if (action === "DECREASE" && cartGames[targetIndex].qntt === 1) {
    cartGames = cartGames.filter((g) => g.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartGames));
  } else if (action === "DECREASE") {
    cartGames[targetIndex].qntt -= 1;
    localStorage.setItem("cart", JSON.stringify(cartGames));
  } else {
    console.error("wrong payload");
  }
  // just for using multiple methods
  location.replace(location.href);
}

function toggleCartDropDown() {
  isCartDropDownOpen = !isCartDropDownOpen;
  const element = document.querySelector("._cart-drop-down__container");
  if (isCartDropDownOpen) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

function buyGameBtnTxtHandler(game) {
  if (cartGames.find((g) => g.id === game.id)) {
    return `<button
      class="_game-purchase_btn outline-none bg-red-200 rounded-xl py-3 px-8 text-xl"
      // onclick="console.log('game purchased')"
    >
      direct download
    </button>`;
  }
  return `<button
      class="_game-purchase_btn outline-none bg-red-200 rounded-xl py-3 px-8 text-xl"
      onclick="addGameToCart(${game.id})"
    >
      add to cart
    </button>`;
}

function addGameToCart(gameId) {
  if (typeof gameId === "number") {
    if (cartGames.includes(gameId)) return;
    cartGames.push({ id: gameId, qntt: 1 });
    localStorage.setItem("cart", JSON.stringify(cartGames));
    console.log(`game with id of '${gameId}' added to cart`);
    location.reload();
  } else console.error("Enter game id as number!", typeof gameId);
}
