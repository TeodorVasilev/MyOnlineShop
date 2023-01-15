import React from "react";

class PropertySelect extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        options: [],
    }

    handlePropertyChange = (e) => {
        let properties = this.props.properties;
        let selectedProperty = properties.find(property => property.id == e.target.value);
        this.setState({ options: selectedProperty.options });
    }

    render() {
        return (
            <div>
                <select className="form-control" onChange={this.handlePropertyChange}>
                    <option>Select property</option>
                    {this.props.properties.map(property => {
                        return <option value={property.id}>{property.name}</option>
                    })}
                </select>
                {this.state.options.map(option => {
                    return <div>
                        <label>{option.name}</label>
                        <input type="checkbox"></input>
                    </div>
                })}
                <div>
                { this.props.selectPropertyCnt > 1 && 
                <button className="btn btn-danger" onClick={e => this.props.removePropertySelect(e, this.props.id)}>-</button> }
                </div>
            </div>
        );
    }
}

export default PropertySelect;