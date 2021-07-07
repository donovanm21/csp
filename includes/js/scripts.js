function registerUser() {
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password1').value;

    const data = { firstname : firstname, lastname : lastname, email : email, password : password }

    fetch('http://localhost:8888/user/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getProducts(cId, pId, cName, pName, pPrice, pImage) {
    // Dynamic Products Root
    const productRoot = document.getElementById('product-root');
    // Get product Section
    const productSection = document.getElementById('collection-' + cId);
    // Dynamic Collection Heading
    let collectionHeading = document.getElementById('cHeading-' + cId);
    // Dynamic Div for Card
    let productDiv1 = document.getElementById('cRow-' + cId);
    // Product Page Link
    let productPage = document.createElement('a');
    productPage.href = 'product.html';
    productPage.setAttribute('id', pId);
    productPage.setAttribute('onclick', 'getProduct(this.id);');
    productPage.classList.add('text-decoration-none');
    // Dynamic Div for Card
    let productDiv2 = document.createElement('div');
    productDiv2.classList.add('col');
    // Dynamic Div for Card
    let productDiv3 = document.createElement('div');
    productDiv3.classList.add('card', 'mb-4', 'rounded-3', 'shadow-sm');
    // Dynamic Div for Card
    let productDiv4 = document.createElement('div');
    productDiv4.classList.add('card-body');
    // Dynamic Div for Card
    let productDiv5 = document.createElement('div');
    productDiv5.classList.add('card-header', 'py-3', 'text-light', 'bg-dark');
    // Dynamic Product Heading
    let productHeading = document.createElement('h4');
    productHeading.classList.add('my-0', 'fw-normal', 'heading-font');
    // Dynamic Product Image
    let productImage = document.createElement('img');
    productImage.classList.add();
    // Dynamic Product Price
    let productPrice = document.createElement('h1');
    productPrice.classList.add('card-title', 'pricing-card-title', 'my-2', 'text-dark');

    // Vars
    collectionHeading.innerHTML = cName;
    productHeading.innerHTML = pName;
    productImage.src = pImage;
    productPrice.innerHTML = pPrice + '<small class="text-muted fw-light csp-text">CSP</small>';

    // Append Elements
    productSection.appendChild(productDiv1);
    productDiv1.appendChild(productPage);
    productPage.appendChild(productDiv2);
    productDiv2.appendChild(productDiv3);
    productDiv3.appendChild(productDiv5);
    productDiv3.appendChild(productDiv4);
    productDiv5.appendChild(productHeading);
    productDiv4.appendChild(productImage);
    productDiv4.appendChild(productPrice);
  
}

function setProduct(pId, pName, pPrice, pImage, pDescription) {
    // Product page vars
    const productId = document.getElementById('product-id');
    const productHeading = document.getElementById('product-heading');
    const productImage = document.getElementById('product-image');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    // Update page vars
    productId.innerText = pId;
    productHeading.innerHTML = pName;
    productImage.src = pImage;
    productPrice.innerHTML = pPrice;
    productDescription.innerHTML = pDescription;
}

function getProduct(id) {
    document.cookie = 'selectedProduct='+ id;
    const myProduct = getCookie('selectedProduct');
}

async function setBadge() {
    const id = getCookie('selectedProduct');
    apiBadgeURL = 'http://192.168.33.10:3000/api/badges/'+id;
    const res1 = await fetch(apiBadgeURL);
    const data1 = await res1.json();
    let arr1 = [];
    arr1.push(data1)
    x = 0
    while(x < arr1.length) {
        pId = arr1[x]['id'];
        pName = arr1[x]['badge_name'];
        pPrice = arr1[x]['badge_price'];
        pImage = 'includes/img/' + arr1[x]['id'] + '.png';
        pDescription = arr1[x]['badge_description'];
        setProduct(pId, pName, pPrice, pImage, pDescription)
        x++
    }
}

async function getBadges() {
    apiBadgeURL = 'http://192.168.33.10:3000/api/badges';
    const res1 = await fetch(apiBadgeURL);
    const data1 = await res1.json();
    let arr1 = [];
    arr1.push(data1)
    apiCollectionsURL = 'http://192.168.33.10:3000/api/collections';
    const res2 = await fetch(apiCollectionsURL);
    const data2 = await res2.json();
    let arr2 = [];
    arr2.push(data2)
    x = 0
    while(x < arr1[0].length) {
        cId = arr1[0][x]['badge_collection'];
        pId = arr1[0][x]['id'];
        cName = arr2[0][cId - 1]['collection_name'];
        pName = arr1[0][x]['badge_name'];
        pPrice = arr1[0][x]['badge_price'];
        pImage = 'includes/img/' + arr1[0][x]['id'] + '.png';
        getProducts(cId, pId, cName, pName, pPrice, pImage) 
        x++
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function updateBadges(bId) {
    myBadge = document.getElementById('badgeid-' + bId);
    myBadge.src = 'includes/img/' + bId + '.png';
}

async function membersUpdate(mId) {
    memberAPI = 'http://192.168.33.10:3000/api/members/' + mId;
    const res = await fetch(memberAPI);
    const data = await res.json();
    let arr = [];
    arr.push(data)
    x = 0
    while(x < arr[0].length) {
        bId = arr[0][x]['badge_id'];
        updateBadges(bId);
        x++
    }
}

async function memberPoints(mId) {
    pointsAPI = 'http://192.168.33.10:3000/api/points/' + mId;
    const res = await fetch(pointsAPI);
    const data = await res.json();
    return data[0]['points'];
}

async function ownedBadges(mId) {
    pointsAPI = 'http://192.168.33.10:3000/api/members/' + mId;
    const res = await fetch(pointsAPI);
    const data = await res.json();
    const arr = []
    arr.push(data)
    return data;
}