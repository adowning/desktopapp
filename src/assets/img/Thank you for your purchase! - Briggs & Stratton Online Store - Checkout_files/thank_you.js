(function() {
  var MessengerCommerceAnalytics = {};
MessengerCommerceAnalytics.track = function(event, payload) {
  var extendedPayload = payload || {}
  extendedPayload.script = "thank_you";
  extendedPayload.checkout_token = Shopify.Checkout.token;

  event = 'messenger_commerce_' + event;

  if (window.ShopifyAnalytics && ShopifyAnalytics.lib && typeof ShopifyAnalytics.lib.track === 'function') {
    ShopifyAnalytics.lib.track(event, extendedPayload);
  } else {
    document.querySelector('script[src*="trekkie.storefront"]').onload = function() {
      ShopifyAnalytics.lib.track(event, extendedPayload);
    };
  }
};

  window.fbAsyncInit = function() {
  FB.init({appId: "1163199097047119", xfbml: true, version: "v2.12"});

  FB.Event.subscribe('xfbml.render', function() {
    setTimeout(function() {
      MessengerCommerceAnalytics.track('widget_rendered');
    });
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  var send_to_messenger_locale = "en_US";
  js.src = "//connect.facebook.net/" + send_to_messenger_locale + "/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


  var BUTTON_CONTAINER_CLASS = 'messenger-button-div-container';
  var CONTENT_BOX_CLASS = 'content-box';
  var ORDER_UPDATES_CONTAINER_SELECTOR = '[data-order-updates="true"]';
  var SUBSCRIPTION_FORM_SELECTOR = '[data-subscription-form="true"]';

  function buildMessengerButtonContainer() {
    var fragment = document.createDocumentFragment();

    var container = document.createElement('div');
    container.className = BUTTON_CONTAINER_CLASS;

    if (document.querySelector(SUBSCRIPTION_FORM_SELECTOR) !== null) {
      var lineDividerHTML = document.createElement('hr');
      lineDividerHTML.className = 'content-box__hr'

      container.appendChild(lineDividerHTML);
    }

    fragment.appendChild(container);
    fragment.appendChild(buildMessengerWidget());

    return fragment;
  }

  function buildMessengerWidget() {
    var messengerWidget = document.createElement('div');
    messengerWidget.innerHTML = "\u003cdiv id=\"messenger-widget\" data-ref=\"3536333734367c323136323434323430333933337c333031383833383131343339377c35356637646531376262333165383334626530343533376431643834623532397c31353834313330353132\" cta_text=\"SEND_ME_UPDATES\" color=\"white\" size=\"xlarge\" class=\"fb-send-to-messenger\" messenger_app_id=\"1163199097047119\" page_id=\"44386630302\"\u003e\u003c/div\u003e";

    return messengerWidget;
  }

  function ensureOrderUpdatesContainer() {
    if (document.querySelector(ORDER_UPDATES_CONTAINER_SELECTOR) !== null) {
      return;
    }

    var orderUpdatesContainer = document.createElement('div');
    orderUpdatesContainer.className = CONTENT_BOX_CLASS;
    orderUpdatesContainer.setAttribute('data-order-updates', 'true');

    var orderUpdatesRow = document.createElement('div');
    orderUpdatesRow.className = 'content-box__row';

    var orderUpdatesTitle = document.createElement('h2');
    orderUpdatesTitle.className = 'os-step__title';
    orderUpdatesTitle.textContent = window.Shopify.Checkout.i18n.orders.order_updates.title;

    orderUpdatesRow.appendChild(orderUpdatesTitle);
    orderUpdatesContainer.appendChild(orderUpdatesRow);

    var firstContentBox = document.querySelector('.' + CONTENT_BOX_CLASS);

    firstContentBox.insertAdjacentElement('afterend', orderUpdatesContainer);
  }

  function init() {
    if (document.querySelector('.' + BUTTON_CONTAINER_CLASS) !== null) {
      return;
    }

    ensureOrderUpdatesContainer();

    var messengerButtonContainer = buildMessengerButtonContainer();

    document.querySelector(ORDER_UPDATES_CONTAINER_SELECTOR)
      .querySelector('.content-box__row')
      .appendChild(messengerButtonContainer);

    MessengerCommerceAnalytics.track('script_load');
  }

  init();

  document.addEventListener('DOMContentLoaded', init);
})();
