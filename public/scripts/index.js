'use strict'

import { login, logout, signup } from './login.js'
import {
    confirmEditTickets,
    handleTicketButton,
    populateRoomLayout,
    finalizeBooking,
} from './checkout.js'
import { goToCheckout } from './summary.js'
import { deleteAccount } from './userPage.js'
import {
    filterResourceList,
    openNewResourceModal,
    openEditResourceModal,
    handleDeleteResource,
    populateRoomLayoutAdmin,
} from './resourceConsole.js'

const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')
const logoutBtn = document.getElementById('logoutBtn')
const hamburgerBtn = document.getElementById('hamburger-btn')
const menu = document.getElementById('menu')
const ticketBtns = document.querySelectorAll('.ticket-btn')
const confirmTicketsBtn = document.querySelector('.confirm-tickets-btn')
const seatSelectionDiv = document.querySelector('.seats-selection')
const proceedBtn = document.querySelector('.confirm-seats-btn')
const proceedPaymentBtn = document.querySelector('.proceed-payment-btn')
const deleteAccountLink = document.querySelector('.delete-account')
const resourceSearchBar = document.getElementById('resource-search-bar')
const resourceNewBtn = document.getElementById('resource-new-btn')
const resourceEditBtn = document.getElementById('resource-edit-btn')
const resourceDeleteBtn = document.getElementById('resource-delete-btn')
const resourceItemRadios = document.querySelectorAll(
    '.resource-list-item input'
)
const resourceFormCancelBtn = document.getElementById(
    'resource-form-cancel-btn'
)
const resourceForm = document.getElementById('resource-form')
const roomWidthInput = document.getElementById('rooms-dimensions-width')
const roomLengthInput = document.getElementById('rooms-dimensions-length')

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
        hamburgerBtn.classList.toggle('is-active')
        menu.classList.toggle('is-active')
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email, password)
    })
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('emailSU').value
        const password = document.getElementById('passwordSU').value
        const passwordConfirm =
            document.getElementById('passwordConfirmSU').value
        const firstName = document.getElementById('firstNameSU').value
        const lastName = document.getElementById('lastNameSU').value
        const phoneNumber = document.getElementById('phoneNumberSU').value
        signup(
            email,
            password,
            passwordConfirm,
            firstName,
            lastName,
            phoneNumber !== '' ? phoneNumber : undefined
        )
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout)
}

if (ticketBtns) {
    const ticketNumbers = Array.from(
        document.querySelectorAll('.ticket-number')
    )
    ticketBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            handleTicketButton(
                btn.dataset.btnType,
                ticketNumbers.find(
                    (el) => el.dataset.ticketType === btn.dataset.ticketType
                )
            )
        })
    })
}

if (confirmTicketsBtn) {
    confirmTicketsBtn.addEventListener('click', (e) => {
        confirmEditTickets(e.target)
    })
}

if (seatSelectionDiv) {
    if (seatSelectionDiv.dataset.roomId) {
        populateRoomLayout(seatSelectionDiv.dataset.roomId, seatSelectionDiv)
    } else {
        populateRoomLayoutAdmin(undefined, seatSelectionDiv)
    }
}

if (proceedBtn) {
    proceedBtn.addEventListener('click', (e) => {
        finalizeBooking()
    })
}

if (proceedPaymentBtn) {
    proceedPaymentBtn.addEventListener('click', (e) => {
        goToCheckout(e.target)
    })
}

if (deleteAccountLink) {
    deleteAccountLink.addEventListener('click', (e) => deleteAccount())
}

if (resourceSearchBar) {
    resourceSearchBar.addEventListener('input', (e) =>
        filterResourceList(e.target)
    )
}

if (resourceNewBtn) {
    resourceNewBtn.addEventListener('click', (e) => openNewResourceModal())
}

if (resourceFormCancelBtn) {
    resourceFormCancelBtn.addEventListener('click', (e) => {
        document.getElementById('create-edit-dialog').close()
    })
}

if (resourceItemRadios) {
    resourceItemRadios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            resourceEditBtn.disabled = false
            resourceDeleteBtn.disabled = false
        })
    })
}

if (resourceEditBtn) {
    resourceEditBtn.addEventListener('click', (e) => {
        const itemId = document.querySelector(
            '.resource-list-item input:checked'
        ).value
        openEditResourceModal(itemId, e.target.dataset.resource)
    })
}

if (resourceDeleteBtn) {
    resourceDeleteBtn.addEventListener('click', (e) => {
        const itemId = document.querySelector(
            '.resource-list-item input:checked'
        ).value
        handleDeleteResource(itemId, e.target.dataset.resource)
    })
}

if (resourceForm) {
    resourceForm.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}

if (roomLengthInput && roomWidthInput) {
    roomLengthInput.addEventListener('change', (e) =>
        populateRoomLayoutAdmin(undefined, seatSelectionDiv)
    )
    roomWidthInput.addEventListener('change', (e) =>
        populateRoomLayoutAdmin(undefined, seatSelectionDiv)
    )
}
