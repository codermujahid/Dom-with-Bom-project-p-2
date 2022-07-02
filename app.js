 

 const product_form = document.getElementById('product_form');
 const product_list = document.getElementById('product_list');
 const product_update_form = document.getElementById('product_update_form');
 const masg = document.querySelector('.masg');  
 const singal_product = document.querySelector('.singal_product');  



//get all product
const getAllProduct = () =>{
   
    //get all Ls data

   const data = readLSData('product');

   //check LSData
   if (!data) {

    product_list.innerHTML = `
        <tr >
             <td class="text-center" colspan="7" >No product found</td>
        </tr>

    `;

   }
   // sho all data list
   if (data) {

    //init list
    let list = '';
    let = final_amount = 0;

    //lop for data
    data.map((item, index) => {

        final_amount += (item.price * item.quantity);
        list +=`
            <tr>
                <td>${ index + 1 }</td>
                <td><img style="width: 100px;" src="${ item.photo }" alt=""></td>
                <td>${ item.name }</td>
                <td>${ item.price } BDT</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity } BDT</td>
                 
                <td>
                    <a class="btn btn-info btn-sm product_single" data-bs-toggle="modal"  product_index="${index}" href="#shop-single_modal"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm product_single"  data-bs-toggle="modal" product_index="${index}"  href="#shop_edit_modal"><i class="fas fa-edit "></i></a>
                    <a class="btn btn-danger btn-sm product_single" href=""><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `;

    });

    list += ` <tr>
                 <td colspan="6" class="text-end"> Final Amount = ${final_amount} BDT</td>
             </tr>
    `;


    product_list.innerHTML = list;
   }


}
getAllProduct();

//submit product form
 product_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());
     
    

    // form valide
    if (!name || !price || !quantity || !photo ) {
        masg.innerHTML = setAlert('All fild requarid')
    } else {


        createLSData('product', productData);

        masg.innerHTML = setAlert('Data stabl','success');
        e.target.reset();
        getAllProduct();
        
    }
    
 }

 //single product show

 product_list.onclick = (e) => {


    e.preventDefault();

    if (e.target.classList.contains('fa-eye')) {
        // get single product data ID
    let index = e.target.parentElement.getAttribute('product_index');
    let data = readLSData('product')
    //get data key      
     const {name, price, quantity, photo} = data[index];

     //send data modal

     singal_product.innerHTML = `
     <img class="shadow" src="${photo}" alt="">
     <h1>${name}</h1>
     <p>Price :${price} </p>
     `;
    } else if (e.target.classList.contains('fa-edit')){
        let index = e.target.parentElement.getAttribute('product_index');
     
        //get product value
        let data = readLSData('product');
        const {name, price, quantity, photo} = data[index];
       
        product_update_form.innerHTML = `
        <div class="my-3">
        <label for="">Name</label>
        <input name="name" type="text" value="${ name }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Price</label>
            <input name="price" type="text"  value="${ price }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">quantity</label>
            <input name="quantity" type="text"  value="${ quantity }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">quantity</label>
            <input name="index" type="text"  value="${ index }" class="form-control">
        </div>
        
        <div class="my-3">   
            <img style="width: 100%;" src=" ${ photo }" alt="">
        </div>
        <div class="my-3"> 
            <input name="photo" type="text"  value="${ photo }" class="form-control">
        
        </div>
        
        <div class="my-3">
            <input type="submit" class="btn btn-primary w-100" value="Update now">
        </div>
        
        `  
    }


    // console.log(e.target.parentElement.getAttribute('product_index'));


 }



product_update_form.onsubmit = (e) => {
    e.preventDefault();



    // get form data
    const form_data = new FormData(e.target);
    const {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    // get all data
    let all_data = readLSData('product')

    all_data[index] = { name, price, quantity, photo};


     




    // update your Data 

    updateLSData('product', all_data);


    getAllProduct();


}
  

