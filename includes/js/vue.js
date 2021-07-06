// Vue Player Submition App
const app = new Vue({
    el: '#app-root',
    data: {
        globalvars: {
            checkout: false,
            userDoesNotExist: 0,
            passDoesNotExist: 0,
            isshop: 0,
            allCollections: false,
            htmlCollection: 0,
            cssCollection: 0,
            jsCollection: 0,
            // Member Vars
            UID: 0,
            points: 0,
            firstname: '',
            lastname: '',
            email: ''
        },
        // Vars for app
        cart: [],
        ownB: [],
        badges: '',
        checkout: false,
        checkoutCheck: false,
        // Form Validation Fields
        errors: [],
        firstname: null,
        lastname: null,
        email: null,
        // Contact Vars
        fullname: null,
        contact: null,
        province: null,
        query: null
    },
    mounted() {
        if (localStorage.getItem('globalvars')) {
            try {
                this.globalvars = JSON.parse(localStorage.getItem('globalvars'))
            } catch(e) {
                localStorage.removeItem('globalvars')
            }
        }
        if (localStorage.getItem('cart')) {
            try {
                this.cart = JSON.parse(localStorage.getItem('cart'))
            } catch(e) {
                localStorage.removeItem('cart')
            }
        }
        if (localStorage.getItem('checkout')) {
            try {
                this.checkout = JSON.parse(localStorage.getItem('checkout'))
            } catch(e) {
                localStorage.removeItem('checkout')
            }
        }
        if(this.globalvars.allCollections){
            if(document.getElementById('collection-1') != null) {
                document.getElementById('collection-1').classList.add('hidden')
                document.getElementById('collection-2').classList.add('hidden')
                document.getElementById('collection-3').classList.add('hidden')
            }
        } 
        if(this.globalvars.isshop == 1 && !this.globalvars.allCollections){
                document.getElementById('collection-1').classList.remove('hidden')
                document.getElementById('collection-2').classList.remove('hidden')
                document.getElementById('collection-3').classList.remove('hidden')
            }
        if(this.globalvars.htmlCollection == 1){
            if(document.getElementById('collection-1') != null) {
                document.getElementById('collection-2').classList.add('hidden')
                document.getElementById('collection-3').classList.add('hidden')
            }
        } 
        if(this.globalvars.cssCollection == 1) {
            if(document.getElementById('collection-1') != null) {
                document.getElementById('collection-1').classList.add('hidden')
                document.getElementById('collection-3').classList.add('hidden')
            }
        } 
        if(this.globalvars.jsCollection == 1) {
            if(document.getElementById('collection-1') != null) {
                document.getElementById('collection-1').classList.add('hidden')
                document.getElementById('collection-2').classList.add('hidden')
            }
        }
        if(this.getCookie('UID')) {
            this.globalvars.UID = this.getCookie('UID');
            this.setLocalStorage(this.globalvars, 'globalvars')
        }
        if(this.globalvars.UID) {
            url = 'http://192.168.33.10:3000/api/points/'+this.getCookie('UID');
            axios.get(url).then(response => {
                this.globalvars.points = response.data[0]['points']
            })
        }
        if(this.globalvars.UID) {
            url = 'http://192.168.33.10:3000/api/member/'+this.getCookie('UID');
            axios.get(url).then(response => {
                this.globalvars.firstname = response.data[0]['firstname']
                this.globalvars.lastname = response.data[0]['lastname']
                this.globalvars.email = response.data[0]['email']
            })
            this.setLocalStorage(this.globalvars, 'globalvars')
        }
        if(this.globalvars.UID) {
            url = 'http://192.168.33.10:3000/api/members/'+this.getCookie('UID');
            axios.get(url).then(response => {
                this.ownB = response.data
                for(i = 0; i < this.ownB.length; i++) {
                    this.badges += this.ownB[i]['badge_id'] + ','
                }
            })
        }
    },
    methods: {
        addToCart(){
            const pId = document.getElementById('product-id').innerText;
            const pHeading = document.getElementById('product-heading').innerText;
            const pPrice = document.getElementById('product-price').innerText;
            if(this.cart.length != 0) {
                const pIdArr = [];
                for(x = 0; x < this.cart.length; x++ ) {
                    const productId = this.cart[x]['id'];
                    pIdArr.push(productId);
                }
                if(!pIdArr.includes(pId)) {
                    const newProduct = {id: pId, pH: pHeading, pP: parseInt(pPrice)};
                    this.cart.push(newProduct)
                    const parseCart = JSON.stringify(this.cart)
                    localStorage.setItem('cart', parseCart)
                }
            } else {
                const newProduct = {id: pId, pH: pHeading, pP: parseInt(pPrice)};
                this.cart.push(newProduct)
                const parseCart = JSON.stringify(this.cart)
                localStorage.setItem('cart', parseCart)
            }
        },
        cartItems(){
            return this.cart.length
        },
        cartClear(){
            this.cart = []
            const parseCart = JSON.stringify(this.cart)
            localStorage.setItem('cart', parseCart)
            this.clearGlobalVars()
        },
        cartTotal(){
            total = 0
            if(this.cart.length !== 0){
                for(i in this.cart){
                    total += this.cart[i]['pP']
                }
            }
            return total
        },
        removeItem(item){
            this.cart.pop(item)
            const parseCart = JSON.stringify(this.cart)
            localStorage.setItem('cart', parseCart)
        },
        toggleCheckOut(){
            this.globalvars.checkout = !this.globalvars.checkout
            this.globalvars.allCollections = !this.globalvars.allCollections
            this.setLocalStorage(this.globalvars, 'globalvars')
            this.errors = []
            if(this.globalvars.allCollection){
                document.getElementById('collection-1').classList.add('hidden')
                document.getElementById('collection-2').classList.add('hidden')
                document.getElementById('collection-3').classList.add('hidden')
            } else {
                document.getElementById('collection-1').classList.remove('hidden')
                document.getElementById('collection-2').classList.remove('hidden')
                document.getElementById('collection-3').classList.remove('hidden')
            }
        },
        cartPointCheck() {
            if(this.globalvars.points >= this.cartTotal()) {
                return true
            } else {
                return false
            }
        },
        addBadges() {
            if(this.globalvars.UID && this.cart.length != 0) {
                url = 'http://192.168.33.10:3000/api/points/'+this.getCookie('UID');
                payload = { amount: this.globalvars.points };
                axios.post(url, payload).then(response => {
                    if(response.data === true) {
                        for(x = 0; x < this.cart.length; x++) {
                            addUrl = 'http://192.168.33.10:3000/api/badges/add/'+this.getCookie('UID');
                            badgeDetails = { badgeid: this.cart[x].id };
                            axios.post(addUrl, badgeDetails).then(res => {
                                console.log(res.data)
                            })
                            pointsUrl = 'http://192.168.33.10:3000/api/points/'+this.getCookie('UID');
                            pointsBalance = this.globalvars.points - this.cart[x].pP;
                            pointsPayload = { amount: pointsBalance };
                            axios.put(pointsUrl, pointsPayload).then(res => {
                                console.log(res.data)
                            })
                        }
                        this.cartClear()
                        this.viewCollection(0)
                        document.getElementById('collection-1').classList.remove('hidden')
                        document.getElementById('collection-2').classList.remove('hidden')
                        document.getElementById('collection-3').classList.remove('hidden')
                    } else {
                        console.log('Not enough points')
                    }
                })
            }
        },
        viewCollection(num) {
            if(num == 1){
                this.globalvars.htmlCollection = 1
                this.globalvars.cssCollection = 0
                this.globalvars.jsCollection = 0
                this.globalvars.checkout = false
                this.globalvars.allCollections = false
                this.setLocalStorage(this.globalvars, 'globalvars')
            } if(num == 2) {
                this.globalvars.cssCollection = 1
                this.globalvars.htmlCollection = 0
                this.globalvars.jsCollection = 0
                this.globalvars.checkout = false
                this.globalvars.allCollections = false
                this.setLocalStorage(this.globalvars, 'globalvars')
            } if(num == 3) {
                this.globalvars.jsCollection = 1
                this.globalvars.htmlCollection = 0
                this.globalvars.cssCollection = 0
                this.globalvars.checkout = false
                this.globalvars.allCollections = false
                this.setLocalStorage(this.globalvars, 'globalvars')
            } if(num == 0) {
                this.globalvars.htmlCollection = 0
                this.globalvars.cssCollection = 0
                this.globalvars.jsCollection = 0
                this.globalvars.checkout = false
                this.globalvars.allCollections = false
                this.globalvars.isshop = 1
                this.setLocalStorage(this.globalvars, 'globalvars')
            }
        },
        notShop() {
            this.globalvars.isshop = 0
            this.setLocalStorage(this.globalvars, 'globalvars')
        },
        currentDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;
            return today
        },
        scrollToTop() {
            window.scrollTo(0,0);
        },
        onChange(event, prop, value) {
            console.log(event.target.value)
            this.setLocalStorage(prop, value)
        },
        setLocalStorage(parseItem, itemName) {
            const parseLocalStorage = JSON.stringify(parseItem)
            localStorage.setItem(itemName, parseLocalStorage)
        },
        clearGlobalVars(){
            this.globalvars = {}
            this.setLocalStorage(this.globalvars, 'globalvars')
        },
        getCookie(cname) {
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
        },
        loginValidationError() {
            let userError = this.globalvars.userDoesNotExist;
            let passError = this.globalvars.passDoesNotExist;
            if(this.getCookie('userDoesNotExist') == 1) {
                this.globalvars.userDoesNotExist = 1;
            }
            if(this.getCookie('passDoesNotExist') == 1) {
                this.globalvars.passDoesNotExist = 1;
            }
            this.setLocalStorage(this.globalvars, 'globalvars')
            if(passError == 0 && userError == 0) {
                return true;
            } else {
                return false;
            }
        },
        contactForm: function (e) {
            if (this.fullname && this.contact && this.email && this.query) {
                this.errors = []
                this.fullname = null
                this.contact = null
                this.email = null
                this.query = null
                return true;
              }
        
              this.errors = []
        
              if (!this.fullname) {
                this.errors.push('Valid full name is required.')
              }
              if (!this.contact) {
                this.errors.push('Please enter a valid contact number.')
              }
              if (!this.email) {
                this.errors.push('Please enter a valid email address.')
              }
              if (!this.query) {
                this.errors.push('Please enter a query.')
              }
        
              e.preventDefault()
        }
    },
    computed:{
        matched(){
            let findBadge = this.badges.includes(this.getCookie('selectedProduct'))
            if (this.badges.length != 0 && findBadge) {
                return true
            } else {
                return false
            }
        }
      }
})
