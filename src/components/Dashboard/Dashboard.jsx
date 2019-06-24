import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <div>
                   <h2>Welcome Back Tom</h2>
                </div>
                <p>Active APIS Trips</p>
                <table class="ui celled table">
                    <thead class="">
                        <tr class="">
                            <th class="">From</th>
                            <th class="">To</th>
                            <th class="">Date</th>
                            <th class="">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <p>Upcoming APIS Trips</p>
                <table class="ui celled table">
                    <thead class="">
                        <tr class="">
                            <th class="">From</th>
                            <th class="">To</th>
                            <th class="">Date</th>
                            <th class="">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <table class="ui celled table">
                    <thead class="">
                        <tr class="">
                            <th class="">From</th>
                            <th class="">To</th>
                            <th class="">Date</th>
                            <th class="">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                        <tr class="">
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class="">Cell</td>
                            <td class=""><button>Edit</button> <button>Delete</button></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Dashboard