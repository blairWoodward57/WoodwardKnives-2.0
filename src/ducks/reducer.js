import axios from 'axios';

const initialState = {
    user: {},
    knives: [],
    cart: [],
    knife: {},
    address: {},
    firstName: '',
    address_1: '',
    address_2: '',
    address_3: '',
    address_4: '',
    lastName: '',
    email: '',
    price: 0,
    itemsInCart: 0,
    productImage: '',
    userImage: '',
    cartTotal: 0.00,
    showSlideMenu: false
}


const GET_USER_INFO = "GET_USER_INFO";
const GET_KNIVES = "GET_KNIVES";
const ADD_TO_CART = "ADD_TO_CART";
const GET_KNIFE = "GET_KNIFE";
const ADD_KNIFE_TO_SHOP = "ADD_KNIFE_TO_SHOP";
const GET_CURRENT_USER = "GET_CURRENT_USER";
const DELETE_KNIFE = "DELETE_KNIFE";
const GET_KNIFE_EDIT_PAGE = "GET_KNIFE_EDIT_PAGE";
const UPDATE_KNIFE = "UPDATE_KNIFE";
const CALCULATE_CART_TOTAL = "CALCULATE_CART_TOTAL";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case GET_KNIVES + '_FULFILLED':
            return Object.assign({}, state, { knives: action.payload })
        case ADD_TO_CART:
            console.log('reducer fired')
            state.cart.push(action.payload)
            console.log('state.cart', state.cart)
            return Object.assign({}, state, { cart: state.cart, itemsInCart: state.cart.length })
        case GET_KNIFE + '_FULFILLED':
            return Object.assign({}, state, { knife: action.payload })
        case ADD_KNIFE_TO_SHOP + '_FULFILLED':
            return Object.assign({}, state, { knives: action.payload })
        case GET_CURRENT_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case DELETE_KNIFE:
            return Object.assign({}, state, { knife: action.payload })
        case GET_KNIFE_EDIT_PAGE + '_FULFILLED':
            return Object.assign({}, state, { knife: action.payload })
        case UPDATE_KNIFE + '_FULFILLED':
            return Object.assign({}, state, { knife: action.payload })
        case CALCULATE_CART_TOTAL:
            return Object.assign({}, state, { cartTotal: action.payload })
        case UPDATE_ADDRESS:
            return Object.assign({}, state, { user: action.payload })
        case REMOVE_FROM_CART:
            let currentCart = state.cart.slice();
            currentCart.splice(currentCart.findIndex((knife) => knife.id === action.payload), 1)
            for (var i = 0, temporaryTotal = 0; i < currentCart.length; i++) {
                console.log(Number(currentCart[i].price))
                temporaryTotal += (Number(currentCart[i].price))
            }
            console.log(currentCart)
            return Object.assign({}, state, { cart: currentCart, cartTotal: temporaryTotal.toFixed(2), itemsInCart: state.cart.length-1 })
        default:
            return state;
    }
}


export function getUserInfo() {
    const userData = axios.get('/auth/me')
        .then(res => {
            console.log(res.data)
            return res.data
        })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getKnives() {
    const knivesData = axios.get('/api/knives')
        .then(res => {
            return res.data
        })
    // console.log(knivesData)
    return {
        type: GET_KNIVES,
        payload: knivesData
    }
}

export function addKnifeToShop(reqBody) {
    const knivesData = axios.post('/api/addknife', reqBody)
        .then(res => {
            return res.data
        })
    return {
        type: ADD_KNIFE_TO_SHOP,
        payload: knivesData
    }
}

export function addToCart(knife) {
    console.log(knife)
    return {
        type: ADD_TO_CART,
        payload: knife
    }
}

export function removeFromCart(id) {
    console.log(id)
    return {
        type: REMOVE_FROM_CART,
        payload: id
    }
}


export function getCurrentUser() {
    const currentUserData = axios.get('/api/currentuser')
        .then(res => {
            // console.log('current user = ', res.data)
            return res.data
        })
    return {
        type: GET_CURRENT_USER,
        payload: currentUserData
    }
}

export function deleteKnife(id) {
    console.log('deleting knife', id)
    const deletedKnifeData = axios.delete('/api/knife/' + id)
        .then(res => {
            console.log('deleted knife', res.data)
            return res.data
        })
    return {
        type: DELETE_KNIFE,
        payload: deletedKnifeData
    }
}

export function getKnifeEditPage(id) {
    console.log(id)
    const currentKnife = axios.get('/api/knife/' + id)
        .then(res => {
            console.log(res.data[0])
            return res.data[0]
        })
    return {
        type: GET_KNIFE_EDIT_PAGE,
        payload: currentKnife
    }
}

export function updateShippingAddress(id, address_1, address_2, address_3, address_4) {
    console.log('hitting action in reducer')
    const updatedAddress = axios.put('/api/useraddress/' + id, {
        address_1: address_1,
        address_2: address_2,
        address_3: address_3,
        address_4: address_4
    })
        .then(res => {
            console.log('this is the returned updated address', res.data)
            return res.data
        })
    return {
        type: UPDATE_ADDRESS,
        payload: updatedAddress
    }
}


export function updateKnife(id, knife_name, description, blade_length, overall_length, blade_thickness, price, handle_material, steel_type, img) {
    const updatedKnife = axios.put('/api/knife/' + id, {
        knife_name: knife_name,
        description: description,
        blade_length: blade_length,
        overall_length: overall_length,
        blade_thickness: blade_thickness,
        price: price,
        handle_material: handle_material,
        steel_type: steel_type,
        img: img
    })
        .then(res => {
            console.log('this is the returned updated knife', res.data)
            return res.data
        })
    return {
        type: UPDATE_KNIFE,
        payload: updatedKnife
    }
}

export function calculateCartTotal(cart) {
    const newCart = cart;
    var i;
    var temporaryTotal = 0;
    for (i = 0; i < newCart.length; i++) {
        console.log(Number(newCart[i].price))
        temporaryTotal += (Number(newCart[i].price))
    }
    return {
        type: CALCULATE_CART_TOTAL,
        payload: (temporaryTotal).toFixed(2)
    }
}



