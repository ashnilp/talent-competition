import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import JobCard from './JobCard.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, List } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here

        this.updateForComponentId = this.updateForComponentId.bind(this);
        this.updateAndSaveData = this.updateAndSaveData.bind(this);
        this.saveData = this.saveData.bind(this);
    };

    init() {
       
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = true;
     
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData : false })
        )
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        loaderData.isLoading = false;
    };

    loadData(callback) {
        
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
        // ******* Ashnil ******

        $.ajax({
            url: 'http://localhost:51689/listing/listing/getSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            data: {
                activePage: 1,
                sortbyDate: "desc",
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true,
                employerId: "",
                limit: 6,
               
            },
            success: function (data) {
                this.setState({
                    loadJobs: data.myJobs
                });
                
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
        
        //**********************

       
    }

    updateForComponentId(componentId, newValues) {
        let data = {};
        data[componentId] = newValues;
        this.updateAndSaveData(data)
    }

    updateAndSaveData(newData) {
        let newSD = Object.assign({}, this.state.employerData, newData)
        this.setState({
            employerData: newSD
        }, this.saveData)
    }

    saveData() {


    }

    loadNewData(data) {
        
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
        console.log(data);
    }

    render() {

        let details = ""
        if (this.state == "" && this.state.loadJobs == "") {
            details = <p>No Jobs Found</p>
        }
        else {
            details = this.state && this.state.loadJobs && this.state.loadJobs.map(job =>

                <div className="ui horizontal list">
                    <div className="item">
                        <JobCard
                            details={job}
                            controlFunc={this.updateForComponentId}
                        />
                        <span></span>
                    </div>

                </div> 
            )
        }
        
    
       return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData} >
                <div className="ui container">
                    <h1>List Of Jobs</h1>
                   <div >
                       {details}
                    </div>
                </div>
            </BodyWrapper>
        )
            

        
        
    }
}