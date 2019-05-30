import React from 'react';
import Cookies from 'js-cookie';
import { Card, Button } from 'semantic-ui-react';
import { ChildSingleInput } from '../../Form/SingleInput.jsx';

export default class JobCard extends React.Component {
    constructor(props) {
        super(props);

        const details = props.details ? Object.assign({}, props.details) :
            {
                description: "",
                location: "",
                title: ""
            }

        this.state = {
            showEditSection: false,
            newDetails: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }

    openEdit() {
        const details = Object.assign({}, this.props.details) 
        this.setState({
            showEditSection: true,
            newDetails: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newDetails)
        data[event.target.name] = event.target.value
        this.setState({
            newDetails: data
        })
    }


    saveContact() {
        console.log(this.props.details._id)
        const data = Object.assign({}, this.state.newDetails)
        this.props.controlFunc(this.props.details._id, data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className="ui cards">
                <div className="card" >
                    <div className="content">
                        <div className='ui four wide column'>
                            <ChildSingleInput
                                inputType="text"
                                label="Title"
                                name="title"
                                value={this.state.newDetails.title}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your title"
                                errorMessage="Please enter a valid title"
                            />
                            <ChildSingleInput
                                inputType="text"
                                label="Location"
                                name="location"
                                value={this.state.newDetails.location}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your location"
                                errorMessage="Please enter a valid location"
                            />
                            <ChildSingleInput
                                inputType="text"
                                label="Description"
                                name="description"
                                value={this.state.newDetails.description}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your description"
                                errorMessage="Please enter a valid description"
                            />
                            <button type="button" className="mini ui primary basic button" onClick={this.saveContact}>Save</button>
                            <button type="button" className="mini ui primary basic button" onClick={this.closeEdit}>Cancel</button>
                        </div> 
                    </div>
                </div>
            </div>
            
        )
    }
    
    renderDisplay() {

        let title = this.props.details ? this.props.details.title : ""
        let location = this.props.details ? this.props.details.location : ""
        let description = this.props.details ? this.props.details.description : ""
        
        return (
            <div className="ui cards">
                <div className="card" >
                    <div className="content">
                        <div className="header">
                            {title}
                        </div>
                        <div className="meta">
                            {location}
                        </div>
                        <div className="description">
                            {description}
                            
                        </div>
                        <div className="extra content">
                            
                                <button className="mini ui red button">
                                    Expired
                                </button>
                                
                                <button className="mini ui primary basic button">
                                    Close
                                </button>
                                <button type="button" className="mini ui primary basic button" onClick={this.openEdit}>Edit</button>
                                <button className="mini ui primary basic button">
                                    Copy
                                </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}