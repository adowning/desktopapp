(function(d, url) {
  if (!window.Shopify) { return; }

  var checkout = Shopify.checkout;
  var script;

  if (!(checkout && checkout.customer_id)) { return; }

  script = d.createElement('script');
  script.async = true;
  script.src = url + "&customer_id=" + encodeURIComponent(checkout.customer_id)
                   + "&checkout_token=" + encodeURIComponent(checkout.token);

  if(checkout.order_id) {
     script.src += "&order_id=" + encodeURIComponent(checkout.order_id);
  }

  d.getElementsByTagName('head')[0].appendChild(script);

})(document, "https://messenger-commerce.shopifycloud.com/thank_you.js?shop=briggsandstratton.myshopify.com");
