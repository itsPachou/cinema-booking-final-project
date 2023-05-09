'use strict'

import { login, logout, signup } from './login.js'
import {
    confirmEditTickets,
    handleTicketButton,
    populateRoomLayout,
    finalizeBooking,
} from './checkout.js'
import { goToCheckout } from './summary.js'

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
    populateRoomLayout(seatSelectionDiv.dataset.roomId, seatSelectionDiv)
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
