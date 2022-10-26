import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'

//  Toasts
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Modal ({ open, user, countries, onClose, createModal = false }) {
    const nameRef = useRef()
    const surnameRef = useRef()
    const dateRef = useRef()
    const countryRef = useRef()

    const handleSave = () => {
        const data = {
            name: nameRef.current.value || user.name,
            surname: surnameRef.current.value || user.surname,
            date_of_birth: dateRef.current.value ?? user.date_of_birth,
            country_id: countryRef.current.value || user.country_id
        }

        if (createModal) {
            axios.post('/api/user', data).then(() => {
                toast.success('User was successfully created!', {
                    position: toast.POSITION.TOP_CENTER
                })
                onClose()
            }).catch((error) => {
                toast.error('Server: ' + error, {
                    position: toast.POSITION.TOP_CENTER
                })
            })
        } else {
            axios.patch('/api/user/' + user.id + '/update', data).then(() => {
                toast.success('User was successfully edited!', {
                    position: toast.POSITION.TOP_CENTER
                })
                onClose()
            }).catch((error) => {
                toast.error('Server: ' + error, {
                    position: toast.POSITION.TOP_CENTER
                })
            })
        }
    }

    const handleDelete = () => {
        axios.delete('/api/user/' + user.id + '/delete'
        ).then(() => {
            toast.success('User was successfully deleted!', {
                position: toast.POSITION.TOP_CENTER
            })
            onClose()
        }).catch((error) => {
            toast.error('Server: ' + error, {
                position: toast.POSITION.TOP_CENTER
            })
        })
    }

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal-wrapper">
                <form>
                    <div className="container">
                        <h1>User Customization</h1>
                        <div className="row justify-content-center margin-top-5">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input type="text" className="form-control" id="name" defaultValue={user.name} ref={nameRef} required/>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="full-name" className="form-label">Surname:</label>
                                    <input type="text" className="form-control" id="full-name" defaultValue={user.surname} ref={surnameRef} required/>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date of birth:</label>
                                    <input type="date" className="form-control" id="date" defaultValue={user.date_of_birth} ref={dateRef} required/>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-+2">
                                <label htmlFor="continent" className="form-label">Country:</label>
                                <select className="form-select" id="continent" aria-label="continent-select" ref={countryRef} required>
                                    <option value="">Select country</option>
                                    {countries.map((country, id) => {
                                        if (country.id === user.country_id) {
                                            return <option value={country.id} key={id} selected>{country.name}</option>
                                        } else {
                                            return <option value={country.id} key={id}>{country.name}</option>
                                        }
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 margin-top-5">
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('modal')
    )
}

export default Modal
