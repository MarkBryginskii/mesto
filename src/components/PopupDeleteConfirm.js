import Popup from "./Popup.js";

class PopupDeleteConfirm extends Popup {
  constructor({ submitCallBack }, popup) {
    super(popup);
    this._submitCallBack = submitCallBack;
    this._confirm = this._confirm.bind(this);
  }

  openPopup(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._confirm);
  }

  setButtonPendingState() {
    this._popupElement.querySelector(".popup__save-button").textContent =
      "Сохранение...";
  }

  _confirm(event) {
    event.preventDefault();
    this._submitCallBack(this._cardId, this._card);
  }
}

export default PopupDeleteConfirm;

