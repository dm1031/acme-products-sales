import React, { Component } from 'react';

class Field extends Component {
    render() {
    const { label, controlledValue, handleChange } = this.props;
        return (
            <div className="form-group">
                <div>
                    <label htmlFor={label}>{label[0].toUpperCase() + label.slice(1)}</label>
                </div>
                {
                    label === 'availability' ?
                
                    <select
                        className="form-control"
                        name={label}
                        value={controlledValue}
                        onChange={handleChange}
                    >
                    <option>instock</option>
                    <option>backordered</option>
                    <option>discontinued</option>
                    
                    </select>
                    
                    :
                    
                    <input
                        className="form-control"
                        name={label}
                        value={controlledValue}
                        onChange={handleChange}
                    />
                }
            </div>
        )
    }
}

export default Field;
