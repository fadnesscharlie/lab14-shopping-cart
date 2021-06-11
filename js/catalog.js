/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let option = document.createElement('option');
    option.textContent = Product.allProducts[i].name;
    option.value = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
  localStorage.clear('cart');
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();
  if (+event.target[2].value < 1) {
    return;
  }

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  // DONE: suss out the item picked from the select list
  let itemPicked = document.getElementById('items').value;

  // DONE: get the quantity
  let itemQuantity = document.getElementById('quantity').value;

  // DONE: using those, add one item to the Cart
  cart.addItem(itemPicked, itemQuantity);
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  document.getElementById('itemCount').textContent = `: ${cart.items.length} - Item(s)`;
}

// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {

  // DONE: Get the item and quantity from the form
  const itemPicked = cart.items[cart.items.length - 1].product;
  const itemQuantity = cart.items[cart.items.length - 1].quantity;

  // DONE: Add a new element to the cartContents div with that information
  let cartContents = document.getElementById('cartContents');
  if (!document.querySelector('#cartContents ul')) {
    let cartUl = document.createElement('ul');
    cartContents.appendChild(cartUl);
  }
  let cartUl = document.querySelector('#cartContents ul');
  let cartLi = document.createElement('li');
  cartLi.innerHTML = `<p>${itemPicked}: ${itemQuantity}</p>`;
  cartUl.appendChild(cartLi);
  catalogForm.reset();
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
