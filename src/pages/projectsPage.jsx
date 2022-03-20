import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/projectsPage.css';

class ProjectsPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tableData: [], 
        };
    }

    async componentDidMount() {
        const apiUrl = "https://api.github.com/users/CodingComp/repos";
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        this.setState({
            tableData: data,
            isLoaded: true
        });
    }

    render() {
        const {isLoaded, tableData } = this.state;
        const column = [
            {name: 'name'},
            {name: 'description'},
            {name: 'language'},
            {name: 'size'},
            {name: 'html_url'}
        ]
        /*
        *   Creates the table and populates it with the projects from my GitHub page
        */
        function PopulateProjectsTable() {
            return (
                <table className='projectsTable'>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Languages</th>
                        <th>Size</th>
                        <th>Link</th>
                    </tr>
                    <tbody>
                        {tableData.map((item, index) => <TableRow item={item} column={column}/>)}
                    </tbody>
                </table>
            )
        }

        /*
        *   Responsible for iterating over a project to get the Name, Desc, Languages Used, Size, and Link to GitHub
        */
        const TableRow = ({item, column}) => (
            <tr>
                {column.map((columnItem, index) => {
                    if(columnItem.name === "html_url") {
                        return <td><a href={item[`${columnItem.name}`]} target="_blank">Link</a></td>
                    }
                    return <td>{item[`${columnItem.name}`]}</td>
                })}
            </tr>
        )

        if(!isLoaded) {
            return <div><h2>Loading...</h2></div>
        } else {
            return (
                <div id="projectsPage">
                <h2>My Projects</h2>
                <h4>These are some of the projects I have made that I have uploaded to GitHub</h4>
                <div className='mainContent'>
                    <div>
                        {PopulateProjectsTable()}
                    </div>
                </div>
            </div>
            );
        }
    };
}

export default ProjectsPage;