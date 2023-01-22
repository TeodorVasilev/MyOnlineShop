import React from "react";

class PropertySelect extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        options: [],
        selectedProperty: {
            id: 0,
            options: []
        }
    }

    handlePropertyChange = (e) => {
        let properties = this.props.properties;
        let selectedProperty = properties.find(property => property.id == e.target.value);
        this.setState({ options: selectedProperty.options,
                        selectedProperty: {
                            id: e.target.value,
                            options: []
                        }
        });
    }

    toggleOption = (e) => {
        let option = e.target.value;
        let selectedOptions = [...this.state.selectedProperty.options];
        let index = selectedOptions.indexOf(option);
        if (index !== -1) {
            selectedOptions.splice(index, 1);
        } else {
            selectedOptions.push({id: option});
        }

        this.setState({
            options: [...this.state.options],
            selectedProperty: {
                ...this.state.selectedProperty,
                options: selectedOptions
            }
        }, this.addProperty)
    }

    addProperty = () => {
        this.props.addProperty(this.state.selectedProperty);
    }


    componentDidMount() {
        let selectedProperty = this.props.properties.find(property => property.id == this.props.defaultValue);
        if(selectedProperty && selectedProperty.options.length) {
          this.setState({
            options: selectedProperty.options,
            selectedProperty: {
                id: this.props.defaultValue,
                options: []
            }
          });
        }
      }

    render() {
        return (
            <div>
                <label>Property:</label>
                <select className="form-control" value={this.props.defaultValue} onChange={this.handlePropertyChange}>
                    <option>Select property</option>
                    {this.props.properties.map(property => {
                        return <option value={property.id}>{property.name}</option>
                    })}
                </select>
                {this.state.options.map(option => {
                    let isChecked = false;
                    if(this.props.selectedOptions !== undefined){
                        isChecked = this.props.selectedOptions.find(selectedOption => 
                            selectedOption.id === option.id);
                    }
                    return <div>
                        <label>{option.name}</label>
                        <input type="checkbox" value={option.id} checked={isChecked ? true : false} onClick={e => this.toggleOption(e)}></input>
                    </div>
                })}
                <div>
                { this.props.selectPropertyCnt > 1 && 
                <button className="btn btn-danger" onClick={e => this.props.removePropertySelect(e, this.props.id, this.state.selectedProperty.id)}>-</button> }
                </div>
            </div>
        );
    }
}

export default PropertySelect;