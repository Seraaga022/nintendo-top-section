let isDropDownOpen = false;
let isSearchDropDownOpen = false;
// let isNintendoSwitchStoreDropDownOpen = false;
// let isGamesDropDownOpen = false;
// let isNintendoSwitchDropDownOpen = false;
// let isPlayNintendoDropDownOpen = false;
let category = "All categories";

const dropDown = document.querySelector("._search-drop-down_");
const navBar = document.querySelector("._nav-bar_");
const navRightItems = navBar.querySelector("._right-items_");

function dropDownHandler() {
  isDropDownOpen = !isDropDownOpen;
  const element = document.querySelector("._drop-down__container");
  if (isDropDownOpen) {
    element.classList.remove("hidden");
    rotateDropDownArrow({
      arrowClassName: "_drop-down-arrow_",
      action: "OPEN",
    });
  } else {
    element.classList.add("hidden");
    rotateDropDownArrow({
      arrowClassName: "_drop-down-arrow_",
      action: "CLOSE",
    });
  }
}

function featureDropDownHandler(arrowClassName, focusingElement) {
  const element = document?.querySelector("._feature-drop-down__container");
  if (element) {
    element.classList.contains("hidden")
      ? element.classList.remove("hidden")
      : element.classList.add("hidden");

    element.classList.contains("hidden")
      ? rotateDropDownArrow({
          arrowClassName: arrowClassName,
          action: "CLOSE",
        })
      : rotateDropDownArrow({
          arrowClassName: arrowClassName,
          action: "OPEN",
        });
    document.querySelector(focusingElement).focus();
  }
}

function dropDownSelectHandler(e) {
  const dropDValue = document.querySelector("._select-value_");
  dropDValue.textContent = e.target.textContent;
  category = e.target.innerText;
  document.querySelector("._select-value-parent_").focus();
}

function searchHoverOverHandler(isSearchInpHovering) {
  const element = document.querySelector("._search-inner_");
  element.classList.remove("border-[#484848]");
  element.classList.add("border-[#e60012]");
  if (isSearchInpHovering) {
    const icon = document.querySelector("._magnifying-glass_icon_");
    icon.classList.add("text-[#e60012]");
  }
}

function searchHoverOutHandler(isSearchInpHovering) {
  const element = document.querySelector("._search-inner_");
  element.classList.remove("border-[#e60012]");
  element.classList.add("border-[#484848]");
  if (isSearchInpHovering) {
    const icon = document.querySelector("._magnifying-glass_icon_");
    icon.classList.remove("text-[#e60012]");
  }
}

function searchDropDownHandler(placeholder) {
  document.querySelector("._search-input_").placeholder = placeholder;
  isSearchDropDownOpen = !isSearchDropDownOpen;
  dropDown.classList.remove("hidden");
  dropDown.classList.add("translate-y-0");
  navRightItems
    .querySelectorAll("._item__container")
    .forEach((item) => item.classList.add("hidden"));
  navBar.querySelector(".close__contaier").classList.remove("hidden");
  document.querySelector("._middle__container").classList.add("brightness-50");
}

function closeSearchDropDown() {
  document.querySelector("._search-input_").placeholder = "Search";
  dropDown.classList.add("-translate-y-[100px]");
  dropDown.classList.add("hidden");
  navRightItems
    .querySelectorAll("._item__container")
    .forEach((item) => item.classList.remove("hidden"));
  navBar.querySelector(".close__contaier").classList.add("hidden");
  document
    .querySelector("._middle__container")
    .classList.remove("brightness-50");
}

function rotateDropDownArrow(payload) {
  const arrow = document?.querySelector(`.${payload.arrowClassName}`);
  if (payload.action == "OPEN") {
    arrow?.classList.add("rotate-180");
    payload.arrowClassName !== "_drop-down-arrow_" &&
      document
        .querySelector("._middle__container")
        .classList.add("brightness-50");
  } else if (payload.action == "CLOSE") {
    arrow?.classList.remove("rotate-180");
    payload.arrowClassName !== "_drop-down-arrow_" &&
      document
        .querySelector("._middle__container")
        .classList.remove("brightness-50");
  }
}
