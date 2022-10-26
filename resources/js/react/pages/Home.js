import React, { useEffect, useState } from 'react'

import axios from 'axios'

//  Components
import Navigation from '../components/Navigation'
import Modal from '../components/Modal'

//  Charts
import ReactECharts from 'echarts-for-react'

//  Other Third Party
import { MinimalSpinner } from 'loading-animations-react'

import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

import 'react-data-grid/lib/styles.css'
import DataGrid from 'react-data-grid'

function Home () {
    const [createModal, setCreateModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [countries, setCountries] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const [user, setUser] = useState({
        id: '',
        name: '',
        surname: '',
        date_of_birth: null,
        country_id: null
    })

    const [range, setRange] = useState([{
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    }])

    //  Fetch data from API
    function fetchData (range) {
        axios.get('/api/countries', {
            params: {
                start_date: range.startDate,
                end_date: range.endDate
            }
        }).then(resp => {
            setCountries(resp.data)
            setLoading(false)
        })
    }

    //  Data grid columns definition
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' },
        { key: 'surname', name: 'Surname' },
        { key: 'country', name: 'Country' },
        { key: 'country_id', name: 'Country ID' },
        { key: 'date_of_birth', name: 'Date Of Birth' }
    ]

    //  Create data grid rows from given array
    function createRows (array) {
        const rows = []

        array.map((country, id) => {
            return country.users.map((user, id) => {
                return rows.push({ id: user.id, name: user.name, surname: user.surname, country: country.name, country_id: country.id, date_of_birth: user.date_of_birth })
            })
        })

        return rows
    }

    //  Trigger open modal + setup user
    function openModal (user) {
        setUser({
            id: user.id,
            name: user.name,
            surname: user.surname,
            date_of_birth: user.date_of_birth,
            country_id: user.country_id
        })
        setModalOpen(true)
    }

    //  Render chart with given data
    function renderChart (countries) {
        const chartData = []

        countries.map((country, id) => {
            if (country.users.length > 0) {
                return chartData.push({
                    name: country.name,
                    value: country.users.length
                })
            }
        })

        return (
            <ReactECharts
                option={{
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right'
                    },
                    series: [
                        {
                            type: 'pie',
                            data: chartData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }}
                notMerge={true}
                lazyUpdate={true}
                theme={'theme_name'}
            />
        )
    }

    useEffect(() => {
        fetchData(range[0])
    }, [loading, range, modalOpen])

    return (
        <>
            <Navigation />
            <div className="container">
                <div className="row justify-content-center margin-top-15">
                    <div className="col-md-5">
                        {loading
                            ? <MinimalSpinner />
                            : renderChart(countries)
                        }
                    </div>
                    <div className="col-md-5 justify-content-center">
                        <DateRange
                            editableDateInputs={false}
                            retainEndDateOnFirstSelection={true}
                            onChange={item => setRange([item.selection])}
                            moveRangeOnFirstSelection={true}
                            ranges={range}
                        />
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5">
                    <div className="col-md-8">
                        <button type="button" className="btn btn-primary btn-add" onClick={ () => {
                            openModal({
                                id: '', name: '', surname: '', date_of_birth: null, country_id: ''
                            })
                            setCreateModal(true)
                        }}>Add user</button>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5 margin-bottom-10">
                    <div className="col-md-8">
                        <DataGrid columns={columns} rows={createRows(countries)} onRowClick={(e) => {
                            openModal(e)
                            setCreateModal(false)
                        }}/>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5 margin-bottom-10">
                </div>
                <Modal user={user} countries={countries} open={modalOpen} onClose={() => setModalOpen(false)} createModal={createModal}/>
            </div>
        </>
    )
}

export default Home
