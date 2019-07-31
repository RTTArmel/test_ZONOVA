import React from 'react';
import axios from 'axios'
import './App.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            sort_name: 'none',
            sort_author: 'none',
            genre: 'none',
            genre1: [],
            gender: 'none'
        };
        this.handleChange = this.handleChange.bind(this)
        this.cleanArray = this.cleanArray.bind(this)
        this.search = this.search.bind(this)
        this.friday = this.friday.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.search()
    }

    componentDidMount() {
        axios.get("http://localhost:8080/data.json").then(res => {
            this.setState({ content: res.data })
            var table = []
            for (let i = 0; i < res.data.length; i++) {
                table.push(res.data[i].genre)
            }
            var t1 = this.cleanArray(table)
            this.setState({ genre1: t1 })
        })

    }

    cleanArray(array) {
        var i, j, len = array.length, out = [], obj = {};
        for (i = 0; i < len; i++) {
            obj[array[i]] = 0;
        }
        for (j in obj) {
            out.push(j);
        }
        return out;
    }

    friday = () => {
        axios.get("http://localhost:8080/data.json").then(res => {
            var test = res.data.filter(filtered => new Date(filtered.date).getDay() === 5 && new Date(new Date(filtered.date).getFullYear(), new Date(filtered.date).getMonth() + 1, 0).getDate() - 6 < new Date(filtered.date).getDate() && filtered.genre === 'Finance')
            this.setState({ content: test })
        })
    }

    halloween = () => {
        axios.get("http://localhost:8080/data.json").then(res => {
            var test = res.data.filter(filtered => filtered.date.split('/')[2] === '31' && filtered.date.split('/')[1] === '10' && filtered.genre === 'Horror')
            this.setState({ content: test })
        })
    }

    search() {
        axios.get("http://localhost:8080/data.json").then(res => {
            var test = []
            for (let i = 0; i < res.data.length; i++) {
                test.push(res.data[i])
            }

            //FILTERS
            if (this.state.genre === 'none' && this.state.gender === 'none') {//NO FILTER
                this.setState({ content: test })

            } else if (this.state.genre !== 'none' && this.state.gender === 'none') {//FILTER BY BOOK GENRE
                var result = test.filter(filtered => filtered.genre === this.state.genre)
                this.setState({ content: result })

            } else if (this.state.genre === 'none' && this.state.gender !== 'none') {//FILTER BY AUTHOR GENDER
                var results = test.filter(filtered => filtered.author.gender === this.state.gender)
                this.setState({ content: results })

            } else {//FILTER BY BOTH
                var result1 = test.filter(filtered => filtered.author.gender === this.state.gender && filtered.genre === this.state.genre)
                this.setState({ content: result1 })
            }

            //SORT BY BOOK NAME
            if (this.state.sort_name !== 'none') {
                document.getElementById('sort_author').style.display = 'none'
                if (this.state.sort_name === 'Z') {
                    var result2 = this.state.content.sort((a, b) => {
                        var x = a.name.toLowerCase()
                        var y = b.name.toLowerCase()
                        if (x < y) { return 1 } else { return -1 }
                    })
                    this.setState({ content: result2 })
                } else {
                    var result3 = this.state.content.sort((a, b) => {
                        var x = a.name.toLowerCase()
                        var y = b.name.toLowerCase()
                        if (x < y) { return -1 } else { return 1 }
                    })
                    this.setState({ content: result3 })
                }
            } else {
                document.getElementById('sort_author').style.display = 'block'
            }


            //SORT BY AUTHOR NAME
            if (this.state.sort_author !== 'none') {
                document.getElementById('sort_name').style.display = 'none'
                if (this.state.sort_author === 'Z') {
                    var result4 = this.state.content.sort((a, b) => {
                        var x = a.author.name_author.toLowerCase()
                        var y = b.author.name_author.toLowerCase()
                        if (x < y) { return 1 } else { return -1 }
                    })
                    this.setState({ content: result4 })
                } else {
                    var result5 = this.state.content.sort((a, b) => {
                        var x = a.author.name_author.toLowerCase()
                        var y = b.author.name_author.toLowerCase()
                        if (x < y) { return -1 } else { return 1 }
                    })
                    this.setState({ content: result5 })
                }
            } else {
                document.getElementById('sort_name').style.display = 'block'
            }

        })
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <center>
                        <div className="row filters">
                            <div className="col-md-2"></div>

                            <div className="col-md-2">
                                <div className="input-group">
                                    <div>
                                        <select name="sort_name" className="custom-select one" id="sort_name" value={this.state.value} onChange={this.handleChange}>
                                            <option value='none'>Sort by Book Name</option>
                                            <option value="A">Book: from A to Z</option>
                                            <option value='Z'>Book: from Z to A</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select name="sort_author" className="custom-select" id="sort_author" value={this.state.value} onChange={this.handleChange}>
                                            <option value='none'>Sort by Author Name</option>
                                            <option value="A">Author: from A to Z</option>
                                            <option value='Z'>Author: from Z to A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="input-group mb-3 two">
                                    <div>
                                        <select name='genre' className="custom-select" id="genre" value={this.state.value} onChange={this.handleChange}>
                                            <option value='none'>Filter by Book genre</option>
                                            {this.state.genre1.map((book) => (
                                                <option key={book}>{book}</option>
                                            ))}
                                        </select>
                                    </div><br /><br />
                                    <div>
                                        <select name="gender" className="custom-select" id="gender" value={this.state.value} onChange={this.handleChange}>
                                            <option value='none'>Filter by Author gender</option>
                                            <option value="M">Men</option>
                                            <option value='F'>Women</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <button className="btn btn-success" onClick={this.friday}>Finance/<br />Last Friday</button>
                                <button className="btn btn-danger" onClick={this.halloween}>Horror/<br />Halloween</button>
                            </div>

                            <div className="col-md-2"></div>

                        </div>
                    </center>
                </div>
                <br />
                <div className='content container-fluid'>
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            <table className="table table-bordered table-hover table-fixed">
                                <thead className=" thead-dark">
                                    <tr className="tab">
                                        <th>Book Name</th>
                                        <th>Author</th>
                                        <th>Book Genre</th>
                                        <th>Publish date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.content.length > 0) ? this.state.content.map((book, name) => (
                                        <tr key={name}>
                                            <td>{book.name}</td>
                                            <td>{(book.author.gender === 'M') ? "Mister " : "Miss "}{book.author.name_author}</td>
                                            <td>{book.genre}</td>
                                            <td>{book.date}</td>
                                        </tr>
                                    )
                                    ) : ('')}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home
