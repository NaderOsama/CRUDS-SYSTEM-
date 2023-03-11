let productName = document.getElementById("productName")
let productPrice = document.getElementById("productPrice")
let productCategory = document.getElementById("productCategory")
let productDescription = document.getElementById("productDescription")
let productCount = document.getElementById("productCount")
let search = document.getElementById("search")
let productsTotal = document.getElementById("productsTotal")
let labelTotal = document.getElementById("labelTotal")
let addProducts = document.getElementById("addProducts")
let btnDeleteAll =  document.getElementById("btnDeleteAll")
let searchTitle = document.getElementById("searchTitle")
let searchCategory = document.getElementById("searchCategory")
let selectSearch = document.getElementById("selectSearch") 
var inpp = [productName,productPrice,productCategory,productDescription,productCount]




let productContainer;
let CreateProduct = true // Mode Defult My project
let temp; // variable helper

// Get Total 
function getTotal(){
      let result;
      if(productPrice.value != '' && productPrice.value >= 0  ){
            if(productCount.value == ''){
                  result = productPrice.value*1;
                  productsTotal.value =`${result}$`;
                  labelTotal.className = "btn btn-success mb-4"
                  
            }
            else{
                  result = productPrice.value*productCount.value;
                  productsTotal.value =`${result}$`
                  labelTotal.className = "btn btn-success mb-4"

            }


      }else{
            productsTotal.value = ''
            labelTotal.className = "btn btn-primary mb-4"
      }
      
      
}
// check local storage
function checkLocal(){
if(localStorage.product != null){
      productContainer =  JSON.parse(localStorage.product)  
            displayProduct()

}
else {
      productContainer = []
}
}
checkLocal()


// Add Product
function addProduct(){
      putProductInContainer()
      displayProduct()
      clearData() 
      disabledButton()
      totalProducts()
}
function putProductInContainer(){
            let product = {
            name:productName.value.toLowerCase(),
            price:productPrice.value,
            category:productCategory.value.toLowerCase(),
            dscription:productDescription.value,
            count:productCount.value,
            total:productsTotal.value,
      }
      if(CreateProduct === true){
            console.log(CreateProduct) 
            if(product.count>1){
                  for(let i=0;i<1;i++){
                        productContainer.push(product)
                  }
            }
            else{
                  productContainer.push(product)
                  product.count = 1;
            }

      }else{

            productContainer[temp] = product;
            addProducts.innerHTML = `Add Product`
            CreateProduct = true
            console.log(CreateProduct)

      }

      //sava data in local storage
      localStorage.setItem("product",JSON.stringify(productContainer))
      clearData()
      displayProduct()
      scroll({top:500,behavior:"smooth"})

}

//Clear Data in Product
function clearData(){
      productName.value = "",
      productPrice.value = "",
      productCategory.value = "",
      productDescription.value = "",
      productCount.value = "",
      productsTotal.value = "";
}

// Display Product In Table (tbody) 
function displayProduct(){
      getTotal()
      totalProducts()
      let cartoona = "";
      for(var i = 0; i< productContainer.length;i++){
            cartoona +=`
            <tr>
                  <td>${i+1}</td>
                  <td>${productContainer[i].name}</td>
                  <td>${productContainer[i].price}</td>
                  <td>${productContainer[i].category}</td>
                  <td>${productContainer[i].dscription}</td>
                  <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
                  <td><button onclick="editRow(${i})" class="btn btn-warning">Edit</button></td>

                  <td>  
                        <button class="rounded-circle" onclick="decrementCount(${i})" style="padding: 6px 10px;">-</button>
                        <button class="p-3 mx-3" style="width: 100px; background: transparent; border: none;">
                        ${productContainer[i].count}</button>
                        <button class="rounded-circle" onclick="incrementCount(${i})" style="padding: 6px 10px;">+</button>

                  </td>
            </tr>
            `
      }
      document.getElementById("tBody").innerHTML = cartoona 
      if(productContainer.length> 0){
            btnDeleteAll.style.display = 'inline-block'
      }
      else
            btnDeleteAll.style.display = 'none'
}

// get total of all products
function totalProducts(){
      let totalCount = 0;
      let priceCount = 0;
      let totals =0
for (let i = 0; i < productContainer.length; i++) {
      totalCount = parseInt(+productContainer[i].count);
      priceCount = parseInt(+productContainer[i].price);
      totals += totalCount * priceCount
}
//display the total count in tFoot
tFoot.innerHTML = 
`<tr>
      <td colspan="7">
            <strong>Total Price Of Products:</strong>
      </td>
      <td>
            <strong id="tot">${totals}$</strong>
      </td>
      </tr>`;
      
}

// decrement count of ptoduct 
function decrementCount(i){
      if(productContainer[i].count <= 1){
            productContainer.splice(i,1)
            localStorage.product =JSON.stringify(productContainer);
            totalProducts()
            displayProduct()
      }else{
            productContainer[i].count--;
            localStorage.product =JSON.stringify(productContainer);
            totalProducts();
            displayProduct();
}

}

// increment count of ptoduct 
function incrementCount(i) {
      productContainer[i].count++;
      localStorage.product =JSON.stringify(productContainer);

      totalProducts();
      displayProduct();
}

// delete Row One Product 
function deleteRow(i){
      productContainer.splice(i,1)
      localStorage.product =JSON.stringify(productContainer)
      totalProducts()
      displayProduct()
}

// delete All Of Products 
function deleteAll(){
      productContainer.length = 0
      localStorage.product =JSON.stringify(productContainer)
      totalProducts()
      displayProduct()
      tFoot.innerHTML = 
`<tr>
      <td colspan="6">
            <strong>Total:</strong>
      </td>
      <td>
            <strong>${totalCount}</strong>
      </td>
      </tr>`;

}




// edit Data
function editRow(i){
      productName.value = productContainer[i].name;
      productPrice.value = productContainer[i].price;
      productCount.value = productContainer[i].count;
      productCategory.value = productContainer[i].category;
      productDescription.value = productContainer[i].dscription;
      getTotal()
      addProducts.innerHTML = `Edit Product`
      CreateProduct = false;
      temp = i;
      scroll({top:10,behavior:"smooth"})
      productName.focus()
      console.log(CreateProduct) 

}

// options
let selectedOption;
selectSearch.addEventListener('change', function() {
selectedOption = selectSearch.options[selectSearch.selectedIndex];
// Print the value of the selected option
if(selectedOption.value == 1){
      getSearchMode(selectedOption.id)

}else if(selectedOption.value == 2){
      getSearchMode(selectedOption.id)

}});

search.addEventListener('blur', function() {
      search.style.zIndex = "-1";
      displayProduct()
});
// search product by title or category
let searchMode = 'title'
function getSearchMode(id){
      if(id == 'searchTitle'){
            searchMode = 'title'
            search.placeholder = 'Search By Title'

      }
      else{
            searchMode = 'category'
            search.placeholder = 'Search By Category'
      }
      search.focus()
      search.style.zIndex = "10";
      search.value=''
      
      

}
function searchProdduct(term){
      var cartoona = "";

      if(searchMode == 'title'){
                  for(var i = 0; i< productContainer.length;i++){

            if(productContainer[i].name.includes(term.trim())==true){
                  
            cartoona +=`
            <tr>
                  <td>${i+1}</td>
                  <td>${productContainer[i].name}</td>
                  <td>${productContainer[i].price}</td>
                  <td>${productContainer[i].category}</td>
                  <td>${productContainer[i].dscription}</td>
                  <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
                  <td><button onclick="editRow(${i})" class="btn btn-warning">Edit</button></td>

                  <td>
                  <button class="rounded-circle" onclick="decrementCount(${i})" style="padding: 6px 10px;">-</button>

                  <button class="p-3 mx-3" style="width: 100px; background: transparent; border: none; ">
                  ${productContainer[i].count}$</button>
                  <button class="rounded-circle" onclick="incrementCount(${i})" style="padding: 6px 10px;">+</button>

                  </td>
            </tr>
            `}
            else{
      tFoot.innerHTML = 
`<tr>
      <td colspan="8">
            <strong>Not Found The Product</strong>
      </td>
      </tr>`;
            }

      }
      }
      else{
                  for(var i = 0; i< productContainer.length;i++){

            if(productContainer[i].category.includes(term.trim())==true){
            cartoona +=`
            <tr>
                  <td>${i+1}</td>
                  <td>${productContainer[i].name}</td>
                  <td>${productContainer[i].price}</td>
                  <td>${productContainer[i].category}</td>
                  <td>${productContainer[i].dscription}</td>
                  <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
                  <td><button onclick="editRow(${i})" class="btn btn-warning">Edit</button></td>

                  <td>
                  <button class="rounded-circle" onclick="decrementCount(${i})" style="padding: 6px 10px;">-</button>

                  <button class="p-3 mx-3" style="width: 100px; background: transparent; border: none; ">
                  ${productContainer[i].count}$</button>
                  <button class="rounded-circle" onclick="incrementCount(${i})" style="padding: 6px 10px;">+</button>

                  </td>
            </tr>
            `}
            else{
      tFoot.innerHTML = 
`<tr>
      <td colspan="8">
            <strong>Not Found The Product</strong>
      </td>
      </tr>`;
            }

      }
      }
     
      
      document.getElementById("tBody").innerHTML = cartoona ;
}


function disabledButton(){
      addProducts.disabled = true;
    
}
function validation(){
      for(var i=0;i<inpp.length;i++){
            inpp[i].addEventListener("keyup",(e)=>{
                  const value =e.currentTarget.value;
                  addProducts.disabled = false;
                  if(value == ""){
                        addProducts.disabled = true;
            }
      });
}

}
validation();
productName.focus()
displayProduct()